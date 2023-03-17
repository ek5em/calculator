class Polygon {
    constructor(
        points,
        color = '#ee8448',
        centre = new Point,
        distance = 0,
        lumen = 1
    ) {
        this.points = points;
        this.centre = centre;
        this.distance = distance;
        this.lumen = lumen;
        this.color = color;
        this.normVector = {};
    }

    hexToRGB(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : { r: 0, g: 0, b: 0 };
    }

    rgbToColor(r, g, b) {
        return `rgb(${r},${g}, ${b})`;
    }
}