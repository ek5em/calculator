class Graph3DComponent extends Component {
    constructor(props) {
        super(props);

        const width = 1200;
        const height = 800;
        this.prop = width / height;

        this.showPoints = true;
        this.showEdges = true;
        this.showPolygons = true;

        this.zoomStep = 1.1;
        this.canRotate = false;

        this.scene = [
            new Cube(10),
        ];

        this.WIN = {
            WIDTH: 20 * this.prop,
            HEIGHT: 20,
            BOTTOM: -10,
            LEFT: -10 * this.prop,
            FOCUS: new Point(0, 0, 20),
            CAMERA: new Point(0, 0, 30),
        }

        this.canvas = new Canvas({
            id: "canvas3D",
            width,
            height,
            WIN: this.WIN,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mouseUp: () => this.mouseUp(),
                mouseDown: () => this.mouseDown(),
                mouseMove: (event) => this.mouseMove(event),
                mouseLeave: () => this.mouseLeave(),
            }
        })

        this.math3D = new Math3D({
            WIN: this.WIN
        });

        new UI3D({
            changeFigure: (figureNum) => this.changeFigure(figureNum),
            togglePolygons: () => this.togglePolygons(),
            toggleEdges: () => this.toggleEdges(),
            togglePoints: () => this.togglePoints(),
        })



        setInterval(() => {
            this.renderScene();
        }, 15)

    }

    renderScene() {
        this.canvas.clear();
        this.scene.forEach((figure) => {
            this.drawFigure(figure);
        })
    }

    drawFigure(figure) {
        if (this.showPolygons) {
            this.drawPolygons(figure);
        }
        if (this.showEdges) {
            this.drawEdges(figure);
        }
        if (this.showPoints) {
            this.drawPoints(figure);
        }
    }

    drawPoints(figure) {
        figure.points.forEach((point) => {
            this.canvas.point(this.math3D.xs(point), this.math3D.ys(point), 'black', 2);
        });
    }

    drawEdges(figure) {
        figure.edges.forEach((edge) => {
            this.canvas.line(
                this.math3D.xs(figure.points[edge.point1]),
                this.math3D.ys(figure.points[edge.point1]),
                this.math3D.xs(figure.points[edge.point2]),
                this.math3D.ys(figure.points[edge.point2])
            )
        });
    }

    drawPolygons(figure) {
        this.math3D.calcCenters(figure);
        this.math3D.calcDistance(
            figure,
            this.WIN.CAMERA,
            'distance',
        );
        this.math3D.sortByArtistAlgoritm(figure.polygons);

        figure.polygons.forEach((polygon) => {
            const points = [];
            for (let i = 0; i < polygon.points.length; i++) {
                points.push(figure.points[polygon.points[i]]);
            };

            this.canvas.polygon(
                points.map((point) => {
                    return {
                        x: this.math3D.xs(point),
                        y: this.math3D.ys(point),
                    };
                }),
                polygon.color
            );
        })
    }

    addEventListeners() {
        document.addEventListener('keypress', (event) => this.keyPress(event))
    }

    wheel(event) {
        const delta = (event.wheelDelta > 0) ? this.zoomStep : 1 / this.zoomStep;
        this.scene.forEach((figure) => {
            figure.points.forEach((point) => {
                this.math3D.transformPoint(this.math3D.zoom(delta), point);
            })
        })
    }

    mouseUp() {
        this.canRotate = false;
    }

    mouseDown() {
        this.canRotate = true;
    }

    mouseMove(event) {
        if (this.canRotate) {
            const prop = 240;
            this.scene.forEach((figure) => {
                figure.points.forEach((point) => {
                    this.math3D.transformPoint(this.math3D.rotateOx(event.movementY / prop), point);
                    this.math3D.transformPoint(this.math3D.rotateOy(-event.movementX / prop), point)
                })
            })
        }
    }

    mouseLeave() {
        this.canRotate = false;
    }

    keyPress(event) {
        const gradusRotate = 0.1;
        switch (event.code) {
            case "KeyQ": {
                this.scene.forEach((figure) => {
                    figure.points.forEach((point) => {
                        this.math3D.transformPoint(this.math3D.rotateOz(-gradusRotate), point);
                    });
                });
                break;
            }
            case "KeyE": {
                this.scene.forEach((figure) => {
                    figure.points.forEach((point) => {
                        this.math3D.transformPoint(this.math3D.rotateOz(gradusRotate), point);
                    });
                });
                break;
            }
            case "KeyW": {
                this.movePoint(0, 1);
                break;
            }
            case "KeyS": {
                this.movePoint(0, -1);
                break;
            }
            case "KeyA": {
                this.movePoint(-1, 0);
                break;
            }
            case "KeyD": {
                this.movePoint(1, 0);
                break;
            }
        }
    }

    movePoint(dx, dy, dz = 0) {
        this.scene.forEach((figure) => {
            figure.points.forEach((point) => {
                this.math3D.transformPoint(this.math3D.move(dx, dy, dz), point)
            })
        })
    }

    changeFigure(figureNum) {
        this.scene.pop();
        switch (figureNum) {
            case 0: {
                this.scene.push(new Cube(10));
                break;
            }
            case 1: {
                this.scene.push(new Sphere(10, 20));
                break;
            }
            case 2: {
                this.scene.push(new Ellipsoid(15, 10, 20, 20));
                break;
            }
            case 3: {
                this.scene.push(new Cone(10, 10, 20));
                break;
            }
        }
    }

    togglePolygons() {
        this.showPolygons = !this.showPolygons;
    }

    toggleEdges() {
        this.showEdges = !this.showEdges;
    }

    togglePoints() {
        this.showPoints = !this.showPoints;
    }

}