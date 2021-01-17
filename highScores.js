var highScoresList = document.getElementById('highScoresList');
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];


highscores.innerHTML = highscores
.map(score => {
    return '<li class="high-scores">${username.score}-${score.score}</li>';
})
.join("");
