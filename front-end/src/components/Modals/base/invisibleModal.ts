import { Modal } from "bootstrap"
import BaseModal from "./baseModal"

/**
 *  Classe para criação de Modais "invisiveis". Apenas o conteúdo será apresentado (junto com o backdrop)
 */
export default class InvisibleModal extends BaseModal {

    /**
     *  Cria o modal e adiciona no documento HTML
     * 
     *  @param ariaLabel - Por qual nome o modal será identificado por leitores de tela
     *  
     *  @param content - Conteúdo que será adicionado no corpo do Modal. Pode não ser passado, para depois ser adicionado através
     *  do método addContent (isso pode ser necessário para que o conteúdo do modal possa acionar funções do próprio Modal)
     */
    constructor(ariaLabel: string, content?: HTMLElement) {
        const modalElement = document.createElement('div')
        modalElement.className = 'modal fade modal-invisible'
        modalElement.tabIndex = -1
        modalElement.ariaLabel = ariaLabel
        modalElement.ariaHidden = 'true'
        modalElement.dataset.bsTheme = 'dark'
        modalElement.dataset.bsBackdrop = "static"

        const modalDialogElement = document.createElement('div')
        modalDialogElement.className = 'modal-dialog modal-dialog-centered modal-dialog-invisible modal-fullscreen'
        if (content) {
            modalDialogElement.appendChild(content)
        }

        modalElement.appendChild(modalDialogElement)

        document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(modalElement)
        })

        super(new Modal(modalElement), modalElement, modalDialogElement)
    }
}