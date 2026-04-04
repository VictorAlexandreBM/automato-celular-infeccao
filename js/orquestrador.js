import {configuracoesAplicacao, configuracoesGrid} from "./configs.js";
import {
    alternarSimulacao,
    atualizarGrid,
    atualizarRodada, atualizarTempoDecorrido,
    obterGrid,
    obterRodada,
    obterTempoDecorrido
} from "./estado.js";
import {calcularProximaGeracao} from "./simulacao.js";

let intervaloId = null;
let inicio;
let timerId;

export function gerenciarMotor() {
    const simulacaoLigada = alternarSimulacao();
    let timer;
    if (simulacaoLigada) {
        iniciarTimer();
        iniciarLoop();
    } else {
        if (timerId) {
            cancelAnimationFrame(timerId);
        }
        pararLoop();
    }

    return simulacaoLigada;
}

function iniciarTimer() {
    inicio = obterTempoDecorrido() ? Date.now() - obterTempoDecorrido() : Date.now();
    timerId = requestAnimationFrame(atualizarTimer)
}

function atualizarTimer() {
    atualizarTempoDecorrido(Date.now() - inicio)
    timerId = requestAnimationFrame(atualizarTimer);
}

function iniciarLoop() {
    if (intervaloId) return;

    intervaloId = setInterval(() => {
        const gridAtual = obterGrid();
        const colunas = configuracoesGrid.colunas;
        const linhas = configuracoesGrid.linhas;

        const gridDestino = new Uint8Array(linhas * colunas);

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