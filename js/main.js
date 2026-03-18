
import { RED, BLUE, grid, LIGHT_GREY, WHITE, ESTADO, YELLOW, configuracoesAplicacao, configuracoesGrid, simulacaoLigada} from './configs.js';
import p5 from './lib/p5.esm.min.js';

// @ts-ignore
export const canva = new p5((p) => {
    p.setup = () => {
        
        let cnv = p.createCanvas(configuracoesGrid.largura, configuracoesGrid.altura);
        cnv.parent('canvas-container');
    }

    p.mouseClicked = () => {
        if (!simulacaoLigada){
            let i = p.floor(p.mouseX / configuracoesGrid.tamanhoCelula);
            let j = p.floor(p.mouseY / configuracoesGrid.tamanhoCelula);
            
            console.log(configuracoesGrid.colunas, i, configuracoesGrid.linhas, j)
            if (i >= 0 && i < configuracoesGrid.colunas && j >= 0 && j < configuracoesGrid.linhas){
            grid[i][j] = configuracoesAplicacao.clickEstado;

            console.log(grid[i][j])
            }
        }

        
    }


    p.draw = () => {
        p.background(BLUE);      
        p.stroke(LIGHT_GREY);  

        for (let i = 0; i < configuracoesGrid.colunas; i++) {
            for (let j = 0; j < configuracoesGrid.linhas; j++) {
                let x = i * configuracoesGrid.tamanhoCelula
                let y = j * configuracoesGrid.tamanhoCelula

            switch(grid[i][j]) {
                case ESTADO.NAO_INFECTADO: 
                    p.fill(WHITE);
                    break;
                case ESTADO.INFECTADO:
                    p.fill(RED);
                    break;
                case ESTADO.COM_MASCARA:
                    p.fill(BLUE);
                    break;
                case ESTADO.VACINADO:
                    p.fill(YELLOW);
                    break;
                default:
                    p.fill(WHITE);
            }

            p.stroke(200);

            p.rect(x, y, configuracoesGrid.tamanhoCelula, configuracoesGrid.tamanhoCelula);
            }
        }
    }

    

})