let animationInProgress = false;
const dices = document.querySelectorAll(".dice");
const rollBtn = document.getElementById('roll');
const shuffleBtn = document.getElementById('shuffle');
let root = document.documentElement;

document.addEventListener('DOMContentLoaded', () => {
    shuffleDice();
});

const randomDice = () => {
    if (animationInProgress) {
        return;
    }
    dices.forEach((dice, ndx) => {
        const random = Math.floor(Math.random() * 6);
        const duration = ndx == 0 ? 5 : ndx == 1 ? 6 : 8;
        
        // for different kinds of spinning of the dice
        let randomBoxDegree = Math.floor(Math.random() * (790 - 360 + 1) + 360);
        console.log(randomBoxDegree);
        dice.style.setProperty('--x_deg', `${randomBoxDegree}deg`);
        dice.style.setProperty('--y_deg', `${randomBoxDegree}deg`);

        if (random >= 1 && random <= 6) {
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
    dice.style.animation = 'none';
}

const rollDice = (random, dice, duration, ndx) => {
    if (animationInProgress) {
        return;
    }
    dice.style.animation = `rolling ${duration.toString()}s`;
    rollBtn.disabled = true;
    shuffleBtn.disabled = true;
    

    setTimeout(() => {
        transformDice(random, dice)

        if (ndx == dices.length - 1) {
            animationInProgress = false;
            rollBtn.disabled = false;
            shuffleBtn.disabled = false;
        } 
    }, duration * 1000 + 1000);
}

const shuffleDice = () => { 
    dices.forEach(dice => {
        const random = Math.floor(Math.random() * 6);
        transformDice(random, dice);
    })
}


rollBtn.addEventListener('click', randomDice);
shuffleBtn.addEventListener('click', shuffleDice);


