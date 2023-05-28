
/**
 *  Classe para criar componentes Modal
 */
export default class Modal {

    modal: HTMLElement
    modalBackdrop: HTMLElement
    modalBody: HTMLElement

    /**
     * 
     *  Cria o modal e adiciona no documento HTML
     * 
     *  @param title - Titulo do modal, irá aparecer no canto superior esquerdo.
     *  
     *  @param closable - Se for verdadeiro, um botão de fechar será adicionado no canto superior direito
     *  
     *  @param content - Conteúdo que será adicionado no corpo do Modal. Pode não ser passado, para depois ser adicionado através
     *  do método addContent (isso pode ser necessário para que o conteúdo do modal possa acionar funções do próprio Modal).
     */
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

        document.body.style.overflow = 'hidden' // Para interromper o scroll
    }

    /**
     *  Adiciona um conteúdo para o corpo do Modal
     * 
     * @param content - conteúdo que será adicionado no Modal
     */
    addContent(content: HTMLElement): void {
        this.modalBody.appendChild(content)
    }

    /**
     *  Fecha o modal. Primeiro é feito a animação de fechar, e depois é excluido o Modal do documento.
     */
    close(): void {
        document.body.style.overflow = 'visible'  // Para voltar o scroll

        this.modalBackdrop.classList.add('closing')
        this.modal.classList.add('closing')

        this.modalBackdrop.addEventListener('animationend', () => {
            this.modalBackdrop.remove()
        })
    }
}