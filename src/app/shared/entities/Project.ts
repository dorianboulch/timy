import {History} from "./History";
import {formatISO, isAfter, isBefore} from "date-fns";

export class Project {
  public name: string;
  public clientName: string;
  public createdAt: Date;
  public history: History[] = [];
  public timeSpentToday = 0;

  constructor(name?: string, clientName?: string, createdAt?: Date) {
    this.name = name;
    this.clientName = clientName;
    this.createdAt = createdAt;
  }

  getLastHistory(): History {
    if(this.history.length > 0){
      return this.history.reduce((previousValue, currentValue) => {
        return previousValue.to > currentValue.to ? previousValue : currentValue;
      });
    }else{
      return null;
    }
  }

  getHistoryByDay(): { [s in string]: History[] } {
    const historiesByDay = {};
    for(const h of this.history){
      const key = formatISO(h.from, {representation:"date"});
      if(!historiesByDay[key]){
        historiesByDay[key] = [];
      }
      historiesByDay[key].push(h);
    }
    for(const hKey of Object.keys(historiesByDay)){
      historiesByDay[hKey].sort((a, b) => {
        if(isBefore(a.from,b.from)){
          return -1;
        }
        if(isAfter(a.from,b.from)){
          return 1;
        }
        return 0;
      });
    }
    return historiesByDay;
  }
}
