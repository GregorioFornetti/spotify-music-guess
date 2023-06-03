import InvisibleModal from "./invisibleModal"

const content = document.createElement('div')
content.innerHTML = `testeeeeeeee`

const invisibleModal = new InvisibleModal(
    "Modal invisivel teste",
    content
)

export default invisibleModal