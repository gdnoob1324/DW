let listSelling = [
    { 'Zeta Roadster': ['250m', 'fm'] },
    { 'Tiger1': ['10m', 'fm'] },
    { 'Edler': ['90m', 'fm'] },
    { 'Innovation 37': ['5m', 'fm'] },
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
        getCarImg(text).then(e => newImg.src = e == undefined ? '' : e);
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
    try {
        const response = await fetch('https://drive-world.fandom.com/api.php?action=imageserving&wisTitle=' + name + '&format=json&origin=*');
    const jsonData = await response.json();
    const text = jsonData['image']['imageserving'];
    const indexOfPng = text.indexOf('.png');
    return text.substring(0, indexOfPng + 4);
    } catch (error) {
        return '';
    }
}

async function getCarImg(name) {
try {
    return await fetch('https://drive-world.fandom.com/api.php?action=imageserving&wisTitle=' + name + '&format=json&origin=*')
        .then(response => response.json()).then(data => {
            const text = data['image']['imageserving'];
            return text.substring(0, text.indexOf('.png') + 4) + 'scale-to-width-down/384';
        }).catch(error => {return '';});
} catch (error) {
        return '';
    }
}
