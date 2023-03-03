class Figure {
    constructor() {
        this.points = [];
        this.edges = [];
        this.polygons = [];
    }

    generateFigure() {
        this.generatePoints();
        this.generateEdges();
        this.generatePolygons();
    };

    generatePoints() { };
    generateEdges() { };
    generatePolygons() { };
}