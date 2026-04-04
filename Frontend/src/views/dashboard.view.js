// Dashboard view - displays daily macros and main dashboard
export const dashboardView = {
    elements: {
        caloriesToday: document.querySelector('#caloriestoday'),
        dailyMacrosChart: document.querySelector('#dailyMacrosChart')
    },

    updateDailyMacros(macros) {
        this.elements.caloriesToday.textContent = macros.calories;
        this.renderMacrosChart(macros);
    },

    renderMacrosChart(macros) {
        const ctx = this.elements.dailyMacrosChart.getContext('2d');
        
        // Destroy existing chart if it exists
        if (this.chart) {
            this.chart.destroy();
        }
        
        this.chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Protein', 'Fat', 'Carbohydrates'],
                datasets: [{
                    data: [macros.protein, macros.fat, macros.carbohydrates],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Macronutrient Breakdown'
                    }
                }
            }
        });
    },

    loadDailyMacros(callback) {
        // Execute immediately if DOM is ready, otherwise wait for load event
        if (document.readyState === 'interactive' ||
            document.readyState === 'complete') {
            callback();
        }
    }
};
