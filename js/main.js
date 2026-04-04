
    import {
        configuracoesAplicacao, configuracoesGrid, CORES,
        MAPA_CORES
    } from './configs.js';
    import p5 from './lib/p5.esm.min.js';
    import {simulacaoEstaLigada, inserirCelula, obterGrid} from "./estado.js";
    // @ts-ignore
    export const canva = new p5((p) => {
        p.setup = () => {
            let cnv = p.createCanvas(configuracoesGrid.largura, configuracoesGrid.altura);
            cnv.parent('canvas-container');


            // 2. Acopla os eventos ESTRITAMENTE ao elemento DOM do canvas
            cnv.mousePressed(interagirComGrid);
            cnv.mouseMoved(() => {
                if (p.mouseIsPressed) interagirComGrid();
            });
        }

        const interagirComGrid = () => {
            if (!simulacaoEstaLigada()){
                let i = p.floor(p.mouseX / configuracoesGrid.tamanhoCelula);
                let j = p.floor(p.mouseY / configuracoesGrid.tamanhoCelula);

                inserirCelula(i, j, configuracoesAplicacao.clickEstado);
            }
        }

        p.draw = () => {
            p.stroke(CORES.LIGHT_GREY);

            const gridAtual = obterGrid();

            for (let i = 0; i < configuracoesGrid.colunas; i++) {
                for (let j = 0; j < configuracoesGrid.linhas; j++) {
                    let x = i * configuracoesGrid.tamanhoCelula
                    let y = j * configuracoesGrid.tamanhoCelula

                    const estadoAtual = gridAtual[i][j];
                    const cor = MAPA_CORES[estadoAtual] || CORES.WHITE;
                    p.fill(cor)

                    p.rect(x, y, configuracoesGrid.tamanhoCelula, configuracoesGrid.tamanhoCelula);
                }
            }
        }
    })

    export function atualizarTamanhoCanvas() {
        canva.resizeCanvas(configuracoesGrid.largura, configuracoesGrid.altura);

    }