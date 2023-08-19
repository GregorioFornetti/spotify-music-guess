import Modal from "./base/visibleModal"
import getDevices from "../../spotifyApi/requests/getDevices"
import createDeviceElement from "../device"
import selectDevice from "../../spotifyApi/requests/selectDevice"

const deviceSelected = new Modal('deviceSelectedModal', 'modal-devices', false, true)
var modalContent
class deviceSelectedModal {
    
    

    static show(onDeviceSelect: () => void): void {
        

       
        getDevices().then(devices => {
            
            console.log(devices.length)
            /* não tem dispositivo nenhum, abrir algum dispositivo */
            if (devices.length < 1) {

                modalContent = document.createElement('div');
                var paragrafo = document.createElement('p');
                modalContent.className = 'mensagem-devices'
                paragrafo.textContent = 'nenhum dispositivo encontrado, favor abrir o spotfy.'
                modalContent.appendChild(paragrafo);

                const botao = document.createElement('button')
                botao.innerHTML = 'recarregar devices'
                botao.addEventListener('click', () => {
                    deviceSelected.hide()
                    this.show(onDeviceSelect)   
                })
                modalContent.appendChild(botao)

                deviceSelected.addContent(modalContent)
                deviceSelected.show()

            }
            else {

                const devicesListElement = document.createElement('div')

                for (const device of devices) {
                    const deviceElement = createDeviceElement(device)
                    deviceElement.addEventListener('click', async () => {
                        if (device.id) {
                            selectDevice(device.id).then(() => {
                                deviceSelected.hide()
                                onDeviceSelect()
                            })
                            
                        }
                    })
                    devicesListElement.appendChild(deviceElement)
                }
                if (!devices.some((device) => device.is_active)) {
                    deviceSelected.addContent(devicesListElement)
                    deviceSelected.show()
                }
                else {
                    onDeviceSelect()
                }
            }
        })
    
    }
}

export default deviceSelectedModal