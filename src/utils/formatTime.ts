
/**
 *  Formata o tempo total em segundos para a impressão
 * 
 *  @param timeInSeconds Tempo total em segundos
 * 
 *  @returns Retorna o tempo formatado em "HH:MM:SS"
 */
export default function formatTime(timeInSeconds: number): string {
    const hours = Math.floor(timeInSeconds / (60 * 60))
    const minutes = Math.floor(timeInSeconds % (60 * 60) / 60)
    const seconds = timeInSeconds % 60

    if (hours) {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    } else {
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }
}