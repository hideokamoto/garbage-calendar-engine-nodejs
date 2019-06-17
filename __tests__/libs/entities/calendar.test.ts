import assert from 'power-assert'
//
import GarbageCalendar  from '../../../libs/entities/calendar'
// param
import { garbageCalendar } from '../../calendar'

describe('libs/calendar.ts', () => {
    describe('constructor', () => {
        it('should throw error when given invalid city name', () => {
            assert.throws(
                () => new GarbageCalendar(garbageCalendar, 'hoge'),
                JSON.stringify({
                    message: 'Unsupported city : hoge'
                })
            )
        })
        it('should initilize', () => {
            assert.doesNotThrow(() => new GarbageCalendar(garbageCalendar, '西宮市'))
        })
    })
    describe('getByTownName', () => {
        const calendar = new GarbageCalendar(garbageCalendar, '西宮市')
        it('should return schedule object by town name', () => {
            assert.deepEqual(calendar.getByTownName('神垣町'), {
                'もやすごみ': ['毎週月曜', '毎週木曜'],
                'もやさないごみ': ['毎週水曜'],
                '資源A': ['第二金曜'],
                '資源B': ['第二水曜', '第四水曜'],
                'その他プラ': ['毎週火曜'],
                'ペットボトル': ['第一金曜', '第三金曜']
            })
        })
        it('should return empty object when given invalid town name', () => {
            assert.deepEqual(calendar.getByTownName('hoge'), {})
        })
    })
})
