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

    mutlMatrix(a, b) {
        const result = [];
        for (let i = 0; i < a.length; i++) {
            result.push([]);
            for (let j = 0; j < b[i].length; j++) {
                result[i][j] = 0;
                for (let k = 0; k < a[i].length; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return result;
    }

    getTranformMatrix() {
        return Array.from(arguments).reduce((result, matrix) =>
            this.mutlMatrix(result, matrix), [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]);
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

            polygon.centre.x = x / points.length;
            polygon.centre.y = y / points.length;
            polygon.centre.z = z / points.length;
        })
    }

    calcDistance(figure, endPoint, name) {
        figure.polygons.forEach((polygon) => {
            polygon[name] = Math.sqrt(
                Math.pow(endPoint.x - polygon.centre.x, 2) +
                Math.pow(endPoint.y - polygon.centre.y, 2) +
                Math.pow(endPoint.z - polygon.centre.z, 2));
        });
    }

    calcNormVectors(figure) {
        figure.polygons.forEach((polygon) => {
            const p1 = figure.points[polygon.points[0]];
            const p2 = figure.points[polygon.points[1]];
            const p3 = figure.points[polygon.points[2]];
            const a = [
                p2.x - p1.x,
                p2.y - p1.y,
                p2.z - p1.z
            ]
            const b = [
                p2.x - p3.x,
                p2.y - p3.y,
                p2.z - p3.z
            ]

            polygon.normVector = [
                a[1] * b[2] - a[2] * b[1],
                a[2] * b[0] - a[0] * b[2],
                a[0] * b[1] - a[1] * b[0],
            ]
        })
    }

    calcAngle(a, b) {
        const mult = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        const moduleA = Math.sqrt(
            Math.pow(a[0], 2) +
            Math.pow(a[1], 2) +
            Math.pow(a[2], 2)
        );
        const moduleB = Math.sqrt(
            Math.pow(b[0], 2) +
            Math.pow(b[1], 2) +
            Math.pow(b[2], 2)
        )
        return Math.acos(mult / moduleA / moduleB);
    }

    sortByArtistAlgoritm(polygons) {
        polygons.sort((a, b) => b.distance - a.distance);
    }

    calcIllumination(distance, lumen) {
        const res = distance ? lumen / Math.pow(distance, 2) : 1;
        return res > 1 ? 1 : res;
    }


}