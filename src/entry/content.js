const dataForge = require('data-forge');
require('data-forge-fs'); // For readFile/writeFile.

console.log('hello world content todo something~')
var tableData = []

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
    tableData = tableData.concat(extractCurrentPageTableData())
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
    const container = document.createElement('div');
    container.innerHTML = analysisTableData(tableData);
    container.className = 'table-scrollable no-wrap';
    container.style.marginTop = '20px';
    container.firstChild.className = 'table table-striped table-bordered table-hover';
    document.getElementsByClassName('table-scrollable no-wrap')[0].appendChild(container);
    event.preventDefault();
}
// Append the button to the page
// document.getElementsByClassName('searcharea')[0].appendChild(generateReportBtn)
document.getElementsByClassName('col-md-12')[1].appendChild(generateReportBtn)


// Create a MutationObserver to detect changes to the DOM tree
const observer = new MutationObserver(() => {
    tableData = tableData.concat(extractCurrentPageTableData())
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
            amount: Number(row.querySelector('td:nth-child(4)').textContent.trim().replace('￥', '')),
            balance: Number(row.querySelector('td:nth-child(5)').textContent.trim().replace('￥', ''))
        };

        // Push the data to the global array
        currentPageTableData.push(data);
    }

    // return the extracted current page table data
    return currentPageTableData
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
    var dfByMerchantRes = {
        'merchant': [],
        'total': [],
        'mean': [],
        'std': [],
        'count': []
    }
    for (const dfByMerchantGroup of dfByMerchant) {
        // ... do something with each product group ...
        const merchant = dfByMerchantGroup.first().merchant;
        const totalMerchantForProduct = dfByMerchantGroup.deflate(consumption => consumption.amount).sum();
        const meanMerchantForProduct = dfByMerchantGroup.deflate(consumption => consumption.amount).mean();
        const stdMerchantForProduct = dfByMerchantGroup.deflate(consumption => consumption.amount).std();
        const countMerchantForProduct = dfByMerchantGroup.deflate(consumption => consumption.amount).count();
        dfByMerchantRes.merchant.push(merchant)
        dfByMerchantRes.total.push(totalMerchantForProduct)
        dfByMerchantRes.mean.push(meanMerchantForProduct)
        dfByMerchantRes.std.push(stdMerchantForProduct)
        dfByMerchantRes.count.push(countMerchantForProduct)
    }
    console.log(dfByMerchantRes)
    var data = []
    for (var i = 0; i < dfByMerchantRes.merchant.length; i++) {
        data.push({
            '商户': dfByMerchantRes.merchant[i] === '' ? '充值' : dfByMerchantRes.merchant[i],
            '汇总': dfByMerchantRes.total[i].toFixed(2),
            '均值': dfByMerchantRes.mean[i].toFixed(2),
            '标准差': dfByMerchantRes.std[i].toFixed(2),
            '笔数': dfByMerchantRes.count[i].toFixed(2)
        })
    }
    const dfData = new dataForge.DataFrame(data);
    // console.log(dfData.toHTML())
    return dfData.toHTML()
}
