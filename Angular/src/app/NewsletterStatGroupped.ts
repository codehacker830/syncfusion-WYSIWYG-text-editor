export class NewsletterStatGroupped {

  subs: number = undefined;
  month: number = undefined;
  year: number = undefined;

  constructor (subs?: number, month?: number, year?: number) {
    this.subs = subs;
    this.month = month;
    this.year = year;
  }

}
