document.addEventListener('DOMContentLoaded', function() {
    const musicList = document.getElementById('musicList');

    // Функция для загрузки и отображения списка релизов
    function loadReleases() {
        let releases = JSON.parse(localStorage.getItem('releases')) || [];
        
        if (releases.length === 0) {
            musicList.innerHTML = '<p>Нет загруженных песен.</p>';
            return;
        }

        musicList.innerHTML = '';

        releases.forEach((release, index) => {
            const releaseDiv = document.createElement('div');
            releaseDiv.className = 'release';

            releaseDiv.innerHTML = `
                <h3>${release.title}</h3>
                <p>Исполнитель: ${release.artist}</p>
                <p>Продюсер: ${release.producer}</p>
                <p>Битмейкер: ${release.beatmaker}</p>
                <p>Автор текста: ${release.lyricist}</p>
                <p>Жанр: ${release.genre}</p>
                <p>Дата выхода: ${release.releaseDate}</p>
                <p>Содержит нецензурную лексику: ${release.explicitContent === 'yes' ? 'Да' : 'Нет'}</p>
                <p>Тип релиза: ${release.type}</p>
                <p>Обложка: <img src="${URL.createObjectURL(new Blob([release.coverName]))}" alt="Обложка" style="max-width: 200px;"></p>
                <p>Треки:</p>
                <ul>
                    ${release.tracks.map(track => `
                        <li>
                            <p>Название: ${track.title}</p>
                            <p>Файл: ${track.fileName}</p>
                            <p>Отрывок для TikTok: ${track.excerpt} сек.</p>
                        </li>
                    `).join('')}
                </ul>
                <button class="btn-delete" data-index="${index}">Удалить</button>
            `;
            musicList.appendChild(releaseDiv);
        });
    }

    // Функция для удаления релиза
    function deleteRelease(index) {
        let releases = JSON.parse(localStorage.getItem('releases')) || [];
        releases.splice(index, 1);
        localStorage.setItem('releases', JSON.stringify(releases));
        loadReleases(); // Перезагружаем список
    }

    // Обработчик кликов по кнопкам "Удалить"
    musicList.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-delete')) {
            const index = event.target.getAttribute('data-index');
            if (confirm('Вы уверены, что хотите удалить этот релиз?')) {
                deleteRelease(index);
            }
        }
    });

    // Вызов функции загрузки релизов при загрузке страницы
    loadReleases();
});
