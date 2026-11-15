
const workouts = {

    Monday: [
        {
            name: "Bodyweight Squats",
            sets: 3,
            reps: 12,
            rest: 45,
            image: "images/squats.jpg"
        },
        {
            name: "Wall Push-ups",
            sets: 3,
            reps: 10,
            rest: 45,
            image: "images/wall-pushups.jpg"
        },
        {
            name: "Glute Bridges",
            sets: 3,
            reps: 15,
            rest: 45,
            image: "images/glute-bridges.jpg"
        }
    ],

    Tuesday: [
        {
            name: "Marching in Place",
            sets: 3,
            reps: 40,
            rest: 30,
            image: "images/marching.jpg"
        },
        {
            name: "Standing Side Leg Raises",
            sets: 3,
            reps: 12,
            rest: 30,
            image: "images/side-raises.jpg"
        }
    ],

    Wednesday: [
        {
            name: "Reverse Lunges",
            sets: 3,
            reps: 10,
            rest: 45,
            image: "images/lunges.jpg"
        }
    ],

    Thursday: [
        {
            name: "Bird Dogs",
            sets: 3,
            reps: 12,
            rest: 30,
            image: "images/bird-dogs.jpg"
        }
    ],

    Friday: [
        {
            name: "Plank",
            sets: 3,
            reps: 30,
            rest: 45,
            image: "images/plank.jpg"
        }
    ]

};
// Retrieve saved progress or create an empty object
let completedExercises = JSON.parse(
    localStorage.getItem("completedExercises")
) || {};

function selectDay(day) {

    const exerciseList = document.getElementById("exercise-list");
    const dayTitle = document.getElementById("day-title");
    const completionMessage =
        document.getElementById("completion-message");

    dayTitle.textContent = day + "'s Workout";

    completionMessage.hidden = true;
    exerciseList.innerHTML = "";

    const dailyExercises = workouts[day];

    dailyExercises.forEach((exercise, index) => {

        const card = document.createElement("div");

        card.className = "exercise-card";

        card.innerHTML = `
            <h3>${exercise.name}</h3>

            <img src="${exercise.image}"
                 alt="${exercise.name} demonstration">

            <p>Sets: ${exercise.sets}</p>
            <p>Reps: ${exercise.reps}</p>
            <p>Rest: ${exercise.rest} seconds</p>
            <button onclick="startRest(${exercise.rest})">
                Start Rest
            </button>

                <p id="rest-timer"></p>

            <button class="done-btn"
                onclick="completeExercise(this)">
                Done ✓
            </button>
        `;

        exerciseList.appendChild(card);
        // Restore previously completed exercises
        if (completedExercises[day]?.includes(index)) {

        const doneButton = card.querySelector(".done-btn");

        doneButton.textContent = "Completed ✓";
        doneButton.disabled = true;

        card.style.opacity = "0.65";
}

    });
    // Check whether the entire day's workout is complete
        const allCards = [...document.querySelectorAll(".exercise-card")];

        if (allCards.length > 0 &&
            allCards.every(card =>
            card.querySelector(".done-btn").disabled
            )) {

            completionMessage.hidden = false;
        }
}



function completeExercise(button) {

    button.textContent = "Completed ✓";
    button.disabled = true;

    button.closest(".exercise-card").style.opacity = "0.65";

    const day = document.getElementById("day-title")
                      .textContent.replace("'s Workout", "");

    if (!completedExercises[day]) {
        completedExercises[day] = [];
    }

    const cards = [...document.querySelectorAll(".exercise-card")];

    const index = cards.indexOf(button.closest(".exercise-card"));

    completedExercises[day].push(index);

    // Save progress
    localStorage.setItem(
        "completedExercises",
        JSON.stringify(completedExercises)
    );

    const allCompleted = cards.every(card =>
        card.querySelector(".done-btn").disabled
    );

    if (allCompleted) {
        document.getElementById("completion-message").hidden = false;
    }
}



let timerInterval;

function startRest(seconds, button) {

    clearInterval(timerInterval);

    let remaining = seconds;

    const timerDisplay = button.nextElementSibling;

    timerDisplay.textContent = `Rest: ${remaining}s`;

    timerInterval = setInterval(() => {

        remaining--;

        timerDisplay.textContent = `Rest: ${remaining}s`;

        if (remaining <= 0) {

            clearInterval(timerInterval);

            timerDisplay.textContent = "Time to go! 💪";

        }

    }, 1000);
}

