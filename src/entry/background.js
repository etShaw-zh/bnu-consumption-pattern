
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

const STATE_ON = 'ON';
const STATE_OFF = 'OFF';

chrome.runtime.onInstalled.addListener(() => {
    console.log('onInstalled');
    chrome.action.setBadgeText({ text: STATE_OFF });
});

var scriptExecuted = false;

chrome.action.onClicked.addListener(async (tab) => {
    console.log('onClicked');
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === STATE_ON ? STATE_OFF : STATE_ON;

    await chrome.action.setBadgeText({ text: nextState, tabId: tab.id });

    if (nextState === STATE_ON) {
        console.log('current state is on');
        if (!scriptExecuted) {
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['/content.js']
            });
            scriptExecuted = true;
        }
    }
    console.log(nextState);
    await chrome.tabs.sendMessage(tab.id, { extension: nextState });

});
