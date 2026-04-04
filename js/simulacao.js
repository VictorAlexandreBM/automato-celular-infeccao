"use strict";
import {ESTADO, probabilidade} from "./configs.js";
import {verificarChance, copiarArray, estaDentroDosLimites, calcularIndice} from './utils.js';

export function calcularProximaGeracao(gridOrigem, gridDestino, colunas, linhas) {
    let quantidadeCelulasDoente = 0;
    let i;
    for (let l = 0; l < linhas; l++) {
        for (let c = 0; c < colunas; c++) {
            i = calcularIndice(l, c, colunas);

            if (gridOrigem[i] === ESTADO.NAO_INFECTADO || gridOrigem[i] === ESTADO.COM_MASCARA) {

                quantidadeCelulasDoente = verificarCelulasAoRedor(l, c, gridOrigem, linhas, colunas)
                gridDestino[i] = retornarEstadoInfeccao(quantidadeCelulasDoente, gridOrigem[i])

            } else {
                gridDestino[i] = gridOrigem[i]
            }
        }
    }

    copiarArray(gridDestino, gridOrigem)

}

function verificarCelulasAoRedor(linhaCentro, colunaCentro, gridOrigem, totalLinhas, totalColunas) {
    const linhaInicio = linhaCentro - 1;
    const colunaInicio = colunaCentro - 1;
    let quantidadeCelulaDoente = 0
    let ehMesmaCelula, celulaEstaInfectada
    let i;

    for (let l = linhaInicio; l <= linhaCentro + 1; l++) {
        for (let c = colunaInicio; c <= colunaCentro + 1; c++) {
            ehMesmaCelula = l === linhaCentro && c === colunaCentro;
            if (ehMesmaCelula) continue;

            i = calcularIndice(l, c, totalColunas);
            celulaEstaInfectada = estaDentroDosLimites(c, l, totalColunas, totalLinhas)
                && gridOrigem[i] === ESTADO.INFECTADO;

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

