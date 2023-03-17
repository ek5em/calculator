Template.prototype.UI3D = () => `
    <div class="menuGraph3DButton"></div>
    <div class = "block3D hide">
        <div class="figuresMenu">
            <div class ='figuresCheckBoxes'>
                <input type="checkbox" id="PolygonsCheckBox" data-setting = "showPolygons"  name="Polygons" checked>
                <label for="PolygonsCheckBox">Полигоны</label>
                <input type="checkbox" id="EdgesCheckBox" data-setting = "showEdges" name="Edges" checked>
                <label for="EdgesCheckBox">Рёбра</label>
                <input type="checkbox" id="PointsCheckBox" data-setting = "showPoints" name="Points" checked>
                <label for="PointsCheckBox">Точки</label>
                <input type="checkbox" id="animationCheckBox" data-setting = "showAnimation" name="Animation">
                <label for="animationCheckBox">Анимация</label>
            </div>
            <input class="lightPower" type="range" min="0" max="5000" step="50" value="400">
            <div class="addFigure">Добавить</div>
            <div id = 'figuresList' class = 'hide'>
                <div data-figure="Cube">Куб</div>
                <div data-figure="Sphere">Сфера</div>
                <div data-figure="Ellipsoid">Эллипсоид</div>
                <div data-figure="Cone">Конус</div>
                <div data-figure = "Tor">Тор</div>
            </div>


            <div class="figuresContainer"></div>
        </div>
    </div>
`