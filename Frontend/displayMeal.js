export function displayMeals(meals) {
    const container = document.querySelector("#mealsContainer");
    container.innerHTML = ""; // clear previous

    meals.forEach(meal => {
        const div = document.createElement("div");
        div.classList.add("meal-card");

        div.innerHTML = `
            <h3>${meal.name}</h3>
            <p>Calories: ${meal.calories}</p>
            <p>Protein: ${meal.protein}</p>
            <p>Fat: ${meal.fat}</p>
            <p>Carbs: ${meal.carbohydrates}</p>
        `;

        container.appendChild(div);
    });
}