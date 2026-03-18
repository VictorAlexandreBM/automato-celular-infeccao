import { verificarChance } from "./utils.js"


export const CELL_SIZE = 10
export const GRID_WIDTH = 1000
export const GRID_HEIGHT = 1000

export const LIGHT_GREY = [220]
export const DARK_GREY = [180]
export const WHITE = [255]
export const BLACK = [0]
export const PROBABILIDADE_INFECCAO = 0.5;
export const PROBABILIDADE_INFECCAO_MASCARA = 0.1;
export const MS_ENTRE_RODADAS = 3000;
export const PROBABILIDADE_DE_MASCARA = 0.05

export let grid = setupGrid()
export let gridCopia = structuredClone(grid)

export const linhas = GRID_HEIGHT / CELL_SIZE;
export let colunas = GRID_WIDTH / CELL_SIZE;

function setupGrid() {

    let numeroSorteadoMascara;
    let temMascara;
    let estado;

    /**
     * @type {number[][]}
     */
    const grid = []
    for (let i = 0; i < GRID_WIDTH; i++) {
        grid[i] = []
        for (let j = 0; j < GRID_HEIGHT; j++) {
            numeroSorteadoMascara = Math.random()
            temMascara = verificarChance(PROBABILIDADE_DE_MASCARA, numeroSorteadoMascara)
            estado = temMascara ? 2 : 0
            grid[i][j] = estado

        }
    }

    return grid
}

