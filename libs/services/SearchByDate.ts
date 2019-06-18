// model
import { Calendars as Calendar, Day } from '../model/calander'

// service
import SearchTheCalendarService from './SearchTheCalendar'
import GarbageDay from '../entities/Date'
/**
 * @example
 * const calendar = new GarbageCalendar(garbageCalendar, '西宮市')
 * const service = new SearchByDateService(calendar)
 * service.searchByDate('神垣町', new Date('2018/12/25'), new Date('2018/12/24'))
 * {
 *   "found": true,
 *   "garbageList": [
 *       {
 *           "date": [
 *               "毎週火曜"
 *           ],
 *           "item": "その他プラ"
 *       }
 *   ],
 *   "isTomorrow": false,
 *   "nextAction": "putReminder",
 *   "targetDate": {
 *       "day": "25",
 *       "month": "12",
 *       "year": "2018"
 *   }
 * }
 */
export class SearchByDateService {
    private Calendar: Calendar.CalendarClass
    public constructor (
        Calendar: Calendar.CalendarClass
    ) {
        this.Calendar = Calendar
    }
    public getTargetDate (target: Date, now: Date | ''): {
        isTomorrow: boolean;
        targetDay: GarbageDay;
    } {
        const targetDay = new GarbageDay(target)
        const currentDay = now ? new GarbageDay(now) : new GarbageDay()

        // 今日を調べているのでなければそのまま返す
        if (targetDay.getFormattedDate('MM/DD') !== currentDay.getFormattedDate('MM/DD')) {
            return {
                isTomorrow: false,
                targetDay
            }
        }
        // 今日午前7時を境に明日のデータを話す
        const isTomorrow = Number(currentDay.getFormattedDate('HH')) > 8
        if (isTomorrow) targetDay.addDate(1)
        return {
            isTomorrow,
            targetDay
        }
    }

    public searchByDate (townName: string, target: Date, now: Date | '' = ''): Day.MatchedGarbage | Day.NotFound {
        // カレンダーから対応する町を取得する
        const garbage: Calendar.Town = this.Calendar.getByTownName(townName)
        if (Object.keys(garbage).length < 1) {
            // サポートしてない街の場合
            throw new Error(`unsupported town: ${townName}`)
        }
        // 調べる対象の日を調べる
        const { targetDay, isTomorrow } = this.getTargetDate(target, now)
        const targetDate: string = targetDay.getWeekDayString()
        const weekCount: string = targetDay.getTargetDayCountString()
        // その町の回収日を取得する
        const searchService = new SearchTheCalendarService(garbage, targetDate, weekCount)
        const result = searchService.search()
        if (result.length < 1) {
            // 該当するものがない場合
            return {
                found: false,
                nextAction: 'searchOtherDay'
            }
        }
        // 返す
        return {
            found: true,
            garbageList: result,
            isTomorrow,
            nextAction: 'putReminder',
            targetDate: targetDay.getWeekDayQuery()
        }
    }
}

export default SearchByDateService
