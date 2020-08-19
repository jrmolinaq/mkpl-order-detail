import { Validators } from '@angular/forms';

export const FIELDS = [
  {
    name: 'dispatchInfo',
    fields: [
      {
        name: 'guideNumber',
        validators: [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]*')
        ]
      },
      {
        name: 'commentary',
        validators: [
          Validators.maxLength(500)
        ]
      }
    ]
  }
];

export const FORMAT_DATE = 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx';
