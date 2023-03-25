class ParabolicСylinder extends Figure {
    constructor({
        color = '#e3b6d4',
        centre,
        count = 20,
        heigth = 10,
        width = 5,
    }) {
        super({ color, centre });
        this.count = count;
        this.heigth = heigth;
        this.width = width;

        this.generateFigure();
    }

    generatePoints() {
        const propI = this.heigth / this.count;
        const propJ = 2 * Math.PI / this.count;
        const count = this.count / 2;

        for (let i = -count; i < count; i++) {
            for (let j = 0; j < count; j++) {
                this.points.push(new Point(
                    this.centre.x + Math.sqrt(this.width * j * propJ),
                    this.centre.y + i * propI,
                    this.centre.z + j * propJ,
                ));
            }
        }

        for (let i = -count; i < count; i++) {
            for (let j = 0; j < count; j++) {
                this.points.push(new Point(
                    this.centre.x - Math.sqrt(this.width * j * propJ),
                    this.centre.y + i * propI,
                    this.centre.z + j * propJ,
                ));
            }
        }
    }

    generateEdges() {
        const count = this.count / 2;
        const stepIndex = Math.pow(this.count, 2) / 2;
        for (let i = 0; i < this.count; i++) {
            const k = i ? i * count - 1 : i;
            for (let j = 0; j < count - 1; j++) {
                this.edges.push(new Edge(i * count + j, i * count + j + 1));
                this.edges.push(new Edge(i * count + stepIndex + j, i * count + stepIndex + j + 1));
                this.edges.push(new Edge((i ? i - 1 : i) * count + j, i * count + j));
                this.edges.push(new Edge((i ? i - 1 : i) * count + stepIndex + j, i * count + stepIndex + j));
            }
        }
        for (let i = 1; i < this.count; i++) {
            this.edges.push(new Edge(i * count - 1, (i + 1) * count - 1));
            this.edges.push(new Edge(i * count + stepIndex - 1, (i + 1) * count + stepIndex - 1));
        }
    }

    generatePolygons() {
        const count = this.count / 2;
        const stepIndex = Math.pow(this.count, 2) / 2;
        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < count - 1; j++) {
                this.polygons.push(new Polygon([
                    i * count + j,
                    (i + 1) * count + j,
                    (i + 1) * count + j + 1,
                    i * count + j + 1,
                ], this.color));

                this.polygons.push(new Polygon([
                    i * count + stepIndex + j,
                    (i + 1) * count + stepIndex + j,
                    (i + 1) * count + stepIndex + j + 1,
                    i * count + stepIndex + j + 1,
                ], this.color));
            }
        }
    }
}