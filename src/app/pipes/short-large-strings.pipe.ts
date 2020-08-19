import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortLargeStrings'
})
export class ShortLargeStringsPipe implements PipeTransform {
  transform(value: string, charAmount = 20): string {
    if (value && value.length > charAmount) {
      return `${value.substring(0, charAmount)}...`;
    }
    return value;
  }
}
