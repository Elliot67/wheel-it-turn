gitHubLink.addEventListener('click', () => {
    chrome.tabs.create({ url: "https://github.com/Elliot67/HigherOrLower" });
});


// The extension

class Tab {
    constructor(id, name, color) {
        this.id = 'tab_' + id;
        this.name = name;
        this.color = color;
        this.items = [];
        this.create();
    }

    create() {
        main.append('<p id="' + this.id + '">' + 'Roulette !' + '</p>');
    }

    addItem(name, color) {
        new Item(name, color);
    }

}


class Item {
    constructor(name, color, id) {
        this.name = name;
        this.color = color;
    }

}


// Manage Tabs
let tabs = [];
let main = document.querySelector('main');

let addTabButton = document.getElementById('addTab');
addTabButton.addEventListener('click', function () {
    console.log('click');
    tabs.push(new Tab(tabs.length, 'Première tab', '#A1F3E5'));
});


// Manage Items