class Graph3DComponent extends Component {
    constructor(props) {
        super(props);

        const width = 1200;
        const height = 800;
        this.prop = width / height;

        this.zoomStep = 1.1;
        this.canRotate = false;

        this.scene = [new Cube];

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

        this.graph3D = new Graph3D(this.WIN, this.canvas);

        setInterval(() => {
            this.renderScene();
        }, 15)

    }

    renderScene() {
        this.canvas.clear();
        this.scene.forEach((figure) => {
            this.graph3D.drawFigure(figure);
        })
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
            const prop = 180;
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
}