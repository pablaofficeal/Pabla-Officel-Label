document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;
        const email = document.getElementById('regEmail').value;

        // Проверка на существование пользователя (для демонстрации, здесь используется простой метод)
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.username === username)) {
            registerMessage.textContent = 'Пользователь с таким именем уже существует.';
            registerMessage.style.color = 'red';
            return;
        }

        // Добавление нового пользователя
        users.push({ username, password, email });
        localStorage.setItem('users', JSON.stringify(users));

        registerMessage.textContent = 'Регистрация успешна! Пожалуйста, войдите.';
        registerMessage.style.color = 'green';

        // Перенаправляем на страницу входа через 2 секунды
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
});
