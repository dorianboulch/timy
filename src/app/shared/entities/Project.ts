import {History} from "./History";

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
}
