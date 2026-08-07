// Workout view - handles DOM elements and UI rendering for workout page
export const workoutView = {
    elements: {
        form: document.querySelector('#workoutForm'),
        exerciseNameInput: document.querySelector('#exerciseName'),
        weightInput: document.querySelector('#weight'),
        repsInput: document.querySelector('#reps'),
        workoutList: document.querySelector('#workoutList'),
        clearAllBtn: document.querySelector('#clearAllBtn')
    },

    getFormData() {
        return {
            exerciseName: this.elements.exerciseNameInput.value.trim(),
            weight: parseFloat(this.elements.weightInput.value),
            reps: parseInt(this.elements.repsInput.value, 10)
        };
    },

    resetForm() {
        if (this.elements.form) {
            this.elements.form.reset();
            this.elements.exerciseNameInput.focus();
        }
    },

    renderWorkouts(workouts, onDeleteHandler) {
        if (!this.elements.workoutList) return;

        this.elements.workoutList.innerHTML = '';

        if (!workouts || workouts.length === 0) {
            this.elements.workoutList.innerHTML = `
                <div class="empty-state">
                    <p>No workouts logged yet. Fill out the form above to add your first workout!</p>
                </div>
            `;
            if (this.elements.clearAllBtn) this.elements.clearAllBtn.style.display = 'none';
            return;
        }

        if (this.elements.clearAllBtn) this.elements.clearAllBtn.style.display = 'inline-block';

        // Helper to format and get grouping key
        const getGroupInfo = (dateStr) => {
            const d = new Date(dateStr);
            if (!isNaN(d.getTime())) {
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                const key = `${year}-${month}-${day}`;
                const label = d.toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                return { key, label };
            }
            return { key: dateStr || 'Unknown Date', label: dateStr || 'Unknown Date' };
        };

        // Group workouts by date key
        const groupsMap = new Map();

        workouts.forEach((workout) => {
            const { key, label } = getGroupInfo(workout.date);
            if (!groupsMap.has(key)) {
                groupsMap.set(key, { label, items: [] });
            }
            groupsMap.get(key).items.push(workout);
        });

        // Render each date group
        groupsMap.forEach((group) => {
            const groupEl = document.createElement('div');
            groupEl.className = 'workout-date-group';

            const headerEl = document.createElement('div');
            headerEl.className = 'workout-date-header';
            headerEl.innerHTML = `<h3>${this.escapeHtml(group.label)}</h3>`;
            groupEl.appendChild(headerEl);

            const setsListEl = document.createElement('div');
            setsListEl.className = 'workout-sets-list';

            group.items.forEach((workout) => {
                const card = document.createElement('div');
                card.className = 'workout-card';
                card.innerHTML = `
                    <div class="workout-info">
                        <div class="exercise-name">${this.escapeHtml(workout.exerciseName)}</div>
                        <div class="workout-details">
                            <span>Weight: ${workout.weight} kg</span>
                            <span>Reps: ${workout.reps}</span>
                        </div>
                    </div>
                    <button class="btn-delete" data-id="${workout.id}">Delete</button>
                `;
                setsListEl.appendChild(card);
            });

            groupEl.appendChild(setsListEl);
            this.elements.workoutList.appendChild(groupEl);
        });

        // Attach delete event listeners
        this.elements.workoutList.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idAttr = e.target.getAttribute('data-id');
                const id = isNaN(Number(idAttr)) ? idAttr : Number(idAttr);
                onDeleteHandler(id);
            });
        });
    },

    attachSubmitListener(callback) {
        if (this.elements.form) {
            this.elements.form.addEventListener('submit', (e) => {
                e.preventDefault();
                callback(this.getFormData());
            });
        }
    },

    attachClearAllListener(callback) {
        if (this.elements.clearAllBtn) {
            this.elements.clearAllBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear all workout history?')) {
                    callback();
                }
            });
        }
    },

    escapeHtml(str) {
        return String(str).replace(/[&<>'"]/g,
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
};
