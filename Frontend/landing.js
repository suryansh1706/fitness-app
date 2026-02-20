const AddBtn = document.querySelector("#addbtn");
const Dropdown = document.querySelector("#ingredient");
const Quantity = document.querySelector("#quantity");
const Unit = document.querySelector("#unit");
const Calories = document.querySelector("#calories");
const Protein = document.querySelector("#protein");
const Fat = document.querySelector("#fat");
const Carbohydrates = document.querySelector("#carbohydrates");
import { ingredients } from "./ingredients.js";

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
