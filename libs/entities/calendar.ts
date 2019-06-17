import {calendar} from '../model/calander'

export class Calendar implements calendar.calendarClass {
    private calendar: calendar.city
    constructor(calendar: calendar.all = {}, city: string) {
        if (!calendar[city]) throw new Error(`Unsupported city : ${city}`)
        this.calendar = calendar[city]
    }
    getCity(): calendar.city {
        return this.calendar
    }
    getByTownName(townName: string): calendar.town {
        return this.calendar[townName] || {}
    }
}
export default Calendar
