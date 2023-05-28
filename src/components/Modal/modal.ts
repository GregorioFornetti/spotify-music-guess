

export default class Modal {

    modal: HTMLElement
    modalBackdrop: HTMLElement
    modalBody: HTMLElement

    constructor(title: string, closable: boolean, content?: HTMLElement) {

        this.modalBackdrop = document.createElement('div');
        this.modalBackdrop.className = 'modal-backdrop'


        this.modal = document.createElement('div')
        this.modal.className = 'modal'


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


        this.modal.appendChild(modalHeader)
        this.modal.appendChild(this.modalBody)

        this.modalBackdrop.appendChild(this.modal)

        document.body.appendChild(this.modalBackdrop)
    }

    addContent(content: HTMLElement): void {
        this.modalBody.appendChild(content)
    }

    close(): void {
        this.modalBackdrop.classList.add('closing')
        this.modal.classList.add('closing')
        
        this.modalBackdrop.addEventListener('animationend', () => {
            this.modalBackdrop.remove()
        })
    }
}