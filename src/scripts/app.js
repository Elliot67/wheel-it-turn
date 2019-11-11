/*========================= APP =========================*/

class Tab {
    constructor(name, color) {
        this.tabId;
        this.colorTheme;
        this.name = name;
        this.color = color;
        this.itemsId = [];
        this.items = [];
        this.createTabId();
        this.createElement();
    }

    createTabId() {
        let id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase();
        console.log('tab' + id);
        this.tabId = id;
    }

    createElement() {
        addTabDestination.insertAdjacentHTML('beforeEnd', '<div class="tabElement" style="background-color: ' + this.color + '" data-tabId="' + this.tabId + '">' + this.name + '</div>');
        let tab = document.querySelector("[data-tabId='" + this.tabId + "']");
        console.log("TRUC" + tab);
        tab.addEventListener('click', (obj) => {
            let selectedTab = obj.target.getAttribute('data-tabId');
            navigateToTab(selectedTab);
        });
    }

    addItem(name, color) {
        this.items.push(new Item(this, name, color));
    }
}


class Item {
    constructor(tab, name, color) {
        console.log(tab);
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
            id = Math.floor(Math.random() * MAX_ITEMS);
        } while (this.tab.itemsId.includes(id))
        console.log('item: ' + id);
        this.itemId = id;
        this.tab.itemsId.push(this.itemId);
    }

    createElement() {
        let itemInput = document.getElementById('itemInput');
        itemInput.querySelector('.itemElementColor').style.backgroundColor = "red"; //TODO: Adapter la couleur avec le thème de la tab
        itemInput.querySelector('.itemElementText').value = "";
        let itemTemplate = `<div class="itemElement" data-itemId="${this.itemId}">
<div class="itemElementColor" style="background-color: ${this.color};"></div>
<input class="itemElementText" type="text" value="${this.name}"/>
<span class="itemElementDelete">o</span>
</div>`;
        itemInput.insertAdjacentHTML('beforebegin', itemTemplate);
    }
}


// Manage Tabs
const MAX_TABS = 100;
let tabs = [];
const colorThemes = {
    'premier': ["00868b", "c4cd3e", "b2513f", "004e64", "00a5cf"],
    'deuxieme': ["247ba0", "70c1b3", "b2dbbf", "f3ffbd", "ff1654"]
};

let addTabButton = document.getElementById('addTab');
let addTabDestination = document.getElementsByClassName('tabContainer')[0];
addTabButton.addEventListener('click', function () {
    if (tabs.length < MAX_TABS) {
        tabs.push(new Tab('Première tab', '#A1F3E5'));
    }
});

// Suppression d'une tab -> utilisé filter(obj => obj.tabId == idRecherché) pour trouver la bonne tab


// Manage Items
const MAX_ITEMS = 100;
let itemSection = document.getElementById('items');


/*========================= ADD ITEM =========================*/

const itemInput = document.getElementById('itemInput');
const itemInputColor = itemInput.querySelector('div');
const ItemInputName = itemInput.querySelector('input');
//const itemInputActive = itemInput.querySelector('span'); TODO: Plus tard

ItemInputName.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        let name = ItemInputName.value;
        let color = itemInputColor.style.backgroundColor;
        let currentTabId = document.getElementById('app').getAttribute('data-tabId');
        let currentTab = tabs.filter(obj => obj.tabId == currentTabId);
        currentTab[0].addItem(name, color);
        // Supprimer le texte
    }
});