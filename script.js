let dice = [];

const AddElement = function (type, parent, text, properties, eventListeners) {
    let NewElement = document.createElement(type);
    if (text !== undefined) NewElement.textContent = text;

    for (key in properties)
    {
        NewElement[key] = properties[key];
    }
    for (key in eventListeners)
    {
        NewElement.addEventListener(key, eventListeners[key]);
    }

    if (parent) parent.appendChild(NewElement);

    return NewElement;
};

class Die {
    constructor () {
        this.html = AddElement('div', DiceContainter, '', { className: "die" }, {
            click: () => {
                this.roll();
            },
            dblclick: () => {
                this.delete();
            }
        });

        this.roll();
    };

    roll = function () {
        this.value = Math.ceil(Math.random() * 6);
        this.html.textContent = this.value;
    };

    delete = function () {
        dice.splice(dice.indexOf(this), 1);
        this.html.remove();
    };
}

const DiceContainter = document.getElementById("dice-container");
document.getElementById("new-die").addEventListener('click', function () {
    dice.push(new Die());
});
document.getElementById("roll-dice").addEventListener('click', function () {
    dice.forEach(i => {
        i.roll();
    });
});
document.getElementById("sum-dice").addEventListener('click', function () {
    alert (dice.reduce(function (lastVal, currentVal) {
        return lastVal + currentVal.value;
    }, 0));
});
document.getElementById("del-dice").addEventListener('click', function () {
    while (dice.length > 0)
    {
        dice[0].delete();
    }
});