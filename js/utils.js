/**
 * @param {number} chanceDeOcorrer
 * @param {number} numeroSorteado
 */
export function verificarChance(chanceDeOcorrer, numeroSorteado) {
    return numeroSorteado <= chanceDeOcorrer
}


/**
 * @param {number[][]} origem
 * @param {number[][]} destino
 */
export function copiarGrid(origem, destino){
    for (let i = 0; i < origem.length; i++) {
        for (let j = 0; j < origem[i].length; j++) {
            destino[i][j] = origem[i][j]
        }        
    }
}
