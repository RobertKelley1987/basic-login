const submitButton = document.getElementById('submit-button');
const form = document.getElementById('login-form');
const formIncomplete = (email, password) => email.value === '' || password.value === '';

// Disable submit button if form is empty
document.querySelectorAll('.input').forEach(input => {
    input.addEventListener('keyup', () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        submitButton.disabled = formIncomplete(email, password);
    })
});

// Disable submit button after submit
form.addEventListener('submit', e => e.preventDefault());