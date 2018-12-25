import assert from 'power-assert'

// target
import SearchTheCalendarService from '../../../libs/services/SearchTheCalendar'
import GarbageCalendar  from '../../../libs/entities/calendar'
// param
import { garbageCalendar } from '../../calendar'

describe('libs/services/SearchTheCalendar', () => {
    const calendar = new GarbageCalendar(garbageCalendar, '西宮市')
    const service = new SearchTheCalendarService(
        calendar.getByTownName('神垣町'),
        '月曜',
        1
    )
    it('should return valid items', () => {
        assert.deepEqual(service.search(), [{
            item: 'もやすごみ',
            date: [ '毎週月曜', '毎週木曜']
        }])
    })
})
