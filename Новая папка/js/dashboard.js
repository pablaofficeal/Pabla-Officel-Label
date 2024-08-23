document.addEventListener('DOMContentLoaded', function() {
    const ctxListens = document.getElementById('listensChart').getContext('2d');
    const ctxRoyalties = document.getElementById('royaltiesChart').getContext('2d');
    const ctxTracks = document.getElementById('tracksChart').getContext('2d');

    // Пример данных
    const artists = ['Артист 1', 'Артист 2', 'Артист 3', 'Артист 4'];
    const listensData = [1200, 1500, 800, 2000];
    const royaltiesData = [3000, 2500, 1500, 4000];
    const tracksData = [10, 15, 5, 20];

    // График прослушиваний
    new Chart(ctxListens, {
        type: 'bar',
        data: {
            labels: artists,
            datasets: [{
                label: 'Прослушивания',
                data: listensData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // График выплат роялти
    new Chart(ctxRoyalties, {
        type: 'bar',
        data: {
            labels: artists,
            datasets: [{
                label: 'Выплаты роялти',
                data: royaltiesData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // График выпущенных треков
    new Chart(ctxTracks, {
        type: 'bar',
        data: {
            labels: artists,
            datasets: [{
                label: 'Выпущенные треки',
                data: tracksData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
