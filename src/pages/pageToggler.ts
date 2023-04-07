
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