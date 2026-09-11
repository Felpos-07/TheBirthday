const chickenButton = document.querySelector('#chickenButton');
const giftButton = document.querySelector('#giftButton');
const giftInstruction = document.querySelector('#giftInstruction');

const birthdayTitle = document.querySelector('#birthday-title');
const randomMessage = document.querySelector('#randomMessage');
const heartsContainer = document.querySelector('#heartsContainer');
const confetes = document.querySelectorAll('.confetti');

const giftCounter = document.querySelector('#giftCounter');
const secretMessage = document.querySelector('#secretMessage');
const restartButton = document.querySelector('#restartButton');

const reveal = document.querySelector('#reveal');
const instruction = document.querySelector('#instruction');
const countdown = document.querySelector('#countdown');

const chickenCounter = document.querySelector('#chickenCounter');

let cliquesGalinha = 0;
let cliquesPresente = 0;
let cliquesTitulo = 0;
let fraseAtual = 0;

function tocarAnimacao(elemento, classe) {
  elemento.classList.remove(classe);
  void elemento.offsetWidth;
  elemento.classList.add(classe);
}

function explodirConfetes() {
  const cores = ['#6f9f75', '#ef705d', '#ffc857', '#f6b4ab'];
  const quantidade = 200;

  for (let i = 0; i < quantidade; i++) {
    const confete = document.createElement('span');

    confete.className = 'confete-explosao';

    confete.style.setProperty(
      '--cor',
      cores[Math.floor(Math.random() * cores.length)]
    );

    confete.style.setProperty(
      '--x',
      `${Math.random() * 700 - 350}px`
    );

    confete.style.setProperty(
      '--y',
      `${Math.random() * 600 - 300}px`
    );

    confete.style.setProperty(
      '--rotacao',
      `${Math.random() * 720 - 360}deg`
    );

    confete.style.setProperty(
      '--atraso',
      `${Math.random() * 0.2}s`
    );

    document.body.appendChild(confete);

    setTimeout(() => {
      confete.remove();
    }, 1800);
  }
}

function iniciarContagem() {
  const numeros = ['3', '2', '1'];
  let indice = 0;

  countdown.hidden = false;

  const intervalo = setInterval(() => {
    countdown.textContent = numeros[indice];
    indice++;

    if (indice === numeros.length) {
      clearInterval(intervalo);

      setTimeout(() => {
        countdown.hidden = true;
        mostrarSurpresa();
      }, 700);
    }
  }, 800);
}

chickenButton.addEventListener('click', () => {
  const somPato = new Audio('./sons/pato.mp3');
  somPato.play();

  cliquesGalinha++;
  chickenCounter.textContent = `${cliquesGalinha} de 10 toques`;

  tocarAnimacao(
    chickenButton.querySelector('.chicken'),
    'chicken-clicked'
  );

  if (cliquesGalinha < 10) {
    return;
  }
  chickenButton.classList.add('chicken-running');
  instruction.textContent = 'Olha só... um presente está chegando!';
  giftButton.hidden = false;
  giftInstruction.hidden = false;
  giftCounter.hidden = false;

  giftButton.focus({ preventScroll: true });
});

function mostrarSurpresa() {
  const somExplosao = new Audio('./sons/explosao.wav');

  somExplosao.play().catch((erro) => {
    console.error('Erro ao tocar explosao.wav:', erro);
  });

  chickenButton.hidden = true;
  chickenCounter.hidden = true;

  giftButton.hidden = true;
  giftInstruction.hidden = true;
  giftCounter.hidden = true;
  reveal.hidden = false;

  explodirConfetes();
  soltarBaloes();

  confetes.forEach((confete) => {
    confete.classList.add('confetti-explode');
  });

  instruction.textContent = 'Uma lembrança para deixar seu dia ainda mais bonito.';
  reveal.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

giftButton.addEventListener('click', () => {
  const somPresente = new Audio('./sons/presente.mp3');
  somPresente.play();

  cliquesPresente++;
  giftCounter.textContent = `${cliquesPresente} de 10 toques`;

  tocarAnimacao(giftButton, 'gift-clicked');

  if (cliquesPresente < 10) {
    return;
  }

  giftInstruction.textContent = 'Prepare-se...';
  iniciarContagem();
});


function criarCoracao() {
  const coracao = document.createElement('span');

  coracao.className = 'heart-float';
  coracao.textContent = '♥';
  coracao.style.left = `${Math.random() * 100}%`;
  coracao.style.animationDuration = `${2.5 + Math.random() * 2}s`;
  coracao.style.fontSize = `${18 + Math.random() * 18}px`;

  heartsContainer.appendChild(coracao);

  setTimeout(() => {
    coracao.remove();
  }, 5000);
}

function criarBalao() {
  const balao = document.createElement('span');
  const cores = ['red', 'yellow', 'green', 'pink'];

  balao.className = 'balloon-float';
  balao.textContent = '🎈';
  balao.style.left = `${Math.random() * 100}%`;
  balao.style.fontSize = `${28 + Math.random() * 22}px`;
  balao.style.animationDuration = `${4 + Math.random() * 3}s`;
  balao.style.animationDelay = `${Math.random() * 0.8}s`;
  balao.classList.add(
    cores[Math.floor(Math.random() * cores.length)]
  );

  heartsContainer.appendChild(balao);

  setTimeout(() => {
    balao.remove();
  }, 8000);
}

function soltarBaloes() {
  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      criarBalao();
    }, i * 180);
  }
}

birthdayTitle.addEventListener('click', () => {
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      criarCoracao();
    }, i * 100);
  }
});

const frases = [
  'sei sei foi feito com a bunda isso aqui.',
  'não é pq to aprendendo isso aqui a 1 ano que sei fazer certin',
  'mas releva tá! lembre-se que o sabio uma vez disse:',
  'mas quando pensar em reclamar, não reclame! sempre há algo para agradecer, agradeça!',
  'É, pra tu ver, esse bixo é doido(eu)',
  '-max verstappen, é o melhor piloto da f1, de acordo com mim',
  'kimi = ayrton senna, tomara que seja só na habilidade mesmo',
  'e sim, tirei essa foto do fundo do baú, mas é como disse.',
  'não pergunte daonde isso veio, apenas aceite e seja feliz😺👍.',
  'então é isso, aproveite!',
];

birthdayTitle.addEventListener('click', () => {
  randomMessage.textContent = frases[fraseAtual];

  fraseAtual++;

  if (fraseAtual === frases.length) {
    fraseAtual = 0;
  }
});

birthdayTitle.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    birthdayTitle.click();
  }
});

restartButton.addEventListener('click', () => {
  cliquesGalinha = 0;
  cliquesPresente = 0;
  cliquesTitulo = 0;
  fraseAtual = 0;
  secretMessage.hidden = true;

  chickenCounter.textContent = '0 de 10 toques';
  giftCounter.textContent = '0 de 10 toques';

  chickenButton.hidden = false;
  chickenButton.classList.remove('chicken-running');

  giftButton.hidden = true;
  giftInstruction.hidden = true;
  giftCounter.hidden = true;

  reveal.hidden = true;
  countdown.hidden = true;

  instruction.textContent = 'Toque na galinha para chamar o seu presente.';

  document.querySelectorAll('.confete-explosao').forEach((confete) => {
    confete.remove();
  });

  confetes.forEach((confete) => {
    confete.classList.remove('confetti-explode');
  });

  heartsContainer.innerHTML = '';
  randomMessage.textContent = '';

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

birthdayTitle.addEventListener('click', () => {
  cliquesTitulo++;

  if (cliquesTitulo === 5) {
    secretMessage.hidden = false;
  }
});