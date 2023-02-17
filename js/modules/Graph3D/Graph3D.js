class Graph3D {
    constructor(WIN, canvas) {
        this.WIN = WIN;
        this.canvas = canvas;
        this.math3D = new Math3D({
            WIN: this.WIN
        });
    }


    drawPoint(point) {
        this.canvas.point(this.math3D.xs(point), this.math3D.ys(point), 'black', 3);
    }

    drawEdge(edge) {
        const { point1, point2 } = edge;
        this.canvas.line(this.math3D.xs(point1), this.math3D.ys(point1),
            this.math3D.xs(point2), this.math3D.ys(point2));
    }

    drawFigure(figure) {
        figure.points.forEach((point) => {
            this.drawPoint(point);
        })

        figure.edges.forEach((edge) => {
            this.drawEdge(edge);
        })
    }
}
