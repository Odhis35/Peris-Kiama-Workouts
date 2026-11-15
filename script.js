
const workouts = {

    Monday: [
        {
            name: "Invisible Jump rope",
            sets: 3,
            reps: 50,
            rest: 45,
            image: "Images/Invisibleropeskipping.jpg",
        },
        {
            name: "Bodyweight Squats",
            sets: 3,
            reps: 20,
            rest: 45,
        },
        {
            name: "Regular Lunges",
            sets: 3,
            reps: 10,
            rest: 45,
            /*image: "images/wall-pushups.jpg"*/
        },
        {
            name: "Single-leg Deadlift",
            sets: 3,
            reps: 15,
            rest: 45,
            /*image: "images/glute-bridges.jpg"*/
        },
        {
            name: "Calf-raise",
            sets: 3,
            reps: 20,
            rest: 45,
        },
        {
            name: "Mountain climbers",
            sets: 3,
            reps: 30,
            rest: 45,
        }
    ],

    Tuesday: [
        {
            name: "Burpees",
            sets: 3,
            reps: 15,
            rest: 45,
            /*image: "images/marching.jpg"*/
        },
        {
            name: "Knee Push ups",
            sets: 3,
            reps: 15,
            rest: 45,
            /*image: "images/side-raises.jpg"*/
        },
        {
            name: "Shoulder Taps",
            sets: 3,
            reps: 15,
            rest: 45,
        },
        {
            name: "Tricep Dips",
            sets: 3,
            reps: 15,
            rest: 45,
        },
        {
            name: "Plank",
            sets: 3,
            hold: 60,
            rest: 45,
        },
        {
            name: "Plank jack",
            sets: 3,
            reps: 15,
            rest: 45,
        }
    ],

    Wednesday: [
        {
            name: "Jumping Jacks",
            sets: 3,
            reps: 50,
            rest: 45,
            /*image: "images/lunges.jpg"*/
        },
        {
            name: "Burpees",
            sets: 3,
            reps: 25,
            rest: 45,
        },
        {
            name: "Mountain Climbers",
            sets: 3,
            reps: 30,
            rest: 45,
        },
        {
            name: "Shoulder Taps",
            sets: 3,
            reps: 25,
            rest: 45,
        },
        {
            name: "Leg raises",
            sets: 3,
            reps: 15,
            rest: 45,
        },
        {
            name: "Side planks",
            sets: 3,
            hold: 30,
            rest: 45,
        }
    ],

    Thursday: [
        {
            name: "High Knees",
            sets: 3,
            reps: 50,
            rest: 45,
            /*image: "images/bird-dogs.jpg"*/
        },
        {
            name: "W Superman",
            sets: 3,
            reps: 15,
            rest: 45,
        },
        {
            name: "Shoulder raises",
            sets: 3,
            reps: 30,
            rest: 45,
        },
        {
            name: "Push up",
            sets: 3,
            reps: 15,
            rest: 45,
        },
        {
            name: "In-outs",
            sets: 3,
            reps: 15,
            rest: 45,
        },
        {
            name: "Bird-dog",
            sets: 3,
            reps: 15,
            rest: 45,
        }
    ],

    Friday: [
        {
            name: "Squat Jumps",
            sets: 3,
            reps: 30,
            rest: 45,
            /*image: "images/plank.jpg"*/
        },
        {
            name: "Commandos",
            sets: 3,
            reps: 15,
            rest: 45,
        },
        {
            name: "Glute Bridges",
            sets: 3,
            reps: 20,
            rest: 45,
        },
        {
            name: "Donkey Kicks",
            sets: 3,
            reps: 15,
            rest: 45,
        },
        {
            name: "Reverse Lunges",
            sets: 3,
            reps: 15,
            rest: 45,
        },
        {
            name: "Side-lying leg raises",
            sets: 3,
            reps: 15,
            rest: 45,
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

function startRest(seconds) {

    clearInterval(timerInterval);

    let remaining = seconds;

    const timerDisplay = document.getElementById("rest-timer");

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


