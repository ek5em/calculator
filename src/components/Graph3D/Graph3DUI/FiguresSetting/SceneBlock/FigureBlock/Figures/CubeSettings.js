import { useRef, useEffect } from "react";

const CubeSettings = ({ callbacks, figure }) => {
    const refSize = useRef(null);

    useEffect(() => {
        refSize.current.value = figure.size ? figure.size : '';
    })
    return (
        <>
            <input
                ref={refSize}
                type="number"
                placeholder="Длина"
                onChange={() => callbacks.changeSize(figure, refSize.current.value - 0)}
            />
        </>
    )
}

export default CubeSettings;