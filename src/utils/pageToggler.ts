
export default function toggleToPage(pageId: string) {
    const pages = document.getElementById('main')?.children

    if (pages) {
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i] as HTMLElement;
            page.style.display = "none"
            if (page.id === pageId) {
                page.style.display = "block"
            }
        }
    }
}

export function toggleToSubpage(pageId: string, subPageId: string) {
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