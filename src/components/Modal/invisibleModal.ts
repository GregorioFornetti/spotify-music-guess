

export default class InvisibleModal {

    modalBackdrop: HTMLElement

    constructor(content?: HTMLElement) {
        this.modalBackdrop = document.createElement('div')
        this.modalBackdrop.className = 'modal-backdrop'
        if (content) {
            this.modalBackdrop.appendChild(content)
        }

        document.body.appendChild(this.modalBackdrop)

        document.body.style.overflow = 'hidden' // Para interromper o scroll
    }

    addContent(content: HTMLElement): void {
        this.modalBackdrop.appendChild(content)
    }

    close(): void {
        document.body.style.overflow = 'visible' // Para interromper o scroll

        this.modalBackdrop.classList.add('closing')

        this.modalBackdrop.addEventListener('animationend', () => {
            this.modalBackdrop.remove()
        })
    }
}