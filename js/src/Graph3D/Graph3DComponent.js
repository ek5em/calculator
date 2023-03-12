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

        this.LIGHT = new Light(-40, 0, 0, 400);

        this.scene = [new Tor({})];

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
                togglePolygons: () => this.togglePolygons(),
                toggleEdges: () => this.toggleEdges(),
                togglePoints: () => this.togglePoints(),
                addFigure: (figure, num) => this.addFigure(figure, num),
                changeFigureSettig: (num, setting, settingValue) =>
                    this.changeFigureSettig(num, setting, settingValue),
                delFigure: (num) => this.delFigure(num),
            }
        });

        setInterval(() => {
            this.renderScene();
        }, 15)

    }

    renderScene() {
        this.canvas.clear();
        this.scene.forEach((figure) => {
            if (figure) {
                this.drawFigure(figure);
            }
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

        this.math3D.calcDistance(
            figure,
            this.LIGHT,
            'lumen',
        );

        this.math3D.sortByArtistAlgoritm(figure.polygons);
        figure.polygons.forEach((polygon) => {
            const points = [];
            for (let i = 0; i < polygon.points.length; i++) {
                points.push(figure.points[polygon.points[i]]);
            };

            let { r, g, b } = polygon.color;
            const lumen = this.math3D.calcIllumination(polygon.distance, this.LIGHT.lumen);
            r = Math.round(r * lumen);
            g = Math.round(g * lumen);
            b = Math.round(b * lumen);

            this.canvas.polygon(
                points.map((point) => {
                    return {
                        x: this.math3D.xs(point),
                        y: this.math3D.ys(point),
                    };
                }),
                polygon.rgbToColor(r, g, b),
            );
        })
    }

    wheel(event) {
        const delta = (event.wheelDelta > 0) ? this.zoomStep : 1 / this.zoomStep;
        this.scene.forEach((figure) => {
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
        if (this.canRotate) {
            const prop = 240;
            this.scene.forEach((figure) => {
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
                this.scene.forEach((figure) => {
                    if (figure) {
                        figure.points.forEach((point) => {
                            this.math3D.transformPoint(this.math3D.rotateOz(-gradusRotate), point);
                        })
                    };
                });
                break;

            case "KeyE":
                this.scene.forEach((figure) => {
                    if (figure) {
                        figure.points.forEach((point) => {
                            this.math3D.transformPoint(this.math3D.rotateOz(gradusRotate), point);
                        })
                    };
                });
                break;

        }
    }

    movePoint(dx, dy, dz = 0) {
        this.scene.forEach((figure) => {
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
                this.scene[num] = new Cube({});
                break;

            case 'Sphere':
                this.scene[num] = new Sphere({});
                break;

            case 'Ellipsoid':
                this.scene[num] = new Ellipsoid({});
                break;

            case 'Cone':
                this.scene[num] = new Cone({});
                break;

            case "Tor":
                this.scene[num] = new Tor({});
                break;
        }
    }

    changeFigureSettig(num, setting, settingValue) {
        this.scene[num][setting] = settingValue;
        this.scene[num].generateFigure();
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

    delFigure(num) {
        this.scene[num] = null;
    }
}