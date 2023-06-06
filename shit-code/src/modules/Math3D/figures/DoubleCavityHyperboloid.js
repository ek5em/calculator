import { Figure, Point, Edge, Polygon } from "../entities";

export default class DoubleCavityHyperboloid extends Figure {
    constructor({
        color = '#40cac7',
        centre,
        count = 20,
        focusOx = 10,
        focusOy = 10,
        focusOz = 10,
        name = 'Двуполостный гиперболоид',
    }) {
        super({ color, centre, name });
        this.count = count;
        this.focusOx = focusOx;
        this.focusOy = focusOy;
        this.focusOz = focusOz;

        this.generateFigure();
    }

    generatePoints() {
        this.count = (this.count % 2) ? this.count + 1 : this.count;
        const focusProp = 0.1;
        const prop = 2 * Math.PI / this.count;
        for (let i = 0; i < this.count / 2; i++) {
            const k = i - this.count / 2;
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + focusProp * this.focusOx * Math.sinh(k * prop) * Math.cos(j * prop),
                    this.centre.y + focusProp * this.focusOy * Math.cosh(k * prop),
                    this.centre.z + focusProp * this.focusOz * Math.sinh(k * prop) * Math.sin(j * prop),
                ));
            }
        }

        for (let i = 0; i < this.count / 2; i++) {
            const k = i - this.count / 2;
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + focusProp * this.focusOx * Math.sinh(k * prop) * Math.cos(j * prop),
                    this.centre.y - focusProp * this.focusOy * Math.cosh(k * prop),
                    this.centre.z + focusProp * this.focusOz * Math.sinh(k * prop) * Math.sin(j * prop),
                ));
            }
        }
    }

    generateEdges() {
        for (let i = 0; i < this.count * 2; i++) {
            for (let j = 0; j < this.count / 2 - 1; j++) {
                this.edges.push(new Edge(i * this.count / 2 + j, i * this.count / 2 + j + 1));
            }
        }

        for (let i = 0; i < this.count; i++) {
            this.edges.push(new Edge(i * this.count, (i + 1) * this.count - 1));
            this.edges.push(new Edge(i * this.count + this.count / 2, i * this.count + this.count / 2 - 1));
        }

        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count; j++) {
                if (i !== this.count / 2 - 1) {
                    this.edges.push(new Edge(i * this.count + j, (i + 1) * this.count + j));
                }
            }
        }
    }

    generatePolygons() {
        let whiteCol = true;
        for (let i = 0; i < this.count - 1; i++) {
            if (i !== this.count / 2 - 1) {
                let whiteRow = whiteCol;
                whiteCol = (i % 2) ? !whiteCol : whiteCol;;
                for (let j = 0; j < this.count - 1; j++) {
                    this.polygons.push(new Polygon([
                        i * this.count + j,
                        (i + 1) * this.count + j,
                        (i + 1) * this.count + j + 1,
                        i * this.count + j + 1,
                    ], whiteRow ? '#ffffff' : '#000000',));
                    whiteRow = (j % 2) ? !whiteRow : whiteRow;
                }

                this.polygons.push(new Polygon([
                    i * this.count,
                    (i + 1) * this.count - 1,
                    (i + 2) * this.count - 1,
                    (i + 1) * this.count,
                ], whiteRow ? '#ffffff' : '#000000'));
            }
        }
    }
}
