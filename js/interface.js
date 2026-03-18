import { gerenciarSimulacao } from "./simulacao.js";

const botaoLigar = document.getElementById('botao-ligar');
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