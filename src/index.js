const INPUT_URL = "http://localhost:3000/text_inputs"

const figcaption = document.querySelectorAll('figcaption')
var inputDisplayContent = document.querySelector('.input-group')
var emojiDisplayContent = document.querySelector('.row')
const recButton = document.querySelector('#rec')
var inputField = document.querySelector('input')
let text

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

const recognition = new SpeechRecognition();

let container = document.querySelector('.input');
const sound = document.querySelector('.sound');

recButton.addEventListener('click', () => {
  sound.play();
  dictate();
});

const dictate = () => {
  recognition.start();
  recognition.onresult = (event) => {
    // this is the transcript
    var speechToText = event.results[0][0].transcript;

    inputField.value = speechToText
  }
}

document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      inputDisplayContent.style.display = 'block'
      emojiDisplayContent.style.display = 'block'

      // automatically scrolls down to view emoticons after clicking btn
      emojiDisplayContent.scrollIntoView()
    }
  })

  document.addEventListener('submit', (event) => {
    event.preventDefault()

    text = event.target[0].value

    fetch(INPUT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        text: text
      })
    })
    .then(res => res.json())
    .then( json => {

      fetch(INPUT_URL)
      .then(res => res.json())
      .then(json => {
        console.log(json)

        // clear figcaption content after new form is submitted
        for (let i = 0; i < 8; i++) {
          if (figcaption[i].innerHTML !== "") {
            json.forEach(inputObject => {
              for (let i = 0; i < 8; i++) {
                figcaption[i].innerHTML = ""
              }
            })
          }
        }

        // add tone score based on input text
        json.forEach(inputObject => {
          if (inputObject.text === text) {
            for (let i = 0; i < 8; i++) {
              if (figcaption[i].id === inputObject.tone) {
                figcaption[i].innerHTML = `${inputObject.tone} ${inputObject.score}%`
              }
            }
          }
        })

        // reset the form field
        // event.target.reset()

      })
    })
  })

})
