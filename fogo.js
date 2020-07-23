// Variaveis principais
const firePixelArray = [];
const fireWidht = 10;
const fireHeight = 10;

// Função para inicializar
function start() {
    createFireDataStructure();
    createFireSource();
    renderFire();

    setInterval(calculateFirePropagation, 1000);
}

// Função para criar a estrutura de dados do fogo
function createFireDataStructure() {
    // Numero de pixels
    const numberOfPixels = fireWidht * fireHeight;

    // laço para preencher a estrutura de dados 
    for ( let i = 0; i < numberOfPixels; i++) {
        firePixelArray[i] = 0;
    }
}

// Função para calcular a propagação do fogo
function calculateFirePropagation() {
    for (let column = 0; column < fireWidht; column++) {
        for (let row = 0; row < fireHeight; row++) {
            const pixelIndex = column + (fireWidht * row);

            console.log(pixelIndex);
        }
    }
}

// Funçao para renderizar o fogo
function renderFire() {
    // Criando uma table
    let html = '<table cellpadding=0 cellspacing=0>';

    // Pra cada pixel da altura do fogo cria uma <tr>
    for (let row = 0; row < fireHeight; row++) {
        html += '<tr>';

        // Pra cada largura do fogo cria uma <td.
        for (let column = 0; column < fireWidht; column++) {
            // Indice do pixel
            const pixelIndex = column + (fireWidht * row);
            // Caessando valor contido dentro da estrutura de dados
            const fireintesity = firePixelArray[pixelIndex];

            html += '<td>';

            // Imprimindo o valor dentro da célula
            html += `<div class="pixel-index">${pixelIndex}</div>`
            // Imprimindo o valor da estrura de dados 
            html += fireintesity;

            html += '</td>';
        }

        html += '</tr>';
    }

    html += '</table>';

    // Substituindo o innerHTML pelo o resultado de tudo
    document.querySelector('#fireCanvas').innerHTML = html;
}

// Função para criar a fonte de fogo
function createFireSource() {
    // Laço para cair sempre na última posção de cada COLUNA
    for (let column = 0; column <= fireWidht; column++) {
        // Caindo numa posiçao 1 depois da última do canvas(um,valor fora da estrutura de dados)
        const overflowPixelIndex = fireWidht * fireHeight;
        // Caindo na ultima posição de cada coluna a cada laço
        const pixelIndex = (overflowPixelIndex - fireWidht) + column;

        firePixelArray[pixelIndex] = 36;
    }
}

start();