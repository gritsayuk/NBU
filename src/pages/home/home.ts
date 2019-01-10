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

  cursListAll:any;
  cursList:any = [];
  displayCur:string = "";
  constructor(private apinbuProvider: ApinbuProvider,
              public navCtrl: NavController,
              private storage: Storage) {

  }
  ionViewWillEnter() {
    console.log('>>>ionViewWillLoad>>>');
    this.storage.get('DISPLAY_CURRENCY').then((val) => {
      console.log('>>>DISPLAY_CURRENCY', val);
      if (!!val) {
        this.displayCur = val;
      }
      else {
        this.displayCur = this.apinbuProvider.displayCur;
        this.storage.set("DISPLAY_CURRENCY", this.apinbuProvider.displayCur);
      }
      this.getListCurs("");
    });
  }
  getListCurs(param) {
    this.apinbuProvider.runRequestGet({method: 'exchange',
                                       request: '?'+param+'json',
                                       spinner: true})
      .subscribe(res => {
        if (!!res) {
          this.cursListAll = res;
          this.parseData();
        }
      }, error => {
        console.log(">>>BEDA!!!",error);
      });
  }

  parseData() {
    this.cursList = [];
    for(let cu in this.cursListAll) {
      if (this.displayCur.indexOf(";" + this.cursListAll[cu].cc + ";") >= 0) {
        console.log(">>>this.cursListAll[cu]",this.cursListAll[cu]);
        this.cursList.push(this.cursListAll[cu]);
        console.log(">>>this.cursList",this.cursList);
      }
    }
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
