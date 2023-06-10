
const pagesDisplay = {
    "empty-page": "none",
    "home-page": "grid",
    "playlist-info-page": "block",
    "rounds-mode-game-page": "block",
    "credits-page": "block"
}


/**
 * 
 *  Torna visivel apenas a pagina com o ID especificado. No caso, a página deve estar dentro da tag <main>. 
 * 
 *  @param pageId - ID da página. O id deve é aquele contido no atribudo id, em um container dentro da tag <main>
 *  
 */
export default function toggleToPage(pageId: keyof typeof pagesDisplay): void {
    const pages = document.getElementById('main')?.children

    if (pages) {
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i] as HTMLElement;
            page.style.display = "none"
            if (page.id === pageId) {
                page.style.display = pagesDisplay[pageId]
            }
        }
    }
}

/**
 * 
 *  Torna visivel apenas a sub-pagina com o ID especificado. Uma sub-página deve estar contida em uma página dentro de uma página. Essa  
 *  sub-página só ficará visível se a página em que ela estiver também estiver visível.
 * 
 *  @param pageId - ID da página. O id é aquele contido no atribudo id, em um container dentro da tag <main>
 * 
 *  @param subPageId - ID da subpágina. O id é aquele contido no atributo id, em um container dentro de uma página
 *  
 */
export function toggleToSubpage(pageId: keyof typeof pagesDisplay, subPageId: string): void {
    const subpages = document.getElementById(pageId)?.children

    if (subpages) {
        for (let i = 0; i < subpages.length; i++) {
            const subpage = subpages[i] as HTMLElement
            subpage.style.display = 'none'
            if (subpage.id === subPageId) {
                subpage.style.display = 'block'
            }
        }
    }
}