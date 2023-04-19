
/**
 * 
 *  Embaralha um array (não é inplace, ou seja, o array original continua igual)
 * 
 *  @param array - Array contendo os valores que serão embaralhados
 * 
 *  @returns Retorna um novo array embaralhado. No caso, é feito uma cópia rasa do array original, logo, se um objeto do novo array for alterado, também será alterado no array original.
 * 
 */
export default function shuffle(array: any[]) {
    let newArray = [...array]

    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray
}