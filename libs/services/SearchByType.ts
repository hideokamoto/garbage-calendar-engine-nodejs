// model
import {calendar, garbage} from '../model/calander'

import GarbageDay from '../entities/Date';
import WeekDay from '../entities/WeekDay';

/**
 * @example
 * const service = new SearchByTypeService(calendar)
 * const result = service.searchByTownName('神垣町', 'もやすごみ', new Date('2018/12/23'))
 * {
 *     dateList: ['毎週月曜', '毎週木曜'],
 *     found: true,
 *     nextAction: 'putReminder',
 *     nextDate: {
 *         year: "2018",
 *         month: "12",
 *         day: '24'
 *     }
 * }
 */
export class SearchByTypeService {
    private Calendar: calendar.calendarClass
    constructor (Calendar: calendar.calendarClass) {
        this.Calendar = Calendar
    }
    searchByTownName(townName: string, type: string, date: Date | '' = ''): garbage.matchedDate | garbage.notFound {
        const garbage = this.Calendar.getByTownName(townName)
        if (Object.keys(garbage).length < 1 || !garbage[type]) {
            // 対象のゴミが見つからなかったケース
            return {
                found: false,
                nextAction: 'searchOtherGarbage'
            }
        }
        const theDay = date ? new GarbageDay(date) :  new GarbageDay()
        const {year, day, month} = theDay.getWeekDayQuery()

        const dateList = garbage[type]
        const weekDay = new WeekDay(month, year, day)
        const nextDate = weekDay.searchTheWeekDay(dateList)
        if (!nextDate) {
            // 今月回収日がもうないケース
            return {
                found: true,
                dateList,
                nextDate: '',
                nextAction: 'searchOtherGarbage'
            }
        }
        return {
            found: true,
            dateList,
            nextDate,
            nextAction: 'putReminder'
        }
    }
}

export default SearchByTypeService
