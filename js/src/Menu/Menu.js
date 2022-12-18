class Menu extends Component {
    addEventListeners() {
        document.querySelectorAll('.mainMenuButton').forEach(button =>
            button.addEventListener('click', (event) =>
                this.callbacks.showMenuItem(event.target.dataset.item))
        )
    }
}