import Swal from "./sweetalerts2/sweetalerts2.min.js";

let animationInProgress = false;
const dices = document.querySelectorAll(".dice");
const rollBtn = document.getElementById('roll');
const shuffleBtn = document.getElementById('shuffle');
const audio = document.getElementById("gameAudio");
const winnerAudio = document.getElementById("winnerAudio");
let winningDices = [];

document.addEventListener('DOMContentLoaded', () => {
    shuffleDice();
});

const shuffleDice = () => { 
    dices.forEach(dice => {
        const random = Math.floor(Math.random() * 7);
        transformDice(random, dice);
    })
}

const randomDice = () => {
    if (animationInProgress) {
        return;
    }

    // reset audio timestamp
    winnerAudio.currentTime = 0;
    audio.currentTime = 0;
    // play drum roll sound
    audio.play();

    winningDices = [];
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
            //RED
            dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
            winningDices.push("RED");
            break;

        case 6:
            //BLUE
            dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
            winningDices.push("BLUE");
            break;

        case 2:
            //GREEN
            dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
            winningDices.push("GREEN");
            break;

        case 5:
            //YELLOW
            dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
            winningDices.push("YELLOW");
            break;

        case 3:
            //PINK
            dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
            winningDices.push("PINK");
            break;

        case 4:
            //WHITE
            dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
            winningDices.push("WHITE");
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

            // show winners
            onDisplayWinners();
        } 

        dice.style.animation = 'none';
       
    }, duration * 1000 + 1000);
     
   
}

const onDisplayWinners = () => {
    winnerAudio.play();
    Swal.fire({
        title: 'Winning Dices',
        html: `
        <div class="flex">
            ${winningDices.map(dice => `
                <div class="dice">
                    <div class="face-swal">
                        <div class="swal-front" style="background: ${dice}"></div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="flex mt-2">
            ${winningDices.map(dice => `
                <h3 style="color: ${dice == 'WHITE'? 'black' : dice}">${dice}</h3>
            `).join('')}
        </div>
        `,
        background: "#fff url('./assets/images/trees.png')",
        backdrop: `
            rgba(0,0,123,0.4)
            url("./assets/images/confetti.gif")
            left top
            repeat
        `,
        width: 1020,
        allowOutsideClick: false,
        showCloseButton: true,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'Play Again',
    }).then((result) => {
        if (result.isDismissed) {
            winnerAudio.pause();
            audio.pause();
            
        }
    })
}


rollBtn.addEventListener('click', randomDice);
shuffleBtn.addEventListener('click', shuffleDice);


