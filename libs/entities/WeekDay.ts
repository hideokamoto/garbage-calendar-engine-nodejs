import GarbageDay from './Date'
import { Week } from '../model/week'

export class WeekDay {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private Day: any
    private month!: Week.Month
    private year!: string
    private today!: string
    public constructor (month: Week.Month | '' = '', year: string = '', today: string = '', Day = GarbageDay) {
        this.Day = Day
        this.setInitialProps(year, month, today)
    }
    private setInitialProps (year: string, month: Week.Month | '', today: string): void {
        if (year) this.year = year
        if (month) this.month = month
        if (today) this.today = today
        if (year && month && today) return
        const d = new this.Day()
        if (!year) this.year = d.getFormattedDate('YYYY')
        if (!month) this.month = d.getFormattedDate('MM')
        if (!today) this.today = d.getFormattedDate('DD')
    }
    public convertWeekDayToNumber (weekDay: Week.Weekday): Week.DayNumber {
        switch (weekDay) {
            case '月曜':
                return 1
            case '火曜':
                return 2
            case '水曜':
                return 3
            case '木曜':
                return 4
            case '金曜':
                return 5
            case '土曜':
                return 6
            case '日曜':
                return 7
            default:
                throw new Error('Invalid week day')
        }
    }
    public convertWeekNumber (weekNumberString: string): Week.Weeknumber {
        switch (weekNumberString) {
            case '第一':
                return 1
            case '第二':
                return 2
            case '第三':
                return 3
            case '第四':
                return 4
            case '第五':
                return 5
            case '第六':
                return 6
            default:
                throw new Error('Invalid week number string')
        }
    }
    public calcWeekNumberDiff (todayWeekNumber: Week.Weeknumber, weekNumberString: string): number {
        if (weekNumberString === '毎週') return 1
        const weekNum = this.convertWeekNumber(weekNumberString)
        return weekNum - todayWeekNumber
    }
    public getTheFirstWeekDay (firstDay: number, weekDayNumber: Week.DayNumber): number {
        const day = weekDayNumber - firstDay + 1
        if (day <= 0) return day + 7
        return day
    }
    public calcDayNumber (weekNumber: Week.Weeknumber, weekDayNumber: Week.DayNumber): string {
        const date = new Date(`${this.year}/${this.month}/1`)
        const firstDay = date.getDay()
        const firstWeekDay = this.getTheFirstWeekDay(firstDay, weekDayNumber)
        const additionalDate = 7 * (weekNumber - 1)
        return String(firstWeekDay + additionalDate)
    }
    public getTheDay (weekNumber: Week.Weeknumber, weekDay: Week.Weekday): Week.Search.Result {
        const weekDayNumber = this.convertWeekDayToNumber(weekDay)
        const day = this.calcDayNumber(weekNumber, weekDayNumber)
        const d = new this.Day(new Date(`${this.year}/${this.month}/${day}`))
        if (d.isValid()) return d.getWeekDayQuery()
        throw new Error('Invalid date')
    }
    private getDayObject (yyyymmdd: string = ''): GarbageDay {
        if (!yyyymmdd) return new this.Day(new Date())
        return new this.Day(new Date(yyyymmdd))
    }
    public searchTheWeekDay (dayStrings: string[]): Week.Search.Result | '' {
        const today = this.getDayObject(`${this.year}/${this.month}/${this.today}`)
        console.log(today)
        // weekNumberを取得する
        const todayWeekNumber = today.getDayCount()
        // weekNumberとdayStringの週の差分を見る
        const upcomingDays = dayStrings.filter((dayString): boolean => {
            const weekNumberString = dayString.substr(0, 2)
            // 当日の判定が辛いので、原則翌日以降だけみることにする
            return this.calcWeekNumberDiff(todayWeekNumber as Week.Weeknumber, weekNumberString) > 0
        })
        // 差分がマイナスなら「今月の回収は終了した」と判断
        console.log(upcomingDays)
        if (upcomingDays.length < 1) return ''
        let nextDate: Week.Search.Result | '' = ''
        upcomingDays.some((dayString): boolean => {
            const weekNumberString = dayString.substr(0, 2)
            const weekDayString = dayString.substr(2)
            const weekNumber = weekNumberString !== '毎週' ? this.convertWeekNumber(weekNumberString) : todayWeekNumber
            try {
                const day = this.getTheDay(weekNumber as Week.Weeknumber, weekDayString as Week.Weekday)
                const targetObj = this.getDayObject(`${day.year}/${day.month}/${day.day}`).getMoment()
                const todayObj = this.getDayObject(`${this.year}/${this.month}/${this.today}`).getMoment()
                if (targetObj.diff(todayObj, 'days') < 1) return false
                nextDate = day
                return true
            } catch (e) {
                return false
            }
        })
        return nextDate
    }
}

export default WeekDay
