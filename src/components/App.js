

import webdev from '../data/webdev/webdev.js';

const grid = document.querySelector('.grid');

const tematicas = [
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

/* CRIA O ELEMENTO */
const createElemet = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

/* DECLARA AS CARTAS*/
let primeiraCarta = ''; //declara as cartas para posterior manuseio
let segundaCarta = '';

//CHECA SE VIROU TODAS AS CARTAS
const virouTodas = () => {
    const disabledCards = document.querrySelectorAll('.disabled-card'); // cria array que mostra que todas as cartas foram viradas/desabiilitadas 
    if (disabledCards.lenght === 20) {
        alert('Parabéns, você conseguiu!');
    }
}

//CHECA SE AS DUAS CARTAS ESOLHIDAS SÃO IGUAIS
const checarCartas = ( ) => {
    const primeiroTema = primeiraCarta.getAttribute('data-tema'); //pega a carta e adiciona seu atributo-tema. O data cria atributos
    const segundoTema = segundaCarta.getAttribute('data-tema');

    if (primeiroTema === segundoTema){
        primeiraCarta.firstChild.classList.add('disabled-card');
        segundaCarta.firstChild.classList.add('disabled-card');
        primeiraCarta = ''; 
        segundaCarta = '';

        virouTodas();

    }else{
    setTimeout(() => { 
        primeiraCarta.classList.revome('reveal-card'); //remove a classe de revelar as cartas para ela virar de fundo
        segundaCarta.classList.revome('reveal-card');
        
        primeiraCarta = ''; //reatribui como vazio, ou impede de virarmos outra, já que antes atribuimos que só se vira alguma carta se ela ainda esta vazia
        segundaCarta = '';
    }, 500); //setTimeout adiciona tema para carta ficar virada de frente ou ela desvira antes de escolher outra
    }
}

//VIRA A CARTA
const virarCarta = ((target)) => {
    if(target.parentNode.className.includes('reveal-card')) {
        return;
    }

if(primeiraCarta ===''){  //verifica se a carta clicada está vazia, logo é a primeira
    target.parentNode.classList.add('reveal-card'); //revela a carta, se estiver vazia. Se naõ estiver vazia, cai no else
    primeiraCarta = target.parentNode; //guarda a carta na variavel firstCard
}else if (segundaCarta === ''){
    target.parentNode.classList.add('reveal-card');
    segundaCarta = target.parentNode;

    checarCartas();
}
}


//parentNode pega o pai do elemento target
//classList.add = adiciona a classe revel-card
//clssName.includes = verifica ao clicar na carta se ela ja foi virada e não faz nada, segue pro fim da função, verificando se já foi add a revel-Class 


//CRIANDO AS CARTAS
const createCard = (tema) => {
    const card = createElemet('div', 'card'); //criar tag div e adiciona classe card 
    const front = createElemet('div', 'face front');
    const back= createElemet('div', 'face back');

    card.appendChild(front); //coloca a div front dentro da div card
    card.appendChild(back);

    front.style.backgroundImage = 'url('../webdev/${character}.png')'; // adiciona  a imagem da frente da carta de forma dinâmica

    card.addEventListener ('click', virarCarta); //virar a carta
    card.setAttribute('data-tematica', tema) //setAtibute, adiciona o atributo. Data- cria atributos, como data-tematica. tema é o valor do atributo. Objetivo = montar função que permita comparar as duas cartas

    return card;
}

//CARREGAR JOGO / DUPLICA CARTAS / EMBARALHA
const loadGame = () => {  
    const duplicarTematicas = [ ...tematicas, ...tematicas ] //duplica cartas

    const embaralhar = duplicarTematicas.sort(() => Math.random() - 0.5);

    embaralhar.forEach((tema) => {
    const card = createCard();//cria cada carta, pagando cada umas das temáticas 29:50
    grid.appendChild(card); //adiciona uma carta a grade

    });
}

//criei contante loadGame const card, "grid", forEach, inicialmente com só 1 serie te tematicas
//criei constante de duplicar tematicas e mudei o for each de teaticas para duplicarTematicas
// criei cont embaralha e adicionei medtodo sort para embaralhar e o math para ser de forma aleatória
//mudei o froEach para embaralhar no lugar de duplcarTematicas
