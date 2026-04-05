import {probabilidade, configuracoesAplicacao, configuracoesGrid} from "./configs.js";
import {atualizarTempoSimulado, resetarEstado} from "./estado.js";
import {atualizarTamanhoCanvas} from "./main.js";
import {gerenciarMotor} from "./orquestrador.js";

const botaoLigar = document.getElementById('botao-ligar');
const botaoReiniciar = document.getElementById('botao-reiniciar');
const inputInfeccaoMascara = document.getElementById('input-infeccao-mascara');
const inputInfeccao = document.getElementById('input-infeccao');
const inputMascara = document.getElementById('input-mascara');
const inputVacinada = document.getElementById('input-vacinada');
const inputInfeccaoMs = document.getElementById('input-infeccao-ms');
const todosInputs = document.querySelectorAll('input');
const inputColunas = document.getElementById('input-colunas');
const inputLinhas = document.getElementById('input-linhas');
const inputCelulas = document.getElementById('input-celulas');
const displayRodada = document.getElementById('display-rodada');
const displayTempoDecorrido = document.getElementById('display-tempo-decorrido');
const displayTempoSimulado = document.getElementById('display-tempo-decorrido-simulado');
const botoesInsercoes = document.querySelectorAll('.botao-insercao');
const containerInsercao = document.querySelector('.container-insercao');
const grupoInputsTempo = document.querySelector('.inputs-tempo');

const inputAnos = document.getElementById("input-infeccao-anos") || 0;
const inputMeses = document.getElementById("input-infeccao-meses") || 0;
const inputDias = document.getElementById("input-infeccao-dias")|| 0;
const inputHoras = document.getElementById("input-infeccao-horas")|| 0;
const inputMinutos = document.getElementById("input-infeccao-minutos")|| 0;
const inputSegundos = document.getElementById("input-infeccao-segundos") || 0;

window.addEventListener('timerAtualizado', (e) => {
    displayTempoDecorrido.textContent = `Tempo Decorrido: ${e.detail.texto}`;
})

window.addEventListener('rodadaAtualizada', (e) => {
    displayRodada.textContent = `Rodada Atual: ${e.detail.rodada}`;
})

window.addEventListener('timerSimuladoAtualizado', (e) => {
    displayTempoSimulado.textContent = `Tempo Decorrido Simulado: ${e.detail.texto}`;
})

botaoLigar.addEventListener('click', () => {
    const estaRodando = gerenciarMotor();

    if (estaRodando) {
        botaoLigar.textContent = "Parar Simulação";
        botaoLigar.classList.add('ativo');
        alternarEstadoElementos(true);
    } else {
        botaoLigar.textContent = "Iniciar Simulação";
        botaoLigar.classList.remove('ativo');

        alternarEstadoElementos(false);
    }

});

botaoReiniciar.addEventListener('click', () => {
    resetarEstado();
    atualizarTamanhoCanvas();
});

document.addEventListener('DOMContentLoaded', () => {
    inputInfeccao.value = probabilidade.probabilidadeInfeccao;
    inputInfeccaoMascara.value = probabilidade.probabilidadeInfeccaoMascara;
    inputMascara.value = probabilidade.probabilidadeMascara;
    inputVacinada.value = probabilidade.probabilidadeVacinado;
    inputInfeccaoMs.value = configuracoesAplicacao.msEntreRodadas;
    inputColunas.value = configuracoesGrid.colunas;
    inputLinhas.value = configuracoesGrid.linhas;
    inputCelulas.value = configuracoesGrid.tamanhoCelula;
});

inputInfeccao.addEventListener('change', () => {
    probabilidade.probabilidadeInfeccao = Number(inputInfeccao.value)
})

inputInfeccaoMascara.addEventListener('change', () => {
    probabilidade.probabilidadeInfeccaoMascara = Number(inputInfeccaoMascara.value)
})

inputMascara.addEventListener('change', () => {
    probabilidade.probabilidadeMascara = Number(inputMascara.value)
})

inputVacinada.addEventListener('change', () => {
    probabilidade.probabilidadeVacinado = Number(inputVacinada.value)
})

inputInfeccaoMs.addEventListener('change', () => {
    configuracoesAplicacao.msEntreRodadas = Number(inputInfeccaoMs.value)
})

inputColunas.addEventListener('change', () => {
    configuracoesGrid.colunasFuturas = Number(inputColunas.value);
})

inputLinhas.addEventListener('change', () => {
    configuracoesGrid.linhasFuturas = Number(inputLinhas.value);
})

inputCelulas.addEventListener('change', () => {
    configuracoesGrid.tamanhoCelulaFuturo = Number(inputCelulas.value)
})

containerInsercao.addEventListener('click', (e) => {
    let botao;
    let estadoBotao;
    let botoesInsercao;

    if (e.target.classList.contains('botao-insercao')) {
        botao = e.target
        estadoBotao = Number(botao.id.split('-')[2])
        configuracoesAplicacao.clickEstado = estadoBotao

        botoesInsercao = e.currentTarget.querySelectorAll('.botao-insercao')
        for (botao of botoesInsercao) {
            botao.classList.remove('selecionado')
        }

        e.target.classList.add('selecionado')

    }
})

grupoInputsTempo.addEventListener('change', () => {
    const anos = Number(inputAnos.value) || 0;
    const meses = Number(inputMeses.value) || 0;
    const dias = Number(inputDias.value) || 0;
    const horas = Number(inputHoras.value) || 0;
    const minutos = Number(inputMinutos.value) || 0;
    const segundos = Number(inputSegundos.value) || 0;

    const totalMs =
        anos * 365 * 24 * 60 * 60 * 1000 +
        meses * 30 * 24 * 60 * 60 * 1000 +
        dias * 24 * 60 * 60 * 1000 +
        horas * 60 * 60 * 1000 +
        minutos * 60 * 1000 +
        segundos * 1000;

    atualizarTempoSimulado(totalMs);
})

function alternarEstadoElementos(desativar) {
    todosInputs.forEach(input => {
        input.disabled = desativar;
    });

    botoesInsercoes.forEach(botao => {
        botao.disabled = desativar;
    });

    botaoReiniciar.disabled = desativar;
}