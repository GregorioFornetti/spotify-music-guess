import loadingModal from "../components/Modals/loadingModal";


export default async function addLoading(functionToWait: (...args: any[]) => Promise<any>, ...args: any[]): Promise<any> {
    loadingModal.show()
    const results = await functionToWait(...args)
    loadingModal.hide()
    return results
}
