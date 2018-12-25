// services
import SearchByDateService from './services/SearchByDate'
import SearchByTypeService from './services/SearchByType'
import SearchTheCalendarService  from './services/SearchTheCalendar'
// entities
import Calendar from './entities/calendar'
import GarbageDay from './entities/Date'
import WeekDay from './entities/WeekDay'

// models
// import { calendar, garbage, day } from './model/calander'

export interface GarbageCalendarEngine {
  Entities: {
    Calendar: any,
    GarbageDay: any,
    WeekDay: any,
  },
  Services: {
    SearchByTypeService: any,
    SearchTheCalendarService: any,
    SearchByDateService: any
  }
}
const GarbageCalendarEngine: GarbageCalendarEngine = {
  Entities: {
    Calendar,
    GarbageDay,
    WeekDay
  },
  Services: {
    SearchByDateService,
    SearchByTypeService,
    SearchTheCalendarService,
  }
}

export default GarbageCalendarEngine
module.exports = GarbageCalendarEngine