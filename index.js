import { catsData } from "./data.js"

const emotionRadiosDiv = document.getElementById("emotion-radios")

// return emotions from array of data
function getEmotionsArray(cats){
    const emotionsArray = []

    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }

    return emotionsArray
}

// render emotions in emotionRadiosDiv
function renderEmotionsRadios(cats) {
    const emotions = getEmotionsArray(cats)
    let radioItems = ``

    for (let emotion of emotions) {
        radioItems += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input 
                    type="radio"
                    id="${emotion}"
                    value="${emotion}"
                    name="emotions"
                >
            </div>
        `
    }

    emotionRadiosDiv.innerHTML = radioItems
}

emotionRadiosDiv.addEventListener("change", highlightCheckedOption)

function highlightCheckedOption(e) {
    // remove highlight from all radio buttons
    const radioButtons = document.getElementsByClassName("radio")
    for (let radioButton of radioButtons) {
        radioButton.classList.remove("highlight")
    }

    // add highlight to selected radio button
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

renderEmotionsRadios(catsData)

