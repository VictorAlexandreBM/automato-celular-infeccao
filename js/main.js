
    import {
        configuracoesAplicacao, configuracoesGrid, CORES,
        MAPA_CORES
    } from './configs.js';
    import p5 from './lib/p5.esm.min.js';
    import {simulacaoEstaLigada, inserirCelula, obterGrid} from "./estado.js";
    import {calcularIndice} from './utils.js';
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
            console.log(p)
            if (!simulacaoEstaLigada()){
                console.log(`estou aqui`)
                let i = p.floor(p.mouseX / configuracoesGrid.tamanhoCelula);
                let j = p.floor(p.mouseY / configuracoesGrid.tamanhoCelula);

                inserirCelula(i, j, configuracoesAplicacao.clickEstado);
            }
        }

        p.draw = () => {
            p.stroke(CORES.LIGHT_GREY);
            let i;
            const gridAtual = obterGrid();
            console.log(gridAtual[0])
            for (let l = 0; l < configuracoesGrid.linhas; l++) {
                for (let c = 0; c < configuracoesGrid.colunas; c++) {
                    let x = c * configuracoesGrid.tamanhoCelula
                    let y = l * configuracoesGrid.tamanhoCelula

                    i = calcularIndice(l, c, configuracoesGrid.colunas);

                    const estadoAtual = gridAtual[i];
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