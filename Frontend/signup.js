const form = document.querySelector('#signupForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try {
        const response = await fetch("http://localhost:5000/auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();

        if (response.ok) {
            alert('Signup successful!');
            window.location.href = `http://127.0.0.1:5500/Frontend/login.html`;
        } else {
            alert(`Signup failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred during signup. Please try again later.');
    }
});