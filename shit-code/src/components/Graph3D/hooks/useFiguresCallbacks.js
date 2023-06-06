const useFiguresCallbacks = () => {
    return {
        changeX: (figure, value) => {
            figure.centre.x = value;
            figure.generateFigure();
        },
        changeY: (figure, value) => {
            figure.centre.y = value;
            figure.generateFigure();
        },
        changeZ: (figure, value) => {
            figure.centre.z = value;
            figure.generateFigure();
        },
        changeColor: (figure, value) => {
            figure.color = value;
            figure.generateFigure();
        },
        changeSize: (figure, value) => {
            figure.size = value > 0 ? value : 0;
            figure.generateFigure();
        },
        changeRadius: (figure, value) => {
            figure.radius = value > 0 ? value : 0;
            figure.generateFigure();
        },
        changeCount: (figure, value) => {
            figure.count = value >= 3 ? value : 3;
            figure.generateFigure();
        },
        changeHeight: (figure, value) => {
            figure.height = value > 0 ? value : 0;
            figure.generateFigure();
        },
        changeFocusX: (figure, value) => {
            figure.focusOx = value;
            figure.generateFigure();
        },
        changeFocusY: (figure, value) => {
            figure.focusOy = value;
            figure.generateFigure();
        },
        changeFocusZ: (figure, value) => {
            figure.focusOz = value;
            figure.generateFigure();
        },
        changeInnerRadius: (figure, value) => {
            figure.innerRadius = value;
            figure.generateFigure();
        }


    }
}

export default useFiguresCallbacks;