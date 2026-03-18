import { colunas, grid, gridCopia, linhas, MS_ENTRE_RODADAS, PROBABILIDADE_INFECCAO, PROBABILIDADE_INFECCAO_MASCARA } from "./configs.js";
import { verificarChance } from "./utils.js";

let simulacaoHandler = null; 

function iniciarSimulacao(){
    let quantidadeCelulasDoente = 0;

    return setInterval(() => {
        for (let i = 0; i < linhas; i++) {
            for (let j = 0; j < colunas; j++) {
                if (grid[i][j] === 0 || grid[i][j] === 2) {

                    quantidadeCelulasDoente = verificarCelulasAoRedor(i, j)
                    gridCopia[i][j] = retornarEstadoInfeccao(quantidadeCelulasDoente, grid[i][j])
                
                } else {
                    gridCopia[i][j] = grid[i][j]
                }
            }
        }
    
    copiarGrid(gridCopia, grid)
    }, MS_ENTRE_RODADAS);

}

export function gerenciarSimulacao(ligar){
    console.log(ligar)
    console.log(simulacaoHandler)
    if (ligar && !simulacaoHandler) {
        console.log('simulacao ligada')
        simulacaoHandler = iniciarSimulacao();
    } else if (!ligar && simulacaoHandler) {
        console.log('simulacao desligada')
        clearInterval(simulacaoHandler)
        simulacaoHandler = null
    }
}

/**
 * @param {number[][]} origem
 * @param {number[][]} destino
 */
function copiarGrid(origem, destino){
    for (let i = 0; i < origem.length; i++) {
        for (let j = 0; j < origem[i].length; j++) {
            destino[i][j] = origem[i][j]
        }        
    }
}

/**
 * @param {number} x
 * @param {number} y
 */
function verificarCelulasAoRedor(x, y) {
    const xVizinho = x - 1
    const yVizinho = y - 1
    let quantidadeCelulaDoente = 0
    let ehMesmaCelula, celulaEstaInfectada, estaDentroDosLimites

    for (let i = yVizinho; i < y+2; i++) {
        for (let j = xVizinho; j < x+2; j++) {
            ehMesmaCelula = i === x && j === y;
            estaDentroDosLimites = i >= 0 && i < colunas && j >= 0 && j < linhas;
            celulaEstaInfectada = estaDentroDosLimites && grid[i][j] === 1;
            
            if (celulaEstaInfectada && !ehMesmaCelula) {
                quantidadeCelulaDoente++;
            }  
        }        
    }

    return quantidadeCelulaDoente;
}


/**
 * @param {number} quantidadeInfectados
 * @param {number} estadoAtual
 */
function retornarEstadoInfeccao(quantidadeInfectados, estadoAtual){
    let numeroSorteado;
    let celulaFoiInfectada;
    const probabilidadeInfeccao = estadoAtual === 0 ? PROBABILIDADE_INFECCAO : PROBABILIDADE_INFECCAO_MASCARA

    for (let i = 0; i < quantidadeInfectados; i++) {
        numeroSorteado = Math.random()
        
        celulaFoiInfectada = verificarChance(probabilidadeInfeccao, numeroSorteado);
        
        if (celulaFoiInfectada){
            return 1;
        }
        
    }

    return estadoAtual;
    
}

