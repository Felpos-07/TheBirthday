const chickenButton = document.querySelector('#chickenButton');
const giftButton = document.querySelector('#giftButton');
const giftInstruction = document.querySelector('#giftInstruction');
const reveal = document.querySelector('#reveal');
const instruction = document.querySelector('#instruction');
const photoInput = document.querySelector('#photoInput');
const birthdayPhoto = document.querySelector('#birthdayPhoto');

let cliquesGalinha = 0
let cliquesPresente = 0

function tocarAnimacao(elemento, classe) {
  elemento.classList.remove(classe);
  void elemento.offsetWidth;
  elemento.classList.add(classe);
}

chickenButton.addEventListener('click', () => {
  cliquesGalinha++;

  tocarAnimacao(
    chickenButton.querySelector('.chicken'),
    'chicken-clicked'
  );

  if (cliquesGalinha < 8) {
    return;
  }
  chickenButton.querySelector('.chicken').classList.add('called');
  instruction.textContent = 'Olha só... um presente está chegando!';
  giftButton.hidden = false;
  giftInstruction.hidden = false;
  giftButton.focus({ preventScroll: true });
});

giftButton.addEventListener('click', () => {
  cliquesPresente++;

  tocarAnimacao(giftButton, 'gift-clicked');
  
  if (cliquesPresente < 8) {
    return;
  }
  giftInstruction.textContent = 'Abrindo...';
  window.setTimeout(() => {
    giftButton.hidden = true;
    giftInstruction.hidden = true;
    reveal.hidden = false;
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
