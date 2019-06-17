
export namespace Week {
    export type Weekday = '月曜' | '火曜' | '水曜' | '木曜' | '金曜' | '土曜' | '日曜'
    export type WeekNumberString = '毎週' | '第一' | '第二' | '第三' | '第四' | '第五' | '第六'
    export type DayNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7
    export type Weeknumber = 1 | 2 | 3 | 4 | 5 | 6
    export type Month = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
    export namespace Search {
        export interface Result {
            year: string;
            month: Month;
            day: string;
        }
    }
}
