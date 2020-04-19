import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'beautifulSeconds'
})
export class BeautifulSecondsPipe implements PipeTransform {

  transform(value: number): string {
    const seconds = value % 60;
    let minutes = Math.trunc(value / 60);
    let hours = ''
    if(minutes > 59){
      hours = this.pad(Math.trunc(minutes/60), 2) + ':';
      minutes = minutes % 60;
    }
    const minutesDisplayed = this.pad(minutes, 2);
    const secondsDisplayed = this.pad(seconds, 2);
    return `${hours}${minutesDisplayed}:${secondsDisplayed}`;
  }

  pad(number, length): string {
    let str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }

}
