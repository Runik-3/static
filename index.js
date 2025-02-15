const type = new Typewriter("#wiki-input", { loop: true, delay: 40, cursor: "" })
type.typeString('https://lotr.fandom.com').pauseFor(3000).deleteAll(1).start()

const convertText = document.getElementById('convert-text')
function handleConvertSectionText() {
  scrambleProgram()
  // keep it running
  setInterval(() => scrambleProgram(), 17000)
}
handleConvertSectionText()

function scrambleProgram() {
  const json = `{
  "Word": "Smaug",
  "Definition": "Smaug was a fire-drake of the Third Age, considered the last "great" dragon of Middle-earth. He was drawn to the enormous wealth amassed by the Dwarves of the Lonely Mountain during King Thrór's reign."
}`
  const df = `@Smaug
Smaug was a fire-drake of the Third Age, considered the last "great" dragon of Middle-earth. He was drawn to the enormous wealth amassed by the Dwarves of the Lonely Mountain during King Thrór's reign.`
  const dictzip = `<w>
  <p><a name="Smaug" /><b>Smaug</b></p>
    <p>Smaug was a fire-drake of the Third Age, considered the last "great" dragon of Middle-earth. He was drawn to the enormous wealth amassed by the Dwarves of the Lonely Mountain during King Thrór's reign.</p>
</w>`

  // starting string
  convertText.innerText = json
  scramble(convertText,
    json,
    df,
    2000, 500)
  scramble(convertText,
    df,
    dictzip,
    8000, 500)
  scramble(convertText,
    dictzip,
    json,
    14000, 500)
}

function scramble(el, originalText, finalText, delay, scrambleTime) {
  setTimeout(() => {
    let scrambleText = originalText
    el.innerText = originalText
    const intervalId = setInterval(() => {
      const randIdx = getRandomNumber(0, originalText.length)
      const char = ascii()
      scrambleText = scrambleText.replace(scrambleText.charAt(randIdx), char)
      el.innerText = scrambleText
    }, 0)


    setTimeout(() => {
      clearInterval(intervalId)
      unscramble(el, scrambleText, finalText)
    }, scrambleTime)
  }, delay)
}

function unscramble(el, scrambleText, finalText) {
  const longestString = scrambleText.length > finalText.length ? scrambleText : finalText
  const textArr = scrambleText.split("")
  let idxs = []
  for (let i = 0; i < longestString.length; i++) {
    idxs.push(i)
  }

  const id = setInterval(() => {
    if (idxs.length == 0) {
      clearInterval(id)
      return
    }
    let randIdx = getRandomNumber(0, textArr.length, idxs)

    textArr[randIdx] = finalText[randIdx]
    el.innerText = textArr.join("")
  }, 0)
}

// List -- provide a list of possible indexes and choose randomly from those
function getRandomNumber(min = 0, max = 100, list = []) {
  if (list.length == 0) {
    return Math.floor(Math.random() * (max - min) + min)
  }
  const listIdx = Math.floor(Math.random() * list.length)
  const charIdx = list[listIdx]
  list.splice(listIdx, 1)


  return charIdx
}

// Get a random ascii character
function ascii() {
  // min and max ascii codes
  const min = 32
  const max = 127

  const randChar = getRandomNumber(min, max)

  return String.fromCharCode(randChar)
}
