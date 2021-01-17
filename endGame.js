var userNameInput = document.getElementById('username');
var saveScoreButton = document.getElementById('saveScoreButton');
var finalScore = document.getElementById('finalScore');
var score = sessionStorage.getItem('mostRecentScore');
finalScore.innerText = score;

var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

userName.addEventListener("keyup", () => {
    saveScoreButton.disabled = !userName.value;
});


var saveHighScore = e => {
    e.preventDefault();
    console.log("clicked the save button!");
    var userName = userNameInput.value;
    var newHighscore = {
        userName,
        score
    };
    highscores.push(newHighscore);
    highscores = highscores.sort((a, b) => b.score - a.score);
    highscores.splice(10);
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

saveScoreButton.addEventListener("click", saveHighScore)