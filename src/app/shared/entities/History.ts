export class History {
  public from: Date;
  public to: Date;

  constructor(from: Date, to?: Date) {
    this.from = from;
    this.to = to ? to : null;
  }
}
