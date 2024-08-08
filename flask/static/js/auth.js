document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
});


function checkAuthentication() {
    const token = getCookie('token');
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');

    if (loginLink) {
        if (token) {
            loginLink.style.display = 'none';
            if (logoutLink) {
                logoutLink.style.display = 'block';
                logoutLink.addEventListener('click', () => {
                    logoutUser();
                });
            }
        } else {
            loginLink.style.display = 'block';
            if (logoutLink) {
                logoutLink.style.display = 'none';
            }
        }
    }
    return token;
}

function getCookie(name) {
    // from https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
    return document.cookie
        .split(`; `)
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
}

function logoutUser() {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
