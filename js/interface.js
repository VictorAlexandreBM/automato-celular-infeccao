import { reiniciarGrid, probabilidade, configuracoesAplicacao, configuracoesGrid, atualizarColunas, atualizarLinhas, toggleSimulacao, simulacaoLigada } from "./configs.js";
import { gerenciarSimulacao } from "./simulacao.js";

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

const botoesInsercoes= document.querySelectorAll('.botao-insercao');
const containerInsercao = document.querySelector('.container-insercao');


botaoLigar.addEventListener('click', () => {
    toggleSimulacao();

    if (simulacaoLigada) {
        botaoLigar.textContent = "Parar Simulação";
        botaoLigar.classList.add('ativo');

        alternarEstadoElementos(true);
    } else {
        botaoLigar.textContent = "Iniciar Simulação";
        botaoLigar.classList.remove('ativo');

        alternarEstadoElementos(false);
    }

    gerenciarSimulacao(simulacaoLigada);
});

botaoReiniciar.addEventListener('click', () => {
    reiniciarGrid();
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

inputInfeccao.addEventListener('blur', () => {
    probabilidade.probabilidadeInfeccao = Number(inputInfeccao.value)
})

inputInfeccaoMascara.addEventListener('blur', () => {
    probabilidade.probabilidadeInfeccaoMascara = Number(inputInfeccaoMascara.value)
})

inputMascara.addEventListener('blur', () => {
    probabilidade.probabilidadeMascara = Number(inputMascara.value)
})

inputVacinada.addEventListener('blur', () => {
    probabilidade.probabilidadeVacinado = Number(inputVacinada.value)
})

inputInfeccaoMs.addEventListener('blur', () => {
    configuracoesAplicacao.msEntreRodadas = Number(inputInfeccaoMs.value)
})

inputColunas.addEventListener('blur', () => {
    configuracoesGrid.colunasFuturas = Number(inputColunas.value);
})

inputLinhas.addEventListener('blur', () => {
    configuracoesGrid.linhasFuturas = Number(inputLinhas.value);
})

inputCelulas.addEventListener('blur', () => {
    configuracoesGrid.tamanhoCelulaFuturo = Number(inputCelulas.value)
})

containerInsercao.addEventListener('click', (e) => {
    let botao;
    let estadoBotao;
    let botoesInsercao;

    if (e.target.classList.contains('botao-insercao')){
        botao = e.target
        estadoBotao = Number(botao.id.split('-')[2])
        configuracoesAplicacao.clickEstado = estadoBotao

        botoesInsercao = e.currentTarget.querySelectorAll('.botao-insercao')
        for(botao of botoesInsercao) {
            botao.classList.remove('selecionado')
        }

        e.target.classList.add('selecionado')

    }
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