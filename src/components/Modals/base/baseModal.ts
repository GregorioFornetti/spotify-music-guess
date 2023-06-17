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

        /*
            https://getbootstrap.com/docs/5.3/getting-started/javascript/#asynchronous-functions-and-transitions

            O bootstrap ignora todas as chamadas de funções ao modal durante a transição (animação) de 
            um evento do modal (abrir ou fechar). Para evitar que ao chamar uma função como o show, toggle
            e hide o evento seja simplesmente ignorado, foi criado uma "fila de animações".

            Basicamente, ao chamar uma função show, toggle ou hide, e estiver acontecendo uma animação, essa
            animação será adicionado na fila e será executada logo que as outras que estiverem na sua frente
            forem executadas
        */
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
     *  @param content - conteúdo que será adicionado no Modal
     */
    addContent(content: HTMLElement): void {
        this.modalContent.innerHTML = ''
        this.modalContent.appendChild(content)
    }

    /**
     *  Abre o modal (caso não tenha outras animações na fila). Se tiver outras animações na fila, só será aberto após todas
     *  as outras animações forem finalizadas.
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
     *  Fecha o modal (caso não tenha outras animações na fila). Se tiver outras animações na fila, só será fechado após todas
     *  as outras animações forem finalizadas
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
     *  Abre o modal se estiver fechado. Se estiver aberto, fecha o modal. Caso tenha outras animações na fila, essa transição
     *  só será realizada após todas as outras serem finalizadas.
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