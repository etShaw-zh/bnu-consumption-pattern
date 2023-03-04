const dataForge = require('data-forge');
require('data-forge-fs'); // For readFile/writeFile.

import * as echarts from 'echarts/core';
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    MarkLineComponent,
    MarkPointComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    MarkLineComponent,
    MarkPointComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition
]);


console.log('hello world content todo something~')
var tableData = [];

// 
var tableDataPageTotal = 0;
var tableDataCurrentPage = 0;

// add process bar
var processBar = document.createElement('div')
processBar.id = 'processBar'
processBar.style.width = '100%'
processBar.style.height = '20px'
processBar.style.background = '#ebeef5'
processBar.style.borderRadius = '4px'
processBar.style.marginTop = '10px'
processBar.style.marginBottom = '10px'
processBar.style.position = 'relative'
var processBarInner = document.createElement('div')
processBarInner.id = 'processBarInner'
processBarInner.style.width = '0%'
processBarInner.style.height = '100%'
processBarInner.style.background = '#409EFF'
processBarInner.style.borderRadius = '4px'
processBarInner.style.position = 'absolute'
processBarInner.style.left = '0'
processBarInner.style.top = '0'
processBar.appendChild(processBarInner)

// add process bar text
var processBarText = document.createElement('div')
processBarText.id = 'processBarText'
processBarText.style.position = 'absolute'
processBarText.style.left = '50%'
processBarText.style.top = '50%'
processBarText.style.transform = 'translate(-50%, -50%)'
processBarText.style.color = '#fff'
processBarText.style.fontSize = '14px'
processBarText.innerText = '0%'
processBar.appendChild(processBarText)


// Create a button to get the data
let getDataBtn = document.createElement('button')
getDataBtn.innerText = '获取数据'
getDataBtn.style.background = "#67C23A"
getDataBtn.style.border = "1px solid #cdcdcd"
getDataBtn.style.color = "#fff"
getDataBtn.style.padding = "6px 15px"
getDataBtn.style.marginRight = "10px"
getDataBtn.style.fontWeight = "normal"
getDataBtn.style.fontSize = "15px"
getDataBtn.style.textShadow = "none"
getDataBtn.style.borderRadius = "3px"
getDataBtn.style.lineHeight = "1.5"
getDataBtn.style.display = "inline-block"
getDataBtn.style.marginBottom = "0"
getDataBtn.style.textAlign = "center"
getDataBtn.style.cursor = "pointer"
getDataBtn.onclick = function (event) {

    tableData = [];
    tableData = tableData.concat(extractCurrentPageTableData());

    // add process bar to the page
    document.getElementsByClassName('searcharea')[0].appendChild(processBar)

    // get total page count and current page
    tableDataCurrentPage = parseInt(document.getElementsByClassName('active')[1].innerText)
    tableDataPageTotal = parseInt(
        document.getElementsByClassName('pagination')[0]
            .children[document.getElementsByClassName('pagination')[0]
                .children.length - 2].innerText
    );

    document.getElementsByClassName('next')[1].children[0].click()

    observer.observe(document.getElementById('trjnListDiv'), {
        childList: true,
        subtree: true,
        characterData: true,
        // attributes:true,
        // attributeFilter: ['style', 'display']
    });

    event.preventDefault();
}
// Append the button to the page
// document.getElementsByClassName('searcharea')[0].appendChild(getDataBtn)
document.getElementsByClassName('col-md-12')[1].appendChild(getDataBtn)

// Create a button to generate the report
let generateReportBtn = document.createElement('button')
generateReportBtn.innerText = '生成报表'
generateReportBtn.style.background = "#F4A460"
generateReportBtn.style.border = "1px solid #cdcdcd"
generateReportBtn.style.color = "#fff"
generateReportBtn.style.padding = "6px 15px"
generateReportBtn.style.marginRight = "10px"
generateReportBtn.style.fontWeight = "normal"
generateReportBtn.style.fontSize = "15px"
generateReportBtn.style.textShadow = "none"
generateReportBtn.style.borderRadius = "3px"
generateReportBtn.style.lineHeight = "1.5"
generateReportBtn.style.display = "inline-block"
generateReportBtn.style.marginBottom = "0"
generateReportBtn.style.textAlign = "center"
generateReportBtn.style.cursor = "pointer"
generateReportBtn.onclick = function (event) {
    if (0 === tableData.length) {
        alert('请先点击获取数据按钮！');
        event.preventDefault();
        return 0;
    }
    const describContainer = document.createElement('div');
    describContainer.innerHTML = analysisTableData(tableData);
    describContainer.className = 'query table-scrollable no-wrap';
    describContainer.style.marginTop = '20px';
    describContainer.firstChild.className = 'table table-striped table-bordered table-hover';

    const mapContainer = document.createElement('div');
    mapContainer.id = 'map-chart';
    mapContainer.style.marginTop = '20px';
    mapContainer.style.width = '1100px';
    mapContainer.style.height = '600px';
    drawMap(mapContainer, updateTableDataTime(tableData))
    document.getElementsByClassName('searcharea')[0].appendChild(describContainer);
    document.getElementsByClassName('searcharea')[0].appendChild(mapContainer);
    event.preventDefault();
}
// Append the button to the page
// document.getElementsByClassName('searcharea')[0].appendChild(generateReportBtn)
document.getElementsByClassName('col-md-12')[1].appendChild(generateReportBtn)


// Create a MutationObserver to detect changes to the DOM tree
const observer = new MutationObserver(() => {
    tableData = tableData.concat(extractCurrentPageTableData())
    // current page
    tableDataCurrentPage = parseInt(document.getElementsByClassName('active')[1].innerText)
    // hiden data display table
    document.getElementById('trjnListDiv').children[0].children[1].style.display = 'none'
    document.getElementsByClassName('pagenav')[0].style.display = 'none'
    processBarText.innerText = Math.round(tableDataCurrentPage / tableDataPageTotal * 100) + '%'
    processBarInner.style.width = Math.round(tableDataCurrentPage / tableDataPageTotal * 100) + '%'
    if (tableDataCurrentPage === tableDataPageTotal) {
        // Stop observing changes to the body element
        observer.disconnect();
        // get last page table data
        tableData = tableData.concat(extractCurrentPageTableData());
    }
    document.getElementsByClassName('next')[1].children[0].click()
});




/**
 * Extracts the data from the current page of the table
 * @returns {Array} The extracted data
 * @example
 * extractCurrentPageTableData() // => [
 * // => [
 * //     {
 * //         time: '2019-01-01 00:00:00',
 * //         merchant: 'Merchant 1',
 * //         type: 'Type 1',
 * //         amount: '100.00',
 * //         balance: '100.00'
 * //     },
 * //     {
 * //         time: '2019-01-01 00:00:00',
 * //         merchant: 'Merchant 2',
 * //         type: 'Type 2',
 * //         amount: '200.00',
 * //         balance: '200.00'
 * //     }
 * // ]
*/
function extractCurrentPageTableData() {

    var currentPageTableData = []

    // Get the table element by class name
    var table = document.querySelector('.table-scrollable table');

    // Get the table body element
    var tbody = table.querySelector('tbody');

    // Get all the rows in the table body
    var rows = tbody.querySelectorAll('tr');

    // Loop through each row and extract the data
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];

        // Extract the data from the row
        var data = {
            time: row.querySelector('td:first-child').textContent.trim(),
            merchant: row.querySelector('td:nth-child(2)').textContent.trim(),
            type: row.querySelector('td:nth-child(3)').textContent.trim(),
            amount: Number(row.querySelector('td:nth-child(4)').textContent.trim().replace('￥-', '')) ? Number(row.querySelector('td:nth-child(4)').textContent.trim().replace('￥-', '')) : 0,
            balance: Number(row.querySelector('td:nth-child(5)').textContent.trim().replace('￥', '')) ? Number(row.querySelector('td:nth-child(5)').textContent.trim().replace('￥', '')) : 0,
        };

        // Push the data to the global array
        currentPageTableData.push(data);
    }

    // return the extracted current page table data
    return currentPageTableData
}

/**
 * 
 * @param {*} tableData 
 * @returns 
 */
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

/**
 * 
 * @param {*} dateStr
 * @param {*} holidays
 * @returns
 * @example
*/
// function isHoliday(dateStr, holidays) {
//     // 将日期字符串转换为日期对象
//     const date = new Date(dateStr);
    
//     // 判断是否为周六或周日
//     if (date.getDay() === 0 || date.getDay() === 6) {
//       return true;
//     }
    
//     // 在这里添加其他判断日期是否为节假日的逻辑
//     // 例如，可以根据国家或地区的法定节假日列表进行比较
    
//     // 如果以上条件都不符合，则认为该日期不是节假日
//     return false;
// }

// fetch('https://timor.tech/api/holiday/year/2021').then(res => {
//     return res.text();
// }).then(res => {
//     console.log(res);
// });

//- 小写数字转换成大写, 只处理到[0 ~ 99]
function convertToChinaNum(num) {
    var arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    var arr2 = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];//可继续追加更高位转换值
    if (!num || isNaN(num)) {
        return "零";
    }
    var english = num.toString().split("")
    var result = "";
    for (var i = 0; i < english.length; i++) {
        var des_i = english.length - 1 - i;//倒序排列设值
        result = arr2[i] + result;
        var arr1_index = english[des_i];
        result = arr1[arr1_index] + result;
    }
    //将【零千、零百】换成【零】 【十零】换成【十】
    result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');
    //合并中间多个零为一个零
    result = result.replace(/零+/g, '零');
    //将【零亿】换成【亿】【零万】换成【万】
    result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');
    //将【亿万】换成【亿】
    result = result.replace(/亿万/g, '亿');
    //移除末尾的零
    result = result.replace(/零+$/, '')
    //将【零一十】换成【零十】
    //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
    //将【一十】换成【十】
    result = result.replace(/^一十/g, '十');
    return result;
}


/**
 * Analysis table data
 * @param {*} tableData 
 * @example
 * analysisTableData(tableData) // => {
 *    'merchant': ['Merchant 1', 'Merchant 2'],
 *   'total': [100.00, 200.00],
 *  'mean': [100.00, 200.00]
 * }
 */
function analysisTableData(tableData) {
    const df = new dataForge.DataFrame(tableData);
    const dfByMerchant = df.groupBy(consumption => consumption.merchant);
    var data = []
    var total = {
        '商户': '',
        '汇总': 0,
        '均值': 0,
        '标准差': 0,
        '笔数': 0
    }
    var i = 0;
    for (const dfByMerchantGroup of dfByMerchant) {
        const merchant = dfByMerchantGroup.first().merchant;
        if (merchant === '') { continue } // skip recharge
        const totalMerchantForProduct = dfByMerchantGroup.deflate(consumption => consumption.amount).sum();
        const meanMerchantForProduct = dfByMerchantGroup.deflate(consumption => consumption.amount).mean();
        const stdMerchantForProduct = dfByMerchantGroup.deflate(consumption => consumption.amount).std();
        const countMerchantForProduct = dfByMerchantGroup.deflate(consumption => consumption.amount).count();
        data.push({
            // '商户': merchant === '' ? '充值' : merchant,
            '商户': merchant,
            '汇总': totalMerchantForProduct.toFixed(2),
            '均值': meanMerchantForProduct.toFixed(2),
            '标准差': stdMerchantForProduct.toFixed(2),
            '笔数': countMerchantForProduct
        });
        total['汇总'] += totalMerchantForProduct;
        total['均值'] += meanMerchantForProduct;
        total['标准差'] += stdMerchantForProduct;
        total['笔数'] += countMerchantForProduct;
        i++;
    }
    total['商户'] = '汇总' + convertToChinaNum(i) + '家商户';
    total['汇总'] = total['汇总'].toFixed(2);
    total['均值'] = (total['均值'] / i).toFixed(2);
    total['标准差'] = (total['标准差'] / i).toFixed(2);
    data.push(total);
    const dfData = new dataForge.DataFrame(data);
    const orderedDfData = dfData.orderByDescending(row => row.笔数);
    // console.log(dfData.toHTML())
    return orderedDfData.toHTML()
}


function drawMap(chartDom, data) {

    var myChart = echarts.init(chartDom);

    var option;

    option = {
        title: {
            text: '我在BNU的校园卡消费趋势图',
            left: "center",
            textStyle: {
                fontSize: 30
            },
            subtextStyle: {
                fontSize: 20
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: data.cats
        },
        yAxis: {
            type: 'value'
        },
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {}
            }
        },
        series: [
            {
                data: data.values,
                name: '当日消费',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                smooth: true,
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: 'Avg' }]
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    return myChart.setOption(option);
}