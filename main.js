const modal = document.querySelector('.modal')
const btnNo = document.querySelector('.btn-n')
const btnYes = document.querySelector('.btn-y')
const restart =  document.querySelector('#btn')

class Card {
  card
  _cardNumber
  _open = false
  _success = false
  constructor(container, cardNumber, action) {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.cardNumber = cardNumber

    this.card.addEventListener('click', () => {
      if (this.open === false && this.success === false) {
        this.open = true;
        action(this);
      }
    })
    container.append(this.card);
  }

  set cardNumber(value) {
    this._cardNumber = value;
    this.card.textContent = this._cardNumber;
  }
  get cardNumber() {
    return this._cardNumber
  }

  set open(value) {
    this._open = value;
    if (value) {
      this.card.classList.add('open');
    } else {
      this.card.classList.remove('open');
    }
  }
  get open() {
    return this._open;
  }

  set success(value) {
    this._success = value;
    if (value) {
      this.card.classList.add('success');
    } else {
      this.card.classList.remove('success');
    }
  }
  get success() {
    return this._success
  }
}

class AmazingCard extends Card {
  set cardNumber(value) {
    const cardsImgArray = [
      './img/1.JPG',
      './img/2.JPG',
      './img/3.JPG',
      './img/4.JPG',
      './img/5.JPG',
      './img/6.JPG',
    ]
    const img = document.createElement('img')
    img.classList.add('dog')
    console.log(cardsImgArray[value - 1])
    img.src = cardsImgArray[value - 1]
    this._cardNumber = img.src;
    this.card.append(img)
  }
  get cardNumber() {
    return this._cardNumber
  }

  set open(value) {
    this._open = value;
    if (value) {
      this.card.classList.add('open');
    } else {
      this.card.classList.remove('open');
    }
  }
  get open() {
    return this._open;
  }
}


function startGame(container, cardNumber) {
  let arrayNumbers = [];
  let arrayNumbersCard = [];
  let firstCardOpen = null;
  let secondCardOpen = null;
  //заполняем массив числами
  for (let i = 1; i <= cardNumber / 2; i++) {
    arrayNumbers.push(i);
    arrayNumbers.push(i);
  }
  //перемешиваем массив
  let j, temp;
  for (var i = arrayNumbers.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arrayNumbers[j];
    arrayNumbers[j] = arrayNumbers[i];
    arrayNumbers[i] = temp;
  }

  for (const cardNumber of arrayNumbers) {
    let card = new AmazingCard(container, cardNumber, flip)
    arrayNumbersCard.push(card)
  }

  function flip(card) {
    const btn = document.getElementById('btn');

    if (firstCardOpen !== null && secondCardOpen !== null) {
      if (firstCardOpen.cardNumber !== secondCardOpen.cardNumber) {
        firstCardOpen.open = false;
        secondCardOpen.open = false;
        firstCardOpen = null;
        secondCardOpen = null;
      }
    }

    if (firstCardOpen == null) {
      firstCardOpen = card;
    } else {
      if (secondCardOpen == null)
        secondCardOpen = card;
    }

    if (firstCardOpen !== null && secondCardOpen !== null) {
      if (firstCardOpen.cardNumber == secondCardOpen.cardNumber) {
        firstCardOpen.success = true;
        secondCardOpen.success = true;
        firstCardOpen = null;
        secondCardOpen = null;
      }

    }

    if (document.querySelectorAll('.card.success').length === arrayNumbers.length) {
      setTimeout(() => {
        modal.classList.add('active')
      }, 500)
    }

    btnYes.addEventListener('click', () => {
      document.getElementById('newGame').innerHTML = '';
      firstCardOpen = null;
      secondCardOpen = null;
      startGame(container, cardNumber);
      modal.classList.remove('active')
    })

    restart.addEventListener('click', () => {
      document.getElementById('newGame').innerHTML = '';
      firstCardOpen = null;
      secondCardOpen = null;
      startGame(container, cardNumber);
      restart.style = 'display: none';
    })
  }
}
startGame(document.getElementById('newGame'), 12);

btnNo.addEventListener('click', () => {
  modal.classList.remove('active')
  restart.style = 'display: flex';
})

window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    modal.classList.remove('active')
  }
});
modal.addEventListener('click', function (event) {
  if (!event.target.classList.contains('modal')) {
    return;
  }
  modal.classList.remove('active')
});
