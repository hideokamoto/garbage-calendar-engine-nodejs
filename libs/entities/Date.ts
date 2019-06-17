import moment from 'moment'
import { Week } from '../model/week'
// import 'moment/locale/ja';
/**
 * Dateオブジェクトから、諸々の情報を取得する
 *
 * @example
 * const c = new Day()
 * c.getWeekDay()
 * '26'
 * c.getWeekDay()
 * 'Tuesday'
 * c.getDayCount()
 * 4
 */
export class GarbageDay {
    private dayObj: moment.Moment
    /**
     * Constructor
     *
     * @param {Date} [date=new Date()] date objects
     */
    public constructor (date = new Date()) {
        this.dayObj = moment(date)
    }
    public addDate (dateNumber: number, format: 'days' = 'days'): void {
        this.dayObj.add(dateNumber, format)
    }

    /**
     * Get moment object
     */
    public getMoment (): moment.Moment {
        return this.dayObj
    }
    public isValid (): boolean {
        return this.dayObj.isValid()
    }
    /**
     * Get formated date
     * @param {string} [format='DD'] date format
     * @return {string} date string
     * @example
     * c.getWeekDay()
     * '26'
     */
    public getFormattedDate (format: string = 'DD'): string {
        return this.dayObj.format(format)
    }
    /**
     * Get weekday
     *
     * @return {string} date string
     * @example
     * c.getWeekDay()
     * 'Tuesday'
     */
    public getWeekDay (): string {
        return this.dayObj.format('dddd')
    }

    /**
     * Get query item for WeekDay object
     * @return {Week.Search.Result}
     */
    public getWeekDayQuery (): Week.Search.Result {
        const item = {
            year: this.getFormattedDate('YYYY'),
            month: this.getFormattedDate('MM'),
            day: this.getFormattedDate('DD')
        }
        return item as Week.Search.Result
    }

    /**
     * Get date number
     *
     * @return {number} date number
     * @example
     * c.getDayCount()
     * 4
     */
    public getDayCount (): number {
        const day = this.dayObj.toDate()
        return Math.floor((day.getDate() - 1) / 7) + 1
    }
    /**
     * 何回目の曜日かを漢数字で取得する
     *
     * @return {string} 第四日曜日なら四をかえす
     */
    public getTargetDayCountString (): string {
        switch (this.getDayCount()) {
            case 1:
                return '一'
            case 2:
                return '二'
            case 3:
                return '三'
            case 4:
                return '四'
            case 5:
                return '五'
            case 6:
                return '六'
            default:
                throw new Error('Unsupported number')
        }
    }
    /**
     * Get day string in English
     *
     * @param {string} [lang='ja'] - languages
     * @return {string} - Day string in English
     * @throws {Error} - If unmatched day string, throws Error object
     **/
    public getWeekDayString (lang: 'ja' | 'en' = 'ja'): string {
        switch (this.getWeekDay()) {
            case 'Monday':
            case '月':
            case '月曜':
            case '月曜日':
                return lang === 'en' ? 'Monday' : '月曜'
            case 'Tuesday':
            case '火':
            case '火曜':
            case '火曜日':
                return lang === 'en' ? 'Tuesday' : '火曜'
            case 'Wednesday':
            case '水':
            case '水曜':
            case '水曜日':
                return lang === 'en' ? 'Wednesday' : '水曜'
            case 'Thursday':
            case '木':
            case '木曜':
            case '木曜日':
                return lang === 'en' ? 'Thursday' : '木曜'
            case 'Friday':
            case '金':
            case '金曜':
            case '金曜日':
                return lang === 'en' ? 'Friday' : '金曜'
            case 'Saturday':
            case '土':
            case '土曜':
            case '土曜日':
                return lang === 'en' ? 'Saturday' : '土曜'
            case 'Sunday':
            case '日':
            case '日曜':
            case '日曜日':
                return lang === 'en' ? 'Sunday' : '日曜'
            default:
                throw new Error('Invalid date')
        }
    }
}
export default GarbageDay
