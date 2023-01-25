import { catsData } from "./data.js"

const emotionRadiosDiv = document.getElementById("emotion-radios")

// return emotions from array of data
function getEmotionsArray(cats){
    const emotionsArray = []

    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            emotionsArray.push(emotion)
        }
    }

    return emotionsArray
}

// render emotions in emotionRadiosDiv
function renderEmotionsRadios(cats) {
    const emotions = getEmotionsArray(cats)
    let radioItems = ``

    for (let emotion of emotions) {
        radioItems += `<p>${emotion}</p>`
    }

    emotionRadiosDiv.innerHTML = radioItems
}

renderEmotionsRadios(catsData)

