window.onload = () => {
  resetNo();
};
// QUESTIONS
const questions = [
  "Oh hello there, welcome!<br>Are you Benjamin?",
  "Benjamin Wyatt Shires...? The boyfriend of Anny...?<br>The cutest, sweetest, most handsome and wonderful bby Ben...?",
  "Is it your birthday today?"
];

let currentQuestion = 0;

const questionEl = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const intro = document.getElementById("intro");
const scene = document.getElementById("scene");
const music = document.getElementById("music");

// NO BUTTON (AIR HOCKEY)
let noX = 300;
let noY = 300;
let vx = 0;
let vy = 0;

noBtn.style.left = noX + "px";
noBtn.style.top = noY + "px";

function resetNo() {
  const rect = yesBtn.getBoundingClientRect();
  noX = rect.left + 120;
  noY = rect.top;
  vx = 0;
  vy = 0;
}

function moveNo() {
  noX += vx;
  noY += vy;

  vx *= 0.92;
  vy *= 0.92;

  const rect = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - rect.width;
  const maxY = window.innerHeight - rect.height;

  if (noX < 0 || noX > maxX) vx *= -0.8;
  if (noY < 0 || noY > maxY) vy *= -0.8;

  noX = Math.max(0, Math.min(noX, maxX));
  noY = Math.max(0, Math.min(noY, maxY));

  noBtn.style.left = noX + "px";
  noBtn.style.top = noY + "px";

  requestAnimationFrame(moveNo);
}

moveNo();

document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();
  const dx = rect.left + rect.width/2 - e.clientX;
  const dy = rect.top + rect.height/2 - e.clientY;
  const dist = Math.sqrt(dx*dx + dy*dy);

  if (dist < rect.width/2) {
    vx += (dx/dist) * 6;
    vy += (dy/dist) * 6;
  }
});

// YES BUTTON
yesBtn.onclick = () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    questionEl.innerHTML = questions[currentQuestion];
    resetNo();
  } else {
    questionEl.innerHTML = "Okay... Access granted! :) ";
    yesBtn.style.display = "none";
    noBtn.style.display = "none";

    music.play();

    setTimeout(() => {
      intro.style.display = "none";
      scene.classList.remove("hidden");

      setTimeout(showExclamations, 2000);
    }, 1500);
  }
};

// EXCLAMATIONS
const ex1 = document.getElementById("ex1");
const ex2 = document.getElementById("ex2");

function showExclamations() {
  ex1.classList.remove("hidden");
  ex2.classList.remove("hidden");

  ex1.classList.add("pop");
  ex2.classList.add("pop");
}

// CATS
let bellaClicked = false;
let luluClicked = false;

const bella = document.getElementById("bella");
const lulu = document.getElementById("lulu");

const bellaMsg = document.getElementById("bellaMsg");
const luluMsg = document.getElementById("luluMsg");

bella.onclick = () => {
  bellaMsg.classList.remove("hidden");
  bellaMsg.classList.add("pop");

  ex2.style.display = "none"; // BELLA = RIGHT exclamation

  bellaClicked = true;
  checkBoth();
};

lulu.onclick = () => {
  luluMsg.classList.remove("hidden");
  luluMsg.classList.add("pop");

  ex1.style.display = "none"; // LULU = LEFT exclamation

  luluClicked = true;
  checkBoth();
};

// BUTTON AFTER BOTH
const actionBtn = document.getElementById("actionBtn");

let buttonShown = false;

function checkBoth() {
  if (bellaClicked && luluClicked && !buttonShown) {
    buttonShown = true;

    setTimeout(() => {
      actionBtn.classList.remove("hidden");
      actionBtn.classList.add("pop");
    }, 5000);
  }
}

// LETTERS
const lettersContainer = document.getElementById("letters");

const letters = [
  "H1.png","A.png","P1.png","P2.png","Y1.png",
  "space",
  "B.png","I.png","R.png","T.png","H2.png",
  "D.png","A2.png","Y2.png"
];

let lettersStarted = false;

actionBtn.onclick = () => {
  if (lettersStarted) return; // PREVENT MULTIPLE CLICKS
  lettersStarted = true;

  lettersContainer.innerHTML = "";

  let i = 0;

  function showNext() {
    if (i < letters.length) {

      if (letters[i] === "space") {
        const spacer = document.createElement("div");
        spacer.style.display = "inline-block";
        spacer.style.width = "90px";
        lettersContainer.appendChild(spacer);
      } else {
        const img = document.createElement("img");
        img.src = "images/" + letters[i];
        img.classList.add("letter");
        // tighten specific letters
        if (letters[i] === "B.png") {
        img.style.marginRight = "-10px";
      }
      if (letters[i] === "R.png") {
      img.style.marginLeft = "-10px";
}
        

        lettersContainer.appendChild(img);

        setTimeout(() => {
          img.style.opacity = "1";
        }, 50);
      }

      i++;
      setTimeout(showNext, 200);
    }
  }

  showNext();
};