import { Calendars as Cal } from '../model/calander'

export class Calendar implements Cal.CalendarClass {
    private calendar: Cal.City
    public constructor (calendar: Cal.All = {}, city: string) {
        if (!calendar[city]) throw new Error(`Unsupported city : ${city}`)
        this.calendar = calendar[city]
    }
    public getCity (): Cal.City {
        return this.calendar
    }
    public getByTownName (townName: string): Cal.Town {
        return this.calendar[townName] || {}
    }
}
export default Calendar
