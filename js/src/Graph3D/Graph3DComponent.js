class Graph3DComponent extends Component {
    constructor(props) {
        super(props);

        const width = 1200;
        const height = 800;
        this.prop = width / height;

        this.showPoints = true;
        this.showEdges = true;
        this.showPolygons = true;
        this.showAnimation = false;

        this.zoomStep = 1.1;
        this.canRotate = false;

        this.LIGHT = new Light(-20, 20, 10, 400);

        this.scene = {
            points: [],
            edges: [],
            polygons: [],
        };

        this.figures = [];

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

        new UI3DComponent({
            id: 'UI3D',
            parent: 'graph3D',
            template: template.UI3D,
            className: 'container3D',
            callbacks: {
                keyPress: (event) => this.keyPress(event),
                toggleCheckBox: (name) => this.toggleCheckBox(name),
                addFigure: (figure, num) => this.addFigure(figure, num),
                changeFigureSettig: (num, setting, settingValue) =>
                    this.changeFigureSettig(num, setting, settingValue),
                delFigure: (num) => this.delFigure(num),
                changeLightPower: (value) => this.changeLightPower(value),
            }
        });

        setInterval(() => {
            this.renderScene();
        }, 15)

    }

    renderScene() {
        this.generateScene();
        this.canvas.clear();

        if (this.showPolygons) {
            this.drawPolygons();
        }
        if (this.showEdges) {
            this.drawEdges();
        }
        if (this.showPoints) {
            this.drawPoints();
        }
    }

    generateScene() {
        this.scene.points = [];
        this.scene.edges = [];
        this.scene.polygons = [];

        const vect = [
            this.WIN.CAMERA.x - this.WIN.FOCUS.x,
            this.WIN.CAMERA.y - this.WIN.FOCUS.y,
            this.WIN.CAMERA.z - this.WIN.FOCUS.z,
        ];

        this.figures.forEach((figure) => {
            if (figure) {
                this.math3D.calcCenters(figure);
                this.math3D.calcNormVectors(figure);

                this.math3D.calcDistance(
                    figure,
                    this.WIN.CAMERA,
                    'distance',
                );

                this.math3D.calcDistance(
                    figure,
                    this.LIGHT,
                    'lumen',
                );

                const indexStep = this.scene.points.length;

                this.scene.edges = this.scene.edges.concat(figure.edges.map((edge) =>
                    new Edge(edge.point1 + indexStep, edge.point2 + indexStep)
                ));

                const polygons = [];

                figure.polygons.forEach((polygon) => {
                    //if (this.math3D.calcAngle(polygon.normVector, vect) >= Math.PI / 2) {
                    polygons.push(new Polygon(
                        polygon.points.map((index) => index += indexStep),
                        polygon.color,
                        polygon.centre,
                        polygon.distance,
                        polygon.lumen,
                    ))
                    //}
                });

                this.scene.polygons = this.scene.polygons.concat(polygons);

                this.scene.points = this.scene.points.concat(figure.points);
            }

            this.math3D.sortByArtistAlgoritm(this.scene.polygons);

        })
    }

    drawPoints() {
        this.scene.points.forEach((point) => {
            this.canvas.point(this.math3D.xs(point), this.math3D.ys(point), 'black', 2);
        });
    }

    drawEdges() {
        this.scene.edges.forEach((edge) => {
            this.canvas.line(
                this.math3D.xs(this.scene.points[edge.point1]),
                this.math3D.ys(this.scene.points[edge.point1]),
                this.math3D.xs(this.scene.points[edge.point2]),
                this.math3D.ys(this.scene.points[edge.point2])
            )
        });
    }

    drawPolygons() {
        this.scene.polygons.forEach((polygon) => {
            const polygonPoints = [];

            for (let i = 0; i < polygon.points.length; i++) {
                polygonPoints.push(this.scene.points[polygon.points[i]]);
            }

            let { r, g, b } = polygon.hexToRGB(polygon.color);
            const lumen = this.math3D.calcIllumination(polygon.distance, this.LIGHT.lumen);
            r = Math.round(r * lumen);
            g = Math.round(g * lumen);
            b = Math.round(b * lumen);

            this.canvas.polygon(
                polygonPoints.map((point) => {
                    return {
                        x: this.math3D.xs(point),
                        y: this.math3D.ys(point),
                    };
                }),
                polygon.rgbToColor(r, g, b),
            );
        });
    }

    wheel(event) {
        const delta = (event.wheelDelta > 0) ? this.zoomStep : 1 / this.zoomStep;
        this.figures.forEach((figure) => {
            if (figure) {
                figure.points.forEach((point) => {
                    this.math3D.transformPoint(this.math3D.zoom(delta), point);
                });
            }
        })
    }

    mouseUp() {
        this.canRotate = false;
    }

    mouseDown() {
        this.canRotate = true;
    }

    mouseMove(event) {
        if (this.canRotate && !this.showAnimation) {
            const prop = 240;
            this.figures.forEach((figure) => {
                if (figure) {
                    figure.points.forEach((point) => {
                        this.math3D.transformPoint(this.math3D.rotateOx(event.movementY / prop), point);
                        this.math3D.transformPoint(this.math3D.rotateOy(-event.movementX / prop), point);
                    })
                }
            })
        }
    }

    mouseLeave() {
        this.canRotate = false;
    }

    keyPress(event) {
        const gradusRotate = 0.1;
        switch (event.code) {
            case "KeyQ":
                this.figures.forEach((figure) => {
                    if (figure && !this.showAnimation) {
                        figure.points.forEach((point) => {
                            this.math3D.transformPoint(this.math3D.rotateOz(-gradusRotate), point);
                        })
                    };
                });
                break;

            case "KeyE":
                this.figures.forEach((figure) => {
                    if (figure && !this.showAnimation) {
                        figure.points.forEach((point) => {
                            this.math3D.transformPoint(this.math3D.rotateOz(gradusRotate), point);
                        })
                    };
                });
                break;
        }
    }

    movePoint(dx, dy, dz = 0) {
        this.figures.forEach((figure) => {
            if (figure) {
                figure.points.forEach((point) => {
                    this.math3D.transformPoint(this.math3D.move(dx, dy, dz), point)
                })
            }
        })
    }

    addFigure(figure, num) {
        switch (figure) {
            case 'Cube':
                this.figures[num] = new Cube({});
                break;

            case 'Sphere':
                this.figures[num] = new Sphere({});
                break;

            case 'Ellipsoid':
                this.figures[num] = new Ellipsoid({});
                break;

            case 'Cone':
                this.figures[num] = new Cone({});
                break;

            case "Tor":
                this.figures[num] = new Tor({});
                break;
        }
    }

    changeFigureSettig(num, setting, settingValue) {
        if (setting === 'x' || setting === 'y' || setting === 'z') {
            this.figures[num]['centre'][setting] = settingValue;
        } else {
            this.figures[num][setting] = settingValue;
        }
        this.figures[num].generateFigure();
    }

    toggleCheckBox(name) {
        this[name] = !this[name];
    }

    delFigure(num) {
        this.figures[num] = null;
    }

    changeLightPower(value) {
        this.LIGHT.lumen = value;
    }
}