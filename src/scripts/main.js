/*========================= NAVIGATION =========================*/

// Arrows
const body = document.querySelector('body');
let arrows = document.getElementsByClassName('navArrow');
for (let i = 0; i < arrows.length; i++) {
    arrows[i].addEventListener('click', (obj) => {
        let redirection = obj.target.getAttribute('data-redirection');
        body.setAttribute('class', redirection);
    });
}

// Intro
document.getElementById('intro').addEventListener('click', () => {
    body.setAttribute('class', 'tabs');
});

// Click on Tabs
let tabElements = document.getElementsByClassName('tabContainer')[0].children;
for (let i = 0; i < tabElements.length; i++) {
    tabElements[i].addEventListener('click', (obj) => {
        let currentTab = obj.target.getAttribute('data-tabId');
        body.setAttribute('class', 'app');
        console.log('redirection avec :' + currentTab);
    });
}

/*========================= INTRO =========================*/

gitHubLink.addEventListener('click', () => {
    chrome.tabs.create({ url: "https://github.com/Elliot67/HigherOrLower" });
    event.preventDefault();
});