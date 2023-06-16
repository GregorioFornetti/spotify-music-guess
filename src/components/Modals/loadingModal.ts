import InvisibleModal from "./base/invisibleModal"

const spinnerWidth = '3rem'
const spinnerHeight = '3rem'


const content = document.createElement('div')
content.className = 'spinner-border text-success'
content.style.width = spinnerWidth
content.style.height = spinnerHeight
content.role = 'status'
content.innerHTML = '<span class="sr-only" style="display: none;">Loading...</span>'

const loadingModal = new InvisibleModal(
    "Modal loading",
    content
)

export default loadingModal