
import { BLACK, CELL_SIZE, colunas, BLUE, grid, GRID_HEIGHT, GRID_WIDTH, LIGHT_GREY, linhas, WHITE, ESTADO, YELLOW } from './configs.js';
import p5 from './lib/p5.esm.min.js';

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
        p.background(...BLUE);      
        p.stroke(...LIGHT_GREY);  

        for (let i = 0; i < linhas; i++) {
            for (let j = 0; j < colunas; j++) {
                let x = i * CELL_SIZE
                let y = j * CELL_SIZE

            switch(grid[i][j]) {
                case ESTADO.NAO_INFECTADO: 
                    p.fill(...WHITE);
                    break;
                case ESTADO.INFECTADO:
                    p.fill(...BLACK);
                    break;
                case ESTADO.COM_MASCARA:
                    p.fill(...BLUE);
                    break;
                case ESTADO.VACINADO:
                    p.fill(...YELLOW);
                    break;
                default:
                    p.fill(...WHITE);
            }

            p.stroke(200);

            p.rect(x, y, CELL_SIZE, CELL_SIZE);
            }
        }
    }

})