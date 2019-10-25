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

/*========================= INTRO =========================*/

/* gitHubLink.addEventListener('click', () => {
    chrome.tabs.create({ url: "https://github.com/Elliot67/HigherOrLower" });
}); */