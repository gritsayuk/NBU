import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoadingController} from 'ionic-angular/index'
import { Observable } from 'rxjs/Observable';

interface RunRequest {
  method: string,
  request: any,
  spinner: boolean
};
interface LoadingOptions {
  spinner?: string;
  content?: string;
  cssClass?: string;
  showBackdrop?: boolean;
  enableBackdropDismiss?: boolean;
  dismissOnPageChange?: boolean;
  duration?: number;
};
const API_URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/";
@Injectable()
export class ApinbuProvider {

  constructor(public spinner: LoadingController,
              public http: HttpClient) {
    console.log('Hello ApinbuProvider Provider');

    this.loading = this.spinner.create({
      spinner: 'bubbles',
      content: "",
      dismissOnPageChange: true,
      duration: 5000
    })
    this.loading.onDidDismiss(() => {
      this.loadingShow = false;
      //console.log('Dismissed loading');
    });

  }
  public displayCur:string = ";USD;EUR;";
  loading:any = undefined;
  loadingShow: boolean = false;
  options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'encoding': 'UTF-8',
      'timeout': '10000',
      'origin': 'NBU'
    })
  };

  runRequestGet({method, request, spinner}:RunRequest): Observable<any> {
    return Observable.create(observable=> {
      console.log('>>>siebel_api>>>' + method, request);
      if (spinner) {
        //this.showSpinner();
      }
      //console.log('>>>siebel_api>>> headers: ', this.options);
      //this.http.get(API_URL + method, request, this.options)
      this.http.get(API_URL + method+request)//, this.options
        .subscribe(res => {
            //this.extractData(method, res);
            observable.next(res);
            observable.complete();
          console.log(">>>this.loading",this.loading)
            console.log(">>>!!this.loading",!!this.loading)
          if (this.loadingShow) {
            this.loading.dismiss();
            console.log(">>>this.loading.dismiss",this.loading);
          }
          },
          error => {
            //this.handleError(error);
            observable.error(error);
            observable.complete();
            if (this.loadingShow) {
              this.loading.dismiss();
              console.log(">>>this.loading.dismiss",this.loading);
            }
          });
    });
  }

  showSpinner() {
    console.log(">>>>showSpinner>>>!!!",this.loading);
    //Почему-то не работает 
    /*if (!this.loadingShow) {
      this.loadingShow = true;
      this.loading.present();
    }*/
  }

  dateToString (num: number) {
    let ysterday: string = "";
    let dt:Date = new Date();
    dt.setDate(dt.getDate()+num);
    ysterday = dt.getFullYear().toString()
    ysterday += dt.getMonth()>8?(dt.getMonth()+1).toString():"0"+(dt.getMonth()+1).toString();
    ysterday += dt.getDate()>9?dt.getDate().toString():0+dt.getDate().toString();
    return ysterday;
  }
}
