import assert from 'power-assert'
//
import GarbageCalendar  from '../../../libs/entities/calendar'
import SearchByDateService from '../../../libs/services/SearchByDate'
// param
import { garbageCalendar } from '../../calendar'


describe('libs/services/SearchByDate.ts', () => {
    const calendar = new GarbageCalendar(garbageCalendar, '西宮市')
    const service = new SearchByDateService(calendar)
    describe('#getTargetDate()', () => {
        it('should return the day when given unmatched date', () => {
            const result = service.getTargetDate(new Date('2018/11/11'), new Date('2018/11/10 11:00'))
            assert.equal(result.isTomorrow, false)
            assert.equal(result.targetDay.getFormattedDate('MM/DD'), '11/11')
        })
        it('should return next day when given same day and the time is after 8 am', () => {
            const result = service.getTargetDate(new Date('2018/11/11'), new Date('2018/11/11 11:00'))
            assert.equal(result.isTomorrow, true)
            assert.equal(result.targetDay.getFormattedDate('MM/DD'), '11/12')
        })
    })
    describe('#searchByDate()', () => {
        it('should throw error when given invalid city name', () => {
            assert.throws(
                () => service.searchByDate('ほげ', new Date()),
                {
                    message: 'unsupported town: ほげ'
                }
            )
        })
        it('should return valid garbage information', () => {
            const result = service.searchByDate('神垣町', new Date('2018/12/25'), new Date('2018/12/24'))
            assert.deepEqual(result, {
                "found": true,
                "garbageList": [
                    {
                        "date": [
                            "毎週火曜"
                        ],
                        "item": "その他プラ"
                    }
                ],
                "isTomorrow": false,
                "nextAction": "putReminder",
                "targetDate": {
                    "day": "25",
                    "month": "12",
                    "year": "2018"
                }
            })
        })
    })
})
