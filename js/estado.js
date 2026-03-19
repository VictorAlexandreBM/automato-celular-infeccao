import { configuracoesGrid } from "./configs.js";
import { setupGrid } from "./simulacao.js";

let simulacaoLigada = false;
let grid = setupGrid(configuracoesGrid.colunas, configuracoesGrid.linhas);
let gridCopia = structuredClone(grid);

export function obterGrid() {
    return grid;
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

    grid = setupGrid(configuracoesGrid.colunas, configuracoesGrid.linhas);
}