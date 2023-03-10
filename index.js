import { catsData } from "./data.js"

const emotionRadiosDiv = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")
const gifsOnlyCheckbox = document.getElementById("gifs-only-option")
const memeModal = document.getElementById("meme-modal")
const memeModalInner = document.getElementById("meme-modal-inner")
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn")

emotionRadiosDiv.addEventListener("change", highlightCheckedOption)
getImageBtn.addEventListener("click", renderCat)
memeModalCloseBtn.addEventListener("click", closeModal)

// ⬇️ RENDER EMOTIONS LIST & RADIO BUTTONS ⬇️

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

// ⬇️ RENDER SELECTED CAT IMAGE ⬇️

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

// return a single cat to be rendered (if > 1 cat, randomly choose one)
function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()

    if (catsArray.length === 1) {
        return catsArray[0]
    } else {
        let randomCat = catsArray[Math.floor(Math.random() * catsArray.length)]
        return randomCat
    }
}

function renderCat() {
    const catObject = getSingleCatObject()

    memeModalInner.innerHTML = `
        <img 
            class="cat-img" 
            src="./images/${catObject.image}"
            alt="${catObject.alt}"
        >
    `

    memeModal.style.display = "flex"
}

function closeModal() {
    memeModal.style.display = "none"
}

renderEmotionsRadios(catsData)