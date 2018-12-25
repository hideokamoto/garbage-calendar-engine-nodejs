import { week } from './week'

export namespace calendar {
    export interface all {
        [city: string]: city
    }
    export interface city {
        [town: string]: town
    }
    export interface town {
        [garbageType: string]: string[]
    }
    export interface calendarClass {
        getCity(): city
        getByTownName(townName: string): town
    }
}

export namespace garbage {
    export interface matchedDate {
        found: true,
        dateList: string[],
        nextDate: week.search.result | '',
        nextAction: 'putReminder' | 'searchOtherGarbage',
    }
    export interface notFound {
        found: false,
        nextAction: 'searchOtherGarbage'
    }
}

export namespace day {
    export namespace search {
        export interface item {item: string, date: string}
    }
    export interface matchedGarbage {
        found: true,
        garbageList: day.search.item[],
        isTomorrow: boolean,
        nextAction: 'putReminder',
        targetDate: week.search.result | '',
    }
    export interface notFound {
        found: false,
        nextAction: 'searchOtherDay'
    }
}
