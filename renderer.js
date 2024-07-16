import Swal from "./sweetalerts2/sweetalerts2.min.js";

let animationInProgress = false;
const dices = document.querySelectorAll(".dice");
const rollBtn = document.getElementById('roll');
const shuffleBtn = document.getElementById('shuffle');
let animationDone = false;

document.addEventListener('DOMContentLoaded', () => {
    shuffleDice();
});

const randomDice = () => {
    if (animationInProgress) {
        return;
    }
    dices.forEach((dice, ndx) => {
        const random = Math.floor(Math.random() * 7);
        const duration = ndx == 0 ? 6 : ndx == 1 ? 7 : 9;
        
        // for different kinds of spinning of the dice
        let randomBoxDegree = Math.floor(Math.random() * (790 - 360 + 1) + 360);
        dice.style.setProperty('--x_deg', `${randomBoxDegree}deg`);
        dice.style.setProperty('--y_deg', `${randomBoxDegree}deg`);

        if (random >= 1 && random <= 7) {
           rollDice(random, dice, duration, ndx);
        } else {
            randomDice();
        }

        if (ndx == dices.length - 1) {
            animationInProgress = true;
            
        }
    })
}

const transformDice = (random, dice) => {
    switch (random) {
        case 1:
            dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
            break;

        case 6:
            dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
            break;

        case 2:
            dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
            break;

        case 5:
            dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
            break;

        case 3:
            dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
            break;

        case 4:
            dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
            break;

        default:
            break;
    }
}

const rollDice = (random, dice, duration, ndx) => {
    if (animationInProgress) {
        return;
    }
    
    transformDice(random, dice);
    dice.style.animation = `rolling ${duration.toString()}s`;
    rollBtn.disabled = true;
    shuffleBtn.disabled = true;
    
    setTimeout(() => {
        if (ndx == dices.length - 1) {
            animationInProgress = false;
            rollBtn.disabled = false;
            shuffleBtn.disabled = false;
            
            //swal here
            Swal.fire({
                title: 'You rolled a dice!',
                text: `You rolled a ${random}!`,
                icon: 'success',
                confirmButtonText: 'Nice!'
            });
        } 

        dice.style.animation = 'none';
    }, duration * 1000 + 1000);

}

const shuffleDice = () => { 
    dices.forEach(dice => {
        const random = Math.floor(Math.random() * 7);
        transformDice(random, dice);
    })
}


rollBtn.addEventListener('click', randomDice);
shuffleBtn.addEventListener('click', shuffleDice);


