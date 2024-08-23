document.addEventListener('DOMContentLoaded', () => {
    // График модерации (как ранее)
    const data = {
        labels: ['Запрос 1', 'Запрос 2', 'Запрос 3', 'Запрос 4'],
        datasets: [{
            label: 'Запросы на модерацию',
            data: [12, 19, 3, 5],
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'white'
                    }
                }
            }
        }
    };

    const ctx = document.getElementById('moderationChart').getContext('2d');
    new Chart(ctx, config);

    // Логика модального окна
    const modal = document.getElementById('releaseModal');
    const viewReleaseBtn = document.getElementById('viewReleaseBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    viewReleaseBtn.onclick = function() {
        modal.style.display = "block";
    }

    closeModalBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Логика для кнопок "Одобрить" и "Отклонить"
    document.querySelector('.btn-approve').onclick = function() {
        alert('Релиз одобрен!');
        modal.style.display = "none";
    }

    document.querySelector('.btn-reject').onclick = function() {
        alert('Релиз отклонён.');
        modal.style.display = "none";
    }
});
