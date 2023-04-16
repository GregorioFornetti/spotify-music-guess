

export default function shuffle(array: any[], size?: number) {
    let arraySize = array.length
    if (size) {
        arraySize = size
    }
    let newArray = [...array]

    for (let i = arraySize - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    if (size) {
        return newArray.slice(0, arraySize)
    } else {
        return newArray
    }
}