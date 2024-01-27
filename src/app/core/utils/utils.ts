import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Utils{


  /**
   * utils.ts
   * @author Epsom Segura
   *
   */

  //#region MISC UTILS
  objectComparisonFunction = function (option, value): boolean {
    if (value != null)
      return option.id === value.id;
  }
  //#endregion MISC UTILS
  
  
  
  //#region DATE/DATETIME UTILS
  /**
   * DATE/DATETIME UTILS
   *
   * Get datetime slice elements
   * @param dateToBeSplited (Date) Date to be splited
   * @returns slicedDate (Object): {year: 'YYYY', month:'MM', day: 'DD', hour:'HH', minute: 'mm', second: 'ss'};
   */
  getSplitedDatetimeElements(dateToBeSplited: Date): any{
    return {
      year: dateToBeSplited.getFullYear(),
      month: ((dateToBeSplited.getMonth()+1)<10) ? ("0"+(dateToBeSplited.getMonth()+1)) : (dateToBeSplited.getMonth()+1),
      day: ((dateToBeSplited.getDate())<10) ? ("0"+(dateToBeSplited.getDate())) : (dateToBeSplited.getDate()),
      hour: (dateToBeSplited.getHours() < 10) ? ("0"+dateToBeSplited.getHours()) : dateToBeSplited.getHours(),
      minute: (dateToBeSplited.getMinutes() < 10) ? ("0"+dateToBeSplited.getMinutes()) : dateToBeSplited.getMinutes(),
      second: (dateToBeSplited.getSeconds() < 10) ? ("0"+dateToBeSplited.getSeconds()) : dateToBeSplited.getSeconds()
    };
  }
  /**
   * DATE/DATETIME UTILS
   *
   * Get date slice elements
   * @param dateToBeSplited (String) Date to be splited in YYYY-MM-DD ISO 8601 format
   * @returns slicedDate (Object): {year: 'YYYY', month:'MM', day: 'DD'};
   */
  getSplitedYYYYMMDDElements(dateToBeSplited: string):any{
    let splitedDate = dateToBeSplited.split('-');
    return {
      year: splitedDate[0],
      month: splitedDate[1],
      day: splitedDate[2]
    };
  }
  /**
   * DATE/DATETIME UTILS
   *
   * Get date slice elements
   * @param dateToBeSplited (String) Date to be splited in DD/MM/YYYY ISO 8601 format
   * @returns slicedDate (Object): {year: 'YYYY', month:'MM', day: 'DD'};
   */
   getSplitedDDMMYYYYElements(dateToBeSplited: string):any{
    let splitedDate = dateToBeSplited.split('/');
    return {
      year: splitedDate[2],
      month: splitedDate[1],
      day: splitedDate[0]
    };
  }
  /**
   * DATE/DATETIME UTILS
   *
   * Get time slice elements
   * @param timeToBeSplited (String) Date to be splited in DD/MM/YYYY ISO 8601 format
   * @returns slicedTime (Object): {year: 'YYYY', month:'MM', day: 'DD'};
   */
   getSplitedHHiimmElements(timeToBeSplited: string):any{
    let splitedDate = timeToBeSplited.split(':');
    return {
      hour: (parseInt(splitedDate[0]) < 10 ? "0"+splitedDate[0] : splitedDate[0]),
      minute: (parseInt(splitedDate[1]) < 10 ? "0"+splitedDate[1] : splitedDate[1]),
      second: (parseInt(splitedDate[2]) < 10 ? "0"+splitedDate[2] : splitedDate[2]),
    };
  }
  /**
   * DATE/DATETIME UTILS
   *
   * Parse YYYY-MM-DD (ISO 8601) String to Date
   * @param dateToBeParsed  (String) Date to be parsed in YYYY-MM-DD ISO 8601 format
   * @returns (Date) Date parsed
   */
  parseYYYYMMDD_ISO8601ToDate(dateToBeParsed: string): Date{
    let slicedDate: any = this.getSplitedYYYYMMDDElements(dateToBeParsed);
    return new Date(parseInt(slicedDate.year),(parseInt(slicedDate.month)-1),parseInt(slicedDate.day),0,0,0);
  }
  /**
   * DATE/DATETIME UTILS
   *
   * Parse Date to YYYY-MM-DD (ISO 8601) String
   * @param dateToBeParsed  (Date) Date to be parsed
   * @returns (String) YYYY-MM-DD ISO 8601 format
   */
   parseDateToYYYYMMDD_ISO8601(dateToBeParsed: Date): string{
    let slicedDate: any = this.getSplitedDatetimeElements(dateToBeParsed);
    return slicedDate.year+"-"+slicedDate.month+"-"+slicedDate.day;
  }
  /**
   * DATE/DATETIME UTILS
   *
   * Parse Date to YYYY-MM-DD HH:mm:ss (ISO 8601) String
   * @param dateToBeParsed  (String) Date to be parsed in YYYY-MM-DD HH:ii:ss ISO 8601 format
   * @returns (Date) Date parsed
   */
   parseYYYYMMDDHHiiss_ISO8601ToDate(datetimeToBeParsed: string): Date{
    let
      splitDatetime: any = datetimeToBeParsed.split(' '),
      slicedDate: any = this.getSplitedYYYYMMDDElements(splitDatetime[0]),
      slicedTime: any = this.getSplitedHHiimmElements(splitDatetime[1]);

      return new Date(parseInt(slicedDate.year),(parseInt(slicedDate.month)-1),parseInt(slicedDate.day),parseInt(slicedTime.hour),parseInt(slicedTime.minute),parseInt(slicedTime.second));
  }
  /**
   * DATE/DATETIME UTILS
   *
   * Parse Date to YYYY-MM-DD HH:mm:ss (ISO 8601) String
   * @param dateToBeParsed  (Date) Date to be parsed
   * @returns (String) YYYY-MM-DD HH:ii:ss
   */
   parseDateToYYYYMMDDHHiiss_ISO8601(dateToBeParsed: Date): string{
    let slicedDate: any = this.getSplitedDatetimeElements(dateToBeParsed);
    console.log( slicedDate );
    return slicedDate.year+"-"+slicedDate.month+"-"+slicedDate.day+" "+slicedDate.hour+":"+slicedDate.minute+":"+slicedDate.second;
  }
  /**
   * * DATE/DATETIME UTILS
   *
   * Parse DD/MM/YYYY (ISO 8601) String to Date
   * @param dateToBeParsed  (String) Date to be parsed in YYYY-MM-DD ISO 8601 format
   * @returns (Date) Date parsed
   */
   parseDDMMYYYY_ISO8601ToDate(dateToBeParsed: string): Date{
    let slicedDate: any = this.getSplitedDDMMYYYYElements(dateToBeParsed);
    return new Date(parseInt(slicedDate.year),(parseInt(slicedDate.month)-1),parseInt(slicedDate.day),0,0,0);
  }
  /**
   * DATE/DATETIME UTILS
   *
   * Parse Date to DD/MM/YYYY (ISO 8601) String
   * @param dateToBeParsed  (Date) Date to be parsed
   * @returns (String) DD/MM/YYYY
   */
  parseDateToDDMMYYYY_ISO8601(dateToBeParsed: Date): string{
    let slicedDate: any = this.getSplitedDatetimeElements(dateToBeParsed);
    return slicedDate.day+"/"+slicedDate.month+"/"+slicedDate.year;
  }
  /**
   * DATE/DATETIME UTILS
   *
   * Parse DD/MM/YYYY HH:mm:ss (ISO 8601) String to Date
   * @param dateToBeParsed  (String) Date to be parsed in YYYY-MM-DD HH:ii:ss ISO 8601 format
   * @returns (Date) Date parsed
   */
   parseDDMMYYYYHHiiss_ISO8601ToDate(datetimeToBeParsed: string): Date{
    let
      splitDatetime: any = datetimeToBeParsed.split(' '),
      slicedDate: any = this.getSplitedDDMMYYYYElements(splitDatetime[0]),
      slicedTime: any = this.getSplitedHHiimmElements(splitDatetime[1]);

      return new Date(parseInt(slicedDate.year),(parseInt(slicedDate.month)-1),parseInt(slicedDate.day),parseInt(slicedTime.hour),parseInt(slicedTime.minute),parseInt(slicedTime.second));
  }
  /**
   * DATE/DATETIME UTILS
   *
   * Parse Date to DD/MM/YYYY HH:mm:ss (ISO 8601) String
   * @param dateToBeParsed  (Date) Date to be parsed
   * @returns (String) DD/MM/YYYY HH:ii:ss
   */
   parseDateToDDMMYYYYHHiiss_ISO8601(dateToBeParsed: Date): string{
    let slicedDate: any = this.getSplitedDatetimeElements(dateToBeParsed);
    console.log( slicedDate );
    return slicedDate.day+"/"+slicedDate.month+"/"+slicedDate.year+" "+slicedDate.hour+":"+slicedDate.minute+":"+slicedDate.second;
  }
  /**
   * DATE/DATETIME UTILS
   *
   * Parse Date to datetime-locale String
   * @param dateToBeParsed  (Date) Date to be parsed
   * @returns (String) YYYY-MM-DD HH:ii:ss
   */
   parseDateToDatetimeLocale(dateToBeParsed: Date): string{
    let slicedDate: any = this.getSplitedDatetimeElements(dateToBeParsed);
    return slicedDate.year+"-"+slicedDate.month+"-"+slicedDate.day+"T"+slicedDate.hour+":"+slicedDate.minute+":"+slicedDate.second;
  }
  //#endregion DATE/DATETIME UTILS


  //#region FullCalendar dates manage
  
  //#endregion FullCalendar dates manage
}
