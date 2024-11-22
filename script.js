// Search term and function to fetch data
let term = '';

const updateTerm = () => {
    term = document.getElementById('searchTerm').value.trim();

    if (!term) {
        alert('Please enter a search term');
    } else {
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&limit=15`;
        const songContainer = document.getElementById('songs');

        // Clear previous results
        songContainer.innerHTML = '<h2 class="placeholder">Searching...</h2>';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!data.results.length) {
                    songContainer.innerHTML = '<h2 class="placeholder">No results found. Try a different search.</h2>';
                    return;
                }

                songContainer.innerHTML = ''; // Clear placeholder
                data.results.forEach(result => {
                    const article = document.createElement('article');
                    const img = document.createElement('img');
                    const artist = document.createElement('p');
                    const song = document.createElement('h4');
                    const audio = document.createElement('audio');
                    const audioSource = document.createElement('source');

                    img.src = result.artworkUrl100;
                    artist.innerText = result.artistName;
                    song.innerText = result.trackName;
                    audio.controls = true;
                    audioSource.src = result.previewUrl;
                    audioSource.type = 'audio/mpeg';

                    audio.appendChild(audioSource);
                    article.appendChild(img);
                    article.appendChild(artist);
                    article.appendChild(song);
                    article.appendChild(audio);

                    songContainer.appendChild(article);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                songContainer.innerHTML = '<h2 class="placeholder">Something went wrong. Please try again later.</h2>';
            });
    }
};

// Add event listener for the search button
document.getElementById('searchTermBtn').addEventListener('click', updateTerm);

// Pause other songs when a new song starts playing
document.addEventListener('play', event => {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        if (audio !== event.target) {
            audio.pause();
        }
    });
}, true);

data.results.forEach(result => {
    const article = document.createElement('article');
    const img = document.createElement('img');
    const artist = document.createElement('p');
    const song = document.createElement('h4');
    const audio = document.createElement('audio');
    const audioSource = document.createElement('source');

    img.src = result.artworkUrl100 || 'default-image.jpg'; // Use a default image if none exists
    artist.innerText = result.artistName || 'Unknown Artist';
    song.innerText = result.trackName || 'Unknown Title';
    audio.controls = true;

    // Ensure previewUrl exists and is valid
    if (result.previewUrl) {
        audioSource.src = result.previewUrl;
        audioSource.type = 'audio/mpeg';
    } else {
        const errorText = document.createElement('p');
        errorText.innerText = 'Preview not available';
        errorText.style.color = 'red';
        article.appendChild(errorText);
    }

    audio.appendChild(audioSource);
    article.appendChild(img);
    article.appendChild(artist);
    article.appendChild(song);
    article.appendChild(audio);

    songContainer.appendChild(article);
});
