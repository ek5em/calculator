class Sphere extends Figure {
    constructor(radius, circles) {
        super();

        this.radius = radius;
        this.circles = circles;

        this.generateFigure();
    }

    generatePoints() {
        let i = 0;
        while (i < 2 * Math.PI) {
            let j = 0;
            while (j <= Math.PI) {
                this.points.push(new Point(
                    this.radius * Math.sin(i) * Math.cos(j),
                    this.radius * Math.cos(i),
                    this.radius * Math.sin(i) * Math.sin(j),
                ));
                j += Math.PI / this.circles * 2;
            }
            i += Math.PI / this.circles;
        }
    }

    generateEdges() {
        const step = this.circles / 2 + 1;
        let i = 0;
        while (i <= Math.pow(this.circles, 2) + 3 * step) {
            for (let j = i; j < i + this.circles / 2; j++) {
                this.edges.push(new Edge(j, j + 1));
            }
            i += step;
        }

        for (let i = 0; i <= this.circles / 2; i++) {
            for (let j = i; j < this.circles * step; j += step) {
                this.edges.push(new Edge(j, j + step));
                this.edges.push(new Edge(this.points.length - j - 1, this.points.length - j - step - 1));
            }
        }

        for (let i = 0; i <= this.circles / 2; i++) {
            this.edges.push(new Edge(0, this.points.length - i - 1));
        }
    }

    generatePolygons() {
        const step = this.circles / 2 + 1;

        for (let i = 0, j = step - 1; i < this.points.length - step; i++) {
            if (i !== j) {
                this.polygons.push(new Polygon([i, i + 1, i + 1 + step, i + step]));
            } else {
                j += step;
            }
        }

        for (let i = 1; i < step; i++) {
            this.polygons.push(new Polygon([0, this.points.length - i, this.points.length - i - 1]));
        }
    }
}