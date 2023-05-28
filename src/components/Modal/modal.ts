

export default class Modal {

    modalBackdrop: HTMLElement
    modalBody: HTMLElement

    constructor(title: string, closable: boolean, content?: HTMLElement) {

        this.modalBackdrop = document.createElement('div');
        this.modalBackdrop.className = 'modal-backdrop'


        const modal = document.createElement('div')
        modal.className = 'modal'


        const modalHeader = document.createElement('div')
        modalHeader.className = 'modal-header'

        const modalTitle = document.createElement('div')
        modalTitle.className = 'modal-title'
        modalTitle.innerHTML = title
        modalHeader.appendChild(modalTitle)

        if (closable) {
            const modalClose = document.createElement('div')
            modalClose.className = 'modal-close'
            modalClose.innerHTML = '<i class="bi bi-x"></i>'
            
            modalClose.addEventListener('click', () => {
                this.close()
            })

            modalHeader.appendChild(modalClose)
        }


        this.modalBody = document.createElement('div')
        this.modalBody.className = 'modal-body'
        if (content) {
            this.modalBody.appendChild(content)
        }


        modal.appendChild(modalHeader)
        modal.appendChild(this.modalBody)

        this.modalBackdrop.appendChild(modal)

        document.body.appendChild(this.modalBackdrop)
    }

    addContent(content: HTMLElement): void {
        this.modalBody.appendChild(content)
    }

    close(): void {
        this.modalBackdrop.classList.add('closing')
        this.modalBackdrop.addEventListener('animationend', () => {
            this.modalBackdrop.remove()
        })
    }
}