// Variaveis principais
const firePixelArray = [];
const fireWidht = 10;
const fireHeight = 10;

// Função para inicializar
function start() {
    createFireDataStructure();
    renderFire();
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

            html += '<td>';

            // Printando o valor dentro da célula
            html += `<div class="pixel-index">${pixelIndex}</div>`

            html += '</td>';
        }

        html += '</tr>';
    }

    html += '</table>';

    // Substituindo o innerHTML pelo o resultado de tudo
    document.querySelector('#fireCanvas').innerHTML = html;
}

start();