"use strict";
import {ESTADO, probabilidade} from "./configs.js";
import {verificarChance, copiarMatriz, estaDentroDosLimites} from "./utils.js";

export function calcularProximaGeracao(gridOrigem, gridDestino, colunas, linhas) {
    let quantidadeCelulasDoente = 0;

    for (let i = 0; i < colunas; i++) {
        for (let j = 0; j < linhas; j++) {
            if (gridOrigem[i][j] === ESTADO.NAO_INFECTADO || gridOrigem[i][j] === ESTADO.COM_MASCARA) {

                quantidadeCelulasDoente = verificarCelulasAoRedor(i, j, gridOrigem, colunas, linhas)
                gridDestino[i][j] = retornarEstadoInfeccao(quantidadeCelulasDoente, gridOrigem[i][j])

            } else {
                gridDestino[i][j] = gridOrigem[i][j]
            }
        }
    }

    copiarMatriz(gridDestino, gridOrigem)

}

function verificarCelulasAoRedor(x, y, gridOrigem, colunas, linhas) {
    const xVizinho = x - 1
    const yVizinho = y - 1
    let quantidadeCelulaDoente = 0
    let ehMesmaCelula, celulaEstaInfectada

    for (let i = xVizinho; i < x + 2; i++) {
        for (let j = yVizinho; j < y + 2; j++) {
            ehMesmaCelula = i === x && j === y;
            celulaEstaInfectada = estaDentroDosLimites(i, j, colunas, linhas)
                && gridOrigem[i][j] === ESTADO.INFECTADO;

            if (celulaEstaInfectada && !ehMesmaCelula) {
                quantidadeCelulaDoente++;
            }
        }
    }

    return quantidadeCelulaDoente;
}

function retornarEstadoInfeccao(quantidadeInfectados, estadoAtual) {
    let celulaFoiInfectada;

    if (estadoAtual === ESTADO.VACINADO) return estadoAtual;

    const probabilidadeInfeccao = estadoAtual === ESTADO.NAO_INFECTADO ? probabilidade.probabilidadeInfeccao : probabilidade.probabilidadeInfeccaoMascara

    for (let i = 0; i < quantidadeInfectados; i++) {

        celulaFoiInfectada = verificarChance(probabilidadeInfeccao);

        if (celulaFoiInfectada) {
            return ESTADO.INFECTADO;
        }

    }

    return estadoAtual;

}

