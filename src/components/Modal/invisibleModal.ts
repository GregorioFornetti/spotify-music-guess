
/**
 *  Classe para criação de Modais "invisiveis". Apenas o conteúdo será apresentado (junto com o backdrop)
 */
export default class InvisibleModal {

    modalBackdrop: HTMLElement

    /**
     *  Cria o modal e adiciona no documento HTML
     * 
     *  @param content - Conteúdo que será adicionado no corpo do Modal. Pode não ser passado, para depois ser adicionado através
     *  do método addContent (isso pode ser necessário para que o conteúdo do modal possa acionar funções do próprio Modal)
     */
    constructor(content?: HTMLElement) {
        this.modalBackdrop = document.createElement('div')
        this.modalBackdrop.className = 'modal-backdrop'
        if (content) {
            this.modalBackdrop.appendChild(content)
        }

        document.body.appendChild(this.modalBackdrop)

        document.body.style.overflow = 'hidden' // Para interromper o scroll
    }

    /**
     *  Adiciona um conteúdo para o corpo do Modal
     * 
     * @param content - conteúdo que será adicionado no Modal
     */
    addContent(content: HTMLElement): void {
        this.modalBackdrop.appendChild(content)
    }

    /**
     *  Fecha o modal. Primeiro é feito a animação de fechar, e depois é excluido o Modal do documento.
     */
    close(): void {
        document.body.style.overflow = 'visible' // Para interromper o scroll

        this.modalBackdrop.classList.add('closing')

        this.modalBackdrop.addEventListener('animationend', () => {
            this.modalBackdrop.remove()
        })
    }
}