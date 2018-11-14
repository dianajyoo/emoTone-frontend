const INPUT_URL = "http://localhost:3000/text_inputs"
const figcaption = document.querySelectorAll('figcaption')
let text

document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('submit', (event) => {
    event.preventDefault()
    text = event.target[0].value

    // debugger
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
        // debugger
        for (let i = 0; i < 8; i++){
          if (figcaption[i].innerHTML !== "") {
            json.forEach(inputObject => {
              for (let i = 0; i < 8; i++) {
                figcaption[i].innerHTML = ""
              }
            })
          }
        }

        json.forEach(inputObject => {
          if (inputObject.text === text) {
            for (let i = 0; i < 8; i++) {
              if (figcaption[i].id === inputObject.tone) {
                figcaption[i].innerHTML += `${inputObject.tone} ${inputObject.score}%`
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
