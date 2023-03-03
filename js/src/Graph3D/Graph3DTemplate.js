Template.prototype.Graph3D = () =>
    `<canvas id = "canvas3D"></canvas>
    <div class = "figuresSettings">
        <select id = 'figures'>
        <option value="Cube">Куб</option>
        <option value="Sphere">Сфера</option>
        <option value="Ellipsoid">Эллипсоид</option>
        <option value="Cone">Конус</option>
        </select>
        <input type="checkbox" id="PolygonsCheckBox" name="Polygons" checked>
        <label for="PolygonsCheckBox">Полигоны</label>
        <input type="checkbox" id="EdgesCheckBox" name="Edges" checked>
        <label for="EdgesCheckBox">Рёбра</label>
        <input type="checkbox" id="PointsCheckBox" name="Points" checked>
        <label for="PointsCheckBox">Точки</label>
    </div>`