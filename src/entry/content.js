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
    // Start observing changes to the body element
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
    });
    document.getElementsByClassName('next')[1].children[0].click()
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
    // Stop observing changes to the body element
    observer.disconnect();

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
    // hiden data display table
    document.getElementById('trjnListDiv').children[0].children[1].style.display = 'none'
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
            amount: Number(row.querySelector('td:nth-child(4)').textContent.trim().replace('￥-', '')),
            balance: Number(row.querySelector('td:nth-child(5)').textContent.trim().replace('￥', ''))
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
        })
    }
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
                type: 'line',
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