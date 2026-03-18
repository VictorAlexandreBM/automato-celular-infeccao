import { verificarChance } from "./utils.js"


export const CELL_SIZE = 10
export const GRID_WIDTH = 1000
export const GRID_HEIGHT = 1000

export const LIGHT_GREY = [220]
export const BLUE = [173, 216, 230]
export const WHITE = [255]
export const RED = [220, 20, 60]
export const YELLOW = [255, 237, 41]
export const MS_ENTRE_RODADAS = 500;

export const configuracoesAplicacao = {
    clickEstado: 1
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

export const linhas = GRID_HEIGHT / CELL_SIZE;
export let colunas = GRID_WIDTH / CELL_SIZE;

function setupGrid() {

    let numeroSorteadoMascara, numeroSorteadoVacinado;
    let temMascara, ehVacinado;
    let estado;

    /**
     * @type {number[][]}
     */
    const grid = []
    for (let i = 0; i < GRID_WIDTH; i++) {
        grid[i] = []
        for (let j = 0; j < GRID_HEIGHT; j++) {
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
    grid = setupGrid();
    gridCopia = structuredClone(grid);
}