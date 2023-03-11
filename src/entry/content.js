const dataForge = require('data-forge');
require('data-forge-fs'); // For readFile/writeFile.
var ttest2 = require('@stdlib/stats-ttest2');

import * as echarts from 'echarts/core';
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    MarkLineComponent,
    MarkPointComponent,
    LegendComponent,
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { BoxplotChart } from 'echarts/charts';
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
    UniversalTransition,
    LegendComponent,
    BoxplotChart
]);

// hiden this query current data log button
document.getElementById('btnQueryCurrDay').style.display = 'none';


// init 
var tableData = [];
var tableDataPageTotal = 0;
var tableDataCurrentPage = 0;

const holidayData = [];  // 假期消费金额数组
const nonHolidayData = [];  // 非假期消费金额数组

// add a container to display all elements this extension created
var container = document.createElement('div')
container.id = 'container'
container.style.width = '100%'
container.style.height = '100%'

// add a visitor count image to the container
var visitorCountImg = document.createElement('div')
visitorCountImg.id = 'visitorCountImg'
visitorCountImg.innerHTML = `<image src="https://visitor-badge.laobi.icu/badge?page_id=bnu-comsuption-pattern&left_text=MyExtensionUsers" />`;
container.appendChild(visitorCountImg)

// add a instroduction text title to the container
var instroductionTitle = document.createElement('div')
instroductionTitle.id = 'instroductionTitle'
instroductionTitle.style.color = '#606266'
instroductionTitle.style.fontSize = '20px'
instroductionTitle.style.fontWeight = 'bold'
instroductionTitle.style.marginTop = '10px'
instroductionTitle.innerText = '一、导语'
container.appendChild(instroductionTitle)

// add a instroduction text to the container
var instroductionText = document.createElement('p')
instroductionText.id = 'instroductionText'
instroductionText.style.color = '#909399'
instroductionText.style.fontSize = '14px'
instroductionText.innerText = 'Hi, BNUer, 我是你的校园卡财务小助手，很高兴认识你。现在我来带你体验一下校园卡消费数据获取、挖掘、分析和可视化过程吧。'
container.appendChild(instroductionText)

// add a get data text title to the container
var getDataTitle = document.createElement('div')
getDataTitle.id = 'getDataTitle'
getDataTitle.style.color = '#606266'
getDataTitle.style.fontSize = '20px'
getDataTitle.style.fontWeight = 'bold'
getDataTitle.style.marginTop = '10px'
getDataTitle.innerText = '二、数据获取'
container.appendChild(getDataTitle)

// add a get data text to the container
var getDataText = document.createElement('p')
getDataText.id = 'getDataText'
getDataText.style.color = '#909399'
getDataText.style.fontSize = '14px'
getDataText.innerText = `
    现在请你通过系统提供的查询功能获取系统数据：
    1.选择你要查询流水的时间。
    2.点击【历史流水查询】获取历史记录（数据不要太少，否则有bug，我懒得修哈哈哈，可以稍微选得长一点，比如2个月）。
    3.点击【获取数据】，耐心等待数据获取完成！
`
container.appendChild(getDataText)

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

// add description under process bar
var processBarDescription = document.createElement('div')
processBarDescription.id = 'processBarDescription'
processBarDescription.style.color = '#909399'
processBarDescription.style.fontSize = '14px'
processBarDescription.style.marginTop = '10px'
processBarDescription.innerText = '数据获取中...'


// Create a button to get the data
let getDataBtn = document.createElement('button')
getDataBtn.innerText = '获取数据'
getDataBtn.id = 'getDataBtn'
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
    // document.getElementsByClassName('searcharea')[0].appendChild(processBar)
    document.getElementById('container').appendChild(processBar);
    // add description under process bar
    // document.getElementsByClassName('searcharea')[0].appendChild(processBarDescription)
    document.getElementById('container').appendChild(processBarDescription);

    // get total page count and current page
    tableDataCurrentPage = parseInt(document.getElementsByClassName('active')[1].innerText)
    tableDataPageTotal = parseInt(
        document.getElementsByClassName('pagination')[0]
            .children[document.getElementsByClassName('pagination')[0]
                .children.length - 2].innerText
    );

    // hiden data display table
    document.getElementById('trjnListDiv').children[0].children[1].style.display = 'none'
    document.getElementsByClassName('pagenav')[0].style.display = 'none'

    // click next page button when page change
    document.getElementsByClassName('next')[1].children[0].click()

    // observer to page change event
    observer.observe(document.getElementById('trjnListDiv'), {
        childList: true,
        subtree: true,
        characterData: true,
    });

    event.preventDefault();
}

// Create a button to generate the report
let generateReportBtn = document.createElement('button')
generateReportBtn.innerText = '生成报告'
generateReportBtn.id = 'generateReportBtn'
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

    // add info to the page of the report
    const descInfoContainer = document.createElement('div');
    descInfoContainer.id = 'desc-info-container';
    descInfoContainer.style.color = '#909399'
    descInfoContainer.style.fontSize = '14px'
    descInfoContainer.innerText = '描述性统计：';

    // add description of the data
    const describContainer = document.createElement('div');
    describContainer.id = 'describ-container';
    describContainer.innerHTML = analysisTableData(tableData);
    describContainer.className = 'query table-scrollable no-wrap';
    describContainer.style.marginTop = '20px';
    describContainer.firstChild.className = 'table table-striped table-bordered table-hover';

    // add info to the page of the report
    const mapInfoContainer = document.createElement('div');
    mapInfoContainer.id = 'map-info-container';
    mapInfoContainer.style.color = '#909399'
    mapInfoContainer.style.fontSize = '14px'
    mapInfoContainer.innerText = '可视化展示：';

    // propmt a new problem
    const promtNewQuestion = document.createElement('div');
    promtNewQuestion.id = 'promt-new-question';
    promtNewQuestion.style.color = '#909399'
    promtNewQuestion.style.fontSize = '14px'
    promtNewQuestion.innerText = `
    完成上面的分析，你感觉怎么样？是不是觉得有趣？但似乎很简单呢？
    下面，我们提出一个新问题，并用统计模型来进一步分析：
    -----
    ·假期里，我们在学校的消费情况会显著变化吗？
    ·假设假期里我们在学校的消费情况会显著低于非假期的消费情况。
    -----
    学校提供的数据没有直接给出假期的信息，因此，接下来咱们需要对数据做进一步的处理，判断每条数据是否是假期的消费记录。
    `;


    // add a data preprocessing text title to the container
    const dataPreprocessing = document.createElement('div')
    dataPreprocessing.id = 'dataPreprocessing'
    dataPreprocessing.style.color = '#606266'
    dataPreprocessing.style.fontSize = '20px'
    dataPreprocessing.style.fontWeight = 'bold'
    dataPreprocessing.style.marginTop = '10px'
    dataPreprocessing.innerText = '三、数据预处理'

    // displayOrignData
    // preprocessData
    // displayPreproData
    var preprocessDataAddIsHoliday = preprocessData(tableData)

    // add orign data display text 
    const orignHeadFiveText = document.createElement('div');
    orignHeadFiveText.id = 'orignHeadFiveText';
    orignHeadFiveText.style.color = '#909399';
    orignHeadFiveText.style.fontSize = '14px';
    orignHeadFiveText.innerText = '原始数据：';

    // add orign data display
    const orignHeadFive = document.createElement('div');
    orignHeadFive.id = 'orignHeadFive';
    orignHeadFive.innerHTML = displayOrignData(tableData);
    orignHeadFive.className = 'query table-scrollable no-wrap';
    orignHeadFive.style.marginTop = '20px';
    orignHeadFive.firstChild.className = 'table table-striped table-bordered table-hover';

    // add preporcessing data display text 
    const preprocessDataHeadTenText = document.createElement('div');
    preprocessDataHeadTenText.id = 'preprocessDataHeadTenText';
    preprocessDataHeadTenText.style.color = '#909399';
    preprocessDataHeadTenText.style.fontSize = '14px';
    preprocessDataHeadTenText.innerText = '预处理后的数据：（删除充值记录，判断数据是否为周末的消费）';

    // add data with is holiday display
    const preprocessDataHeadTen = document.createElement('div');
    preprocessDataHeadTen.id = 'preprocessDataHeadTen';
    preprocessDataHeadTen.innerHTML = displayPreproData(preprocessDataAddIsHoliday);
    preprocessDataHeadTen.className = 'query table-scrollable no-wrap';
    preprocessDataHeadTen.style.marginTop = '20px';
    preprocessDataHeadTen.firstChild.className = 'table table-striped table-bordered table-hover';

    // add map chart
    const mapContainer = document.createElement('div');
    mapContainer.id = 'map-chart';
    mapContainer.style.marginTop = '20px';
    mapContainer.style.width = '1100px';
    mapContainer.style.height = '400px';
    drawMap(mapContainer, updateTableDataTime(tableData))

    // add t test text title to the container
    const tTest = document.createElement('div')
    tTest.id = 'tTest'
    tTest.style.color = '#606266'
    tTest.style.fontSize = '20px'
    tTest.style.fontWeight = 'bold'
    tTest.style.marginTop = '10px'
    tTest.innerText = '四、假设检验'

    // add t test text
    const tTestText = document.createElement('div');
    tTestText.id = 'tTestText';
    tTestText.style.color = '#909399';
    tTestText.style.fontSize = '14px';
    tTestText.innerText = `
    关于上面的问题，可以使用t检验（假设数据符合正太分布）来判断假期消费金额与非假期消费金额是否存在显著性差异。该检验的假设为：
    H0：假期消费金额与非假期消费金额无显著性差异
    H1：假期消费金额与非假期消费金额存在显著性差异
    我们的显著性水平是：0.05
    `;

    // add t test result text 
    const tTestResultText = document.createElement('div');
    tTestResultText.id = 'tTestResultText';
    tTestResultText.style.color = '#909399';
    tTestResultText.style.fontSize = '14px';
    tTestResultText.innerText = displayTTestResult(holidayData, nonHolidayData);

    // add box chart
    const boxContainer = document.createElement('div');
    boxContainer.id = 'box-chart';
    boxContainer.style.marginTop = '20px';
    boxContainer.style.width = '550px';
    boxContainer.style.height = '400px';
    drawBox(boxContainer, holidayData, nonHolidayData);

    // add end text title to the container
    const endTextTitle = document.createElement('div')
    endTextTitle.id = 'endTextTitle'
    endTextTitle.style.color = '#606266'
    endTextTitle.style.fontSize = '20px'
    endTextTitle.style.fontWeight = 'bold'
    endTextTitle.style.marginTop = '10px';
    endTextTitle.innerText = '五、结语'

    // add end text to the container
    const endText = document.createElement('div');
    endText.id = 'endText';
    endText.style.color = '#909399';
    endText.style.fontSize = '14px';
    endText.innerText = `
        这里... 暂时没想好写什么，先这样吧
    `;
    

    // add the desc and chart to the page
    document.getElementById('container').appendChild(descInfoContainer);
    document.getElementById('container').appendChild(describContainer);
    document.getElementById('container').appendChild(mapInfoContainer);
    document.getElementById('container').appendChild(mapContainer);
    document.getElementById('container').appendChild(promtNewQuestion);

    document.getElementById('container').appendChild(dataPreprocessing);
    document.getElementById('container').appendChild(orignHeadFiveText);
    document.getElementById('container').appendChild(orignHeadFive);
    document.getElementById('container').appendChild(preprocessDataHeadTenText);
    document.getElementById('container').appendChild(preprocessDataHeadTen);

    document.getElementById('container').appendChild(tTest);
    document.getElementById('container').appendChild(tTestText);
    document.getElementById('container').appendChild(boxContainer);
    document.getElementById('container').appendChild(tTestResultText);

    document.getElementById('container').appendChild(endTextTitle);
    document.getElementById('container').appendChild(endText);
    event.preventDefault();
}

// const STATE_ON = 'ON';
// const STATE_OFF = 'OFF';
// chrome.runtime.onMessage.addListener((message) => {
//     console.log(message.extension)
//     if (message.extension === STATE_ON) {
//         // add the getDataBtn to the page when the extension is on
//         document.getElementsByClassName('col-md-12')[1].appendChild(getDataBtn)
//         // add the generateReportBtn to the page when the extension is on
//         document.getElementsByClassName('col-md-12')[1].appendChild(generateReportBtn)
//         // add all elements container to the page when the extension is on
//         document.getElementsByClassName('searcharea')[0].appendChild(container)
//     }else if (message.extension === STATE_OFF){
//         // remove the button from the page when the extension is off 
//         document.getElementsByClassName('col-md-12')[1].removeChild(document.getElementById('getDataBtn'))
//         document.getElementsByClassName('col-md-12')[1].removeChild(document.getElementById('generateReportBtn'))
//         // remove all elements container from the page when the extension is off
//         document.getElementsByClassName('searcharea')[0].removeChild(document.getElementById('container'))
//         // remove the observer from the page when the extension is off
//         observer.disconnect();
//         // reset the tableData
//         tableData = [];

//     }
// });


// add all elements container to the page when the extension is on
document.getElementsByClassName('searcharea')[0].appendChild(container)
// add the getDataBtn to the page when the extension is on
container.appendChild(getDataBtn)


// Create a MutationObserver to detect changes to the DOM tree
const observer = new MutationObserver(() => {
    tableData = tableData.concat(extractCurrentPageTableData());
    // current page
    tableDataCurrentPage = parseInt(document.getElementsByClassName('active')[1].innerText);
    // hiden data display table
    document.getElementById('trjnListDiv').children[0].children[1].style.display = 'none';
    document.getElementsByClassName('pagenav')[0].style.display = 'none';
    processBarText.innerText = Math.round(tableDataCurrentPage / tableDataPageTotal * 100) + '%';
    processBarInner.style.width = Math.round(tableDataCurrentPage / tableDataPageTotal * 100) + '%';
    document.getElementById('processBarDescription').innerText = `正在获取数据...当前进度：${tableDataCurrentPage}/${tableDataPageTotal}`;
    if (tableDataCurrentPage === tableDataPageTotal) {
        // Stop observing changes to the body element
        observer.disconnect();
        document.getElementById('processBarDescription').innerText = `数据获取完成！接下来，你可以点击【生成报告】按钮来对数据进行简单的分析，了解你在所选时间区间中的消费情况。例如，我在学校一共消费了多少次，花了多少钱？消费金额方差最大或最小的地方是哪些？方差较大可能代表你在这里的消费很多样，而方差较小的地方代表你消费很专一...`
        // add the generateReportBtn to the page when the extension is on
        container.appendChild(generateReportBtn);
    }
    document.getElementsByClassName('next')[1].children[0].click();
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


function displayOrignData(tableData) {
    const df = new dataForge.DataFrame(tableData);
    const sample = df.head(5);
    return sample.toHTML()
}

/**
 * 
 * @param {*} dateStr
 * @param {*} holidays
 * @returns
 * @example
*/
function isHoliday(dateStr) {
    // 将日期字符串转换为日期对象
    const date = new Date(dateStr);

    // 判断是否为周六或周日
    if (date.getDay() === 0 || date.getDay() === 6) {
        return true;
    }

    // 如果以上条件都不符合，则认为该日期不是节假日
    return false;
}

function preprocessData(tableData) {
    const df = new dataForge.DataFrame(tableData);
    const filtered = df.filter(row => row.merchant != '');

    var currentRowIsHoliday = false;
    const dfAddCloumn = filtered.generateSeries(row => {
        currentRowIsHoliday = isHoliday(row.time);
        if (currentRowIsHoliday) {
            holidayData.push(row.amount);
        } else {
            nonHolidayData.push(row.amount);
        }
        return {
            'isHoliday': currentRowIsHoliday,
            'year': row.time.split('/')[0],
        }
    });

    return dfAddCloumn;
}

function displayPreproData(df) {
    const sample = df.head(10);
    return sample.toHTML()
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
                fontSize: 16
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

function calcBoxplotData(data) {
    const sortedData = [...data].sort((a, b) => a - b); // 复制data来避免改变原始数据
    const len = sortedData.length;
    const median = len % 2 === 0 ? (sortedData[len / 2 - 1] + sortedData[len / 2]) / 2 : sortedData[(len - 1) / 2];
    const lowerQuartile = sortedData[Math.floor(len / 4)];
    const upperQuartile = sortedData[Math.floor(len * 3 / 4)];
    const interQuartileRange = upperQuartile - lowerQuartile;
    const lowerWhisker = sortedData.find(d => d >= lowerQuartile - 1.5 * interQuartileRange) || sortedData[0];
    sortedData.reverse();
    const upperWhisker = sortedData.find(d => d <= upperQuartile + 1.5 * interQuartileRange) || sortedData[len - 1];
    sortedData.reverse();

    return [sortedData[0], lowerQuartile, median, upperQuartile, sortedData[len - 1], lowerWhisker, upperWhisker];
}

function drawBox(chartDom, holidayData, nonHolidayData) {
    const holidayBoxplotData = calcBoxplotData(holidayData);
    const nonHolidayBoxplotData = calcBoxplotData(nonHolidayData);

    var myChart = echarts.init(chartDom);

    var option;

    // 将数据传给 echarts 箱线图插件
    option = {
        legend: {
            data: ['假期消费', '非假期消费']
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['假期消费', '非假期消费']
        },
        yAxis: {
            type: 'value',
            name: '消费金额'
        },
        series: [
            {
                name: '假期消费',
                type: 'boxplot',
                data: [holidayBoxplotData],
                tooltip: {
                    formatter: params => {
                        return ['最小值', '下四分位数', '中位数', '上四分位数', '最大值', '下界', '上界']
                            .map((key, idx) => {
                                return `${key}: ${params.value[idx + 1]}`;
                            }).join('<br/>');
                    }
                }
            },
            {
                name: '非假期消费',
                type: 'boxplot',
                data: [nonHolidayBoxplotData],
                tooltip: {
                    formatter: params => {
                        return ['最小值', '下四分位数', '中位数', '上四分位数', '最大值', '下界', '上界']
                            .map((key, idx) => {
                                return `${key}: ${params.value[idx + 1]}`;
                            }).join('<br/>');
                    }
                }
            }
        ]
    };

    return myChart.setOption(option);
}


function displayTTestResult(holidayData, nonHolidayData) {
    const significanceLevel = 0.05;
    const pValue = ttest2(holidayData, nonHolidayData).pValue;
    const result = pValue < significanceLevel ? '拒绝原假设' : '接受原假设';
    return `p值为${pValue.toFixed(4)}，${result}`;
}