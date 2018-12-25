// target
import * as moment from 'moment'
import assert from 'power-assert'
import GarbageDate from '../../../libs/entities/Date'

describe('libs/entities/Date.ts', () => {
    describe('#addDate', () => {
        it('should add a day and can get updated date by getFormattedDate', () => {
            const day = new GarbageDate(moment('20180101').toDate())
            const before = day.getFormattedDate('MM/DD')
            day.addDate(1)
            const after = day.getFormattedDate('MM/DD')
            assert.notEqual(before, after)
        })
        it('should add a day can get updated date by getDayCount', () => {
            const day = new GarbageDate(moment('20180101').toDate())
            const before = day.getDayCount()
            day.addDate(7)
            const after = day.getDayCount()
            assert.notEqual(before, after)
        })

    })
    const day = new GarbageDate(moment('20180101').toDate())
    describe('#getFormattedDate()', () => {
        it('should return day string', () => {
            assert.equal(day.getFormattedDate(), '01')
        })
        it('should return formatted date', () => {
            assert.equal(day.getFormattedDate('YYYY/MM/DD'), '2018/01/01')
        })
        it('should return formatted date', () => {
            assert.equal(day.getFormattedDate('dddd'), 'Monday')
        })
    })
    describe('#getWeekDay()', () => {
        it('should return formatted date', () => {
            assert.equal(day.getWeekDay(), 'Monday')
        })
    })
    describe('#getDayCount()', () => {
        it('should return 1 when given 1/1', () => {
            const day = new GarbageDate(moment('20180101').toDate())
            assert.equal(day.getDayCount(), 1)
        })
        it('should return 3 when given 1/15', () => {
            const day = new GarbageDate(moment('20180115').toDate())
            assert.equal(day.getDayCount(), 3)
        })
        it('should return 5 when given 1/31', () => {
            const day = new GarbageDate(moment('20180131').toDate())
            assert.equal(day.getDayCount(), 5)
        })
    })
})
