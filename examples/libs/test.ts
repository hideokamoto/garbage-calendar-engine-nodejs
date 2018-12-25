import GarbageCalendarEngine from '../../dist/index'


const { Calendar } = GarbageCalendarEngine.Entities
const { SearchByDateService } = GarbageCalendarEngine.Services

const garbageCalendar = {
    '西宮市': {
        '神垣町': {
            'もやすごみ': ['毎週月曜', '毎週木曜'],
            'もやさないごみ': ['毎週水曜'],
            '資源A': ['第二金曜'],
            '資源B': ['第二水曜', '第四水曜'],
            'その他プラ': ['毎週火曜'],
            'ペットボトル': ['第一金曜', '第三金曜']
        },
        '門戸東町': {
            'もやすごみ': ['毎週火曜', '毎週金曜'],
            'もやさないごみ': ['毎週水曜'],
            '資源A': ['第一木曜'],
            '資源B': ['第一水曜', '第三水曜'],
            'その他プラ': ['毎週月曜'],
            'ペットボトル': ['第二木曜', '第四木曜']
        },
        '相生町': {
            'もやすごみ': ['毎週月曜', '毎週木曜'],
            'もやさないごみ': ['毎週水曜'],
            '資源A': ['第一金曜'],
            '資源B': ['第二水曜', '第四水曜'],
            'その他プラ': ['毎週火曜'],
            'ペットボトル': ['第二金曜', '第四金曜']
        },
        '青木町': {
            'もやすごみ': ['毎週月曜', '毎週木曜'],
            'もやさないごみ': ['毎週火曜'],
            '資源A': ['第一金曜'],
            '資源B': ['第二水曜', '第四水曜'],
            'その他プラ': ['毎週金曜'],
            'ペットボトル': ['第二水曜', '第四水曜']
        }
    }
}

const calendar = new Calendar(garbageCalendar, '西宮市')
const service = new SearchByDateService(calendar)
const data = service.searchByDate('神垣町', new Date('2018/12/25'), new Date('2018/12/24'))
console.log(data)
