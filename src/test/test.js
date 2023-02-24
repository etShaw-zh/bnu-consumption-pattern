// const Crawler = require('crawler');
// const c = new Crawler({
//     maxConnections: 10,
//     // This will be called for each crawled page
//     callback: (error, res, done) => {
//         if (error) {
//             console.log(error);
//         } else {
//             const $ = res.$;
//             // $ is Cheerio by default
//             //a lean implementation of core jQuery designed specifically for the server
//             console.log($('title').text());
//         }
//         done();
//     }
// });

// // Queue just one URL, with default callback
// c.queue('http://card.bnu.edu.cn/');


const dataForge = require('data-forge');
require('data-forge-fs'); // For readFile/writeFile.

const df = new dataForge.DataFrame(
    [
        {
            "time": "2023/2/14 22:10:00",
            "merchant": "新水控",
            "type": "持卡人消费",
            "amount": -0.26,
            "balance": 167.11
        },
        {
            "time": "2023/2/14 22:07:00",
            "merchant": "新水控",
            "type": "持卡人消费",
            "amount": -1,
            "balance": 167.37
        },
        {
            "time": "2023/2/14 21:57:00",
            "merchant": "新水控",
            "type": "持卡人消费",
            "amount": -1,
            "balance": 168.37
        },
        {
            "time": "2023/2/14 18:48:39",
            "merchant": "物美学子超市",
            "type": "持卡人消费",
            "amount": -5,
            "balance": 169.37
        },
        {
            "time": "2023/2/14 18:24:01",
            "merchant": "学生第四食堂",
            "type": "持卡人消费",
            "amount": -15,
            "balance": 174.37
        },
        {
            "time": "2023/2/14 12:12:48",
            "merchant": "一层一组",
            "type": "持卡人消费",
            "amount": -8,
            "balance": 189.37
        },
        {
            "time": "2023/2/13 17:41:33",
            "merchant": "学五中炒组",
            "type": "持卡人消费",
            "amount": -5.94,
            "balance": 197.37
        },
        {
            "time": "2023/2/13 12:22:54",
            "merchant": "一层一组",
            "type": "持卡人消费",
            "amount": -1,
            "balance": 203.31
        },
        {
            "time": "2023/2/13 12:19:36",
            "merchant": "一层二组",
            "type": "持卡人消费",
            "amount": -9.44,
            "balance": 204.31
        },
        {
            "time": "2023/2/12 17:30:11",
            "merchant": "一层一组",
            "type": "持卡人消费",
            "amount": -7.9,
            "balance": 213.75
        },
        {
            "time": "2023/2/12 12:31:18",
            "merchant": "一层二组",
            "type": "持卡人消费",
            "amount": -11.22,
            "balance": 221.65
        },
        {
            "time": "2023/2/11 22:00:00",
            "merchant": "新水控",
            "type": "持卡人消费",
            "amount": -0.52,
            "balance": 232.87
        },
        {
            "time": "2023/2/11 17:33:24",
            "merchant": "一层一组",
            "type": "持卡人消费",
            "amount": -2.4,
            "balance": 233.39
        },
        {
            "time": "2023/2/11 17:32:11",
            "merchant": "一层二组",
            "type": "持卡人消费",
            "amount": -6.64,
            "balance": 235.79
        },
        {
            "time": "2023/2/11 13:52:00",
            "merchant": "新水控",
            "type": "持卡人消费",
            "amount": -0.76,
            "balance": 242.43
        },
        {
            "time": "2023/2/11 13:43:00",
            "merchant": "新水控",
            "type": "持卡人消费",
            "amount": -1,
            "balance": 243.19
        },
        {
            "time": "2023/2/11 11:26:43",
            "merchant": "一层一组",
            "type": "持卡人消费",
            "amount": -5.5,
            "balance": 244.19
        },
        {
            "time": "2023/2/10 17:49:58",
            "merchant": "一层一组",
            "type": "持卡人消费",
            "amount": -7.9,
            "balance": 249.69
        },
        {
            "time": "2023/2/10 11:50:55",
            "merchant": "学五中炒组",
            "type": "持卡人消费",
            "amount": -7.19,
            "balance": 257.59
        },
        {
            "time": "2023/2/9 17:11:53",
            "merchant": "学五中炒组",
            "type": "持卡人消费",
            "amount": -8.44,
            "balance": 264.78
        },
        {
            "time": "2023/2/9 11:51:11",
            "merchant": "一层二组",
            "type": "持卡人消费",
            "amount": -5.94,
            "balance": 273.22
        },
        {
            "time": "2023/2/8 17:21:22",
            "merchant": "学五中炒组",
            "type": "持卡人消费",
            "amount": -7.19,
            "balance": 279.16
        },
        {
            "time": "2023/2/8 11:43:15",
            "merchant": "学五中炒组",
            "type": "持卡人消费",
            "amount": -7.04,
            "balance": 286.35
        },
        {
            "time": "2023/2/7 21:03:00",
            "merchant": "新水控",
            "type": "持卡人消费",
            "amount": -1,
            "balance": 293.39
        },
        {
            "time": "2023/2/7 17:37:20",
            "merchant": "物美学子超市",
            "type": "持卡人消费",
            "amount": -14.9,
            "balance": 294.39
        },
        {
            "time": "2023/2/7 17:35:03",
            "merchant": "学五中炒组",
            "type": "持卡人消费",
            "amount": -14.44,
            "balance": 309.29
        },
        {
            "time": "2023/2/7 17:35:02",
            "merchant": "",
            "type": "过渡余额写卡",
            "amount": 300,
            "balance": 323.73
        },
        {
            "time": "2023/2/7 11:39:27",
            "merchant": "学五中炒组",
            "type": "持卡人消费",
            "amount": -6.94,
            "balance": 23.73
        },
        {
            "time": "2023/2/7 11:39:19",
            "merchant": "",
            "type": "银行转账",
            "amount": 300,
            "balance": 23.73
        },
        {
            "time": "2023/2/6 11:59:54",
            "merchant": "学五中炒组",
            "type": "持卡人消费",
            "amount": -0.2,
            "balance": 30.67
        },
        {
            "time": "2023/2/6 11:59:42",
            "merchant": "学五中炒组",
            "type": "持卡人消费",
            "amount": -13.24,
            "balance": 30.87
        },
        {
            "time": "2023/2/5 21:53:00",
            "merchant": "新水控",
            "type": "持卡人消费",
            "amount": -1,
            "balance": 44.11
        },
        {
            "time": "2023/2/4 17:10:19",
            "merchant": "学五中炒组",
            "type": "持卡人消费",
            "amount": -8.94,
            "balance": 45.11
        },
        {
            "time": "2023/2/4 12:05:58",
            "merchant": "学五中炒组",
            "type": "持卡人消费",
            "amount": -7.69,
            "balance": 54.05
        },
        {
            "time": "2023/2/3 17:30:06",
            "merchant": "物美学子超市",
            "type": "持卡人消费",
            "amount": -14.9,
            "balance": 61.74
        },
        {
            "time": "2023/2/3 17:22:45",
            "merchant": "学五中炒组",
            "type": "持卡人消费",
            "amount": -11.49,
            "balance": 76.64
        },
        {
            "time": "2023/2/2 21:32:00",
            "merchant": "新水控",
            "type": "持卡人消费",
            "amount": -1,
            "balance": 88.13
        },
        {
            "time": "2023/2/2 18:25:08",
            "merchant": "学五中炒组",
            "type": "持卡人消费",
            "amount": -3.72,
            "balance": 89.13
        },
        {
            "time": "2023/2/1 17:31:16",
            "merchant": "学五中炒组",
            "type": "持卡人消费",
            "amount": -8.44,
            "balance": 92.85
        },
        {
            "time": "2023/2/1 11:44:56",
            "merchant": "物美学子超市",
            "type": "持卡人消费",
            "amount": -18.8,
            "balance": 101.29
        },
        {
            "time": "2023/2/1 11:40:54",
            "merchant": "学五中炒组",
            "type": "持卡人消费",
            "amount": -11.44,
            "balance": 120.09
        }
    ]
);

const tableData = [
    {
        "time": "2023/2/14 22:10:00",
        "merchant": "新水控",
        "type": "持卡人消费",
        "amount": -0.26,
        "balance": 167.11
    },
    {
        "time": "2023/2/14 22:07:00",
        "merchant": "新水控",
        "type": "持卡人消费",
        "amount": -1,
        "balance": 167.37
    },
    {
        "time": "2023/2/14 21:57:00",
        "merchant": "新水控",
        "type": "持卡人消费",
        "amount": -1,
        "balance": 168.37
    },
    {
        "time": "2023/2/14 18:48:39",
        "merchant": "物美学子超市",
        "type": "持卡人消费",
        "amount": -5,
        "balance": 169.37
    },
    {
        "time": "2023/2/14 18:24:01",
        "merchant": "学生第四食堂",
        "type": "持卡人消费",
        "amount": -15,
        "balance": 174.37
    },
    {
        "time": "2023/2/14 12:12:48",
        "merchant": "一层一组",
        "type": "持卡人消费",
        "amount": -8,
        "balance": 189.37
    },
    {
        "time": "2023/2/13 17:41:33",
        "merchant": "学五中炒组",
        "type": "持卡人消费",
        "amount": -5.94,
        "balance": 197.37
    },
    {
        "time": "2023/2/13 12:22:54",
        "merchant": "一层一组",
        "type": "持卡人消费",
        "amount": -1,
        "balance": 203.31
    },
    {
        "time": "2023/2/13 12:19:36",
        "merchant": "一层二组",
        "type": "持卡人消费",
        "amount": -9.44,
        "balance": 204.31
    },
    {
        "time": "2023/2/12 17:30:11",
        "merchant": "一层一组",
        "type": "持卡人消费",
        "amount": -7.9,
        "balance": 213.75
    },
    {
        "time": "2023/2/12 12:31:18",
        "merchant": "一层二组",
        "type": "持卡人消费",
        "amount": -11.22,
        "balance": 221.65
    },
    {
        "time": "2023/2/11 22:00:00",
        "merchant": "新水控",
        "type": "持卡人消费",
        "amount": -0.52,
        "balance": 232.87
    },
    {
        "time": "2023/2/11 17:33:24",
        "merchant": "一层一组",
        "type": "持卡人消费",
        "amount": -2.4,
        "balance": 233.39
    },
    {
        "time": "2023/2/11 17:32:11",
        "merchant": "一层二组",
        "type": "持卡人消费",
        "amount": -6.64,
        "balance": 235.79
    },
    {
        "time": "2023/2/11 13:52:00",
        "merchant": "新水控",
        "type": "持卡人消费",
        "amount": -0.76,
        "balance": 242.43
    },
    {
        "time": "2023/2/11 13:43:00",
        "merchant": "新水控",
        "type": "持卡人消费",
        "amount": -1,
        "balance": 243.19
    },
    {
        "time": "2023/2/11 11:26:43",
        "merchant": "一层一组",
        "type": "持卡人消费",
        "amount": -5.5,
        "balance": 244.19
    },
    {
        "time": "2023/2/10 17:49:58",
        "merchant": "一层一组",
        "type": "持卡人消费",
        "amount": -7.9,
        "balance": 249.69
    },
    {
        "time": "2023/2/10 11:50:55",
        "merchant": "学五中炒组",
        "type": "持卡人消费",
        "amount": -7.19,
        "balance": 257.59
    },
    {
        "time": "2023/2/9 17:11:53",
        "merchant": "学五中炒组",
        "type": "持卡人消费",
        "amount": -8.44,
        "balance": 264.78
    },
    {
        "time": "2023/2/9 11:51:11",
        "merchant": "一层二组",
        "type": "持卡人消费",
        "amount": -5.94,
        "balance": 273.22
    },
    {
        "time": "2023/2/8 17:21:22",
        "merchant": "学五中炒组",
        "type": "持卡人消费",
        "amount": -7.19,
        "balance": 279.16
    },
    {
        "time": "2023/2/8 11:43:15",
        "merchant": "学五中炒组",
        "type": "持卡人消费",
        "amount": -7.04,
        "balance": 286.35
    },
    {
        "time": "2023/2/7 21:03:00",
        "merchant": "新水控",
        "type": "持卡人消费",
        "amount": -1,
        "balance": 293.39
    },
    {
        "time": "2023/2/7 17:37:20",
        "merchant": "物美学子超市",
        "type": "持卡人消费",
        "amount": -14.9,
        "balance": 294.39
    },
    {
        "time": "2023/2/7 17:35:03",
        "merchant": "学五中炒组",
        "type": "持卡人消费",
        "amount": -14.44,
        "balance": 309.29
    },
    {
        "time": "2023/2/7 17:35:02",
        "merchant": "",
        "type": "过渡余额写卡",
        "amount": 300,
        "balance": 323.73
    },
    {
        "time": "2023/2/7 11:39:27",
        "merchant": "学五中炒组",
        "type": "持卡人消费",
        "amount": -6.94,
        "balance": 23.73
    },
    {
        "time": "2023/2/7 11:39:19",
        "merchant": "",
        "type": "银行转账",
        "amount": 300,
        "balance": 23.73
    },
    {
        "time": "2023/2/6 11:59:54",
        "merchant": "学五中炒组",
        "type": "持卡人消费",
        "amount": -0.2,
        "balance": 30.67
    },
    {
        "time": "2023/2/6 11:59:42",
        "merchant": "学五中炒组",
        "type": "持卡人消费",
        "amount": -13.24,
        "balance": 30.87
    },
    {
        "time": "2023/2/5 21:53:00",
        "merchant": "新水控",
        "type": "持卡人消费",
        "amount": -1,
        "balance": 44.11
    },
    {
        "time": "2023/2/4 17:10:19",
        "merchant": "学五中炒组",
        "type": "持卡人消费",
        "amount": -8.94,
        "balance": 45.11
    },
    {
        "time": "2023/2/4 12:05:58",
        "merchant": "学五中炒组",
        "type": "持卡人消费",
        "amount": -7.69,
        "balance": 54.05
    },
    {
        "time": "2023/2/3 17:30:06",
        "merchant": "物美学子超市",
        "type": "持卡人消费",
        "amount": -14.9,
        "balance": 61.74
    },
    {
        "time": "2023/2/3 17:22:45",
        "merchant": "学五中炒组",
        "type": "持卡人消费",
        "amount": -11.49,
        "balance": 76.64
    },
    {
        "time": "2023/2/2 21:32:00",
        "merchant": "新水控",
        "type": "持卡人消费",
        "amount": -1,
        "balance": 88.13
    },
    {
        "time": "2023/2/2 18:25:08",
        "merchant": "学五中炒组",
        "type": "持卡人消费",
        "amount": -3.72,
        "balance": 89.13
    },
    {
        "time": "2023/2/1 17:31:16",
        "merchant": "学五中炒组",
        "type": "持卡人消费",
        "amount": -8.44,
        "balance": 92.85
    },
    {
        "time": "2023/2/1 11:44:56",
        "merchant": "物美学子超市",
        "type": "持卡人消费",
        "amount": -18.8,
        "balance": 101.29
    },
    {
        "time": "2023/2/1 11:40:54",
        "merchant": "学五中炒组",
        "type": "持卡人消费",
        "amount": -11.44,
        "balance": 120.09
    }
]

// const dfByMerchant = df.groupBy(consumption => consumption.merchant);
// var data = []
// for (const dfByMerchantGroup of dfByMerchant) {
//     const merchant = dfByMerchantGroup.first().merchant;
//     if (merchant === '') { continue } // skip recharge
//     const totalMerchantForProduct = dfByMerchantGroup.deflate(consumption => consumption.amount).sum();
//     const meanMerchantForProduct = dfByMerchantGroup.deflate(consumption => consumption.amount).mean();
//     const stdMerchantForProduct = dfByMerchantGroup.deflate(consumption => consumption.amount).std();
//     const countMerchantForProduct = dfByMerchantGroup.deflate(consumption => consumption.amount).count();
//     data.push({
//         // '商户': merchant === '' ? '充值' : merchant,
//         '商户': merchant,
//         '汇总': totalMerchantForProduct.toFixed(2),
//         '均值': meanMerchantForProduct.toFixed(2),
//         '标准差': stdMerchantForProduct.toFixed(2),
//         '笔数': countMerchantForProduct
//     })
// }
// const dfData = new dataForge.DataFrame(data);
// const orderedDfData = dfData.orderByDescending(row => row.笔数);
// console.log(orderedDfData.toHTML())


// df.forEach(row => {
//     // console.log(new Date(row.time).toLocaleDateString().split('/')[2]) // 2020/2/7
//     console.log(new Date(row.time).toLocaleTimeString().substring(0, 2)) // 17:35:03
//     // console.log(row.time.substring(0, 9)) // 2020/2/17, 2020/2/7
// });
// // console.log(df.toHTML())


// function produceNewColumns (inputRow) {
//     const newColumns = {
//         // ... specify new columns and their values based on the input row ...
//         'year': inputRow.time.split('/')[0],
//         'month': inputRow.time.split('/')[1],
//         'day': inputRow.time.split('/')[2].split(' ')[0],
//         'hour': new Date(inputRow.time).toLocaleTimeString().substring(0, 2),
//     };

//     return newColumns;
// };

// console.log(df.generateSeries(row => produceNewColumns(row)).toHTML())
// console.log(df.generateSeries(row => {
//     return {
//         'year': row.time.split('/')[0],
//         'month': row.time.split('/')[1],
//         'day': row.time.split('/')[2].split(' ')[0],
//         'hour': new Date(row.time).toLocaleTimeString().substring(0, 2),
//     }
// }).toJSON())

function updateTableDataTime(tableData) {
    const df = new dataForge.DataFrame(tableData);
    const dfOrderByTime = df.orderBy(row => new Date(row.time).getTime());
    const dfAddCloumn = dfOrderByTime.generateSeries(row => {
        return {
            'yearMonthDay': row.time.split('/')[0] + '-' + row.time.split('/')[1] + '-' + row.time.split('/')[2].split(' ')[0],
            'year': row.time.split('/')[0],
            'month': row.time.split('/')[1],
            'day': row.time.split('/')[2].split(' ')[0],
            'hour': new Date(row.time).toLocaleTimeString().substring(0, 2),
        }
    });

    const dfByMerchant = dfAddCloumn.groupBy(consumption => consumption.yearMonthDay);
    var data = {
        cats: [],
        values: []
    }
    for (const dfByMerchantGroup of dfByMerchant) {
        const yearMonthDay = dfByMerchantGroup.first().yearMonthDay;
        const totalMerchantForProduct = dfByMerchantGroup.deflate(consumption => consumption.amount).sum();
        data.cats.push(yearMonthDay)
        data.values.push(totalMerchantForProduct.toFixed(2))
    }

    return data;
}

console.log(updateTableDataTime(tableData))