
import Device from "../spotifyApi/types/Device"


export default function createDeviceElement(device: Device): HTMLElement {
    const deviceElement = document.createElement('div')
    deviceElement.classList.add('device')
    if (device.is_active) {
        deviceElement.classList.add('selected')
    }

    const deviceName = document.createElement('p')
    deviceName.classList.add('device-name')
    deviceName.innerText = device.name

    deviceElement.appendChild(deviceName)

    return deviceElement
}