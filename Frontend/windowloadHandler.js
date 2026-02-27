const CaloriesToday = document.querySelector("#caloriestoday");
const ProteinToday = document.querySelector("#proteintoday");
const FatToday = document.querySelector("#fattoday");
const CarbohydratesToday = document.querySelector("#carbohydratestoday");

export const windowLoadHandler = async function () {
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
}