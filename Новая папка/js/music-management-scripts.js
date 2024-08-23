// Используемые ID и секретный ключ, которые вы предоставили
const clientId = '11a6cdfa3f5d459c8e385db113842f5b';
const clientSecret = '98e6751f76884378a82f3004e40d1a38';
let accessToken = '';

document.addEventListener('DOMContentLoaded', () => {
    // Получение токена доступа
    const fetchAccessToken = async () => {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await response.json();
        accessToken = data.access_token;
    };

    // Функция для получения данных о релизах с Spotify
    const fetchSpotifyData = async () => {
        if (!accessToken) {
            await fetchAccessToken();
        }

        const response = await fetch('https://api.spotify.com/v1/me/albums', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        const releaseList = document.getElementById('releaseList');
        releaseList.innerHTML = ''; // Очищаем список перед новым заполнением

        data.items.forEach(album => {
            const albumElement = document.createElement('div');
            albumElement.className = 'album';
            albumElement.innerHTML = `
                <h3>${album.name}</h3>
                <p>Артист: ${album.artists.map(artist => artist.name).join(', ')}</p>
                <p>Дата выпуска: ${album.release_date}</p>
                <img src="${album.images[0].url}" alt="${album.name}" width="300">
            `;
            releaseList.appendChild(albumElement);
        });
    };

    // Привязка к кнопке
    document.getElementById('fetchSpotifyData').addEventListener('click', fetchSpotifyData);
});
