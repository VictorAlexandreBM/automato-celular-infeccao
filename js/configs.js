export const CORES = Object.freeze({
    LIGHT_GREY: [220],
    BLUE: [173, 216, 230],
    WHITE: [255],
    RED: [220, 20, 60],
    YELLOW: [255, 237, 41]
});

export const ESTADO = Object.freeze({
    NAO_INFECTADO: 0,
    INFECTADO: 1,
    COM_MASCARA: 2,
    VACINADO: 3,
});

export const configuracoesAplicacao = {
    clickEstado: ESTADO.INFECTADO,
    msEntreRodadas: 500
};

export const configuracoesGrid = {
    tamanhoCelula: 20,
    linhas: 50,
    colunas: 50,
    largura: 1000,
    altura: 1000,
    linhasFuturas: 50,
    colunasFuturas: 50,
    tamanhoCelulaFuturo: 20,
};

export const probabilidade = {
    probabilidadeMascara: 0.05,
    probabilidadeVacinado: 0.01,
    probabilidadeInfeccao: 0.3,
    probabilidadeInfeccaoMascara: 0.1,
    probabilidadeInfeccaoVacinado: 0.0
};

export const MAPA_CORES = {
    [ESTADO.NAO_INFECTADO]: CORES.WHITE,
    [ESTADO.INFECTADO]: CORES.RED,
    [ESTADO.COM_MASCARA]: CORES.BLUE,
    [ESTADO.VACINADO]: CORES.YELLOW
};
