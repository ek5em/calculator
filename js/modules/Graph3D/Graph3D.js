class Graph3D {
    constructor(WIN, canvas) {
        this.WIN = WIN;
        this.canvas = canvas;
    }

    xs(point) {
        const { CAMERA, FOCUS } = this.WIN;
        return point.x * (CAMERA.z - FOCUS.z) / (CAMERA.z - point.z);
    }

    ys(point) {
        const { CAMERA, FOCUS } = this.WIN;
        return point.y * (CAMERA.z - FOCUS.z) / (CAMERA.z - point.z);
    }

    drawPoint(point) {
        this.canvas.point(this.xs(point), this.ys(point));
    }

    drawLine(point1, point2,) {
        this.canvas.line(this.xs(point1),
            this.ys(point1),
            this.xs(point2),
            this.ys(point2));
    }

    drawCube(length) {
        this.drawLine(new Point(-length, -length, 0), new Point(-length, length, 0));
        this.drawLine(new Point(-length, length, 0), new Point(length, length, 0));
        this.drawLine(new Point(length, length, 0), new Point(length, -length, 0));
        this.drawLine(new Point(length, -length, 0), new Point(-length, -length, 0));

        this.drawLine(new Point(-length, -length, 0), new Point(-length, -length, length));
        this.drawLine(new Point(-length, length, 0), new Point(-length, length, length));
        this.drawLine(new Point(length, length, 0), new Point(length, length, length));
        this.drawLine(new Point(length, -length, 0), new Point(length, -length, length));

        this.drawLine(new Point(-length, -length, length), new Point(-length, length, length));
        this.drawLine(new Point(-length, length, length), new Point(length, length, length));
        this.drawLine(new Point(length, length, length), new Point(length, -length, length));
        this.drawLine(new Point(length, -length, length), new Point(-length, -length, length));
    }

    generate() {
        this.canvas.clear();
        this.drawCube(10);
    }

}