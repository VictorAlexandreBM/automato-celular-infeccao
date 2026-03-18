import { reiniciarGrid, probabilidade, configuracoesAplicacao } from "./configs.js";
import { gerenciarSimulacao } from "./simulacao.js";

const botaoLigar = document.getElementById('botao-ligar');
const botaoReiniciar = document.getElementById('botao-reiniciar');
const inputInfeccaoMascara = document.getElementById('input-infeccao-mascara');
const inputInfeccao = document.getElementById('input-infeccao');
const inputMascara = document.getElementById('input-mascara');
const inputVacinada = document.getElementById('input-vacinada');
const botoesInsercoes= document.querySelectorAll('.botao-insercao');
const containerInsercao = document.querySelector('.container-insercao');
let simulacaoLigada = false;

botaoLigar.addEventListener('click', () => {
    simulacaoLigada = !simulacaoLigada;

    if (simulacaoLigada) {
        botaoLigar.textContent = "Parar Simulação";
        botaoLigar.classList.add('ativo');
    } else {
        botaoLigar.textContent = "Iniciar Simulação";
        botaoLigar.classList.remove('ativo');
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
});

inputInfeccao.addEventListener('blur', () => {
    probabilidade.probabilidadeInfeccao = inputInfeccao.value
})

inputInfeccaoMascara.addEventListener('blur', () => {
    probabilidade.probabilidadeInfeccaoMascara = inputInfeccaoMascara.value
})

inputMascara.addEventListener('blur', () => {
    probabilidade.probabilidadeMascara = inputMascara.value
})

inputVacinada.addEventListener('blur', () => {
    probabilidade.probabilidadeVacinado = inputVacinada.value
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