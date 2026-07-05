let points = 0;

function updateDashboard() {
  const pointBox = document.getElementById("points");
  if (pointBox) {
    pointBox.textContent = points;
  }
}

function addPoints(value) {
  points += value;
  updateDashboard();
  alert("Great job! You earned " + value + " points.");
}

function checkQuiz() {
  let score = 0;
  const answers = ["q1", "q2", "q3"];

  answers.forEach(q => {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (selected && selected.value === "correct") {
      score++;
    }
  });

  points += score * 5;
  document.getElementById("result").textContent =
    "You scored " + score + "/3. You earned " + (score * 5) + " points.";
  updateDashboard();
}
