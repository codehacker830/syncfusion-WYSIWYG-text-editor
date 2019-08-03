import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';
import { Subscriber } from 'src/app/Subscriber';
import { NewsletterStat } from 'src/app/NewsletterStat';
import { NewsletterStatGroupped } from 'src/app/NewsletterStatGroupped';

/**
 * Issue 1: non cambia l'ascissa al click, cosa che dovrebbe fare
 * Issue 2: mettere in ordine i valori per mese, perché va in ordine alfabetico, cosa che non voglio
 * (es. April, February, January, March, May)
 */

@Component({
  selector: 'app-newsletter',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
  ];
  public lineChartLabels: Array<any> = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartType = 'line';
  // public lineChartLegend = true;
  public weekview = true;
  public textview = 'Guarda mensile';
  public totalSubscribers: number;
  public mySubscribers: Subscriber[];
  public weekdata: NewsletterStat[];
  public monthdata: NewsletterStatGroupped[];

  constructor(private jarwis: JarwisService) { }

  initSubscribers(data) {
    this.mySubscribers = data;
    this.totalSubscribers = this.mySubscribers.length;
  }

  weeklyView() {
    const yw = this.weekdata.map(p => p.subscribers);
    const xw = this.weekdata.map(p => p.week.toString());
    this.lineChartData = [
      {data: yw, label: 'Iscritti'}
    ];
    this.lineChartLabels = xw;
  }

  monthlyView() {
    const ym = this.monthdata.map(p => p.subs);
    const xm = this.monthdata.map(p => p.month.toString());
    this.lineChartData = [
      {data: ym, label: 'Iscritti'}
    ];
    this.lineChartLabels = xm;
  }

  handlingWeeklyData(data) {
    this.weekdata = data;
    this.weeklyView();
  }

  handlingMonthlyData(data) {
    this.monthdata = data;
  }

  ngOnInit() {
    this.jarwis.refresh();
    // subscribers table
    this.jarwis.getSubscribers().subscribe(
      data => this.initSubscribers(data),
      error => console.log(error)
    );
    // get weekly subscribers
    this.jarwis.getSubscribersStats().subscribe(
      data => this.handlingWeeklyData(data),
      error => console.log(error)
    );
    // get monthly subscribers
    this.jarwis.getSubscribersStatsGroupBy().subscribe(
      data => this.handlingMonthlyData(data),
      error => console.log(error)
    );
  }

  changeAxis() {
    if (!this.weekview) {
      this.weeklyView();
      this.textview = 'Guarda mensile';
    } else {
      this.monthlyView();
      this.textview = 'Guarda settimanale';
    }
    this.weekview = !this.weekview;
  }

}
