import { Calendars as Calendar, Day } from '../model/calander'

export class SearchTheCalendarService {
    private townCalendar: Calendar.Town
    private targetDate: string
    private weekCount: string
    /**
     * @param townCalendar
     * @param targetDate- 曜日（月曜・火曜など）
     * @param weekCount - カウント (漢数字１文字。一・二など)
     */
    public constructor (townCalendar: Calendar.Town, targetDate: string, weekCount: string) {
        this.townCalendar = townCalendar
        this.targetDate = targetDate
        this.weekCount = weekCount
    }
    /**
     * 回収日かどうかを確認する
     *
     * @return {bool} 回収日ならtrue
     */
    public isTargetDate (listDay: string): boolean {
        const result = listDay.match(new RegExp(`${this.targetDate}$`))
        if (!result || result.length < 1) return false
        if (/^毎週/.test(listDay)) return true
        const result2 = listDay.match(new RegExp(`^第${this.weekCount}`))
        if (!result2 || result2.length < 1) return false
        return true
    }
    public search (): Day.Search.Item[] {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const garbageLists: any = []
        Object.keys(this.townCalendar).forEach((key): void => {
            const result = this.townCalendar[key].find((listDay): boolean => this.isTargetDate(listDay))
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
