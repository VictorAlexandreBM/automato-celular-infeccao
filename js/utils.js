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
export function copiarArray(origem, destino){
    for (let i = 0; i < origem.length; i++) {
       destino[i] = origem[i];
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

export function msParaStr(tempoDecorridoMs) {
    const milissegundos = Math.floor(tempoDecorridoMs % 1000);
    const segundos = Math.floor((tempoDecorridoMs / 1000) % 60);
    const minutos = Math.floor(( tempoDecorridoMs / 60000) % 60);

    return `${pad(minutos)}:${pad(segundos)}.${pad(milissegundos, 3)}`;
}

export function msParaStrAnos(tempoDecorridoMs) {
    const segundosTotais = Math.floor(tempoDecorridoMs / 1000);
    const anos = Math.floor(segundosTotais / (365 * 24 * 60 * 60));
    const meses = Math.floor((segundosTotais % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60));
    const dias = Math.floor((segundosTotais % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
    const horas = Math.floor((segundosTotais % (24 * 60 * 60)) / (60 * 60));
    const minutos = Math.floor((segundosTotais % (60 * 60)) / 60);
    const segundos = segundosTotais % 60;

    return `${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
}

function pad(n, z = 2) {
    return n.toString().padStart(z, '0');
}

export function calcularIndice(linha, coluna, quantColunas){
    return linha * quantColunas + coluna
}