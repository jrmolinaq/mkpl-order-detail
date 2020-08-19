import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private fb: FormBuilder) { }
  private getRefValue(value: string, data: any) {
    return value.split('.').reduce((memory, key) => {
      if (memory[key] !== null) {
        return memory[key];
      }
      return null;
    }, data);
  }

  /**
   * Creates form
   * @param receivedFields Object with form control names for create for.
   * @param [data] object with values to set form
   * @returns form 
   */
  createForm(receivedFields: any[], data = {}): FormGroup {
    const formControls = {};
    receivedFields.map(field => {
      const { name, value, fields, details } = field;
      if (fields) {
        formControls[name] = this.createForm(fields, data);
      } else if (details) {
        const {
          name: detailsName,
          value: detailsValue,
          fields: detailsFields
        } = details;
        const arrayValues = this.getRefValue(detailsValue, data);
        formControls[detailsName] = new FormArray([]);
        arrayValues.forEach((element: {}) => {
          formControls[detailsName].push(
            this.createForm(detailsFields, element)
          );
        });
      } else {
        const fieldVal = this.getRefValue(value || name, data);
        formControls[name] = new FormControl(
          data && fieldVal !== undefined ? fieldVal : field.config,
          field.validators ? field.validators : null
        );
      }
    });
    return this.fb.group(formControls);
  }

  /**
   * Gets the form objects based on the field definition.
   * @param form Form to get values
   * @param receivedFields Fields definition
   * @param [propertyPrefix] For recursive use only
   * @returns Return data object mapped according to fields definition
   */
  getFormValue(form: FormGroup, receivedFields: any[], propertyPrefix = ''): any {
    const formData = {};
    receivedFields.map(field => {
      const { name, value, fields } = field;
      // Construct complete key mapping for get form value. Ex: prop.prop2.prop3
      const suffix = propertyPrefix ? `${propertyPrefix}.${name}` : name;
      if (fields) {
        const childObject = this.getFormValue(form, fields, suffix);
        Object.assign(formData, childObject);
      } else {
        const keys = (value || name).split('.');
        keys.reduce((memory: { [x: string]: any; }, key: string | number, index: number) => {
          // if last key, assign value
          if (index === keys.length - 1) {
            memory[key] = form.get(suffix).value;
            return memory;
          } else {
            // if object does not exists, create empty
            if (!memory[key]) {
              memory[key] = {};
            }
            return memory[key];
          }
        }, formData);
      }
    });
    return formData;
  }

  resetForm(form: FormGroup, section: string, field: string, valRef?: boolean) {
    const value = form.get(`${section}.${field}`).value;
    if (!value || valRef) {
      form.get(section).reset({
        [field]: valRef || form.get(`${section}.${field}`).value
      });
    }
  }

  addOrDeleteFormArray(form: FormArray, value: number, base?: any) {
    if (value > form.value.length) {
      for (let i = form.value.length; i < value; i++) {
        form.push(this.createForm(base, {}));
      }
    } else {
      while (form.value.length !== value) {
        form.removeAt(value);
      }
    }
  }
}
