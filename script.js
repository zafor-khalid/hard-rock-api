const showSongList = (data) => {
    data.data.forEach(song => {
        const eachSong = song.title;
        const artist = song.artist.name;
        const songPreview = song.preview;
        const li = document.createElement('li');
        const songList = document.getElementById('songList');
        li.innerHTML = `
        <div class="search-result col-md mx-auto py-4">
        <div class="single-result row align-items-center my-3 p-3">
         <div class="col-md">
            <audio controls>
                <source src="${songPreview}">
             </audio>
         </div>
        <div class="col-md">
            <h3 class="lyrics-name">${eachSong}</h3>
            <p class="author lead">Album by <span>${artist}</span></p>
        </div>
       
        <div class="col-md text-md-right text-center">
            <button onclick="getLyrics('${artist}', '${eachSong}')" class="btn btn-success">Get Lyrics</button>
        </div>
        </div>
    </div>`
        songList.appendChild(li);
    });
}

const searchSong = () => {
    document.getElementById('songList').innerHTML = null;
    document.getElementById('displayLyrics').innerHTML = null;
    const searchName = document.getElementById('songName');
    const songUrl = `https://api.lyrics.ovh/suggest/${searchName.value}`;
    fetch(songUrl)
    .then(res => res.json())
    .then(data => {
        showSongList(data);
    })
    .catch(error => alert('NOT FOUND! TRY ANOTHER'));
}

const getLyrics = (artist, title) => {
    const lyricsUrl = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(lyricsUrl)
    .then(res => res.json())
    .then(data => {
        const displayLyrics = document.getElementById('displayLyrics');
        displayLyrics.innerText = data.lyrics;
    })
    .catch(err => alert('Sorry! Try Another!'));
}