class Graph2d {
    constructor(WIN, canvas) {
        this.WIN = WIN;
        this.canvas = canvas;
    }

    printOXY() {
        const { left, width, height, bottom } = this.WIN;
        this.canvas.line(left, 0, width + left, 0, 3);
        this.canvas.line(0, bottom, 0, bottom + height, 3);
    }

    grid(color = '#ccc') {
        const { left, width, bottom, height } = this.WIN;
        for (let i = 0; i <= left + width; i++) {
            this.canvas.line(i, bottom, i, bottom + height, 1, color);
        }
        for (let i = 0; i >= left; i--) {
            this.canvas.line(i, bottom, i, bottom + height, 1, color);
        }
        for (let i = 0; i <= bottom + height; i++) {
            this.canvas.line(left, i, left + width, i, 1, color);
        }
        for (let i = 0; i >= bottom; i--) {
            this.canvas.line(left, i, left + width, i, 1, color);
        }
    }

    printNums() {
        const { left, bottom, width, height } = this.WIN;
        const streakLength = height / (width + 30);
        const len = streakLength / 2;
        const shiftY = -height * 0.01 - 0.04;
        const shiftX = width * 0.001 + 0.04;

        for (let i = Math.round(left); i < left + width; i++) {
            this.canvas.line(i, len, i, -len, 2.5);
            this.canvas.printText(i, i + shiftX, shiftY);
        }
        for (let i = Math.round(bottom); i < bottom + height; i++) {
            this.canvas.line(len, i, -len, i, 2.5);
            this.canvas.printText(i, shiftX, i + shiftY);
        }
    }

    printDerivative(f, x) {
        const dx = Math.pow(10, -9),
            k = (f(x + dx) - f(x)) / dx,
            b = f(x) - k * x,
            x1 = this.WIN.left,
            x2 = this.WIN.left + this.WIN.width,
            y1 = k * x1 + b,
            y2 = k * x2 + b;
        this.canvas.line(x1, y1, x2, y2, 1, 'red');
    }

    printFunction(f, color = 'black', lineWidth = 2) {
        const { width, left, height } = this.WIN;
        const dx = width / 1000;
        let x = left;

        while (x < width + left) {
            const y1 = f(x);
            const y2 = f(x + dx);
            if (Math.abs(y1 - y2) < height) {
                this.canvas.line(x, f(x), x + dx, f(x + dx), lineWidth, color);
            }
            else {
                this.canvas.line(x, f(x), x + dx, f(x + dx), lineWidth, color, true);
            }
            x += dx;
        }
    }

    printIntegral(f, a, b, integral, d = 100, color = 'rgb(195, 119, 224, 0.6)') {
        const dx = (b - a) / d;
        let x = a;
        const points = [];
        points.push({ x: a, y: 0 })
        while (x <= b) {
            points.push({ x, y: f(x) });
            x += dx;
        }
        points.push({ x: b, y: f(b) })
        points.push({ x: b, y: 0 })
        this.canvas.polygon(points, color);
        this.canvas.line(a, 0, b, 0, 2, 'orange');
    }

    generate() {
        this.canvas.clear()
        this.grid();
        this.printNums();
        this.printOXY();
    }
}