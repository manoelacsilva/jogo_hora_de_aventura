const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login__form');

const validateInput = ({ target }) => {
    if (target.value.length > 1) {
        button.removeAttribute('disabled');
        return;
    };

    button.setAttribute('disabled', '');
};

const handleSubmit = (evento) => {
    evento.preventDefault();

    localStorage.setItem('player', input.value);
    window.location = 'pages/game.html';
};

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);