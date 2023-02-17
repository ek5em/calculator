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
}