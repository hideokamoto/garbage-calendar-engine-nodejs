import { Calendars as Cal } from '../model/calander'

export class Calendar implements Cal.CalendarClass {
    private calendar: Cal.City
    constructor (calendar: Cal.All = {}, city: string) {
        if (!calendar[city]) throw new Error(`Unsupported city : ${city}`)
        this.calendar = calendar[city]
    }
    getCity (): Cal.City {
        return this.calendar
    }
    getByTownName (townName: string): Cal.Town {
        return this.calendar[townName] || {}
    }
}
export default Calendar
