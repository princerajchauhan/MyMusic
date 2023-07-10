
// initializing the variables
let songIndex = 0
let audioElement = new Audio('./songs/Ram Siya Ram.mp3')
let masterPlay = document.getElementById('masterPlay')
let myProgress = document.getElementById('myProgress')
let songItems = Array.from(document.getElementsByClassName('songItem'))
let masterSongNAme = document.getElementById('masterSongNAme')

let masterDuration = document.getElementById('masterDuration')

let songs = [
    { songName: "Ram Siya Ram", songPath: "songs/Ram Siya Ram.mp3", coverPath: "cover/ram siya ram.jpg" },
    { songName: "Apna Bana Le Bhediya", songPath: "songs/Apna Bana Le Bhediya.mp3", coverPath: "cover/apna bana le cover.jpg" },
    { songName: "Kali Kali Zulfon", songPath: "songs/Kali Kali Zulfon.mp3", coverPath: "cover/kali kali.jpg" },
    { songName: "Shiv Tandav Stotram", songPath: "songs/Shiv Tandav Stotram.mp3", coverPath: "cover/shiv tandav.jpg" },
    { songName: "Shri Krishna Govind", songPath: "songs/Shri Krishna Govind Hare Murari.mp3", coverPath: "cover/Shri-Krishna.jpg" },
    { songName: "Kahani Suno", songPath: "songs/Kahani Suno.mp3", coverPath: "cover/kahani suno.jpg" }
]

// audioElement.play()

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName
})

const songDuration = (audio) => {
    let min = parseInt(audio.duration/60)
    let sec = parseInt(audio.duration%60)
    min = min<10?'0'+min:min
    sec = sec<10?'0'+sec:sec
    masterDuration.innerText = `${min}:${sec}`
    console.log(audio)
}

// Play/pause event

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play()
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        document.getElementById('gif').style.opacity = "1"
    }
    else {
        audioElement.pause()
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        document.getElementById('gif').style.opacity = "0"
        makeAllPlays()
    }
    // songDuration()
    songDuration(audioElement)
})


// audio duration
audioElement.addEventListener('timeupdate', () => {
    // progress bar update
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgress.value = progress
})

myProgress.addEventListener('change', () => {
    audioElement.currentTime = myProgress.value * audioElement.duration / 100
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = e.target.closest('.duration').previousElementSibling.innerText  // targeting the songName

        if (e.target.classList.contains('fa-pause-circle')) {
            e.target.classList.remove('fa-pause-circle')
            e.target.classList.add('fa-play-circle')
            audioElement.pause()
            masterPlay.classList.remove('fa-circle-pause')
            masterPlay.classList.add('fa-circle-play')
            document.getElementById('gif').style.opacity = "0"
        }
        else {
            makeAllPlays()
            e.target.classList.remove('fa-play-circle')
            e.target.classList.add('fa-pause-circle')
            audioElement.src = `songs/${index}.mp3`
            // songDuration(audioElement.duration)
            audioElement.currentTime = 0
            audioElement.play()
            document.getElementById('gif').style.opacity = "1"
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
        }
        masterSongNAme.innerText = index
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 5) {
        songIndex = 0
    }
    else {
        songIndex += 1
    }
    audioElement.src = `songs/${songs[songIndex].songName}.mp3`
    console.log(audioElement)
    audioElement.currentTime = 0
    audioElement.play()
    masterSongNAme.innerText = songs[songIndex].songName
    document.getElementById('gif').style.opacity = "1"
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    songDuration(audioElement)
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 5
    }
    else {
        songIndex -= 1
    }
    audioElement.src = `songs/${songs[songIndex].songName}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    masterSongNAme.innerText = songs[songIndex].songName
    document.getElementById('gif').style.opacity = "1"
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    songDuration(audioElement)
})