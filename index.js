import { catsData } from "./data.js"

const emotionRadiosDiv = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")
const gifsOnlyCheckbox = document.getElementById("gifs-only-option")

emotionRadiosDiv.addEventListener("change", highlightCheckedOption)
getImageBtn.addEventListener("click", renderCat)

// RENDER EMOTIONS LIST & RADIO BUTTONS

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

// highlight emotion whose radio button is clicked
function highlightCheckedOption(e) {
    // remove highlight from all radio buttons
    const radioButtons = document.getElementsByClassName("radio")
    for (let radioButton of radioButtons) {
        radioButton.classList.remove("highlight")
    }

    // add highlight to selected radio button
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

// RENDER SELECTED CAT GIF

// return array of cats that fit selected mood and .gif selection
function getMatchingCatsArray() {
    // get emotion if one is selected
    if (document.querySelector("input[type='radio']:checked")) {
        const checkedEmotion = document.querySelector("input[type='radio']:checked").value
        const onlyGifs = gifsOnlyCheckbox.checked

        // filter cat for emotion and whether it's a .gif
        const matchingCatsArray = catsData.filter(function(cat) {
            if (onlyGifs) {
                return (cat.emotionTags.includes(checkedEmotion) && cat.isGif)
            } else {
                return cat.emotionTags.includes(checkedEmotion)
            }
        })

        return matchingCatsArray
    }
}

function getSingleCatObject() {
    console.log(getMatchingCatsArray())
}

function renderCat() {
    getSingleCatObject()
}

renderEmotionsRadios(catsData)