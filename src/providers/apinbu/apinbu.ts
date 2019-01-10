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
  }
  public displayCur:string = ";USD;EUR;";
  loading:any = undefined;
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
        this.showSpinner({dismissOnPageChange: true})
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
          if (!!this.loading) {
            this.loading.dismiss();
            console.log(">>>this.loading",this.loading);
          }
          },
          error => {
            //this.handleError(error);
            observable.error(error);
            observable.complete();
            if (!!this.loading) {
              this.loading.dismiss();
            }
          });
    });
  }

  showSpinner(
    {dismissOnPageChange = true,
    duration = 5000,
    content = ""}:LoadingOptions
  ) {
    console.log(">>>>showSpinner>>>!!!",this.loading);
    if (!this.loading) {
      this.loading = this.spinner.create({
        spinner: 'bubbles',
        content: content,
        dismissOnPageChange: dismissOnPageChange,
        duration: duration
      });
      this.loading.onDidDismiss(() => {
        console.log('Dismissed loading');
      });
      this.loading.present();

    }
  }
}
