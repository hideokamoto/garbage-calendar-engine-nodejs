import { Calendars as Calendar, Day } from '../model/calander'

export class SearchTheCalendarService {
    private townCalendar: Calendar.Town
    private targetDate: string
    private weekCount: number
    /**
     * @param townCalendar
     * @param targetDate- 曜日（月曜・火曜など）
     * @param weekCount - カウント (漢数字１文字。一・二など)
     */
    constructor (townCalendar: Calendar.Town, targetDate: string, weekCount: number) {
        this.townCalendar = townCalendar
        this.targetDate = targetDate
        this.weekCount = weekCount
    }
    /**
     * 回収日かどうかを確認する
     *
     * @return {bool} 回収日ならtrue
     */
    isTargetDate (listDay: string): boolean {
        const result = listDay.match(new RegExp(`${this.targetDate}$`))
        if (!result || result.length < 1) return false
        if (/^毎週/.test(listDay)) return true
        const result2 = listDay.match(new RegExp(`^第${this.weekCount}`))
        if (!result2 || result2.length < 1) return false
        return true
    }
    search (): Day.Search.Item[] {
        const garbageLists: any = []
        Object.keys(this.townCalendar).forEach(key => {
            const result = this.townCalendar[key].find(listDay => this.isTargetDate(listDay))
            if (result) {
                garbageLists.push({
                    item: key,
                    date: this.townCalendar[key]
                })
            }
        })
        return garbageLists
    }
}
export default SearchTheCalendarService
