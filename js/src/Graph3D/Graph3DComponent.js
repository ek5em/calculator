class Graph3DComponent extends Component {
    constructor(props) {
        super(props);

        const width = 800;
        const height = 800;

        this.scene = [];
        
        this.WIN = {
            WIDTH: 20,
            HEIGHT: 20,
            BOTTOM: -10,
            LEFT: -10,
            FOCUS: new Point(0, 0, 20),
            CAMERA: new Point(0, 0, 30),
        }
    
        this.canvas = new Canvas({
            id: "scene",
            width,
            height,
            WIN: this.WIN,
            callbacks: {
            }
        })

        this.graph3D = new Graph3D(this.WIN, this.canvas);
        
        this.graph3D.generate();
    }

}