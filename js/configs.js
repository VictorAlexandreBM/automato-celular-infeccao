import { verificarChance } from "./utils.js"
import { canva } from "./main.js"

export const LIGHT_GREY = [220]
export const BLUE = [173, 216, 230]
export const WHITE = [255]
export const RED = [220, 20, 60]
export const YELLOW = [255, 237, 41]
export let simulacaoLigada = false;
export const configuracoesAplicacao = {
    clickEstado: 1,
    msEntreRodadas: 500
}

export const configuracoesGrid = {
    tamanhoCelula: 20,
    linhas: 50,
    colunas: 50,
    largura: 20 * 50,
    altura: 20 * 50, 
    linhasFuturas: 50,
    colunasFuturas: 50,
    tamanhoCelulaFuturo: 20,
}

export const atualizarLinhas = (linhas) => {
    configuracoesGrid.linhas = linhas
    configuracoesGrid.altura = linhas * configuracoesGrid.tamanhoCelula
}

export const atualizarColunas = (colunas) => {
    configuracoesGrid.colunas = colunas
    configuracoesGrid.largura = colunas * configuracoesGrid.tamanhoCelula
}

export const probabilidade = {
    probabilidadeMascara: 0.05,
    probabilidadeVacinado: 0.01,
    probabilidadeInfeccao: 0.3,
    probabilidadeInfeccaoMascara: 0.1,
    probabilidadeInfeccaoVacinado: 0.0
}

export const ESTADO = Object.freeze({
    NAO_INFECTADO: 0,
    INFECTADO: 1,
    COM_MASCARA: 2,
    VACINADO: 3,
}) 

export let grid = setupGrid()
export let gridCopia = structuredClone(grid)

function setupGrid() {
    console.log(configuracoesGrid)
    let numeroSorteadoMascara, numeroSorteadoVacinado;
    let temMascara, ehVacinado;
    let estado;

    /**
     * @type {number[][]}
     */
    const grid = []
    for (let i = 0; i < configuracoesGrid.colunas; i++) {
        grid[i] = []
        for (let j = 0; j < configuracoesGrid.linhas; j++) {
            numeroSorteadoMascara = Math.random();
            numeroSorteadoVacinado = Math.random();

            temMascara = verificarChance(probabilidade.probabilidadeMascara, numeroSorteadoMascara)
            ehVacinado = verificarChance(probabilidade.probabilidadeVacinado, numeroSorteadoVacinado)

            estado = ehVacinado ? ESTADO.VACINADO 
            : temMascara ? ESTADO.COM_MASCARA
            : ESTADO.NAO_INFECTADO
            
            grid[i][j] = estado

        }
    }

    return grid
}

export function reiniciarGrid() {

    if (configuracoesGrid.linhas !== configuracoesGrid.linhasFuturas || 
        configuracoesGrid.colunas !== configuracoesGrid.colunasFuturas || 
        configuracoesGrid.tamanhoCelula !== configuracoesGrid.tamanhoCelulaFuturo){
        configuracoesGrid.tamanhoCelula = configuracoesGrid.tamanhoCelulaFuturo    
        atualizarLinhas(configuracoesGrid.linhasFuturas)
        atualizarColunas(configuracoesGrid.colunasFuturas)
        canva.resizeCanvas(configuracoesGrid.largura, configuracoesGrid.altura);
    }

    grid = setupGrid();
    gridCopia = structuredClone(grid);
}

export function toggleSimulacao() {
    simulacaoLigada = !simulacaoLigada
}