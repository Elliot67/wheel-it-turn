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
        let id;
        do {
            id = Math.floor(Math.random() * MAX_TABS);
        } while (tabsId.includes(id))
        console.log('tab' + id);
        this.tabId = id;
        tabsId.push(this.tabId);
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
        addTabDestination.insertAdjacentHTML('beforeEnd', '<p class="itemElement" style="background-color: ' + this.color + '" data-tabId="' + this.tabId + '" data-itemId="' + this.itemId + '">' + this.name + '</p>');
    }
}


// Manage Tabs
const MAX_TABS = 100;
let tabs = [];
let tabsId = [];
const colorThemes = [["00868b", "c4cd3e", "b2513f", "004e64", "00a5cf"], ["247ba0", "70c1b3", "b2dbbf", "f3ffbd", "ff1654"]];

let addTabButton = document.getElementById('addTab');
let addTabDestination = document.getElementsByClassName('tabContainer')[0];
addTabButton.addEventListener('click', function () {
    if (tabsId.length < MAX_TABS) {
        tabs.push(new Tab('Première tab', '#A1F3E5'));
    }
});

// Suppression d'une tab -> utilisé filter(obj => obj.id == idRecherché) pour trouver la bonne tab


// Manage Items
const MAX_ITEMS = 100;
let itemSection = document.getElementById('items');