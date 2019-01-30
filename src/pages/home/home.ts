import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApinbuProvider } from '../../providers/apinbu/apinbu';
import { Storage } from '@ionic/storage';

import { SelectCurrencyPage } from '../select-currency/select-currency';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cursListAll:any = {};
  preCursListAll:any = {};
  prePreCursListAll:any = {};
  cursList:any = [];
  displayCur:string = "";
  requestCount:number = 0;
  todayStr:string = "";
  constructor(private apinbuProvider: ApinbuProvider,
              public navCtrl: NavController,
              private storage: Storage) {
    let dt = new Date();
    this.todayStr = dt.getDate() < 10 ? "0" + dt.getDate().toString() : dt.getDate().toString();
    this.todayStr = this.todayStr + "." + (dt.getMonth() < 9 ? "0" + (dt.getMonth()+1).toString() : (dt.getMonth()+1).toString());
    this.todayStr = this.todayStr + "." + dt.getFullYear().toString();
    console.log(">>>>this.todayStr", this.todayStr);
  }
  refresher:any;
  doRefresh($event) {
    this.refresher = $event;
    this.getData();
  }
  getData() {
    this.storage.get('DISPLAY_CURRENCY').then((val) => {
      console.log('>>>DISPLAY_CURRENCY', val);
      if (!!val) {
        this.displayCur = val;
      }
      else {
        this.displayCur = this.apinbuProvider.displayCur;
        this.storage.set("DISPLAY_CURRENCY", this.apinbuProvider.displayCur);
      }

      this.requestCount = 3;
      this.getListCurs(1);
      this.getListCurs(2);
      this.getListCurs(3);
    });
  }
  ionViewWillEnter() {
    this.getData();
  }

  getListCurs(result:number, iter: number = 0) {
    let param: string = "";
    if (result === 1) {
      param = "date="+this.apinbuProvider.dateToString(1+iter)+"&";
    }
    if (result === 2) {
      param = "date="+this.apinbuProvider.dateToString(0)+"&";
    }
    if (result === 3) {
      param = "date="+this.apinbuProvider.dateToString(-1)+"&";
    }
    if (iter < 5) {
      this.apinbuProvider.runRequestGet({
        method: 'exchange',
        request: '?' + param + 'json',
        spinner: true
      })
        .subscribe(res => {
          if (!!res) {
            if (result === 1) {
              if (res.length > 0) {
                this.cursListAll = res;
                this.getListCurs(1, iter+1);
              } else {
                --this.requestCount;
              }
            } else {
              if (result === 2) {
                this.preCursListAll = res;
                --this.requestCount;
              } else {
                this.prePreCursListAll = res;
                --this.requestCount;
              }
            }

            if (this.requestCount === 0) {
              this.parseData();
            }
          }
        }, error => {
          console.log(">>>BEDA!!!", error);
        });
    }
  }

  parseData() {
    console.log("this.displayCur",this.displayCur.split(";").length);
    this.cursList = [];
    console.log(">>>this.cursListAll>>>",this.cursListAll);
    console.log(">>>this.preCursListAll>>>",this.preCursListAll);
    console.log(">>>this.prePreCursListAll>>>",this.prePreCursListAll);

    let displayCurArr = this.displayCur.split(";");
    for (let i = 1; i < displayCurArr.length; i++) {
      if (this.parseDataFor(displayCurArr[i], this.cursListAll, this.preCursListAll)) {
        this.parseDataFor(displayCurArr[i], this.preCursListAll, this.prePreCursListAll);
      }
    }
    if(!!this.refresher){
      this.refresher.complete();
    }
  }

  parseDataFor(currency, cursListAll, preCursListAll) {

    for(let cu in cursListAll) {
      if (currency === cursListAll[cu].cc) {
        for (let i in preCursListAll) {
          if (currency === preCursListAll[i].cc) {
            cursListAll[cu].trend = Number(cursListAll[cu].rate) - preCursListAll[i].rate;
            cursListAll[cu].prerate = preCursListAll[i].rate;
            cursListAll[cu].predt = preCursListAll[i].exchangedate;
            break;
          }
        }
        this.cursList.push(cursListAll[cu]);
        return false;
      }
    }
    return true
  }

  addCurrency(){
    this.navCtrl.push(SelectCurrencyPage);
  }
  /*reorderItems(indexes) {
    console.log(">>>reorderItems",indexes);
    /!*let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);*!/
  }*/
}
