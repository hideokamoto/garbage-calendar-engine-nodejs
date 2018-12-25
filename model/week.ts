
export namespace week {
    export type weekday = '月曜' | '火曜' | '水曜' | '木曜' | '金曜' | '土曜' | '日曜'
    export type weekNumberString = '毎週' | '第一' | '第二' | '第三' | '第四' | '第五' | '第六'
    export type dayNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7
    export type weeknumber = 1 | 2 | 3 | 4 | 5 | 6
    export type month = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
    export namespace search {
        export type result = {
            year: string,
            month: month,
            day: string
        }
    }
}
