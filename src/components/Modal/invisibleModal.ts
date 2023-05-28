

export default class InvisibleModal {

    modalBackdrop: HTMLElement

    constructor(content?: HTMLElement) {
        this.modalBackdrop = document.createElement('div')
        this.modalBackdrop.className = 'modal-backdrop'
        if (content) {
            this.modalBackdrop.appendChild(content)
        }

        document.body.appendChild(this.modalBackdrop)
    }

    addContent(content: HTMLElement): void {
        this.modalBackdrop.appendChild(content)
    }

    close(): void {
        this.modalBackdrop.remove()
    }
}