import { ingredients } from "./ingredients.js";
import { macros } from "./macros.js";
const Dropdown = document.querySelector("#ingredient");
const Quantity = document.querySelector("#quantity");
const Unit = document.querySelector("#unit");
const Calories = document.querySelector("#calories");
const Protein = document.querySelector("#protein");
const Fat = document.querySelector("#fat");
const Carbohydrates = document.querySelector("#carbohydrates");

export const addHandler = function () {
    const selectedIngredient = ingredients[Dropdown.value];
    const qty = Quantity.value;

    if (qty < 0 || qty === NaN) {
        alert("Please enter a valid quantity");
        return;
    }

    if (Unit.value === "gram") {
        macros.calories += (qty / 100) * selectedIngredient.calories_by_weight;
        macros.protein += (qty / 100) * selectedIngredient.protein_by_weight;
        macros.fat += (qty / 100) * selectedIngredient.fat_by_weight;
        macros.carbohydrates += (qty / 100) * selectedIngredient.carbohydrates_by_weight;
    } else {
        macros.calories += qty * selectedIngredient.calories;
        macros.protein += qty * selectedIngredient.protein;
        macros.fat += qty * selectedIngredient.fat;
        macros.carbohydrates += qty * selectedIngredient.carbohydrates;
    }

    Calories.textContent = macros.calories;
    Protein.textContent = macros.protein;
    Fat.textContent = macros.fat;
    Carbohydrates.textContent = macros.carbohydrates;
}
