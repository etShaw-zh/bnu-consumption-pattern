console.log('hello world content todo something~')

// // open the database
// const dbName = "bunConsuptionPattern";
// const objectStoreName = "bnuConsuptionPatternTable";
// const version = 1;
// const request = indexedDB.open(dbName, version);
// // create object store
// request.onupgradeneeded = (event) => {
//     const db = event.target.result;
//     db.createObjectStore(objectStoreName, { keyPath: "id" });
// };




// Create a button to generate the report
let btn = document.createElement('button')
btn.innerText = '生成消费报表'
btn.style.background = "#67C23A"
btn.style.border = "1px solid #cdcdcd"
btn.style.color = "#fff"
btn.style.padding = "6px 15px"
btn.style.marginRight = "10px"
btn.style.fontWeight = "normal"
btn.style.fontSize = "15px"
btn.style.textShadow = "none"
btn.style.borderRadius = "3px"
btn.style.lineHeight = "1.5"
btn.style.display = "inline-block"
btn.style.marginBottom = "0"
btn.style.textAlign = "center"
btn.style.cursor = "pointer"
btn.onclick = function (event) {
    console.log(extractCurrentPageTableData())
    document.getElementsByClassName('next')[1].children[0].click()
    event.preventDefault();
}
// Append the button to the page
document.getElementsByClassName('col-md-12')[1].appendChild(btn)


// Create a MutationObserver to detect changes to the DOM tree
const observer = new MutationObserver(() => {
    console.log(extractCurrentPageTableData())
    document.getElementsByClassName('next')[1].children[0].click()
});

// Start observing changes to the body element
observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
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
            amount: row.querySelector('td:nth-child(4)').textContent.trim(),
            balance: row.querySelector('td:nth-child(5)').textContent.trim()
        };

        // Push the data to the global array
        currentPageTableData.push(data);
    }

    // return the extracted current page table data
    return currentPageTableData
}