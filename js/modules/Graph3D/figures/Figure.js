class Figure {
    constructor({ color = '#ee8844', x = 0, y = 0, z = 0 }) {
        this.points = [];
        this.edges = [];
        this.polygons = [];
        this.color = color;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    generateFigure() {
        this.clearFigure();
        this.generatePoints();
        this.generateEdges();
        this.generatePolygons();
    };

    clearFigure() {
        this.points = [];
        this.edges = [];
        this.polygons = [];
    };
    generatePoints() { };
    generateEdges() { };
    generatePolygons() { };
}