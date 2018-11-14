const INPUT_URL = "http://localhost:3000/text_inputs"
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

      // for (let i = 0; i < json['document_tone']['tones'].length; i++) {
      //   console.log(json['document_tone']['tones'][i])
      // }
      fetch(INPUT_URL)
      .then(res => res.json())
      .then(console.log)
    })
  })

})
