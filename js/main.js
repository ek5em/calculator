window.onload = () => {
    document.querySelectorAll('.calcButton');
    for (let child of document.querySelectorAll('.type')) {
        child.addEventListener('click', (event) => UIHandler(event))
    }
}

function UIHandler(event) {
    const { target } = event;
    const type = document.querySelectorAll('.type');
    document.querySelector('.mainDiv').remove();

    for (let i = 0; i < type.length; i++) {
        type[i].classList.remove('activeType');
    }
    target.classList.add('activeType')
    switch (target.dataset.content) {
        case 'real': {
            realUI();
            const num = document.querySelector('.real').children;
            const funcs = real.getMethods();
            const buttons = document.querySelectorAll('.calcButton');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener('click', function () {
                    document.querySelector('.result').innerHTML = funcs[i](num.value - 0, num.value - 0);
                })
            }
            break;
        }
        case 'complex': {
            complexUI();
            const real = document.querySelectorAll('.realNum');
            const image = document.querySelectorAll('.imageNum');
            const funcs = complex.getMethods();
            const buttons = document.querySelectorAll('.calcButton');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener('click', function () {
                    const result = funcs[i](new Complex(real[0].value - 0, image[0].value - 0), new Complex(real[1].value - 0, image[1].value - 0));
                    document.querySelector('.result').innerHTML = `${result.re} + ${result.im}i`;

                })
            }
            break;
        }
        case 'vector': {
            vectorUI();
            break;
        }
    }
}

function realUI() {
    const mainDiv = createDiv('mainDiv');
    const div = createDiv('real');

    div.appendChild(document.createElement('input'));
    div.appendChild(document.createElement('input'));

    mainDiv.appendChild(div);
    document.querySelector('.calcInput').appendChild(mainDiv);
}

function complexUI() {
    const mainDiv = createDiv('mainDiv');
    const compl = [];

    for (let i = 0; i < 2; i++) {
        compl[i] = createDiv('complex');
        compl[i].appendChild(createInput('realNum'));
        compl[i].appendChild(createSpan('+'));
        compl[i].appendChild(createInput('imageNum'))
        compl[i].appendChild(createSpan('i'));
        mainDiv.appendChild(compl[i]);
    }

    document.querySelector('.calcInput').appendChild(mainDiv);
}

function vectorUI() {
    const mainDiv = createDiv('mainDiv');
    document.querySelector('.calcInput').appendChild(mainDiv);
}

function createInput(__class) {
    const input = document.createElement('input');
    input.className = __class;
    return input;
}

function createDiv(__class) {
    const div = document.createElement('div');
    div.classList = __class;
    return div;
}

function createSpan(innerHTML) {
    const span = document.createElement('span');
    span.innerHTML = innerHTML;
    return span;
}

const real = new RealCalculator;
const complex = new ComplexCalculator;
const vector = new VectorCalculator;