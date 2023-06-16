import { Modal } from "bootstrap"

export default class BaseModal {

    private modal: Modal
    private modalContent: HTMLElement
    private onAnimation: boolean
    private animationQueue: ("show"|"hide"|"toggle")[] = []

    constructor(modal: Modal, modalElement: HTMLElement, modalContent: HTMLElement) {
        this.modal = modal
        this.onAnimation = false
        this.modalContent = modalContent

        const animationEventListener = () => {
            this.onAnimation = false

            if (this.animationQueue.length !== 0) {
                const newAnimation = this.animationQueue.shift()
                if (newAnimation === 'hide') {
                    this.hide()
                }
                else if (newAnimation === 'show') {
                    this.show()
                }
                else if (newAnimation === 'toggle') {
                    this.toggle()
                }
            }
        }

        modalElement.addEventListener('hidden.bs.modal', animationEventListener)
        modalElement.addEventListener('shown.bs.modal', animationEventListener)
    }
    

    /**
     *  Adiciona um conteúdo para o corpo do Modal
     * 
     * @param content - conteúdo que será adicionado no Modal
     */
    addContent(content: HTMLElement): void {
        this.modalContent.innerHTML = ''
        this.modalContent.appendChild(content)
    }

    /**
     *  Abre o modal.
     */
    show(): void {
        if (!this.onAnimation) {
            this.onAnimation = true
            this.modal.show()
        } else {
            this.animationQueue.push('show')
        }
    }

    /**
     *  Fecha o modal.
     */
    hide(): void {
        if (!this.onAnimation) {
            this.onAnimation = true
            this.modal.hide()
        } else {
            this.animationQueue.push('hide')
        }
    }

    /**
     *  Abre o modal se estiver fechado. Se estiver aberto, fecha o modal.
     */
    toggle(): void {
        if (!this.onAnimation) {
            this.onAnimation = true
            this.modal.toggle()
        } else {
            this.animationQueue.push('toggle')
        }
    }
}