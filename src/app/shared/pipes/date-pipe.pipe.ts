import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe',
  standalone: true
})
export class DatePipePipe implements PipeTransform {

  transform(value: any): string {
    try {
      const date = new Date(value.seconds * 1000);
      if (isNaN(date.getTime())) {
        console.log(value);
        return "hiba1";
      }
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}. ${month}. ${day}.`;
    } catch (error) {
      console.log(error);
      return "hiba2";
    }
  }

}
