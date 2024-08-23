const clientId = 11a6cdfa3f5d459c8e385db113842f5b
const clientSecret = 98e6751f76884378a82f3004e40d1a38
const authHeader = 'Basic ' + btoa(clientId + ':' + clientSecret);

async function getAccessToken() {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'grant_type': 'client_credentials'
            })
        });

        if (!response.ok) {
            throw new Error('Ошибка получения токена доступа');
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось получить токен доступа');
    }
}

async function fetchTrack(trackId) {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка получения информации о треке');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось получить информацию о треке');
    }
}

document.getElementById('fetchTrackButton').addEventListener('click', async () => {
    const trackId = '3n3Ppam7vgaVa1iaRUc9Lp'; // Пример ID трека
    const trackInfo = await fetchTrack(trackId);

    if (trackInfo) {
        document.getElementById('trackInfo').innerHTML = `
            <p><strong>Название:</strong> ${trackInfo.name}</p>
            <p><strong>Исполнитель:</strong> ${trackInfo.artists.map(artist => artist.name).join(', ')}</p>
            <p><strong>Альбом:</strong> ${trackInfo.album.name}</p>
            <img src="${trackInfo.album.images[0].url}" alt="${trackInfo.name}" style="width: 100px; height: 100px;">
        `;
    }
});
