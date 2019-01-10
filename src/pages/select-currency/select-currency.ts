import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApinbuProvider } from '../../providers/apinbu/apinbu';

@Component({
  selector: 'page-select-currency',
  templateUrl: 'select-currency.html',
})
export class SelectCurrencyPage {

  allCurryncy:any;
  allCurryncyDef:any =[{r030: 36, txt: "Австралійський долар", cc: "AUD"},
    {r030: 124, txt: "Канадський долар", cc: "CAD"},
    {r030: 156, txt: "Юань Женьмiньбi", cc: "CNY"},
    {r030: 191, txt: "Куна", cc: "HRK"},
    {r030: 208, txt: "Данська крона", cc: "DKK"},
    {r030: 344, txt: "Гонконгівський долар", cc: "HKD"},
    {r030: 348, txt: "Форинт", cc: "HUF"},
    {r030: 356, txt: "Індійська рупія", cc: "INR"},
    {r030: 203, txt: "Чеська крона", cc: "CZK"},
    {r030: 360, txt: "Рупія", cc: "IDR"},
    {r030: 364, txt: "Іранський ріал", cc: "IRR"},
    {r030: 376, txt: "Новий ізраїльський шекель", cc: "ILS"},
    {r030: 392, txt: "Єна", cc: "JPY"},
    {r030: 398, txt: "Теньге", cc: "KZT"},
    {r030: 410, txt: "Вона", cc: "KRW"},
    {r030: 484, txt: "Мексіканський песо", cc: "MXN"},
    {r030: 498, txt: "Молдовський лей", cc: "MDL"},
    {r030: 554, txt: "Новозеландський долар", cc: "NZD"},
    {r030: 578, txt: "Норвезька крона", cc: "NOK"},
    {r030: 643, txt: "Російський рубль", cc: "RUB"},
    {r030: 682, txt: "Саудівський рiял", cc: "SAR"},
    {r030: 702, txt: "Сінгапурський долар", cc: "SGD"},
    {r030: 710, txt: "Ренд7", cc: "ZAR"},
    {r030: 752, txt: "Шведська крона", cc: "SEK"},
    {r030: 756, txt: "Швейцарський франк", cc: "CHF"},
    {r030: 818, txt: "Єгипетський фунт", cc: "EGP"},
    {r030: 826, txt: "Фунт стерлінгів", cc: "GBP"},
    {r030: 840, txt: "Долар США", cc: "USD"},
    {r030: 933, txt: "Бiлоруський рубль", cc: "BYN"},
    {r030: 944, txt: "Азербайджанський манат", cc: "AZN"},
    {r030: 946, txt: "Румунський лей", cc: "RON"},
    {r030: 949, txt: "Турецька ліра", cc: "TRY"},
    {r030: 960, txt: "СПЗ(спеціальні права запозичення)", cc: "XDR"},
    {r030: 975, txt: "Болгарський лев", cc: "BGN"},
    {r030: 978, txt: "Євро", cc: "EUR"},
    {r030: 985, txt: "Злотий", cc: "PLN"},
    {r030: 12, txt: "Алжирський динар", cc: "DZD"},
    {r030: 50, txt: "Така", cc: "BDT"},
    {r030: 51, txt: "Вiрменський драм", cc: "AMD"},
    {r030: 368, txt: "Іракський динар", cc: "IQD"},
    {r030: 417, txt: "Сом", cc: "KGS"},
    {r030: 422, txt: "Ліванський фунт", cc: "LBP"},
    {r030: 434, txt: "Лівійський динар", cc: "LYD"},
    {r030: 458, txt: "Малайзійський ринггіт", cc: "MYR"},
    {r030: 504, txt: "Марокканський дирхам", cc: "MAD"},
    {r030: 586, txt: "Пакистанська рупія", cc: "PKR"},
    {r030: 704, txt: "Донг", cc: "VND"},
    {r030: 764, txt: "Бат", cc: "THB"},
    {r030: 784, txt: "Дирхам ОАЕ", cc: "AED"},
    {r030: 788, txt: "Туніський динар", cc: "TND"},
    {r030: 860, txt: "Узбецький сум", cc: "UZS"},
    {r030: 901, txt: "Новий тайванський долар", cc: "TWD"},
    {r030: 934, txt: "Туркменський новий манат", cc: "TMT"},
    {r030: 936, txt: "Ганських седі", cc: "GHS"},
    {r030: 941, txt: "Сербський динар", cc: "RSD"},
    {r030: 972, txt: "Сомонi", cc: "TJS"},
    {r030: 981, txt: "Ларi", cc: "GEL"},
    {r030: 959, txt: "Золото", cc: "XAU"},
    {r030: 961, txt: "Срiбло", cc: "XAG"},
    {r030: 962, txt: "Платина", cc: "XPT"},
    {r030: 964, txt: "Паладiй", cc: "XPD"}];

  displayCur:string = "";
  inputSearch:string = "";
  shouldShowCancel:any = true;
  constructor(private apinbuProvider: ApinbuProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage) {
    this.allCurryncy = this.allCurryncyDef;
    this.storage.get('DISPLAY_CURRENCY').then((val) => {
      if (!!val) {
        this.displayCur = val;
      }
      else {
        this.displayCur = apinbuProvider.displayCur;
        this.storage.set("DISPLAY_CURRENCY", apinbuProvider.displayCur);
      }
      this.getListCurs();
    });
  }
  /*ionViewWillLoad() {
    this.allCurryncy = this.allCurryncyDef;
    this.storage.get('DISPLAY_CURRENCY').then((val) => {
      if (!!val) {
        this.displayCur = val;
      }
      else {
        this.displayCur = this.apinbuProvider.displayCur;
        this.storage.set("DISPLAY_CURRENCY", this.apinbuProvider.displayCur);
      }
      this.getListCurs();
    });
  }*/
  getListCurs() {
    let ysterday: string = "";
    let dt:Date = new Date();
    dt.setDate(dt.getDate()-1);
    ysterday = dt.getFullYear().toString()
    ysterday += dt.getMonth()>9?(dt.getMonth()+1).toString():"0"+(dt.getMonth()+1).toString();
    ysterday += dt.getDay()>9?dt.getDate().toString():0+dt.getDate().toString();

    this.apinbuProvider.runRequestGet({method: 'exchange',
      request: '?date='+ysterday+'&json',
      spinner: true})
      .subscribe(res => {
        if (!!res) {
          this.allCurryncyDef = res;
        }
        this.checkItem();
      }, error => {
        console.log(">>>BEDA!!!",error);
        this.checkItem();
      });
  }

  checkItem() {
    for (let i in this.allCurryncyDef) {
      if (this.displayCur.indexOf(";"+this.allCurryncyDef[i].cc+";") > -1) {
        this.allCurryncyDef[i].check = true;
        console.log(">>>allCurryncyDef[i].check",this.allCurryncyDef[i].cc);
      }
    }
    this.allCurryncy = this.allCurryncyDef;
  }
  clickItem(indx) {
    if (!!this.allCurryncyDef[indx].check){
      if(this.allCurryncyDef[indx].check){
        this.displayCur = this.displayCur.substr(0,this.displayCur.indexOf(this.allCurryncyDef[indx].cc))+this.displayCur.substr(this.displayCur.indexOf(this.allCurryncyDef[indx].cc)+this.allCurryncyDef[indx].cc.length+1,1000000);
      }
      else {

      }
      this.allCurryncyDef[indx].check = !this.allCurryncyDef[indx].check;
    }
    else {
      this.allCurryncyDef[indx].check = true;
      this.displayCur += this.allCurryncyDef[indx].cc+";"
    }
    this.storage.set("DISPLAY_CURRENCY", this.displayCur);
    this.apinbuProvider.displayCur = this.displayCur;
  }

  onInput(event) {
    let CurryncyList:any = [];
    //let tmp1:string = "";
    let tmp2:string = this.inputSearch.toUpperCase();

    for (let i in this.allCurryncyDef){
      //tmp1 = this.allCurryncyDef[i].cc.toUpperCase();
      if(!!this.allCurryncyDef[i].cc && this.allCurryncyDef[i].cc.toUpperCase().indexOf(tmp2) > -1) {
        CurryncyList.push(this.allCurryncyDef[i]);
      }
    }
    this.allCurryncy = CurryncyList;
  }
  onCancel(event) {
    console.log(">>>onCancel",event);
    this.allCurryncy = this.allCurryncyDef;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCurrencyPage');
  }

}
