class App extends Component {
    constructor(props) {
        super(props);

        this.menu = new Menu({
            id: 'menu',
            parent: this.id,
            template: template.Menu,
            callbacks: {
                showMenuItem: (name) => this.showMenuItem(name)
            }
        })

        this.calculator = new CalculatorComponent({
            id: 'calculator',
            parent: this.id,
            template: template.Calculator,
        })

        this.polynomialCalculator = new PolynomialCalculatorComponent({
            id: 'polyomialCalculator',
            parent: this.id,
            template: template.PolynomialCalculator,
        })

        this.graph2D = new Graph2DComponent({
            id: "graph2D",
            parent: this.id,
            template: template.Graph2D,
        })

        this.esse = new EsseComponent({
            id: "esse",
            parent: this.id,
            template: template.Esse,
        })

        this.polynomialCalculator.hide();
        this.calculator.hide();
        this.graph2D.hide();

    }

    showMenuItem(name) {
        this.calculator.hide();
        this.polynomialCalculator.hide();
        this.graph2D.hide();
        this.esse.hide();
        this[name].show();
    }

}
