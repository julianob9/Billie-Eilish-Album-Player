const songsList = [
    {
        name: "SKINNY",
        artist: "Billie Eilish",
        src: "songs/01-SKINNY.mp3",
        cover: "portadas/01-Skinny.png",
    },
    {
        name: "LUNCH",
        artist: "Billie Eilish",
        src: "songs/02 - LUNCH.mp3",
        cover: "portadas/02-Lunch.png",
    },
    {
        name: "CHIHIRO",
        artist: "Billie Eilish",
        src: "songs/03 - CHIHIRO .mp3",
        cover: "portadas/03-Chihiro.png",
    },
    {
        name: "BIRDS OF A FEATHER",
        artist: "Billie Eilish",
        src: "songs/04 - BIRDS OF A FEATHER .mp3",
        cover: "portadas/04-Birdsofafeather.png",
    },
    {
        name: "WILDFLOWER",
        artist: "Billie Eilish",
        src: "songs/05 - WILDFLOWER.mp3",
        cover: "portadas/05-wildflower.png",
    },
    {
        name: "THE GREATEST",
        artist: "Billie Eilish",
        src: "songs/06 - THE GREATEST.mp3",
        cover: "portadas/06-thegreatest.png",
    },
    {
        name: "L'AMOUR DE MA VIE",
        artist: "Billie Eilish",
        src: "songs/07 - L’AMOUR DE MA VIE.mp3",
        cover: "portadas/07-lamourdemavie.png",
    },
    {
        name: "THE DINNER",
        artist: "Billie Eilish",
        src: "songs/08 - THE DINER.mp3",
        cover: "portadas/08-thediner.png",
    },
    {
        name: "BITTERSUITE",
        artist: "Billie Eilish",
        src: "songs/09 - BITTERSUITE .mp3",
        cover: "portadas/09-Bittersuite.png",
    },
    {
        name: "BLUE",
        artist: "Billie Eilish",
        src: "songs/10 - BLUE .mp3",
        cover: "portadas/10-Blue.png",
    },
]

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener ('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate' , updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(index){
    const {name, artist, src, cover: thumb} = songsList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb}`;
}

function updateProgress(){
    if (song.duration){
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;
    }
}

function formatTime(seconds){
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause(){
    if(playing){
        song.pause();
    }else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toogle('fa-pause', playing);
    playBtn.classList.toogle('fa-play', !playing);
    cover.classList.toogle('active', playing);
}

function nextSong(){
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
}

function prevSong(){
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
}

function playMusic(){
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e){
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}

