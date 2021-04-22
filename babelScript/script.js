"use strict";

"use strict";
var preferences = document.querySelector(".preferences");
var alert1 = document.querySelector(".alert");
var playButton = document.getElementById("play");
var nextTry = document.getElementById("nextTry");
var chevronLeft = document.getElementById("chevronLeft");
var chevronRight = document.getElementById("chevronRight");
var stylesOfGame = ["Numbers", "Others"];
var body = document.querySelector("body");
var reload = document.getElementById("reload");
var penality = 5;
var choosenStyle = void 0;
var counter1 = 0;
var tempArray = [];
var posArr = [];
var opened = 0;
var gameReady = true;
var clicked1 = void 0;
var clicked2 = void 0;
var cardsLeft = 20;

alert1.style.visibility = "hidden";
preferences.style.visibility = "visible";
//function for left-sliding of game-styles
var styleOfGameRight = function styleOfGameRight() {
  counter1++;
  if (counter1 > 1) {
    counter1 = 0;
  }
  document.getElementById("style").textContent = stylesOfGame[counter1];
};

//function for right-sliding of game-styles
var styleOfGameLeft = function styleOfGameLeft() {
  counter1--;
  if (counter1 < 0) {
    counter1 = 1;
  }
  document.getElementById("style").textContent = stylesOfGame[counter1];
};

//function for next-round while user fail to match a pair
var nextTryF = function nextTryF() {
  gameReady = true;
  document.getElementById("pos" + clicked1).parentElement.style.backgroundColor = "";
  document.getElementById("pos" + clicked1).style.visibility = "hidden";
  document.getElementById("pos" + clicked2).parentElement.style.backgroundColor = "";
  document.getElementById("pos" + clicked2).style.visibility = "hidden";
};

var readyForGame = function readyForGame() {
  choosenStyle = String(stylesOfGame[counter1]).toLowerCase();
  preferences.style.visibility = "hidden";

  //function for adding pictures
  for (var i = 1; tempArray.length < 10; i++) {
    var currentNum = Math.trunc(Math.random() * 10 + 1);

    if (!tempArray.includes(currentNum)) {
      tempArray.push(currentNum);
    }
  }
  for (var _i = 1; posArr.length < 20; _i++) {
    var currentPos = Math.trunc(Math.random() * 20 + 1);
    if (!posArr.includes(currentPos)) {
      posArr.push(currentPos);
    }
  }
  for (var _i2 = 0; _i2 < tempArray.length; _i2++) {
    if (tempArray[_i2] <= 10) {
      document.getElementById("pos" + posArr[_i2]).src = "styles/images/" + choosenStyle + "/" + tempArray[_i2] + ".png";

      document.getElementById("pos" + posArr[_i2 + 10]).src = "styles/images/" + choosenStyle + "/" + tempArray[_i2] + ".png";
    }
  }
};

//commands
chevronLeft.addEventListener("click", styleOfGameLeft);
chevronRight.addEventListener("click", styleOfGameRight);
playButton.addEventListener("click", readyForGame);
reload.addEventListener("click", function () {
  location.reload();
});

body.addEventListener("keydown", function (e) {
  if (e.keyCode == "13") {
    if (document.querySelector(".alert").style.visibility === "visible") {
      nextTryF();
    }
    if (preferences.style.visibility === "visible") {
      readyForGame();
    }
  }
});

body.addEventListener("keydown", function (e) {
  if (e.keyCode == "39") {
    styleOfGameRight();
  }
});
body.addEventListener("keydown", function (e) {
  if (e.keyCode == "37") {
    styleOfGameLeft();
  }
});

var _loop = function _loop(i) {
  document.getElementById("pos" + i).parentElement.addEventListener("click", function () {
    if (document.getElementById("pos" + i).parentElement.style.cursor = "pointer" && gameReady === true && cardsLeft >= 0 && Number(document.getElementById("currentScore").textContent > 0)) {
      document.getElementById("pos" + i).style.visibility = "visible";
      if (opened === 0) {
        clicked1 = i;
        document.getElementById("pos" + clicked1).parentElement.style.backgroundColor = "#b7f3ff";
        opened++;
      } else if (opened === 1) {
        clicked2 = i;
        gameReady = false;
        opened = 0;
        if (clicked1 != clicked2) {
          if (document.getElementById("pos" + clicked1).src === document.getElementById("pos" + clicked2).src) {
            document.getElementById("pos" + clicked1).parentElement.style.backgroundColor = "cyan";
            document.getElementById("pos" + clicked1).parentElement.style.cursor = "auto";
            document.getElementById("pos" + clicked2).parentElement.style.backgroundColor = "cyan";
            document.getElementById("pos" + clicked2).parentElement.style.cursor = "auto";
            gameReady = true;
            document.getElementById("pos" + clicked1).style.visibility = "hidden";
            document.getElementById("pos" + clicked2).style.visibility = "hidden";
            document.getElementById("playersScore").textContent = Number(Number(document.getElementById("playersScore").textContent) + Number(document.getElementById("currentScore").textContent));
            document.getElementById("finalResult").textContent = document.getElementById("playersScore").textContent;
            cardsLeft = cardsLeft - 2;
            if (cardsLeft <= 0) {
              document.getElementById("finalMessage").textContent = "Congratulations. You won! Your score: " + document.getElementById("playersScore").textContent;
              alert1.style.visibility = "visible";
              gameReady = false;
              nextTry.style.visibility = "hidden";
            }
          } else {
            document.getElementById("currentScore").textContent = Number(Number(document.getElementById("currentScore").textContent) - Number(penality));
            document.getElementById("pos" + clicked2).parentElement.style.backgroundColor = "#b7f3ff";
            /*
            document.querySelector(".alert").style.visibility = "visible";
            */
            setTimeout(nextTryF, 500);

            if (Number(document.getElementById("currentScore").textContent) <= 0) {
              document.getElementById("finalMessage").textContent = "Game over. Your score: " + document.getElementById("playersScore").textContent;
              penality = 0;
              alert1.style.visibility = "visible";
            }
          }
        }

        if (clicked1 === clicked2) {
          opened = 1;
          gameReady = true;
        }
      }
    }
  });
};

for (var i = 1; i <= 20; i++) {
  _loop(i);
}