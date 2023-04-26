
import Device from "../spotifyApi/types/Device"


export default function createDeviceElement(device: Device): HTMLElement {
    const deviceElement = document.createElement('div')
    deviceElement.classList.add('device')
    
    const deviceIsSelectedContainer = document.createElement('div')
    deviceIsSelectedContainer.classList.add('device-is-selected-container')

    const deviceIsSelectedText = document.createElement('p')
    deviceIsSelectedText.classList.add('device-is-selected-text')
    
    if (device.is_active) {
        deviceElement.classList.add('selected')
        deviceIsSelectedText.innerText = 'Dispositivo seleccionado'
    }
    
    deviceIsSelectedContainer.appendChild(deviceIsSelectedText)
    deviceElement.appendChild(deviceIsSelectedContainer)

    
    const deviceIconContainer = document.createElement('div')
    deviceIconContainer.classList.add('device-icon-container')
    
    const deviceIcon = document.createElement('i')
    if (device.type === 'Computer') {
        deviceIcon.className = 'bi bi-laptop'
    } else if (device.type === 'Smartphone') {
        deviceIcon.className = 'bi bi-phone'
    } else if (device.type === 'Speaker') {
        deviceIcon.className = 'bi bi-speaker'
    }

    deviceIconContainer.appendChild(deviceIcon)
    deviceElement.appendChild(deviceIconContainer)

    const deviceNameContainer = document.createElement('div')
    deviceNameContainer.classList.add('device-name-container')

    const deviceName = document.createElement('p')
    deviceName.classList.add('device-name')
    deviceName.innerText = device.name

    deviceNameContainer.appendChild(deviceName)
    deviceElement.appendChild(deviceNameContainer)

    return deviceElement
}