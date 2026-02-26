const AddBtn = document.querySelector("#addbtn");
const SaveBtn = document.querySelector("#savebtn");
const Dropdown = document.querySelector("#ingredient");
const Quantity = document.querySelector("#quantity");
const Unit = document.querySelector("#unit");
const Calories = document.querySelector("#calories");
const Protein = document.querySelector("#protein");
const Fat = document.querySelector("#fat");
const Carbohydrates = document.querySelector("#carbohydrates");
const CaloriesToday = document.querySelector("#caloriestoday");
const ProteinToday = document.querySelector("#proteintoday");
const FatToday = document.querySelector("#fattoday");
const CarbohydratesToday = document.querySelector("#carbohydratestoday");
import { ingredients } from "./ingredients.js";
const FetchMealBtn = document.querySelector("#fetchmeal");
import { displayMeals } from "./displayMeal.js";

// intializing the variables to store the total calories, protein, fat and carbohydrates
let calories = 0;
let protein = 0;
let fat = 0;
let carbohydrates = 0;

AddBtn.addEventListener("click", function () {
    const selectedIngredient = ingredients[Dropdown.value];
    const qty = Quantity.value;

    if (qty < 0 || qty === NaN) {
        alert("Please enter a valid quantity");
        return;
    }

    if (Unit.value === "gram") {
        calories += (qty / 100) * selectedIngredient.calories_by_weight;
        protein += (qty / 100) * selectedIngredient.protein_by_weight;
        fat += (qty / 100) * selectedIngredient.fat_by_weight;
        carbohydrates += (qty / 100) * selectedIngredient.carbohydrates_by_weight;
    } else {
        calories += qty * selectedIngredient.calories;
        protein += qty * selectedIngredient.protein;
        fat += qty * selectedIngredient.fat;
        carbohydrates += qty * selectedIngredient.carbohydrates;
    }

    Calories.textContent = calories;
    Protein.textContent = protein;
    Fat.textContent = fat;
    Carbohydrates.textContent = carbohydrates;
});

SaveBtn.addEventListener("click", async function () {

    const jwtToken = localStorage.getItem("jwtToken");
    const mealName = prompt("Enter a name for your meal:");
    if (!mealName) {
        alert("Meal name cannot be empty.");
        return;
    }

    const mealData = {
        name: mealName,
        calories: calories,
        protein: protein,
        fat: fat,
        carbohydrates: carbohydrates,
    };

    try {
        const response = await fetch("http://localhost:5000/meals/save", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify(mealData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Meal saved successfully!");
        } else {
            alert(`Failed to save meal: ${data.message}`);
        }
    } catch (error) {
        console.error("Error saving meal:", error);
        alert("An error occurred while saving the meal. Please try again later.");
    }

    Dropdown.value = "";
    Unit.value = "";
    Quantity.value = "";
    
    Calories.textContent = 0;
    Protein.textContent = 0;
    Fat.textContent = 0;
    Carbohydrates.textContent = 0;
});


FetchMealBtn.addEventListener("click", async function () {
    const jwtToken = localStorage.getItem("jwtToken");

    try {
        const response = await fetch("http://localhost:5000/meals/fetch", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
        }); 
        const data = await response.json();
        displayMeals(data.meals);
    } catch (error) {
        console.error("Error fetching meals:", error);
    }
});

window.addEventListener("load", async function () {
    const jwtToken = localStorage.getItem("jwtToken");

    try {
        const response = await fetch("http://localhost:5000/meals/daily", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
        });
        const data = await response.json();
        CaloriesToday.textContent = data.calories;
        ProteinToday.textContent = data.protein;
        FatToday.textContent = data.fat;
        CarbohydratesToday.textContent = data.carbohydrates;
    }
    catch (error) {
        console.error("Error fetching daily macros:", error);
    }
});