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
  constructor(private apinbuProvider: ApinbuProvider,
              public navCtrl: NavController,
              private storage: Storage) {

  }
  ionViewWillEnter() {
    this.storage.get('DISPLAY_CURRENCY').then((val) => {
      console.log('>>>DISPLAY_CURRENCY', val);
      if (!!val) {
        this.displayCur = val;
      }
      else {
        this.displayCur = this.apinbuProvider.displayCur;
        this.storage.set("DISPLAY_CURRENCY", this.apinbuProvider.displayCur);
      }
      let ysterday: string = this.apinbuProvider.dateToString(-1);
      let beaforYsterday: string = this.apinbuProvider.dateToString(-2);

      this.requestCount = 3;
      this.getListCurs("", 1);
      this.getListCurs("date="+ysterday+"&", 2);
      this.getListCurs("date="+beaforYsterday+"&", 3);
    });
  }

  getListCurs(param:string, result:number) {
    this.apinbuProvider.runRequestGet({method: 'exchange',
                                       request: '?'+param+'json',
                                       spinner: true})
      .subscribe(res => {
        if (!!res) {
          if (result === 1) this.cursListAll = res;
            else if (result === 2) this.preCursListAll = res;
              else this.prePreCursListAll = res;

          --this.requestCount;
          //console.log("this.requestCount", this.requestCount);
          /*if(result === 1) {
            for (let ii in this.cursListAll) {
              if (this.cursListAll[ii].cc === "USD") {
                this.cursListAll.splice(ii, 1);
                break;
              }
            }
          }*/
          if (this.requestCount === 0) {
            this.parseData();
          }
        }
      }, error => {
        console.log(">>>BEDA!!!",error);
      });
  }

  parseData() {
    console.log("this.displayCur",this.displayCur.split(";").length);
    this.cursList = [];

    let displayCurArr = this.displayCur.split(";");
    for (let i = 1; i < displayCurArr.length; i++) {
      if (this.parseDataFor(displayCurArr[i], this.cursListAll, this.preCursListAll)) {
        this.parseDataFor(displayCurArr[i], this.preCursListAll, this.prePreCursListAll);
      }

    }
  }

  parseDataFor(currency, cursListAll, preCursListAll) {
    for(let cu in cursListAll) {
      if (currency === cursListAll[cu].cc) {
        cursListAll[cu].trend = Number(cursListAll[cu].rate) - preCursListAll[cu].rate
        this.cursList.push(cursListAll[cu]);
        return false;
        console.log(">>>this.cursList",this.cursList);
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
