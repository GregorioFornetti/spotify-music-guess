
import { Modal } from "bootstrap"
import BaseModal from "./baseModal"

/**
 *  Classe para criar componentes Modal
 */
export default class VisibleModal extends BaseModal {

    /**
     * 
     *  Cria o modal e adiciona no documento HTML
     * 
     *  @param id - Id que será usado pelo modal (no documento HTML)
     * 
     *  @param title - Titulo do modal, irá aparecer no canto superior esquerdo.
     *  
     *  @param closable - Se for verdadeiro, um botão de fechar será adicionado no canto superior direito
     * 
     *  @param centered - Se for verdadeiro, o modal será centralizado verticalmente
     *  
     *  @param content - Conteúdo que será adicionado no corpo do Modal. Pode não ser passado, para depois ser adicionado através
     *  do método addContent (isso pode ser necessário para que o conteúdo do modal possa acionar funções do próprio Modal).
     * 
     *  @param size - Tamanho do modal: 
     *  - xl: extra large 
     *  - lg: large
     *  - sm: small
     *  - undefined: medium
     * 
     *  @param fullscreen - Breakpoint ao qual o modal ficará em tela cheia (Ex: md = o modal ficará em fullscreen na tela média ).
     *  As opções são: 
     *  - sm: small para baixo
     *  - md: medium para baixo
     *  - lg: large para baixo
     *  - xl: extra large para baixo
     *  - xxl: extra extra large para baixo
     *  - always: sempre será tela cheia
     *  - undefined: nunca será tela cheia
     */
    constructor(id: string, title: string, closable: boolean, centered: boolean, size?: 'xl'|'lg'|'sm', content?: HTMLElement, fullscreen?: 'sm'|'md'|'lg'|'xl'|'xxl'|'always') {

        const modalElement = document.createElement('div')
        modalElement.className = 'modal fade'
        modalElement.id = id
        modalElement.tabIndex = -1
        modalElement.ariaLabel = title
        modalElement.ariaHidden = 'true'
        modalElement.dataset.bsTheme = 'dark'
        if (!closable) {
            modalElement.dataset.bsBackdrop = "static"
        }

        const modalDialogElement = document.createElement('div')
        modalDialogElement.className = 'modal-dialog'
        if (centered) {
            modalDialogElement.classList.add('modal-dialog-centered')
        }
        if (size) {
            modalDialogElement.classList.add(`modal-${size}`)
        }
        if (fullscreen) {
            if (fullscreen === 'always') {
                modalDialogElement.classList.add('modal-fullscreen')
            } else {
                modalDialogElement.classList.add(`modal-fullscreen-${fullscreen}-down`)
            }
        }

        const modalContentElement = document.createElement('div')
        modalContentElement.className = 'modal-content visible-modal-content'

        const modalHeaderElement = document.createElement('div')
        modalHeaderElement.className = 'modal-header'
        modalHeaderElement.innerHTML = `<h2 class="modal-title fs-5 h1">${title}</h2>`
        if (closable) {
            const modalCloseBtn = document.createElement('button')
            modalCloseBtn.type = 'button'
            modalCloseBtn.className = 'btn-close'
            modalCloseBtn.ariaLabel = 'close'
            modalCloseBtn.dataset.bsDismiss = 'modal'
            modalHeaderElement.appendChild(modalCloseBtn)
        }

        const modalBodyElement = document.createElement('div')
        modalBodyElement.className = 'modal-body'
        if (content) {
            modalBodyElement.appendChild(content)
        }

        const modalFooterElement = document.createElement('div')
        modalFooterElement.className = 'modal-footer'

        modalContentElement.appendChild(modalHeaderElement)
        modalContentElement.appendChild(modalBodyElement)
        modalContentElement.appendChild(modalFooterElement)

        modalDialogElement.appendChild(modalContentElement)

        modalElement.appendChild(modalDialogElement)

        document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(modalElement)
        })

        super(new Modal(modalElement), modalElement, modalBodyElement)
    }
}