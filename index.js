let listSelling = [
    { 'Zeta Roadster': ['250m', 'fm'] },
]

let listBuying = [
    { 'Mixture': ['12m', 'fm'] },
    { 'Odin 6x6': ['5m', 'fm'] },
    { 'Kingfisher': ['250m', 'fm'] },
    { 'Arcane Evo': ['1m', 'fs'] },
    { 'Fury': ['1m', 'fs'] },
    { 'Crescendo': ['1m', 'fs'] },
]

function setupCars() {
    const mainElement = document.querySelector('.main');
    function createAndAppendElement(object, buying) {
        const text = Object.keys(object)[0];
        const newDiv = document.createElement('div');
        newDiv.classList.add('car');
        const newImg = document.createElement('img');
        getCarImg_old(text).then(e => newImg.src = e == undefined ? '' : e);
        newDiv.appendChild(newImg);
        const newP = document.createElement('p');
        newP.innerHTML = object[text][1] + ' <span>' + text + '</span> <span>-</span> ' + object[text][0];
        newDiv.appendChild(newP);

        if (buying) mainElement.querySelector('div.buying').appendChild(newDiv);
        else mainElement.querySelector('div.selling').appendChild(newDiv);
    }

    listSelling.forEach(element => createAndAppendElement(element, false));
    listBuying.forEach(element => createAndAppendElement(element, true));
}

function RefreshCars() {
    const mainElement = document.querySelector('.main');
    mainElement.querySelector('div.buying').innerHTML = '';
    mainElement.querySelector('div.selling').innerHTML = '';
    setupCars();
}

window.onload = function () {
    setupCars();
};

async function getCarImg_old(name) {
    const response = await fetch('https://drive-world.fandom.com/api.php?action=imageserving&wisTitle=' + name + '&format=json&origin=*');
    const jsonData = await response.json();
    const text = jsonData['image']['imageserving'];
    const indexOfPng = text.indexOf('.png');
    return text.substring(0, indexOfPng + 4);
}

async function getCarImg(name) {
    await fetch('https://drive-world.fandom.com/api.php?action=imageserving&wisTitle=' + name + '&format=json&origin=*')
        .then(response => response.json()).then(data => {
            const text = data['image']['imageserving'];
            return text.substring(0, text.indexOf('?cb'));
        }).catch(error => {
            return 'data:@file/png;base64,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';
        });
}
