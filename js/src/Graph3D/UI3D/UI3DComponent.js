class UI3DComponent extends Component {
    constructor(props) {
        super(props);
        this.num = 1;
        this.menuOpen = false;
    }
    addEventListeners() {

        document.querySelector('.menuGraph3DButton').addEventListener('click', this.menuHandler)
        document.querySelector('.addFigure').addEventListener('click', () => this.openFiguresListHandler());
        document.addEventListener('keypress', (event) => this.callbacks.keyPress(event));
        document.getElementById('PolygonsCheckBox').addEventListener('change', this.callbacks.togglePolygons);
        document.getElementById('EdgesCheckBox').addEventListener('change', this.callbacks.toggleEdges);
        document.getElementById('PointsCheckBox').addEventListener('change', this.callbacks.togglePoints);
        document.getElementById('figuresList').addEventListener('click', (event) => this.addFigureHandler(event));
    }

    menuHandler() {
        document.querySelector('.container3D').classList.toggle('containerActive');
        if (this.menuOpen) {
            setTimeout(() => document.querySelector('.block3D').classList.toggle('hide'), 100);
            document.getElementById('figuresList').classList.add('hide');
        } else {
            setTimeout(() => document.querySelector('.block3D').classList.toggle('hide'), 750);
        }
        this.menuOpen = !this.menuOpen;
    }

    openFiguresListHandler() {
        document.getElementById('figuresList').classList.remove('hide');
    }

    addFigureHandler(event) {
        const figure = event.target.dataset.figure;
        document.getElementById('figuresList').classList.add('hide');
        this.callbacks.addFigure(figure, this.num);
        document.querySelector('.figuresContainer').appendChild(
            this.createSettings(figure));
    }

    createSettings(figure) {
        const inputX = this.createInput('number', 'x', 'inputCenterPointFigure', 'x');
        const inputY = this.createInput('number', 'y', 'inputCenterPointFigure', 'y');
        const inputZ = this.createInput('number', 'z', 'inputCenterPointFigure', 'z');
        const inputColor = this.createInput('color', 'color', 'inputColor');

        const figureCenter = document.createElement('div');
        figureCenter.className = 'figureCenter';
        figureCenter.appendChild(inputX);
        figureCenter.appendChild(inputY);
        figureCenter.appendChild(inputZ);

        const settingsBlock = document.createElement('div');
        settingsBlock.dataset.num = this.num;
        settingsBlock.appendChild(figureCenter);
        settingsBlock.appendChild(inputColor);

        switch (figure) {
            case 'Cube':
                settingsBlock.appendChild(this.createInput('number', 'size', 'cubeLength', 'Длина'));
                break;

            case 'Sphere':
                settingsBlock.appendChild(this.createInput('number', 'radius', 'sphereRadius', 'Радиус'));
                settingsBlock.appendChild(this.createInput('number', 'count', 'sphereCount', 'Кольца'));
                break;

            case 'Ellipsoid':
                settingsBlock.appendChild(this.createInput('number', 'focusOx', 'ellipsoidFocus', 'ФокусOx'));
                settingsBlock.appendChild(this.createInput('number', 'focusOy', 'ellipsoidFocus', 'ФокусOy'));
                settingsBlock.appendChild(this.createInput('number', 'focusOz', 'ellipsoidFocus', 'ФокусOz'));
                settingsBlock.appendChild(this.createInput('number', 'count', 'ellipsoidCount', 'Кольца'));
                break;

            case 'Cone':
                settingsBlock.appendChild(this.createInput('number', 'radius', 'coneRadius', 'Радиус'));
                settingsBlock.appendChild(this.createInput('number', 'count', 'coneCount', 'Кольца'));
                settingsBlock.appendChild(this.createInput('number', 'height', 'coneHeight', 'Высота'));
                break;

            case 'Tor':
                settingsBlock.appendChild(this.createInput('number', 'radius', 'torRadius', 'Внутренний радиус'));
                settingsBlock.appendChild(this.createInput('number', 'radius2', 'torRadius', 'Радиус'));
                settingsBlock.appendChild(this.createInput('number', 'count', 'torCount', 'Кольца'));

        }

        const button = document.createElement('div');
        button.innerHTML = '&#10006';
        button.dataset.num = this.num;
        button.addEventListener('click', () => {
            document.querySelector('.figuresContainer').removeChild(settingsBlock);
            this.callbacks.delFigure(button.dataset.num);
        });
        button.className = 'deleteFunc';

        settingsBlock.appendChild(button);
        this.num++;

        return settingsBlock;
    }

    createInput(type, dataset, className, placeholder = '') {
        const input = document.createElement('input');
        input.setAttribute('type', type);
        input.setAttribute('placeholder', placeholder);
        input.dataset.setting = dataset;
        input.dataset.num = this.num;

        if (className) {
            input.className = className;
        }

        input.addEventListener('change', (event) =>
            this.changeFigureSettigHandler(event));

        return input;
    }

    changeFigureSettigHandler(event) {
        const elem = event.target;
        let value = elem.value;
        switch (elem.dataset.setting) {
            case "color":
                break;
            case "count":
                value -= 0;
                if (value < 3) {
                    elem.value = 3;
                    value = 3;
                }
                break;
            case "radius2":
            case "radius":
            case "size":
            case "height":
                value -= 0;
                if (value < 0) {
                    elem.value = 0;
                    value = 0;
                }
                break;
            default:
                value -= 0;
        }
        this.callbacks.changeFigureSettig(
            elem.dataset.num,
            elem.dataset.setting,
            value,
        )
    }

}