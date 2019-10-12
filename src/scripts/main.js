// Footer
gitHubLink.addEventListener('click', () => {
    chrome.tabs.create({ url: "https://github.com/Elliot67/HigherOrLower" });
});


// The extension

class Tab {
    constructor(name, color) {
        this.tabId;
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
        console.log('tab'+id);
        this.tabId = id;
        tabsId.push(this.tabId);
    }

    createElement() {
        tabSection.insertAdjacentHTML('beforeend', '<div style="background-color: '+ this.color +'" data-tabId="' + this.tabId + '">' + this.name + '</div>');
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
        console.log('item: '+id);
        this.itemId = id;
        this.tab.itemsId.push(this.itemId);
    }

    createElement() {
        console.log(tabSection);
        tabSection.insertAdjacentHTML('beforeend', '<p style="background-color: '+ this.color +'" data-tabId="' + this.tabId + '" data-itemId="' + this.itemId + '">' + this.name + '</p>');
    }
}


// Manage Tabs
const MAX_TABS = 100;
let tabSection = document.getElementById('tabs');
let tabs = [];
let tabsId = [];

let addTabButton = document.getElementById('addTab');
addTabButton.addEventListener('click', function () {
    if (tabsId.length < MAX_TABS) {
        tabs.push(new Tab('Première tab', '#A1F3E5'));
    }
});

// Suppression d'une tab -> utilisé filter(obj => obj.id == idRecherché) poru trouver la bonne tab


// Manage Items
const MAX_ITEMS = 100;
let itemSection = document.getElementById('items');
