/**
 * @param {number} chanceDeOcorrer
 */
export function verificarChance(chanceDeOcorrer) {
    return Math.random() < chanceDeOcorrer
}

/**
 * @param {number[][]} origem
 * @param {number[][]} destino
 */
export function copiarMatriz(origem, destino){
    for (let i = 0; i < origem.length; i++) {
        for (let j = 0; j < origem[i].length; j++) {
            destino[i][j] = origem[i][j]
        }        
    }
}

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number} maxColunas
 * @param {number} maxLinhas
 * @returns {boolean}
 */
export function estaDentroDosLimites(x, y, maxColunas, maxLinhas) {
    return x >= 0 && x < maxColunas && y >= 0 && y < maxLinhas;
}