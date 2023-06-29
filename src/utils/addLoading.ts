import loadingModal from "../components/Modals/loadingModal";


/**
 *  Adiciona um modal de loading enquanto a função recebida no parâmetro (geralmente requisições para API's)
 *  estiver em processamento. Ou seja, o modal aparecerá quando a função assincrona for chamada, 
 *  e o modal sumirá quando essa função assincrona for finalizada.
 *  
 *  Exemplo de uso:
 *  ```
 *  // Função que deverá ser esperada com o loading
 *  async function getSpotifyPlaylist(idPlaylist: string, musicsQnt: number) {
 *      return await fetch(...);  // Aqui teria a requisição e sua lógica
 *  }
 *  
 *  // Para adicionar o loading a função addLoading é utilizada
 *  // Como primeiro parâmetro, é passado a função que será aguardada
 *  // e os próximos parâmetros são os mesmos que seriam utilizados na função que será aguardada,
 *  // nesse caso, idPlaylist e musicsQnt
 *  const playlist = await addLoading(getSpotifyPlaylist, idPlaylist, musicsQnt);
 *  ```
 *  
 *  Caso seja necessário adicionar o loading em um código que não é originalmente uma função,
 *  pode-se usar funções anônimas. 
 *  
 *  Por exemplo:
 *  ```
 *  // Código que aguarda várias requisições e só é retornado no momento em que todas foram concluidas
 *  const resultados = await Promise.all(...)
 *  
 *  // Agora esse mesmo código com o loading
 *  const resultados = addLoading(() => {
 *      return await Promise.all(...)
 *  })
 *  ```
 * 
 *  @param functionToWait - Função assíncrona que será aguardada. 
 *  
 *  @param args - os mesmos parâmetros que seriam utilizados na função do primeiro param.
 *  
 *  @returns - O mesmo retorno da função do primeiro param.
 */
export default async function addLoading
<ArgsTypes extends any[], ReturnType>
(functionToWait: (...args: ArgsTypes) => Promise<ReturnType>, ...args: ArgsTypes): Promise<ReturnType> {
    loadingModal.show()
    const results = await functionToWait(...args)
    loadingModal.hide()
    return results
}

/**
 *  Adiciona um modal de loading, caso o parâmetro hasLoading seja verdadeiro, 
 *  enquanto a função recebida no parâmetro (geralmente requisições para API's)
 *  estiver em processamento. Ou seja, o modal aparecerá quando a função assincrona for chamada, 
 *  e o modal sumirá quando essa função assincrona for finalizada.
 *  
 *  Utilizar essa função quando quiser criar uma função que pode ter ou não
 *  o loading.
 *  
 *  Exemplo de uso:
 *  ```
 *  // Função que gostariamos de colocar a função de adicionar o loading ou não, programaticamente
 *  async function makeGetSpotifyPlaylistRequest(idPlaylist: string, musicsQnt: number) {
 *      return await fetch(...);  // Aqui teria a requisição e sua lógica
 *  }
 *  
 *  // Igual a função de cima, porém, agora há a opção de adicionar ou não o carregamento
 *  async function getSpotifyPlaylistRequest(idPlaylist: string, musicsQnt: number, hasLoading?: boolean) {
 *      return await addLoadingWithConditional(makeGetSpotifyPlaylistRequest, hasLoading, idPlaylist, musicsQnt);
 *  }
 *  ```
 *  
 *  @param functionToWait - função assíncrona que será aguardada
 * 
 *  @param hasLoading - se verdadeiro, irá adicionar um modal de loading enquanto a função do primeiro param. não é finalizada.
 *  Caso seja falso (ou undefined), não será adicionado um modal de loading (a função do primeiro param. será executada normalmente)
 *  
 *  @param args - os mesmos parâmetros que seriam utilizados na função do primeiro param.
 *  
 *  @returns - o mesmo retorno da função do primeiro param.
 */
export async function addLoadingWithConditional
<ArgsTypes extends any[], ReturnType>
(functionToWait: (...args: ArgsTypes) => Promise<ReturnType>, hasLoading?: boolean, ...args: ArgsTypes): Promise<ReturnType> {
    if (hasLoading) {
        return addLoading(functionToWait, ...args)
    } else {
        return functionToWait(...args)
    }
}