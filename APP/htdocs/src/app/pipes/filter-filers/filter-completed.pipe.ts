import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCompleted'
})
export class FilterCompletedPipe implements PipeTransform {

  transform(items: any[], isCompleted: boolean): any {
    if (!items) {
      return items;
    }
    return items.filter(item => item.isCompleted === isCompleted);
  }

}
