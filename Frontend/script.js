const Add = document.querySelector("#add");
const Dropdown = document.querySelector("#ingredient");
const Quantity = document.querySelector("#quantity");
const Unit = document.querySelector("#unit");
const Calories = document.querySelector("#calories");
const Protein = document.querySelector("#protein");
const Fat = document.querySelector("#fat");
const Carbohydrates = document.querySelector("#carbohydrates");

const whole_egg = {
    name: "Whole Egg",
    calories: 78,
    calories_by_weight: 155,
    protein: 6,
    protein_by_weight: 13,
    fat: 5,
    fat_by_weight: 11,
    carbohydrates: 0.6,
    carbohydrates_by_weight: 0.6
}

const bread = {
    name: "Bread",
    calories: 79,
    calories_by_weight: 265,
    protein: 4,
    protein_by_weight: 9,
    fat: 1,
    fat_by_weight: 3,
    carbohydrates: 15,
    carbohydrates_by_weight: 49
}

const peanut_butter = {
    name: "Peanut Butter",
    calories: 95,
    calories_by_weight: 588,
    protein: 1,
    protein_by_weight: 25,
    fat: 16,
    fat_by_weight: 50,
    carbohydrates: 6,
    carbohydrates_by_weight: 20
}

const onion = {
    name: "Onion",
    calories: 40,
    calories_by_weight: 40,
    protein: 1,
    protein_by_weight: 1,
    fat: 0,
    fat_by_weight: 0,
    carbohydrates: 9,
    carbohydrates_by_weight: 9
}

const chicken_leg = {
    name: "Chicken Leg",
    calories: 180,
    calories_by_weight: 180,
    protein: 27,
    protein_by_weight: 27,
    fat: 8,
    fat_by_weight: 8,
    carbohydrates: 0,
    carbohydrates_by_weight: 0
}

const milk = {
    name: "Milk",
    calories: 103,
    calories_by_weight: 42,
    protein: 8,
    protein_by_weight: 3.4,
    fat: 2,
    fat_by_weight: 1,
    carbohydrates: 12,
    carbohydrates_by_weight: 5
}

let selectedIngredient = null;
Add.addEventListener("click", function () {
    selectedIngredient = Dropdown.value;
});

let calories = 0;
let protein = 0;
let fat = 0;
let carbohydrates = 0;


Add.addEventListener("click", function () {
    
    const qty = Quantity.value;
    
    if (qty < 0 || qty === NaN) {
        alert("Please enter a valid quantity");
        return;
    }

    else {
        if (selectedIngredient === "whole_egg") {
            selectedIngredient = whole_egg;
        }

        else if (selectedIngredient === "bread") {
            selectedIngredient = bread;
        }

        else if (selectedIngredient === "peanut_butter") {
            selectedIngredient = peanut_butter;
        }

        else if (selectedIngredient === "onion") {
            selectedIngredient = onion;
        }

        else if (selectedIngredient === "chicken_leg") {
            selectedIngredient = chicken_leg;
        }
            
        else if (selectedIngredient === "milk") {
            selectedIngredient = milk;
        }
            
        else {
            alert("Please select an ingredient");
            return;
        }

        if (Unit.value === "gram") {
            calories += (qty / 100) * selectedIngredient.calories_by_weight;
            protein += (qty / 100) * selectedIngredient.protein;
            fat += (qty / 100) * selectedIngredient.fat;
            carbohydrates += (qty / 100) * selectedIngredient.carbohydrates;
        }

        else {
            calories += qty * selectedIngredient.calories;
            protein += qty * selectedIngredient.protein;
            fat += qty * selectedIngredient.fat;
            carbohydrates += qty * selectedIngredient.carbohydrates;
        }
        
        Calories.textContent = calories;
        Protein.textContent = protein;
        Fat.textContent = fat;
        Carbohydrates.textContent = carbohydrates;
    }
});