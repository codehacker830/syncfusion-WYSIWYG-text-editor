export class NewsletterStat {

  week: number = undefined;
  month: number = undefined;
  year: number = undefined;
  subscribers: number = undefined;

  constructor (week?: number, month?: number, year?: number, subscribers?: number) {
    this.week = week;
    this.month = month;
    this.year = year;
    this.subscribers = subscribers;
  }

}
