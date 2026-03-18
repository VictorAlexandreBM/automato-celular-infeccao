"use strict";
import {grid, gridCopia, configuracoesGrid, configuracoesAplicacao, ESTADO, probabilidade } from "./configs.js";
import {verificarChance, copiarMatriz, estaDentroDosLimites} from "./utils.js";
let simulacaoHandler = null; 

function iniciarSimulacao(){
    let quantidadeCelulasDoente = 0;
    console.log(configuracoesAplicacao.msEntreRodadas)
    return setInterval(() => {
        console.log('inicio')
        for (let i = 0; i < configuracoesGrid.colunas; i++) {
            for (let j = 0; j < configuracoesGrid.linhas; j++) {
                if (grid[i][j] === ESTADO.NAO_INFECTADO || grid[i][j] === ESTADO.COM_MASCARA) {

                    quantidadeCelulasDoente = verificarCelulasAoRedor(i, j)
                    gridCopia[i][j] = retornarEstadoInfeccao(quantidadeCelulasDoente, grid[i][j])
                
                } else {
                    gridCopia[i][j] = grid[i][j]
                }
            }
        }
    
        copiarMatriz(gridCopia, grid)

        console.log('fim')
    }, configuracoesAplicacao.msEntreRodadas);

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
 * @param {number} x
 * @param {number} y
 */
function verificarCelulasAoRedor(x, y) {
    const xVizinho = x - 1
    const yVizinho = y - 1
    let quantidadeCelulaDoente = 0
    let ehMesmaCelula, celulaEstaInfectada

    for (let i = xVizinho; i < x+2; i++) {
        for (let j = yVizinho; j < y+2; j++) {
            ehMesmaCelula = i === x && j === y;
            celulaEstaInfectada = estaDentroDosLimites(i, j, configuracoesGrid.colunas, configuracoesGrid.linhas)
                && grid[i][j] === ESTADO.INFECTADO;
            
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
    
    if (estadoAtual == ESTADO.VACINADO) return estadoAtual;

    const probabilidadeInfeccao = estadoAtual === ESTADO.NAO_INFECTADO ? probabilidade.probabilidadeInfeccao : probabilidade.probabilidadeInfeccaoMascara

    for (let i = 0; i < quantidadeInfectados; i++) {

        celulaFoiInfectada = verificarChance(probabilidadeInfeccao);
        
        if (celulaFoiInfectada){
            return ESTADO.INFECTADO;
        }
        
    }

    return estadoAtual;
    
}

