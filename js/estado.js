import { configuracoesGrid } from "./configs.js";
import { setupGrid } from "./simulacao.js";
import {msParaStr, msParaStrAnos} from "./utils.js";

let simulacaoLigada = false;
let grid = setupGrid(configuracoesGrid.colunas, configuracoesGrid.linhas);
let gridCopia = structuredClone(grid);
let rodada = 0;
let tempoDecorrido = 0;
let tempoSimulado = 0;
let tempoSimuladoDecorrido = 0;
let ultimoUpdateInterface = 0;

export function obterGrid() {
    return grid;
}

export function obterRodada() {
    return rodada;
}

export function atualizarRodada(novaRodada) {
    console.log(novaRodada)
    rodada = novaRodada;
    const evento = new CustomEvent('rodadaAtualizada', {detail: {rodada: novaRodada}});
    atualizarTempoSimuladoDecorridoRodada(novaRodada);
    window.dispatchEvent(evento);
}

export function atualizarTempoSimulado(novoTempoSimulado) {
    tempoSimulado = novoTempoSimulado;
}

export function obterTempoSimulado() {
    return tempoSimulado;
}

export function atualizarTempoSimuladoDecorridoRodada(rodada) {
    tempoSimuladoDecorrido = tempoSimulado * rodada;
    window.dispatchEvent(new CustomEvent('timerSimuladoAtualizado', {
    detail: {
            texto: msParaStrAnos(tempoSimuladoDecorrido),
        }
    }));
    ultimoUpdateInterface = Date.now();
}


export function atualizarTempoDecorrido(novoTempoDecorrido) {
    tempoDecorrido = novoTempoDecorrido;

    if (Date.now() - ultimoUpdateInterface > 100 || tempoDecorrido === 0) {
        window.dispatchEvent(new CustomEvent('timerAtualizado', {
            detail: {
                texto: msParaStr(tempoDecorrido)
            }
        }));
        ultimoUpdateInterface = Date.now();
    }
}

export function obterTempoDecorrido() {
    return tempoDecorrido;
}

export function obterTempoSimuladoDecorrido() {
    return tempoSimuladoDecorrido;
}


export function obterTempoDecorridoStr() {
    return msParaStr(tempoDecorrido);
}

export function obterGridCopia() {
    return gridCopia;
}

export function estaLigada() {
    return simulacaoLigada;
}

export function alternarSimulacao() {
    simulacaoLigada = !simulacaoLigada;
    return simulacaoLigada;
}

export function atualizarGrid(novoGrid) {
    grid = novoGrid;
}

export function inserirCelula(x, y, estadoNovo) {
    if (x >= 0 && x < configuracoesGrid.colunas && y >= 0 && y < configuracoesGrid.linhas) {
        grid[x][y] = estadoNovo;
    }
}

export function resetarEstado() {
    configuracoesGrid.colunas = configuracoesGrid.colunasFuturas;
    configuracoesGrid.linhas = configuracoesGrid.linhasFuturas;
    configuracoesGrid.tamanhoCelula = configuracoesGrid.tamanhoCelulaFuturo;

    configuracoesGrid.largura = configuracoesGrid.colunas * configuracoesGrid.tamanhoCelula;
    configuracoesGrid.altura = configuracoesGrid.linhas * configuracoesGrid.tamanhoCelula;

    atualizarRodada(0)
    atualizarTempoDecorrido(0)

    grid = setupGrid(configuracoesGrid.colunas, configuracoesGrid.linhas);
}