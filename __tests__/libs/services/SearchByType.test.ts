import assert from 'power-assert'
//
import GarbageCalendar  from '../../../libs/entities/calendar'
import SearchByTypeService from '../../../libs/services/SearchByType'
// param
import { garbageCalendar } from '../../calendar'

describe('libs/services/SearchByType.ts', () => {
    const calendar = new GarbageCalendar(garbageCalendar, '西宮市')
    describe('searchByTownName', () => {
        it('t', () => {
            const service = new SearchByTypeService(calendar)
            const result = service.searchByTownName('神垣町', 'もやすごみ', new Date('2018/12/25'))
            assert.deepEqual(result, {
                dateList: ['毎週月曜', '毎週木曜'],
                found: true,
                nextAction: 'putReminder',
                nextDate: {
                    year: "2018",
                    month: "12",
                    day: '27'
                }
            })
        })
        it('should return results when asked もやすごみ at 2018/12/23', () => {
            const service = new SearchByTypeService(calendar)
            const result = service.searchByTownName('神垣町', 'もやすごみ', new Date('2018/12/23'))
            assert.deepEqual(result, {
                dateList: ['毎週月曜', '毎週木曜'],
                found: true,
                nextAction: 'putReminder',
                nextDate: {
                    year: "2018",
                    month: "12",
                    day: '24'
                }
            })
        })
        it('should return nextDate not found result when asked もやすごみ at 2018/12/30', () => {
            const service = new SearchByTypeService(calendar)
            const result = service.searchByTownName('門戸東町', 'もやすごみ', new Date('2018/12/30'))
            assert.deepEqual(result, {
                dateList: ['毎週火曜', '毎週金曜'],
                found: true,
                nextAction: 'searchOtherGarbage',
                nextDate: ''
            })
        })
        it('should return valid garbage date string', () => {
            const service = new SearchByTypeService(calendar)
            assert.deepEqual(service.searchByTownName('神垣町', 'hoge'), {
                found: false,
                nextAction: 'searchOtherGarbage'
            })
        })
    })
})
