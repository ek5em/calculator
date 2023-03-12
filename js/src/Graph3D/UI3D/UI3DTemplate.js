Template.prototype.UI3D = () => `

    <div class="menuGraph3DButton"></div>
    <div class = "block3D hide">
        <div class="figuresMenu">
            <div class ='figuresCheckBoxes'>
                <input type="checkbox" id="PolygonsCheckBox" name="Polygons" checked>
                <label for="PolygonsCheckBox">Полигоны</label>
                <input type="checkbox" id="EdgesCheckBox" name="Edges" checked>
                <label for="EdgesCheckBox">Рёбра</label>
                <input type="checkbox" id="PointsCheckBox" name="Points" checked>
                <label for="PointsCheckBox">Точки</label>
            </div>
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