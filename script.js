
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
            image: "Images/Bodyweightsquat.jpg",
        },
        {
            name: "Regular Lunges",
            sets: 3,
            reps: 10,
            rest: 45,
            image: "Images/Lunges.png",
        },
        {
            name: "Single-leg Deadlift",
            sets: 3,
            reps: 15,
            rest: 45,
            image: "Images/Singlelegdeadlift.jpg",
        },
        {
            name: "Calf-raise",
            sets: 3,
            reps: 20,
            rest: 45,
            image: "Images/calf raises.png",
        },
        {
            name: "Mountain climbers",
            sets: 3,
            reps: 30,
            rest: 45,
            image: "Images/mountain climbers.jpg",
        }
    ],

    Tuesday: [
        {
            name: "Burpees",
            sets: 3,
            reps: 15,
            rest: 45,
            image: "Images/burpees.jpg",
        },
        {
            name: "Knee Push ups",
            sets: 3,
            reps: 15,
            rest: 45,
            image: "Images/knee push up.jpg",
        },
        {
            name: "Shoulder Taps",
            sets: 3,
            reps: 15,
            rest: 45,
            image: "Images/shoulder taps.jpg",
        },
        {
            name: "Tricep Dips",
            sets: 3,
            reps: 15,
            rest: 45,
            image: "Images/tricep dips.png",
        },
        {
            name: "Plank",
            sets: 3,
            hold: 60,
            rest: 45,
            image: "Images/plank.png",
        },
        {
            name: "Plank jack",
            sets: 3,
            reps: 15,
            rest: 45,
            image: "Images/plank jack.jpg",
        }
    ],

    Wednesday: [
        {
            name: "Jumping Jacks",
            sets: 3,
            reps: 50,
            rest: 45,
            image: "Images/jumping jacks.jpg",
        },
        {
            name: "Burpees",
            sets: 3,
            reps: 25,
            rest: 45,
            image: "Images/burpees.jpg",
        },
        {
            name: "Mountain Climbers",
            sets: 3,
            reps: 30,
            rest: 45,
            image: "Images/mountain climbers.jpg",
        },
        {
            name: "Shoulder Taps",
            sets: 3,
            reps: 25,
            rest: 45,
            image: "Images/shoulder taps.jpg",
        },
        {
            name: "Leg raises",
            sets: 3,
            reps: 15,
            rest: 45,
            image: "Images/leg raises.jpg",
        },
        {
            name: "Side planks",
            sets: 3,
            hold: 30,
            rest: 45,
            image: "Images/side plank.jpg",
        }
    ],

    Thursday: [
        {
            name: "High Knees",
            sets: 3,
            reps: 50,
            rest: 45,
            image: "Images/high knees.png",
        },
        {
            name: "W Superman",
            sets: 3,
            reps: 15,
            rest: 45,
            image: "Images/w supermann.jpg",
        },
        {
            name: "Shoulder Press",
            sets: 3,
            reps: 30,
            rest: 45,
            image: "Images/Shoulder.png",
        },
        {
            name: "Push up",
            sets: 3,
            reps: 15,
            rest: 45,
            image: "Images/knee push up.jpg",
        },
        {
            name: "In-outs",
            sets: 3,
            reps: 15,
            rest: 45,
            image: "Images/in out.jpg",
        },
        {
            name: "Bird-dog",
            sets: 3,
            reps: 15,
            rest: 45,
            image: "Images/birddog.jpg",
        }
    ],

    Friday: [
        {
            name: "Squat Jumps",
            sets: 3,
            reps: 30,
            rest: 45,
            image: "Images/squat jump.jpg",
        },
        {
            name: "Commandos",
            sets: 3,
            reps: 15,
            rest: 45,
            image: "Images/commandos.jpg",
        },
        {
            name: "Glute Bridges",
            sets: 3,
            reps: 20,
            rest: 45,
            image: "Images/glute bridge.jpg",
        },
        {
            name: "Donkey Kicks",
            sets: 3,
            reps: 15,
            rest: 45,
            image: "Images/donkey kicks.jpg",
        },
        {
            name: "Reverse Lunges",
            sets: 3,
            reps: 15,
            rest: 45,
            image: "Images/reverse lunges.jpg",
        },
        {
            name: "Side-lying leg raises",
            sets: 3,
            reps: 15,
            rest: 45,
            image: "Images/side lying leg raises.jpg",
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


