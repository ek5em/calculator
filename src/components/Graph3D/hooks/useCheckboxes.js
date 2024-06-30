const useCheckboxes = ({
    showHideAnimation,
    showHideEdges,
    showHidePoints,
    showHidePolygons,
    showHideShadows,
}) => {
    return [
        {
            text: 'Точки',
            onClick: (value) => showHidePoints(value),
            checked: false,
        },
        {
            text: 'Рёбра',
            onClick: (value) => showHideEdges(value),
            checked: false,
        },
        {
            text: 'Полигоны',
            onClick: (value) => showHidePolygons(value),
            checked: true,
        },
        {
            text: 'Анимация',
            onClick: (value) => showHideAnimation(value),
            checked: false,
        },
        {
            text: 'Тени',
            onClick: (value) => showHideShadows(value),
            checked: false,
        },
    ]
}

export default useCheckboxes;