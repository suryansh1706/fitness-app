const Dropdown = document.querySelector("#ingredient");
const Quantity = document.querySelector("#quantity");
const Unit = document.querySelector("#unit");
const Calories = document.querySelector("#calories");
const Protein = document.querySelector("#protein");
const Fat = document.querySelector("#fat");
const Carbohydrates = document.querySelector("#carbohydrates");
import { macros } from "./macros.js";

export const saveHandler = async function () {
    const jwtToken = localStorage.getItem("jwtToken");
    const mealName = prompt("Enter a name for your meal:");
    if (!mealName) {
        alert("Meal name cannot be empty.");
        return;
    }

    const mealData = {
        name: mealName,
        calories: macros.calories,
        protein: macros.protein,
        fat: macros.fat,
        carbohydrates: macros.carbohydrates,
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
}
