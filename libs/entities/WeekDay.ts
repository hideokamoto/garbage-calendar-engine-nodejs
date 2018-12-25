import GarbageDay from "./Date";
import {week} from "../model/week";

class WeekDay {
    private Day: any
    private month!: week.month
    private year!: string
    private today!: string
    constructor (month: week.month | '' = '', year: string = '', today: string = '', Day = GarbageDay) {
        this.Day = Day
        this.setInitialProps(year, month, today)
    }
    private setInitialProps (year: string, month: week.month | '', today: string) {
        if (year) this.year = year
        if (month) this.month = month
        if (today) this.today = today
        if (year && month && today) return
        const d = new this.Day()
        if (!year) this.year = d.getFormattedDate('YYYY')
        if (!month) this.month = d.getFormattedDate('MM')
        if (!today) this.today = d.getFormattedDate('DD')
    }
    convertWeekDayToNumber (weekDay: week.weekday): week.dayNumber {
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
    convertWeekNumber (weekNumberString: string): week.weeknumber {
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
    calcWeekNumberDiff(todayWeekNumber: week.weeknumber,weekNumberString: string): number {
        if (weekNumberString === '毎週') return 1
        const weekNum = this.convertWeekNumber(weekNumberString)
        return weekNum - todayWeekNumber
    }
    getTheFirstWeekDay (firstDay: number, weekDayNumber: week.dayNumber) {
        const day = weekDayNumber - firstDay + 1
        if (day <= 0) return day + 7
        return day
    }
    calcDayNumber(weekNumber: week.weeknumber, weekDayNumber: week.dayNumber) {
        const date = new Date(`${this.year}/${this.month}/1`)
        const firstDay = date.getDay()
        const firstWeekDay = this.getTheFirstWeekDay(firstDay, weekDayNumber)
        const additionalDate = 7 * (weekNumber - 1)
        return String(firstWeekDay + additionalDate)
    }
    getTheDay(weekNumber: week.weeknumber, weekDay: week.weekday): week.search.result {
        const weekDayNumber = this.convertWeekDayToNumber(weekDay)
        const day = this.calcDayNumber(weekNumber, weekDayNumber)
        const d = new this.Day(new Date(`${this.year}/${this.month}/${day}`))
        if (d.isValid()) return d.getWeekDayQuery()
        throw new Error('Invalid date')
    }
    getDayObject(yyyymmdd: string = '') {
        if (!yyyymmdd) return new this.Day(new Date())
        return new this.Day(new Date(yyyymmdd))
    }
    searchTheWeekDay(dayStrings: string[]): week.search.result | '' {
        const today = this.getDayObject(`${this.year}/${this.month}/${this.today}`)
        // weekNumberを取得する
        const todayWeekNumber = today.getDayCount()
        // weekNumberとdayStringの週の差分を見る
        const upcomingDays = dayStrings.filter(dayString => {
            const weekNumberString = dayString.substr(0, 2)
            // 当日の判定が辛いので、原則翌日以降だけみることにする
            return this.calcWeekNumberDiff(todayWeekNumber, weekNumberString) > 0
        })
        // 差分がマイナスなら「今月の回収は終了した」と判断
        if (upcomingDays.length < 1) return ''
        let nextDate: week.search.result | '' = ''
       upcomingDays.some(dayString => {
            const weekNumberString = dayString.substr(0, 2)
            const weekDayString = dayString.substr(2)
            const weekNumber = weekNumberString !== '毎週' ? this.convertWeekNumber(weekNumberString): todayWeekNumber
            try {
                const day = this.getTheDay(weekNumber, weekDayString as week.weekday)
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
