import { Week } from './week'

export namespace Calendars {
    export interface All {
        [city: string]: City;
    }
    export interface City {
        [town: string]: Town;
    }
    export interface Town {
        [garbageType: string]: string[];
    }
    export interface CalendarClass {
        getCity(): City;
        getByTownName(townName: string): Town;
    }
}

export namespace Garbage {
    export interface MatchedDate {
        found: true;
        dateList: string[];
        nextDate: Week.Search.Result | '';
        nextAction: 'putReminder' | 'searchOtherGarbage';
    }
    export interface NotFound {
        found: false;
        nextAction: 'searchOtherGarbage';
    }
}

export namespace Day {
    export namespace Search {
        export interface Item {item: string; date: string}
    }
    export interface MatchedGarbage {
        found: true;
        garbageList: Day.Search.Item[];
        isTomorrow: boolean;
        nextAction: 'putReminder';
        targetDate: Week.Search.Result | '';
    }
    export interface NotFound {
        found: false;
        nextAction: 'searchOtherDay';
    }
}
