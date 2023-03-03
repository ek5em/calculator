class UI3D {
    constructor({
        changeFigure,
        togglePolygons,
        toggleEdges,
        togglePoints,
    }) {
        this.changeFigure = changeFigure;

        document.getElementById('figures').addEventListener('change', () =>
            this.changeFigureHandler());
        document.getElementById('PolygonsCheckBox').addEventListener('change', togglePolygons);
        document.getElementById('EdgesCheckBox').addEventListener('change', toggleEdges);
        document.getElementById('PointsCheckBox').addEventListener('change', togglePoints);

    }

    changeFigureHandler() {
        this.changeFigure(document.getElementById('figures').selectedIndex);
    }
}