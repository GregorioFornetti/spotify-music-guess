import Modal from "./base/visibleModal"
import getDevices from "../../spotifyApi/requests/getDevices"
import createDeviceElement from "../device"
import selectDevice from "../../spotifyApi/requests/selectDevice"

const deviceSelectedModal = new Modal('deviceSelectedModal', 'modal-devices', false, true)
document.addEventListener('DOMContentLoaded', () => {
    console.log('inicializando o modal')

    const initGame = document.getElementById('configs-rounds-form')

    console.log(initGame)
    var modalContent

    initGame?.addEventListener('submit', function () {
    
        let devicesList = document.getElementById('devices-list');

        /* se a div estiver vazia nenhum device foi selecionado o usuário deve ser orientado a abrir o spotify */
        if (devicesList?.innerHTML.trim() === '') {
            modalContent = document.createElement('div');
            var paragrafo = document.createElement('p');
            modalContent.className = 'mensagem-devices'
            paragrafo.textContent = 'nenhum dispositivo encontrado, favor abrir o spotfy.'
            modalContent.appendChild(paragrafo);

            deviceSelectedModal.addContent(modalContent)
            deviceSelectedModal.show()

        } else {
            /* se houverem dispositivos na div, podem estar selecionados ou não
            caso não tenha nenhum dispositivo selecionado pedir ao usuário para selecionar um dispositivo, se não deixa passar */
            console.log('tem device, agora seleciona')
            /* se não tem elementos selecionados */
            const premium = document.getElementById('input-premium') as HTMLInputElement
        
            if (premium) {
                getDevices().then(devices => {
                 
                    console.log(devices.length)

                    const devicesListElement = document.createElement('div')

                    for (const device of devices) {
                        const deviceElement = createDeviceElement(device)
                        deviceElement.addEventListener('click', async () => {
                            if (device.id) {
                                await selectDevice(device.id)
                                deviceSelectedModal.hide()
                            }
                        })
                        devicesListElement.appendChild(deviceElement)
                    }
                    if (!devices.some((device) => device.is_active)) {
                        deviceSelectedModal.addContent(devicesListElement)
                        deviceSelectedModal.show()
                    }
                })
            }
        }   
        })  /*deixar passar */
})

export default deviceSelectedModal
