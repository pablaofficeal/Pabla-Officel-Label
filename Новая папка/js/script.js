document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const coverUploadContainer = document.getElementById('coverUploadContainer');
    const coverRulesModal = document.getElementById('coverRulesModal');
    const closeModal = document.querySelector('.close');
    const confirmUploadButton = document.getElementById('confirmUpload');
    const addTrackButton = document.getElementById('addTrack');
    const tracksContainer = document.getElementById('tracksContainer');
    let coverFile;

    if (uploadForm) {
        uploadForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const artist = document.getElementById('artist').value;
            const producer = document.getElementById('producer').value;
            const beatmaker = document.getElementById('beatmaker').value;
            const lyricist = document.getElementById('lyricist').value;
            const title = document.getElementById('title').value;
            const genre = document.getElementById('genre').value;
            const file = document.getElementById('file').files[0];
            const releaseDate = document.getElementById('releaseDate').value;
            const explicitContent = document.querySelector('input[name="explicitContent"]:checked').value;
            const type = document.getElementById('type').value;

            if (file && coverFile) {
                const tracks = [];
                const trackElements = document.querySelectorAll('.track');
                trackElements.forEach((trackElement, index) => {
                    const trackFile = trackElement.querySelector(`input[name="trackFile${index + 1}"]`).files[0];
                    const trackTitle = trackElement.querySelector(`input[name="trackTitle${index + 1}"]`).value;
                    const trackExcerpt = trackElement.querySelector(`input[name="trackExcerpt${index + 1}"]`).value;

                    if (trackFile) {
                        tracks.push({
                            fileName: trackFile.name,
                            title: trackTitle,
                            excerpt: trackExcerpt,
                        });
                    }
                });

                const release = {
                    artist: artist,
                    producer: producer,
                    beatmaker: beatmaker,
                    lyricist: lyricist,
                    title: title,
                    genre: genre,
                    fileName: file.name,
                    coverName: coverFile.name,
                    releaseDate: releaseDate,
                    explicitContent: explicitContent,
                    type: type,
                    tracks: tracks,
                };

                let releases = JSON.parse(localStorage.getItem('releases')) || [];
                releases.push(release);
                localStorage.setItem('releases', JSON.stringify(releases));

                document.getElementById('uploadStatus').textContent = `Релиз "${title}" успешно загружен и отправлен на модерацию.`;

                uploadForm.reset();
                coverUploadContainer.innerHTML = `<div id="coverPlaceholder"><p>Нажмите здесь, чтобы загрузить обложку</p></div>`;
                tracksContainer.innerHTML = '';
            }
        });
    }

    if (coverUploadContainer) {
        coverUploadContainer.addEventListener('click', function() {
            coverRulesModal.style.display = 'block';
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            coverRulesModal.style.display = 'none';
        });
    }

    if (confirmUploadButton) {
        confirmUploadButton.addEventListener('click', function() {
            const coverInput = document.getElementById('cover');
            coverFile = coverInput.files[0];

            if (coverFile) {
                const img = new Image();
                img.onload = function() {
                    if (img.width >= 3000 && img.height >= 3000) {
                        coverUploadContainer.innerHTML = `<p>Обложка выбрана: ${coverFile.name}</p>`;
                        coverRulesModal.style.display = 'none';
                    } else {
                        alert('Обложка должна быть минимум 3000x3000 пикселей.');
                    }
                };
                img.src = URL.createObjectURL(coverFile);
            }
        });
    }

    if (addTrackButton) {
        addTrackButton.addEventListener('click', function() {
            const trackCount = tracksContainer.querySelectorAll('.track').length + 1;
            const newTrack = document.createElement('div');
            newTrack.className = 'track';
            newTrack.innerHTML = `
                <h3>Трек ${trackCount}</h3>
                <label for="trackFile${trackCount}">Загрузить трек:</label><br>
                <input type="file" id="trackFile${trackCount}" name="trackFile${trackCount}" accept="audio/*"><br><br>
                <label for="trackTitle${trackCount}">Название трека:</label><br>
                <input type="text" id="trackTitle${trackCount}" name="trackTitle${trackCount}"><br><br>
                <label for="trackExcerpt${trackCount}">Выберите отрывок для TikTok (в секундах):</label><br>
                <input type="number" id="trackExcerpt${trackCount}" name="trackExcerpt${trackCount}" min="0"><br><br>
                <button type="button" onclick="removeTrack(this)">Удалить трек</button>
            `;
            tracksContainer.appendChild(newTrack);
        });
    }

    window.removeTrack = function(button) {
        const track = button.parentElement;
        tracksContainer.removeChild(track);
    };
});
