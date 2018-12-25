
import assert from 'power-assert'
// target
import WeekDay from '../../../libs/entities/WeekDay'

describe('Entity/Weekday', () => {
    describe('#convertWeekDayToNumber()', () => {
        it('should return 1 when given 火曜日', () => {
            const weekDay = new WeekDay()
            assert.equal(weekDay.convertWeekDayToNumber('火曜'), 2)
        })
    })
    describe('#getTheFirstWeekDay()', () => {
        const weekDay = new WeekDay('12', '2018')
        it('should return 6 when given 1 and 6', () => {
            assert.equal(weekDay.getTheFirstWeekDay(1, 6), 6)
        })
        it('should return 3 when given 4 and 6', () => {
            assert.equal(weekDay.getTheFirstWeekDay(4, 6), 3)
        })
    })
    describe('#calcDayNumber()', () => {
        const weekDay = new WeekDay('12', '2018')
        it('should return 1 when given 1 and 6', () => {
            assert.equal(weekDay.calcDayNumber(1, 6), "1")
        })
        it('should return 22 when given 4 and 6', () => {
            assert.equal(weekDay.calcDayNumber(4, 6), "22")
        })
    })
    describe('getTheDay', () => {
        it('should return 2018/12/25 when given 第四火曜日', () => {
            const weekDay = new WeekDay('12', '2018')
            assert.deepEqual(weekDay.getTheDay(4, '火曜'), {
                year: '2018',
                month: '12',
                day: '25'
            })
        })
        it('should return 2019/12/25 when given 第四水曜日', () => {
            const weekDay = new WeekDay('12', '2019')
            assert.deepEqual(weekDay.getTheDay(4, '水曜'), {
                year: '2019',
                month: '12',
                day: '25'
            })
        })
    })
    describe('#searchTheWeekDay()', () => {
        it('should return 2018/11/16 when given 第一金曜,第三金曜 and called at 2018/11/9', () => {
            const weekDay = new WeekDay('11', '2018', '9')
            assert.deepEqual(weekDay.searchTheWeekDay(['第一金曜', '第三金曜']), {
                year: '2018',
                month: '11',
                day: '16'
            })
        })
        it('should return 2018/12/24 when given 第一金曜,第三金曜 and called at 2018/12/23', () => {
            const weekDay = new WeekDay('12', '2018', '23')
            assert.deepEqual(weekDay.searchTheWeekDay(['毎週月曜', '毎週木曜']), {
                year: '2018',
                month: '12',
                day: '24'
            })
        })
    })
})
