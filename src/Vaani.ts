import DB from "./data/DB.json";

class Vaani {
  public path: string = ""; //for WebBrowser convenience
  public peyar: string = "MLTYWNEIQOGDHVXBPSളവ";
  public speyar: string = "CAJ"; //C is special permit without 15
  public venai: string = "ஆலனசளணஇழஉஓடதदधபநमயரறवउपकतईटरलळएचज";
  public nonderi: string = "Z"; //JRJR spare
  public deri: string; //it doesn't recognize peyar as string, so using constructor we have concated the string

  private Oword: any;
  private Eword: any;
  private tranrule: any;
  private tword: any;
  private gword: any;
  private vauyir: any;
  private yauyir: any;
  private auyir: any;
  private userOword: string[];
  private usergword: string[];
  //To cache the words and suggestion till the software closed
  private cacheword: Array<string> = new Array<string>(); //HashSet is not used since cachesug has duplicate
  private cachesug: Array<string> = new Array<string>();

  /**
   * Constructor
   */
  public constructor() {
    this.deri = this.peyar + this.speyar + this.venai + "FUKഡഗജദപ";
  }

  /**
   * 
   * @param nword word that needs to be added to the cache
   */
  public refreshCache(nword: string): void {
      //to add cache data programatically when user needs
      let found:number = this.cacheword.indexOf(nword);
      if (found !== -1) {
        this.cachesug[found] = 'correct'
      }
  }

  /**
   * check the word with existing root words
   * 
   * @param tword input word
   */
  public checkroot(tword: string): any {  //morphgen
      let outp: string[] = "tword,".split(",");
      this.Oword = DB["DB"][4];  // words
      this.Eword = DB["DB"][3];//family
      let rule: any = JSON.parse("{\"M\":\"ம்\",\"L\":\"ு\",\"T\":\"ு\",\"Y\":\"\",\"W\":\"\",\"N\":\"\",\"E\":\"\",\"I\":\"ல்\",\"Q\":\"ள்\",\"ള\":\"ள்\",\"O\":\"்\",\"P\":\"்\",\"S\":\"்\",\"V\":\"ு\",\"വ\":\"ு\",\"ഗ\":\"\",\"ഡ\":\"\",\"ജ\":\"\",\"ദ\":\"\",\"പ\":\"\",\"B\":\"ை\",\"G\":\"ர்\",\"D\":\"ர்\",\"X\":\"ர்\",\"H\":\"ர்\",\"ஆ\":\"தல்\",\"ல\":\"ல்தல்\",\"ன\":\"ல்தல்\",\"ச\":\"்லுதல் \",\"ள\":\"ள்தல்\",\"ண\":\"ள்ளுதல்\",\"இ\":\"ுதல்\",\"ழ\":\"ுதல்\",\"உ\":\"தல்\",\"ஓ\":\"தல்\",\"ட\":\"ுதல்\",\"த\":\"த்தல்\",\"द\":\"த்தல்\",\"ध\":\"த்தல்\",\"ப\":\"்த்தல்\",\"ந\":\"த்தல்\",\"म\":\"த்தல்\",\"ய\":\"தல்\",\"ர\":\"்தல்\",\"ற\":\"ுதல்\",\"व\":\"ாதல்\",\"उ\":\"ணுதல்\",\"प\":\"்ணுதல்\",\"क\":\"ாண்ணுதல்\",\"त\":\"னுதல்\",\"ई\":\"்னுதல்\",\"ट\":\"ள்தல்\",\"र\":\"ல்தல்\",\"ल\":\"ல்தல்\",\"ळ\":\"ுதல்\",\"ए\":\"றுதல்\",\"च\":\"தல் \",\"ज\":\"ேகுதல்\"}");

      for (let a:number = tword.length; a > 0; a--)
      {
        //It cuts from end. end is best since small word has many derivation like ഊ
        //for(int a=1;a<=sol.length;a++){//it cuts from starting
          let paku:string = tword.substr(0, a);
          let viku:string = tword.substr(a);//,sol.length
          let qcode:any = this.Oword[paku];
          if ((qcode != null) && (qcode.length > 0)){
            qcode.forEach(b => {
              if (b.s != null) return false;//to save time for foreign words and misspelled words
              let code = String(b.t).substring(0, 1);
              let subcode = String(b.t).substring(1);
              let vikuthi = this.getviku(viku, code, subcode);
              if (vikuthi != "false") {
                 outp[0] = paku + rule[code];
                 outp[1] = " " + this.tranlate(vikuthi);
                 return outp; 
              }
            });
          }
      }
      return outp;
  }


  /**
   * Give Suffix Words
   * 
   * @param v Vikuthi
   * @param c Code
   * @param sc Sub Code
   */
  public getviku(v:string, c:string, sc:string): string { //used for dictionary
    let blocks:string = "";
    switch (sc) {
      case "15": blocks = "01234567"; break;
      case "25": blocks = "0123456"; break;
      case "07":
        blocks = "012345"; break;
      case "10"://
        blocks = "01235"; break;
      case "11"://except special 
        blocks = "012356"; break;
      case "09":
        blocks = "02"; break;
      case "06":
        blocks = "023"; break;
      case "05":
        blocks = "013"; break;
      case "04":
        blocks = "03"; break;
      case "03":
        blocks = "13"; break;
      case "02":
        blocks = "2"; break;
      case "01":
        blocks = "1"; break;
      case "16":
        blocks = "3"; break;
      case "17"://special
        blocks = "0"; break;
      case "08"://Peyar speical extension அநவரத  venai present echam சுவைப்பட,நாள்பட 
        blocks = "4"; break;
      case "18"://special  -> 08 also takes 4 segment
        blocks = "4"; break;
      case "19"://special
        blocks = "5"; break;
      case "20"://special
        blocks = "6"; break;
      case "21"://special
        blocks = "7"; break;
      case "24"://echam verb is using
        blocks = "34"; break;
    }
    
    for (let d = 0; d < 8; d++) {
      if (blocks.indexOf(String(d)) === -1) continue;  //it will ignore the blocks which are not related
      //Logger.log(Eword[c][d][v]);
      //if(Eword[c][d][v]!=null){return Eword[c][d][v];}
      for (var b = v.length; b > -1; b--) {
        let subpaku = v.substring(0, b);
        let subviku = v.substring(b);
        //Logger.log(subpaku +" " +subviku + " c="+ c+ " d="+ d);
        //if (subpaku == "") subpaku = "0";//since no need for c#
        try {
          let part = String(this.Eword[c][d][subpaku]);
          if (part != null) {
            //if derivative then go further else return as true
            if ((part.indexOf("①") != -1) || (part.indexOf("②") != -1))
            {
              let code1 = part.substring(part.length - 3, 1);
              let subcode1 = part.substring(part.length - 2);
              let vikuth:string = this.getviku(subviku, code1, subcode1);

              if (vikuth != "false") {
                return vikuth; 
              }
            } else if (subviku == "") {
              return part;
            }
          }
        } catch { }
        //Logger.log(subviku+ " " + code +"  subviku="+ subcode);
      }
    }//end of d
    return "false";
  }

  /**
   * get case names if case names are applicable
   * 
   * @param code 
   */
  public tranlate(code:string): string {
    let translation: any = JSON.parse("{\"㚱\":\"நான்காம் வேற்றுமை(கு)\",\"㚲\":\"இரண்டாம் வேற்றுமை(ஐ)\",\"㚳\":\"வேற்றுமை உருபு(இன்)\",\"㚵\":\"மூன்றாம் வேற்றுமை(உடன்)\",\"㚶\":\"மூன்றாம் வேற்றுமை(ஓடு)\",\"㚷\":\"மூன்றாம் வேற்றுமை(ஆல்)\",\"㚸\":\"வேற்றுமை உருபு(இல்)\",\"㚹\":\"ஏழாம் வேற்றுமை(இடம்)\",\"㚺\":\"ஆறாம் வேற்றுமை\"}");
    for(let i in translation) {
      let d = i.toString();
      if (code.indexOf(d) !== -1)
      {
        return "+ " + translation[i].toString();
      }//,sw.Length-1
    }
    return "";
  }
}
