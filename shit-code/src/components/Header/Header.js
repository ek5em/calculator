import './Header.css';

const Header = ({ showComponent, components, selectedComponent }) => {


    return (
        <div className="header">
            {components.map((component, index) => {
                return (
                    <div
                        key={index}
                        onClick={() => {
                            showComponent(component.name);
                        }}
                        className={
                            `menu-button${(selectedComponent === component.name) ?
                                ' select-menu-button' : ''}`
                        }>
                        {component.text}
                    </div>
                )
            })}
        </div>
    )
}

export default Header;