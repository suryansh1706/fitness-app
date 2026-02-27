import { displayMeals } from "./displayMeal.js";

export const fetchMealHandler = async function () {
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
}