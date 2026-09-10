const chickenButton = document.querySelector('#chickenButton');
const giftButton = document.querySelector('#giftButton');
const giftInstruction = document.querySelector('#giftInstruction');
const confetes = document.querySelectorAll('.confetti');

const giftCounter = document.querySelector ('#giftCounter')

const reveal = document.querySelector('#reveal');
const instruction = document.querySelector('#instruction');

const chickenCounter = document.querySelector('#chickenCounter');

const photoInput = document.querySelector('#photoInput');
const birthdayPhoto = document.querySelector('#birthdayPhoto');

let cliquesGalinha = 0
let cliquesPresente = 0

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

giftButton.addEventListener('click', () => {
  const somPresente = new Audio('./sons/presente.mp3');
  somPresente.play();

  cliquesPresente++;
  giftCounter.textContent = `${cliquesPresente} de 10 toques`;

  tocarAnimacao(giftButton, 'gift-clicked');
  
  if (cliquesPresente < 10) {
    return;
  }

  const somExplosao = new Audio('./sons/explosao.wav');
  somExplosao.play().catch((erro) => {
  console.error('Erro ao tocar explosao.wav:', erro);
});

  giftInstruction.textContent = 'Abrindo...';
  window.setTimeout(() => {
    chickenButton.hidden = true;
    chickenCounter.hidden = true;
    
    giftButton.hidden = true;
    giftInstruction.hidden = true;
    giftCounter.hidden = true;
    reveal.hidden = false;

    explodirConfetes();

    confetes.forEach((confete) => {
      confete.classList.add('confetti-explode');
    })
    instruction.textContent = 'Uma lembrança para deixar seu dia ainda mais bonito.';
    reveal.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 430);
});

photoInput.addEventListener('change', (event) => {
  const [file] = event.target.files;
  if (!file) return;
  birthdayPhoto.src = URL.createObjectURL(file);
  birthdayPhoto.alt = 'Foto escolhida para a surpresa';
});
