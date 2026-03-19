import {configuracoesAplicacao, configuracoesGrid} from "./configs.js";
import {alternarSimulacao, atualizarGrid, atualizarRodada, obterGrid, obterRodada} from "./estado.js";
import {calcularProximaGeracao} from "./simulacao.js";

let intervaloId = null;

export function gerenciarMotor() {
    const simulacaoLigada = alternarSimulacao();
    if (simulacaoLigada) {
        iniciarLoop();
    } else {
        pararLoop();
    }

    return simulacaoLigada;
}

function iniciarLoop() {
    if (intervaloId) return;

    intervaloId = setInterval(() => {
        const gridAtual = obterGrid();
        const colunas = configuracoesGrid.colunas;
        const linhas = configuracoesGrid.linhas;

        const gridDestino = [];

        for (let i = 0; i < colunas; i++) {
            gridDestino[i] = [];

            for (let j = 0; j < linhas; j++) {
                gridDestino[i][j] = 0;
            }
        }

        atualizarRodada(obterRodada() + 1)

        calcularProximaGeracao(gridAtual, gridDestino, colunas, linhas);

        atualizarGrid(gridDestino);

    }, configuracoesAplicacao.msEntreRodadas);
}

function pararLoop() {
    if (intervaloId) {
        clearInterval(intervaloId);
        intervaloId = null;
    }
}