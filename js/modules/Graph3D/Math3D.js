class Math3D {
    constructor({ WIN }) {
        this.WIN = WIN;
    }
    xs(point) {
        const { CAMERA, FOCUS } = this.WIN;
        return (point.x - CAMERA.x) / (point.z - CAMERA.z) * (FOCUS.z - CAMERA.z) - CAMERA.x;
    }

    ys(point) {
        const { CAMERA, FOCUS } = this.WIN;
        return (point.y - CAMERA.y) / (point.z - CAMERA.z) * (FOCUS.z - CAMERA.z) - CAMERA.y;
    }

    mult(matrix, point) {
        const c = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            let s = 0;
            for (let j = 0; j < 4; j++) {
                s += matrix[j][i] * point[j];
            }
            c[i] = s;
        }
        return c;
    }

    transformPoint(matrix, point) {
        const array = this.mult(
            matrix,
            [point.x, point.y, point.z, 1]);
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    zoom(delta) {
        return [
            [delta, 0, 0, 0],
            [0, delta, 0, 0],
            [0, 0, delta, 0],
            [0, 0, 0, 1]
        ];
    }

    move(dx, dy, dz) {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [dx, dy, dz, 1]
        ];
    }

    rotateOx(alpha) {
        return [
            [1, 0, 0, 0],
            [0, Math.cos(alpha), Math.sin(alpha), 0],
            [0, -Math.sin(alpha), Math.cos(alpha), 0],
            [0, 0, 0, 1]
        ];
    }

    rotateOy(alpha) {
        return [
            [Math.cos(alpha), 0, Math.sin(alpha), 0],
            [0, 1, 0, 0],
            [-Math.sin(alpha), 0, Math.cos(alpha), 0],
            [0, 0, 0, 1]
        ];
    }

    rotateOz(alpha) {
        return [
            [Math.cos(alpha), -Math.sin(alpha), 0, 0],
            [Math.sin(alpha), Math.cos(alpha), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]
    }

    calcCenters(figure) {
        figure.polygons.forEach((polygon) => {
            const points = polygon.points;
            let x = 0, y = 0, z = 0;
            for (let i = 0; i < points.length; i++) {
                x += figure.points[points[i]].x;
                y += figure.points[points[i]].y;
                z += figure.points[points[i]].z;
            };

            polygon.center.x = x / points.length;
            polygon.center.y = y / points.length;
            polygon.center.z = z / points.length;
        })
    }

    calcDistance(figure, endPoint, name) {
        figure.polygons.forEach((polygon) => {
            polygon[name] = Math.sqrt(
                Math.pow(endPoint.x - polygon.center.x, 2) +
                Math.pow(endPoint.y - polygon.center.y, 2) +
                Math.pow(endPoint.z - polygon.center.z, 2));
        });
    }

    sortByArtistAlgoritm(polygons) {
        polygons.sort((a, b) => b.distance - a.distance);
    }
}