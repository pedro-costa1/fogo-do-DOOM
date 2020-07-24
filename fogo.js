// Variaveis principais
const firePixelArray = [];
const fireWidht = 10;
const fireHeight = 10;
// Paleta de cor
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}] ;

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

            updateFireIntesityPerPixel(pixelIndex);
        }
    }

    // Renderizando a cada calculo
    renderFire();
}

// Função para calcular a intensidade de acordo com o pixel de baixo
function updateFireIntesityPerPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireWidht;

    // Caso o pixel de baixo seja fora dao canvas a função não calcula nada
    if (belowPixelIndex >= fireWidht * fireHeight) {
        return;
    }

    const decay = 1;
    const belowPixelFireIntesity = firePixelArray[belowPixelIndex];
    //para o numero nao fiacar negativo(no minimo 0)
    const newFireIntensity = 
        belowPixelFireIntesity - decay >= 0 ? belowPixelFireIntesity - decay : 0;

    firePixelArray[currentPixelIndex] = newFireIntensity;
}

// Funçao para renderizar o fogo
function renderFire() {
    const debug = false;

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
            const fireIntesity = firePixelArray[pixelIndex];

            if (debug == true) {
                html += '<td>';

                // Imprimindo o valor dentro da célula
                html += `<div class="pixel-index">${pixelIndex}</div>`
                // Imprimindo o valor da estrura de dados 
                html += fireIntesity;

                html += '</td>';
            } else {
                const color = fireColorsPalette[fireIntesity];
                const colorString = `${color.r},${color.g},${color.b}`;
                html += `<td style="background-color: rgb(${colorString})">`;
                html += '</td>';
            }

            
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