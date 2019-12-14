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
        itemToAdd.createElement();
        clickedTab.updateWheelColors();
    }
    // redirect
    body.setAttribute('class', 'app');
    document.getElementById('app').setAttribute('data-tabId', selectedTab);
    console.log('%c[TAB]', 'color: #d8d342', 'going to ' + selectedTab);
}


/*========================= INTRO =========================*/

gitHubLink.addEventListener('click', () => {
    chrome.tabs.create({ url: "https://github.com/Elliot67/wheel-it-turn" });
    event.preventDefault();
});


/*========================= APP =========================*/

class Tab {
    constructor(name, startColor, endColor) {
        this.tabId;
        this.name = escape(name);
        this.startColor = startColor;
        this.endColor = endColor;
        this.palette;
        this.items = [];
        this.createTabId();
        this.createElement();
        this.updateColorPalette();
    }

    createTabId() {
        let id;
        do {
            id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase();
        } while (tabs.filter(obj => obj.tabId == id)[0] != undefined)
        this.tabId = id;
    }

    createElement() { //FIXME: Changer le startColor en dessous
        let tabTemplate = `<div class="tabElement" data-tabId="${this.tabId}">
        <div class="tabElementColor" style="background-color: ${this.startColor};"></div>
        <input class="tabElementText" type="text" value="${this.name}"/>
        <span class="tabElementDelete">o</span>
        </div>`;
        tabInput.insertAdjacentHTML('beforebegin', tabTemplate);
        let tabElement = document.querySelector("[data-tabId='" + this.tabId + "']");
        tabElement.addEventListener('click', (obj) => { //TODO: Mettre uniquement flèche à droite cliquable pour aller sur l'app
            let selectedTab = obj.target.getAttribute('data-tabId');
            console.log('%c[TAB]', 'color: #d8d342', 'selected tab ' + selectedTab);
            navigateToTab(selectedTab);
        });

        const tabNameElement = document.querySelector('[data-tabId=' + this.tabId + '] .tabElementText');
        tabNameElement.addEventListener('input', () => {
            this.name = escape(tabNameElement.value);
            saveData();
        });
        console.log('%c[TAB]', 'color: #d8d342', 'creating tab ' + this.tabId);
    }

    addItem(name) {
        this.items.push(new Item(this, name));
        this.updateColorPalette();
        console.log(this.palette);
        this.updateItemsColor();
        this.updateWheelColors();
    }

    updateWheelColors(){
        let totalItems = this.items.length;
        let background = "conic-gradient(" ;
        let currentRotation = 0;
        for (let i = 0; i < totalItems; i++) {
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
        console.log('%c[UPDATE]', 'color: #4293d8', 'wheel update');
    }

    updateColorPalette(){
        if(this.items.length > 2){
            this.palette = [];
            this.palette.push(`rgb(${this.startColor.r}, ${this.startColor.g}, ${this.startColor.b})`);
    
            let red = Math.round((this.endColor.r - this.startColor.r) / this.items.length);
            let green = Math.round((this.endColor.g - this.startColor.g) / this.items.length);
            let blue = Math.round((this.endColor.b - this.startColor.b) / this.items.length);

            let intermediateColor = Object.create(this.startColor);
            for (let i = 0; i < this.items.length - 2; i++) {
                intermediateColor.r += red;
                intermediateColor.g += green;
                intermediateColor.b += blue;
        
              this.palette.push(`rgb(${intermediateColor.r}, ${intermediateColor.g}, ${intermediateColor.b})`);
            }
        
            this.palette.push(`rgb(${endColor.r}, ${endColor.g}, ${endColor.b})`);
        } else if(this.items.length == 1){
            this.palette = [
                `rgb(${this.startColor.r}, ${this.startColor.g}, ${this.startColor.b})`,
                `rgb(${this.endColor.r}, ${this.endColor.g}, ${this.endColor.b})`
            ];
        }
    }

    updateItemsColor(){
        let itemsColors = document.querySelectorAll('.itemElementColor');
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].color = this.palette[i];
            itemsColors[i].style.backgroundColor = this.palette[i];
        }
    }

}

class Item {
    constructor(tab, name, generation = false) {
        this.tab = tab;
        this.itemId;
        this.name = escape(name);
        this.color;
        this.createItemdId();
        if(!generation){
            this.createElement();
        }
    }

    createItemdId() {
        let id;
        do {
            id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase();
        } while (this.tab.items.filter(obj => obj.itemId == id)[0] != undefined)
        this.itemId = id;
    }

    createElement() {
        let itemTemplate = `<div class="itemElement" data-itemId="${this.itemId}">
<div class="itemElementColor"></div>
<input class="itemElementText" type="text" value="${this.name}"/>
<span class="itemElementDelete">o</span>
</div>`;
        itemInput.insertAdjacentHTML('beforebegin', itemTemplate);
        const itemNameElement = document.querySelector('[data-itemId=' + this.itemId + '] .itemElementText');
        itemNameElement.addEventListener('input', () => {
            this.name = escape(itemNameElement.value);
            saveData();
        });
        console.log('%c[ITEM]', 'color: #42d889', 'new item ' + this.itemId);
    }
}


/*========================= MANAGE TABS =========================*/

//Tips: Pour trouver une tab -> utilisé filter(obj => obj.tabId == idRecherché)
let tabs = [];
const MAX_TABS = 100;
const startColor = {
    r: 255,
    g: 0,
    b: 0
}
const endColor = {
    r: 0,
    g: 255,
    b: 0
}

// ADD TAB
const tabInput = document.getElementById('tabInput');
const tabInputColorTheme = tabInput.querySelector('div');
const tabInputName = tabInput.querySelector('input');

tabInputName.addEventListener('keypress', (e) => {
    if (e.keyCode === 13 && tabs.length < MAX_TABS) {
        let name = tabInputName.value;
        let newTab = new Tab(name, startColor, endColor);
        tabs.push(newTab);
        navigateToTab(newTab.tabId);
        tabInputName.value = "";
    }
});


/*========================= MANAGE ITEMS =========================*/

const MAX_ITEMS = 100;

// ADD ITEM
const itemsContainer = document.getElementById('itemsContainer');
const itemInput = document.getElementById('itemInput');
const itemInputColor = itemInput.querySelector('div');
const itemInputName = itemInput.querySelector('input');

itemInputName.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        let name = itemInputName.value;
        let currentTabId = document.getElementById('app').getAttribute('data-tabId');
        let currentTab = tabs.filter(obj => obj.tabId == currentTabId);
        currentTab[0].addItem(name); // FIXME: Changer la couleur
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
        console.log('%c[WHEEL]', 'color: #d84242', 'already running');
        // TODO: Message -> the wheel is already running
    }
});

function selectWinner(selectedTabId) {
    let currentTab = tabs.filter(obj => obj.tabId == selectedTabId)[0];
    let total = currentTab.items.length;
    let randomNumber = 0;
    switch (total) {
        case 0:
            console.log('%c[WHEEL]', 'color: #d84242', 'no items');
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
        console.log('%c[WHEEL]', 'color: #d84242', 'total: ' + total, 'randomNumber: ' + randomNumber, 'minDeg: ' + minDeg, 'maxDeg: ' + maxDeg, 'rotation: ' + rotation);
        rotateWheel(rotation);
    } else{
        console.log('%c[WHEEL]', 'color: #d84242', 'too many items');
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
        console.log('%c[WHEEL]', 'color: #d84242', 'animation finished');
        currentRotation = rotation % 360;
        wheelRunning = false;
      };
}


/*========================= SAVE AND LOAD THE DATA =========================*/

function saveData(){
    console.log('%c[DATA]', 'color: #ba42d8', 'saving data');
    let data = [];
    for (let i = 0; i < tabs.length; i++) {
        let tab = {
            name: tabs[i].name,
            startColor: tabs[i].startColor,
            endColor: tabs[i].endColor,
        };
        let items = []
        for (let j = 0; j < tabs[i].items.length; j++) {
            let item = {
                name: tabs[i].items[j].name,
                color: tabs[i].items[j].color
            }
            items.push(item);
        }
        group = {
            tab: tab,
            items: items
        }
        data.push(group);
    }
    console.log('%c[DATA]', 'color: #ba42d8', data);
    data = JSON.stringify(data);
	chrome.storage.sync.set({ wheel_data: data }, () => console.log('%c[DATA]', 'color: #ba42d8', 'data has been saved'));
}

new Promise((resolve) => {
    console.log('%c[DATA]', 'color: #ba42d8', 'importing data');
    chrome.storage.sync.get(['wheel_data'], function (result) {
        resolve(result.wheel_data);
    });
}).then((data) => {
    if(data != "" && data != undefined){
        data = JSON.parse(data);
        console.log('%c[DATA]', 'color: #ba42d8', data);
        for(group of data){
            let newTab = new Tab(group.tab.name, group.tab.startColor, group.tab.endColor);
            tabs.push(newTab);
            for(item of group.items){
                newTab.items.push(new Item(newTab, item.name, true)); // FIXME: paramètre generation ? & il faut actualiser les couleurs
            }
        }
        console.log('%c[DATA]', 'color: #ba42d8', 'data has been imported');
    }
});


/*========================= USEFULL =========================*/

function escape(text) {
    var map = {
      '"': '&quot;',
      "'": '&#039;',
      "'": '&#39;',
      "{": '&#123;',
      "}": "&#125;",
      "\\": '&#92;'
    };
    return text.replace(/["''{}\\]/g, function(m) { return map[m]; });
  }