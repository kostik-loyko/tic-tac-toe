const area = document.querySelector('.area');
const areaZero = '<img class="area__zero" src="../image/zero.png" alt="zero">';
const areaCross = '<img class="area__cross" src="../image/cross.png" alt="cross">';

let winner = '';
let gameNumber;
const resultText = document.querySelector('.overlay__text');
const resultArea = document.querySelector('.overlay');
const closeResultBtn = document.querySelector('.overlay__btn');
const areaBlock = document.querySelectorAll('.area__block');
const overlayScore = document.querySelector('.overlay__score');


let step = 0;
area.addEventListener('click', e => {
   if (e.target.className = 'area__block') {
      step % 2 === 0 ? e.target.insertAdjacentHTML('beforeend', areaCross) : e.target.insertAdjacentHTML('beforeend', areaZero);
      step++;
      check();
   }
})

const check = () => {
   const arr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
   ]

   let counter = 0;
   areaBlock.forEach(item => {
      if (item.childNodes[0]) {
         counter++;
         counter == 9 ? outWinner('Ничья') : counter;
      }
   })

   let scoreZero = 0;
   let scoreCross = 0;

   const scoreAll = (scoreItem, storageKey, storageKeyEnemi) => {
      scoreItem = Number(localStorage.getItem(storageKey)) + 1;
      localStorage.setItem(storageKey, scoreItem);
      gameNumber = Number(localStorage.getItem('game-number')) + 1;
      localStorage.setItem('game-number', gameNumber);
      if (gameNumber > 10) {
         localStorage.setItem(storageKeyEnemi, Number(localStorage.getItem(storageKeyEnemi)) - 1);
      }
   }

   for (i = 0; arr.length > i; i++) {
      if (areaBlock[arr[i][0]].innerHTML == areaCross && areaBlock[arr[i][1]].innerHTML == areaCross && areaBlock[arr[i][2]].innerHTML == areaCross) {
         winner = 'Крестики';
         scoreAll(scoreCross, 'cross', 'zero');
         outWinner(winner);
      }
      else if (areaBlock[arr[i][0]].innerHTML == areaZero && areaBlock[arr[i][1]].innerHTML == areaZero && areaBlock[arr[i][2]].innerHTML == areaZero) {
         winner = 'Нолики';
         scoreAll(scoreZero, 'zero', 'cross');
         outWinner(winner);
      }
   }
}

const outWinner = (winner) => {
   resultText.innerHTML = `Победили: ${winner}!`;
   if (localStorage.getItem('cross') === null) {
      overlayScore.innerHTML = `За последние 10 игр крестики победили: 0 раз! Нолики победили: ${localStorage.getItem('zero')} раз!`;
   } else if (localStorage.getItem('zero') === null) {
      overlayScore.innerHTML = `За последние 10 игр крестики победили: ${localStorage.getItem('cross')} раз! Нолики победили: 0 раз!`;
   } else {
      overlayScore.innerHTML = `За последние 10 игр крестики победили: ${localStorage.getItem('cross')} раз! Нолики победили: ${localStorage.getItem('zero')} раз!`;
   }
   resultArea.style.display = 'block';
}

closeResultBtn.addEventListener('click', () => {
   location.reload();
})

document.addEventListener("keydown", e => {
   if (e.key === "Enter") {
      location.reload();
   }
})

