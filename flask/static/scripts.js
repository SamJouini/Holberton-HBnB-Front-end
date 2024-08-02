document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            try {
                await loginUser(email, password);
            } catch (error) {
                console.log(error);
                if (errorMessage) {
                    errorMessage.textContent = "Login failed: " + error.message;
                    errorMessage.style.display = 'block';
                }
            }
        });
    }
});

async function loginUser(email, password) {
    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    if (response.ok) {
        const data = await response.json();
        document.cookie = `token=${data.access_token}; path=/`;
        window.location.href = 'index.html';
    } else {
        const error = await response.json();
        throw new Error('ERROR');
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function checkAuthentication() {
    const token = getCookie('token');
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');

    if (loginLink) {
        if (!token) {
            loginLink.style.display = 'block';
            if (logoutLink) {
                logoutLink.style.display = 'none';
            }
        } else {
            loginLink.style.display = 'none';
            if (logoutLink) {
                logoutLink.style.display = 'block';
            }
        }
    }
    return token;
}

function logoutUser() {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = 'login.html';
}
    const token = checkAuthentication();
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        if (token) {
            logoutLink.style.display = 'block';
            logoutLink.addEventListener('click', () => {
                logoutUser();
            });
        } else {
            logoutLink.style.display = 'none';
        }
    };

