
import p5 from '../node_modules/p5/lib/p5.esm.js';
import { BLACK, CELL_SIZE, colunas, DARK_GREY, grid, GRID_HEIGHT, GRID_WIDTH, LIGHT_GREY, linhas, WHITE } from './configs.js';

// @ts-ignore
new p5((p) => {
    p.setup = () => {
        
        let cnv = p.createCanvas(GRID_WIDTH, GRID_HEIGHT);
        cnv.parent('canvas-container');
    }

    p.mouseClicked = () => {
        let i = p.floor(p.mouseX / CELL_SIZE);
        let j = p.floor(p.mouseY / CELL_SIZE);

        console.log(colunas, i, linhas, j)
        if (i >= 0 && i < colunas && j >= 0 && j < linhas){
        grid[i][j] = 1

        console.log(grid[i][j])
        }
    }

    p.draw = () => {
        p.background(... DARK_GREY);      
        p.stroke(...LIGHT_GREY);  

        for (let i = 0; i < linhas; i++) {
            for (let j = 0; j < colunas; j++) {
                let x = i * CELL_SIZE
                let y = j * CELL_SIZE

            if (grid[i][j] === 1){
                p.fill(...BLACK);
            } else if (grid[i][j] === 0) {
                p.fill(...WHITE);
            } else {
                p.fill(...DARK_GREY);
            }

            p.stroke(200);

            p.rect(x, y, CELL_SIZE, CELL_SIZE);
            }
        }
    }

})