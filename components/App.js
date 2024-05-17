

import tematicas from '../data/webdev/webdev.js';
const App = () => {
  return loadGame()
}
export default App;


/* const tematicas = [
'js',
'git',
'css',
'html',
'node',
'npm',
'yarn',
'react',
'angular',
'vue',
];
*/

/* CRIA O ELEMENTO */
const createElementWithClass = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

/* DECLARA AS CARTAS*/
let primeiraCarta = ''; //declara as cartas para posterior manuseio
let segundaCarta = '';

//CHECA SE VIROU TODAS AS CARTAS
const virouTodas = () => {
    const disabledCards = document.querySelectorAll('.disabled-card'); // cria array que mostra que todas as cartas foram viradas/desabiilitadas 
    if (disabledCards.length === 12) {
        setTimeout(() => {
            alert('Parabéns, você conseguiu!');
        }, 500); // Usei Timeout pq o alerta vinha antes da 2 carta virar e bloqueava a tela e dava impressao que carta nao tinha virado

    }
}

//CHECA SE SÃO IGUAIS, AS DUAS CARTAS JA VIRADAS/ESOLHIDAS 
const checarCartas = () => {
    const primeiroTema = primeiraCarta.getAttribute('data-tematica'); //pega a carta e adiciona seu atributo-tematica para compara-los. O data cria atributos
    const segundoTema = segundaCarta.getAttribute('data-tematica');
    if (primeiroTema === segundoTema) {
        primeiraCarta.classList.add('disabled-card'); // primeiraCarta.firstChild.classList.add('disabled-card');
        segundaCarta.classList.add('disabled-card');
        primeiraCarta = '';  //tem que zerar de novo, pois a proxima dupla de cartas são novas primeira e segunda cartas, logo tudo deve começar do zeron
        segundaCarta = '';

    } else {

        setTimeout(() => {
            primeiraCarta.classList.remove('reveal-card'); //remove a classe de revelar as cartas para ela virar de fundo
            segundaCarta.classList.remove('reveal-card');

            primeiraCarta = ''; //reatribui como vazio, ou impede de virarmos outra, já que antes atribuimos que sónpm run depl se vira alguma carta se ela ainda esta vazia
            segundaCarta = '';
        }, 500); //setTimeout adiciona tema para carta ficar virada de frente ou ela desvira antes de escolher outra
    }
    virouTodas();

}

//VIRA A CARTAs
const virarCarta = (event) => {
    const cartaEscolhida = event.target // target foca no alvo que sofrerá o evento
    if (cartaEscolhida.className.includes('reveal-card') || cartaEscolhida.className.includes('front')) {
        return; //se a revel-card for ativado na carta de fundo(pq está vinculado só a de fundo) ou se estiver aparecendo a carta de frente, não fazer nada. 
    }
    if (primeiraCarta === '') {  //verifica se a carta clicada está vazia, logo é a primeira
        cartaEscolhida.classList.add('reveal-card'); //revela a carta, se estiver vazia. Se naõ estiver vazia, cai no else
        primeiraCarta = cartaEscolhida; //guarda a carta na variavel primeiraCarta
    } else if (segundaCarta === '') {
        cartaEscolhida.classList.add('reveal-card');
        segundaCarta = cartaEscolhida;

        checarCartas();
    }
}

//parentNode pega o pai do elemento target
//classList.add = adiciona a classe revel-card
//clssName.includes = verifica ao clicar na carta se ela ja foi virada e não faz nada, segue pro fim da função, verificando se já foi add a revel-Class 


//CRIANDO AS CARTAS  NO HTML/ CLICAR CARTA
//Funciona como fórmula de como criar uma carta
const createCard = (tema) => {
    const card = createElementWithClass('div', 'card'); //criar tag div e adiciona classe card 
    const front = createElementWithClass('div', 'face front');
    const back = createElementWithClass('div', 'face back');

    card.appendChild(front); //coloca a div front dentro da div card
    card.appendChild(back);

    front.style.backgroundImage = `url('${tema.image}')`; // adiciona  a imagem da frente da carta de forma dinâmica. Nao precisa add caminho pq é um link externo

    card.addEventListener('click', virarCarta); //virar a carta
    card.setAttribute('data-tematica', tema.id); //setAtibute, adiciona o atributo. Data- cria atributos, como data-tematica. tema é o valor do atributo. Objetivo = montar função que permita comparar as duas cartas
    front.setAttribute('data-tematica', tema.id);
    back.setAttribute('data-tematica', tema.id);

    return card;
}

//CARREGAR JOGO / DUPLICA CARTAS / EMBARALHA
const loadGame = () => {
    const grid = createElementWithClass('div', 'grid');
    const duplicarTematicas = [...tematicas.items, ...tematicas.items] //duplica cartas spread (...) faz com que ao invés de imprimir a lista, imprima cada elemento da lista
    const embaralhar = duplicarTematicas.sort(() => Math.random() - 0.5);
    embaralhar.forEach((tema) => {
        const card = createCard(tema);//Durante o Load, cria de fato a carta baseado na formula const CrateCard com cada tema
        grid.appendChild(card); //adiciona uma carta a grade
    });
    return grid
}

//criei contante loadGame const card, "grid", forEach, inicialmente com só 1 serie te tematicas
//criei constante de duplicar tematicas e mudei o for each de teaticas para duplicarTematicas
// criei cont embaralha e adicionei medtodo sort para embaralhar e o math para ser de forma aleatória
//mudei o froEach para embaralhar no lugar de duplcarTematicas
