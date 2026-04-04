import {configuracoesGrid, ESTADO, probabilidade} from './configs.js';
import {calcularIndice, msParaStr, msParaStrAnos, verificarChance} from './utils.js';

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

export function simulacaoEstaLigada() {
    return simulacaoLigada;
}

export function alternarSimulacao() {
    simulacaoLigada = !simulacaoLigada;
    return simulacaoLigada;
}

export function setupGrid(colunas, linhas) {
    let numeroSorteadoMascara, numeroSorteadoVacinado;
    let temMascara, ehVacinado;
    let estado;
    let i;

    const grid = new Uint8Array(colunas * linhas)
    for (let l = 0; l < linhas; l++) {
        for (let c = 0; c < colunas; c++) {
            i = calcularIndice(l, c, colunas);

            temMascara = verificarChance(probabilidade.probabilidadeMascara)
            ehVacinado = verificarChance(probabilidade.probabilidadeVacinado)

            estado = ehVacinado ? ESTADO.VACINADO
                : temMascara ? ESTADO.COM_MASCARA
                    : ESTADO.NAO_INFECTADO

            grid[i] = estado

        }
    }

    return grid
}


export function atualizarGrid(novoGrid) {
    grid = novoGrid;
}

export function inserirCelula(x, y, estadoNovo) {
    if (x >= 0 && x < configuracoesGrid.colunas && y >= 0 && y < configuracoesGrid.linhas) {
        console.log(estadoNovo)
        console.log(x, y)
        const i = calcularIndice(y, x, configuracoesGrid.colunas)
        console.log(i);
        grid[i] = estadoNovo;
        console.log(grid[0]);
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