class Cone extends Figure {
    constructor(radius, height, circles) {
        super();

        this.radius = radius;
        this.height = height;
        this.circles = circles;

        this.generateFigure();
    }

    generatePoints() {
        const stepHeight = this.height / this.circles;
        const stepRad = this.radius / this.circles;
        for (let currentRadius = 0, currentHeight = 0, i = 0; currentRadius <= this.radius; currentRadius += stepRad) {
            for (let alpha = 0; alpha < 2 * Math.PI; alpha += 2 * Math.PI / this.circles) {
                this.points[i] = (new Point(
                    currentRadius * Math.cos(alpha),
                    currentHeight,
                    currentRadius * Math.sin(alpha),
                ));

                this.points[i + Math.pow(this.circles, 2)] = (new Point(
                    currentRadius * Math.cos(alpha),
                    -currentHeight,
                    currentRadius * Math.sin(alpha),
                ));
                i++;
            }
            currentHeight += stepHeight;
        }
    }

    generateEdges() {
        const step = Math.pow(this.circles, 2);

        for (let i = 0; i <= step; i += this.circles) {
            for (let j = i; j < this.circles + i - 1; j++) {
                this.edges.push(new Edge(j, j + 1));
                this.edges.push(new Edge(j + step, j + step + 1));
            }
        }

        for (let i = 0; i <= this.circles; i++) {
            let j = i * this.circles;
            this.edges.push(new Edge(j, j + this.circles - 1));
            this.edges.push(new Edge(j + step, j + this.circles + step - 1));
        }

        for (let i = this.circles; i < step; i++) {
            this.edges.push(new Edge(i, i + this.circles));
            this.edges.push(new Edge(i + step, i + this.circles + step));
        }

        for (let i = 0; i < this.circles; i++) {
            this.edges.push(new Edge(0, i + this.circles));
            this.edges.push(new Edge(0, i + this.circles + step));
        }
    }

    generatePolygons() {
        const step = Math.pow(this.circles, 2);
        for (let i = this.circles; i < step; i += this.circles) {
            for (let j = i; j < this.circles + i - 1; j++) {
                this.polygons.push(new Polygon([
                    j,
                    j + 1,
                    j + 1 + this.circles,
                    j + this.circles]));

                let k = j + step;

                this.polygons.push(new Polygon([
                    k,
                    k + 1,
                    k + 1 + this.circles,
                    k + this.circles,
                ]));
            }
        }

        for (let i = this.circles; i < step; i += this.circles) {
            this.polygons.push(new Polygon([
                i,
                i + this.circles - 1,
                i + this.circles * 2 - 1,
                i + this.circles,
            ]));

            let j = i + step;

            this.polygons.push(new Polygon([
                j,
                j + this.circles - 1,
                j + this.circles * 2 - 1,
                j + this.circles,
            ]));
        }

        for (let i = 0; i < this.circles; i++) {
            this.polygons.push(new Polygon([
                0,
                i + this.circles,
                i + this.circles - 1,
            ]));
        }

        for (let i = 0; i < this.circles - 1; i++) {
            this.polygons.push(new Polygon([
                0,
                i + this.circles + step,
                i + this.circles + step + 1,
            ]));
        }

        this.polygons.push(new Polygon([0, this.circles, 2 * this.circles - 1]));
        this.polygons.push(new Polygon([0, this.circles + step, 2 * this.circles + step - 1]));

    }
}

