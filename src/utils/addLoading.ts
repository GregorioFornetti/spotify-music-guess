import loadingModal from "../components/Modals/loadingModal";


export default async function addLoading(functionToWait: (...args: any[]) => Promise<any>, ...args: any[]): Promise<any> {
    loadingModal.show()
    const results = await functionToWait(...args)
    loadingModal.hide()
    return results
}

export async function addLoadingWithConditional(functionToWait: (...args: any[]) => Promise<any>, hasLoading?: boolean, ...args: any[]): Promise<any> {
    if (hasLoading) {
        return addLoading(functionToWait, ...args)
    } else {
        return functionToWait(...args)
    }
}