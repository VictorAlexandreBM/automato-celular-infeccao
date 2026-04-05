import {configuracoesAplicacao, configuracoesGrid, CORES, MAPA_CORES} from './configs.js';
import p5 from './lib/p5.esm.min.js';
import {inserirCelula, obterGrid, simulacaoEstaLigada} from './estado.js';
import {calcularIndice, corParaUint32} from './utils.js';
// @ts-ignore
    export const canva = new p5((p) => {
        p.setup = () => {
            let cnv = p.createCanvas(configuracoesGrid.largura, configuracoesGrid.altura);
            cnv.parent('canvas-container');
            p.pixelDensity(1);

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
            p.redraw()
        }

        p.draw = () => {
            p.loadPixels();
            const pixels32 = new Uint32Array(p.pixels.buffer);
            const gridAtual = obterGrid();

            const corLinha = corParaUint32(CORES.LIGHT_GREY);
            const corPadrao = corParaUint32(CORES.WHITE);

            for (let l = 0; l < configuracoesGrid.linhas; l++) {
                for (let c = 0; c < configuracoesGrid.colunas; c++) {
                    const iGrid = calcularIndice(l, c, configuracoesGrid.colunas);
                    const estado = gridAtual[iGrid];

                    // Resolve a cor antes de passar para a função
                    const corCorpo = MAPA_CORES[estado] || corPadrao;

                    pintarQuadrado(
                        pixels32,
                        l,
                        c,
                        configuracoesGrid.tamanhoCelula,
                        configuracoesGrid.largura,
                        corCorpo,
                        corLinha
                    );
                }
            }
            p.noLoop();
            p.updatePixels();
        }
    })

    export function atualizarTamanhoCanvas() {
        canva.resizeCanvas(configuracoesGrid.largura, configuracoesGrid.altura);

    }

    function pintarQuadrado(pixels32, l, c, tamanho, larguraCanvas, corCorpo, corBorda) {
    const xBase = c * tamanho;
    const yBase = l * tamanho;

    for (let lp = 0; lp < tamanho; lp++) {
        const yGlobal = yBase + lp;
        const yOffset = yGlobal * larguraCanvas;

        for (let cp = 0; cp < tamanho; cp++) {
            const xGlobal = xBase + cp;
            const iCanvas = xGlobal + yOffset;

            if (lp === 0 || cp === 0) {
                pixels32[iCanvas] = corBorda;
            } else {
                pixels32[iCanvas] = corCorpo;
            }
        }
    }
}