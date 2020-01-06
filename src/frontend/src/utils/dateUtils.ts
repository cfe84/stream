import moment = require("moment");

const dateValidation = /^(\d{4})[- /](\d{1,2})[- /](\d{1,2})$/;

export class dateUtils {
  public static formatWritable = (date: any): string => {
    return (!!date) ? moment(date).format("YYYY-MM-DD HH:mm")
      : ""
  }

  public static formatReadableFull = (date: any): string => {
    return (!!date) ? moment(date).format("LLLL")
      : ""
  }

  public static formatReadable = (date: any): string => {
    if (!date) {
      return ""
    }
    const today = new Date();
    if (moment(today).diff(date, 'days') < 6) {
      return moment(date).format("dddd, h:mmA")
    } else if (date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
      return moment(date).format("dddd D, h:mmA");
    } else if (date.getFullYear() === today.getFullYear()) {
      return moment(date).format("MMMM DD, hA");
    } else {
      return moment(date).format("LLLL");
    }
  }

  public static parseDate = (str: string | null): Date | null =>
    (str === null || str === undefined || str === "")
      ? null
      : moment(str).toDate();

  public static isValidDate = (str: string): boolean => {
    return true;

  }

  public static timeSpan = (date: Date): string => {
    const dt = moment(date);
    return dt.fromNow();
  }

}