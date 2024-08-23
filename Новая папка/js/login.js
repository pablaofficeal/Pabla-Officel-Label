document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Получаем данные пользователей из localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Проверяем, есть ли пользователь с таким логином и паролем
        if (users.some(user => user.username === username && user.password === password)) {
            // Вход успешен - перенаправляем на страницу личного кабинета
            window.location.href = 'dashboard.html';
        } else {
            // Неверные данные - показываем сообщение об ошибке
            loginError.style.display = 'block';
        }
    });
});
