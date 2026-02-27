const AddBtn = document.querySelector("#addbtn");
const SaveBtn = document.querySelector("#savebtn");
const CaloriesToday = document.querySelector("#caloriestoday");
const ProteinToday = document.querySelector("#proteintoday");
const FatToday = document.querySelector("#fattoday");
const CarbohydratesToday = document.querySelector("#carbohydratestoday");
const FetchMealBtn = document.querySelector("#fetchmeal");
import { addHandler } from "./addHandler.js";
import { saveHandler } from "./saveHandler.js";
import { fetchMealHandler } from "./fetchmealHandler.js";

AddBtn.addEventListener("click", addHandler);
SaveBtn.addEventListener("click", saveHandler);
FetchMealBtn.addEventListener("click", fetchMealHandler);

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