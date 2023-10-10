const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const botaoJogarNovamente = document.getElementById('jogar-novamente');
const botaoSair = document.getElementById('sair');

const imagensHora = [
    'hora1',
    'hora2',
    'hora3',
    'hora4',
    'hora5',
    'hora6',
    'hora7',
    'hora8',
    'hora9',
    'hora10',
    'hora11',
    'hora12',
    'hora13',
    'hora14',
    'hora15'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 30) {
        clearInterval(this.loop);

        alert(`Parabéns, ${spanPlayer.innerHTML}! Você conseguiu em: ${timer.innerHTML} segundos.`);

        finalizarJogo();
    }
}

const checkCards = () => {
    const firstHora = firstCard.getAttribute('data-hora');
    const secondHora = secondCard.getAttribute('data-hora');

    if (firstHora === secondHora) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 700);
    };
};

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    };

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    };
};

const createCard = (imagemHora) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${imagemHora}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-hora', imagemHora);

    return card;
};

const loadGame = () => {
    const duplicateImagensHora = [ ...imagensHora, ...imagensHora];

    const shuffledArray = duplicateImagensHora.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((imagemHora) => {
        const card = createCard(imagemHora);
        grid.appendChild(card);
    });
};

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
};

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');

    startTimer();
    loadGame();
};

// Função para finalizar o jogo
const finalizarJogo = () => {
    document.querySelector('.botoes').style.display = 'flex';

    clearInterval(this.loop);

    botaoJogarNovamente.addEventListener('click', reiniciarJogo);
};

const reiniciarJogo = () => {
    document.querySelector('.botoes').style.display = 'none';

    timer.innerHTML = '0';

    botaoJogarNovamente.removeEventListener('click', reiniciarJogo);

    removerCartasDaTela();
    startTimer();
    loadGame();

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('reveal-card');
    });

    firstCard = '';
    secondCard = '';
};

const removerCartasDaTela = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.remove();
    });
};

// Adiciona um ouvinte de evento ao botão "Sair"
botaoSair.addEventListener('click', () => {
    window.location.href = '../index.html';
});

