class Cube {
    constructor() {
        this.points = [
            new Point(10, 10, 10),
            new Point(-10, 10, 10),
            new Point(10, -10, 10),
            new Point(-10, -10, 10),
            new Point(10, 10, -10),
            new Point(10, -10, -10),
            new Point(-10, 10, -10),
            new Point(-10, -10, -10),
        ];

        this.edges = [
            new Edge(this.points[0], this.points[4]),
            new Edge(this.points[0], this.points[1]),
            new Edge(this.points[0], this.points[2]),
            new Edge(this.points[6], this.points[1]),
            new Edge(this.points[6], this.points[4]),
            new Edge(this.points[6], this.points[7]),
            new Edge(this.points[5], this.points[7]),
            new Edge(this.points[5], this.points[4]),
            new Edge(this.points[5], this.points[2]),
            new Edge(this.points[3], this.points[7]),
            new Edge(this.points[3], this.points[2]),
            new Edge(this.points[3], this.points[1]),
        ];
    }
}