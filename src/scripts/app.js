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


function navigateToTab(selectedTab) { // selectedTab: id
    // remove Items
    let itemsToRemove = itemsContainer.querySelectorAll(".itemElement:not(#itemInput)");
    for (let itemToRemove of itemsToRemove) {
        itemsContainer.removeChild(itemToRemove);
    }
    // load new Items
    let clickedTab = tabs.filter(obj => obj.tabId == selectedTab)[0];
    for (itemToAdd of clickedTab.items) {
        console.log(itemToAdd);
        itemToAdd.createElement(true);
    }
    // redirect
    body.setAttribute('class', 'app');
    document.getElementById('app').setAttribute('data-tabId', selectedTab);
    console.log('Tab utilisée : ' + selectedTab);
}

/*========================= INTRO =========================*/

gitHubLink.addEventListener('click', () => {
    chrome.tabs.create({ url: "https://github.com/Elliot67/wheel-it-turn" });
    event.preventDefault();
});


/*========================= APP =========================*/

class Tab {
    constructor(name, colorTheme) {
        this.tabId;
        this.colorTheme = colorTheme;
        this.name = name;
        this.items = [];
        this.createTabId();
        this.createElement();
    }

    createTabId() {
        let id;
        do {
            id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase();
        } while (tabs.filter(obj => obj.tabId == id)[0] != undefined)
        this.tabId = id;
    }

    createElement() {
        let tabTemplate = `<div class="tabElement" data-tabId="${this.tabId}">
        <div class="tabElementColor" style="background-color: ${this.colorTheme};"></div>
        <input class="tabElementText" type="text" value="${this.name}"/>
        <span class="tabElementDelete">o</span>
        </div>`;
        tabInput.insertAdjacentHTML('beforebegin', tabTemplate);
        let tabElement = document.querySelector("[data-tabId='" + this.tabId + "']");
        tabElement.addEventListener('click', (obj) => {
            let selectedTab = obj.target.getAttribute('data-tabId');
            console.log(obj.target);
            navigateToTab(selectedTab); //TODO: FIXME: Mettre uniquement flèche à droite cliquable pour aller sur l'app
        });
        console.log('CREATION TAB ' + this.tabId);
    }

    addItem(name, color) {
        this.items.push(new Item(this, name, color));
        this.updateWheelColors();
    }

    updateWheelColors(){
        let totalItems = this.items.length;
        let background = "conic-gradient(" ;
        let currentRotation = 0;
        for (let i = 0; i < totalItems; i++) {
            console.log(currentRotation);
            background += this.items[i].color + " " + currentRotation + "%, ";
            background += this.items[i].color + " " + (100/totalItems + currentRotation) + "%";
            currentRotation += 100/totalItems;
            if(i + 1!= totalItems){
                background += ", ";
            } else{
                background += ")"
            }
        }
        wheelElement.style.background = background;
        console.log("NOUVEAU BACKGROUND " + background);
    }

}

class Item {
    constructor(tab, name, color) {
        this.tab = tab;
        this.itemId;
        this.name = name;
        this.color = color;
        this.createItemdId();
        this.createElement();
    }

    createItemdId() {
        let id;
        do {
            id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase();
        } while (this.tab.items.filter(obj => obj.itemId == id)[0] != undefined)
        this.itemId = id;
    }

    createElement(alreadyCreated = false) {
        if (!alreadyCreated) {
            itemInput.querySelector('.itemElementColor').style.backgroundColor = colorThemes[this.tab.colorTheme][1][this.tab.colorTheme.length]; //TODO: Faire autrement
        }
        let itemTemplate = `<div class="itemElement" data-itemId="${this.itemId}">
<div class="itemElementColor" style="background-color: ${this.color};"></div>
<input class="itemElementText" type="text" value="${this.name}"/>
<span class="itemElementDelete">o</span>
</div>`;
        itemInput.insertAdjacentHTML('beforebegin', itemTemplate);
        console.log('CREATION ITEM ' + this.itemId + ' pour ' + this.tab.tabId);

        //let background = getComputedStyle(wheelElement, null).getPropertyValue('background');
        //let gradientRegex = "~conic-gradient\((.*)\)~"; MAY BE USEFULL FOR A NEXT TIME
        //let colorsRegex = "~rgb\([0-9, ]+\)[0-9% ]+~";

        // TODO: Ajout EventListener au changement de la valeur de l'input & sauvegarde du nom
    }
}

/*========================= MANAGE TABS =========================*/

//Trouver une tab -> utilisé filter(obj => obj.tabId == idRecherché)
let tabs = [];
const MAX_TABS = 100;
const colorThemes = {
    'rgb(128, 0, 128)': ["rgb(128, 0, 128)", ["#00868b", "#c4cd3e", "#b2513f", "#004e64", "#00a5cf"]],
    'default': ["rgb(128, 0, 128)", ["#00868b", "#c4cd3e", "#b2513f", "#004e64", "#00a5cf"]],
    '#00868b': ["#00868b", ["#00868b", "#c4cd3e", "#b2513f", "#004e64", "#00a5cf"]],
    '#247ba0': ["#247ba0", ["#247ba0", "#70c1b3", "#b2dbbf", "#f3ffbd", "#ff1654"]]
};

// ADD TAB
const tabInput = document.getElementById('tabInput');
const tabInputColorTheme = tabInput.querySelector('div');
const tabInputName = tabInput.querySelector('input');

tabInputName.addEventListener('keypress', (e) => {
    if (e.keyCode === 13 && tabs.length < MAX_TABS) {
        let name = tabInputName.value;
        let colorTheme = getComputedStyle(tabInputColorTheme, null).getPropertyValue('background-color');
        let newTab = new Tab(name, colorTheme);
        tabs.push(newTab);
        navigateToTab(newTab.tabId);
        tabInputName.value = "";
        tabInputColorTheme.style.backgroundColor = colorThemes['default'][0];
    }
});


/*========================= MANAGE ITEMS =========================*/

const MAX_ITEMS = 100;

// ADD ITEM
const itemsContainer = document.getElementById('itemsContainer');
const itemInput = document.getElementById('itemInput');
const itemInputColor = itemInput.querySelector('div');
const itemInputName = itemInput.querySelector('input');
//const itemInputActive = itemInput.querySelector('span'); TODO: Plus tard

itemInputName.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        let name = itemInputName.value;
        let color = getComputedStyle(itemInputColor, null).getPropertyValue('background-color');
        let currentTabId = document.getElementById('app').getAttribute('data-tabId');
        let currentTab = tabs.filter(obj => obj.tabId == currentTabId);
        currentTab[0].addItem(name, color);
        itemInput.querySelector('.itemElementText').value = ""; // TODO: Reset l'input de base & changer la couleur en fonction du tableau
    }
});

/*========================= TURN THE WHEEL =========================*/


let wheelElement = document.getElementById('wheel');
let wheelRunning = false;
let currentRotation = 0;
wheelElement.addEventListener('click', () => {
    if(!wheelRunning){
        wheelRunning = true;
        let selectedTabId = document.getElementById('app').getAttribute('data-tabId');;
        selectWinner(selectedTabId);
    } else{
        console.log('ALREADY RUNNING');
        // TODO: Message -> the wheel is already running
    }
});

function selectWinner(selectedTabId) {
    let currentTab = tabs.filter(obj => obj.tabId == selectedTabId)[0];
    let total = currentTab.items.length;
    let randomNumber = 0;
    switch (total) {
        case 0:
            console.log('No item');
            wheelRunning = false;
            break;
        case 1:
            randomNumber = 1;
            rotateWheel(Math.floor(Math.random() * (360 + 1))); // [0-360]
            break;
        default:
            randomNumber = Math.floor(Math.random() * total + 1); // [1-total]
            turnWheel(randomNumber, total);
            break;
    }
}

function turnWheel(randomNumber, total) {
    let minDeg = 360 / total * randomNumber - 360 / total;
    let maxDeg = 360 / total * randomNumber;
    if (minDeg != maxDeg || minDeg + 1 != maxDeg) {
        let rotation = minDeg + Math.floor(Math.random() * ((360 / total) + 1)); // [0-360/total]
        console.log(total, randomNumber, minDeg, maxDeg, rotation);
        rotateWheel(rotation);
    } else{
        console.log("Too many element on the wheel");
    }
}

function rotateWheel(rotation){
    rotation += 360 * ((Math.floor(Math.random() * 5)) + 4); // [1440-2880] Between 4 to 8 turn

    const animation = wheelElement.animate([
        { transform: `rotate(-${currentRotation}deg)` },
        { transform: `rotate(-${rotation}deg)` }
      ], { 
        easing: "cubic-bezier(0.35,0.39,0.46,1)",
        duration: 4000,
        iterations: 1,
        fill: "forwards"
      });

      animation.onfinish = function() {
        console.log("END OF ANIMATION");
        currentRotation = rotation % 360;
        wheelRunning = false;
      };
}