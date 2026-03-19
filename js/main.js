
import {
    configuracoesAplicacao, configuracoesGrid, CORES,
    MAPA_CORES
} from './configs.js';
import p5 from './lib/p5.esm.min.js';
import {estaLigada, inserirCelula, obterGrid} from "./estado.js";

// @ts-ignore
export const canva = new p5((p) => {
    p.setup = () => {
        let cnv = p.createCanvas(configuracoesGrid.largura, configuracoesGrid.altura);
        cnv.parent('canvas-container');
    }

    p.mouseDragged = () => {
        if (!estaLigada()){
            let i = p.floor(p.mouseX / configuracoesGrid.tamanhoCelula);
            let j = p.floor(p.mouseY / configuracoesGrid.tamanhoCelula);

            inserirCelula(i, j, configuracoesAplicacao.clickEstado)
        }
    }

    p.mousePressed = () => {
        p.mouseDragged();
    }



    p.draw = () => {
        p.background(CORES.BLUE);
        p.stroke(CORES.LIGHT_GREY);

        const gridAtual = obterGrid();

        for (let i = 0; i < configuracoesGrid.colunas; i++) {
            for (let j = 0; j < configuracoesGrid.linhas; j++) {
                let x = i * configuracoesGrid.tamanhoCelula
                let y = j * configuracoesGrid.tamanhoCelula

                const estadoAtual = gridAtual[i][j];
                const cor = MAPA_CORES[estadoAtual] || CORES.WHITE;
                p.fill(cor)
                p.stroke(200);

                p.rect(x, y, configuracoesGrid.tamanhoCelula, configuracoesGrid.tamanhoCelula);
            }
        }
    }
})

export function atualizarTamanhoCanvas() {
    canva.resizeCanvas(configuracoesGrid.largura, configuracoesGrid.altura)
}