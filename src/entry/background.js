
fetch('http://card.bnu.edu.cn/CardManage/CardInfo/TrjnList?beginTime=2023-02-01&endTime=2023-02-28&type=1&pageindex=2').then(res => {
    return res.text();
}).then(res => {
    console.log(res);
});



console.log('hello world background todo something~')

// chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
//     console.log(sender.tab ? "Message from a content script:" + sender.tab.url : "Message from the extension");
//     if (request.greeting == "send current table data") {
//         sendResponse({
//             farewell: {
//                 allTableData: request.currentPageTableData,
//                 continue: true
//             }
//         });
//     }

// });


// // Listen for messages sent by the content script
// chrome.runtime.onMessage.addListener((message, sender) => {
//     console.log(sender.tab ? "content change" : "from the extension");
//     if (message.type === 'contentChanged') {
//       // Do something with the content change here
//       console.log(message.mutations);
//     }
//   });

