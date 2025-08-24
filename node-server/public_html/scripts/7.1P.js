const processBtn = document.getElementById("processBtn");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

const input = document.getElementById("inputText");
const resultWrapper = document.getElementById("resultWrapper")
const alert = document.getElementById("alert")


resetBtn.addEventListener('click', function () {
    input.value = '';
    resultWrapper.innerHTML = ''
    alert.innerHTML = ''
})

processBtn.addEventListener('click', function () {
    let text = input.value;
    let charCount = 0;
    let wordCount = 0;
    let upperCount = 0;
    let lowerCount = 0;
    let sentenceCount = 0;
    let word = "";
    alert.innerHTML = ""

    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i);
        if (text[i] !== " ") {
            charCount++;
        }
        if (code >= 65 && code <= 90) {
            upperCount++;
        }
        if (code >= 97 && code <= 122) {
            lowerCount++;
        }
        if (text[i] != " ") {
            word += text[i];
        } else if (word.length > 0) {
            wordCount++;
            word = "";
        }
        // ".":46 -  "?":63 - "!":33
        if (code == 46 || code == 63 || code == 33) {
            sentenceCount++;
        }
    }
    // count last word if without space
    if (word.length > 0) {
        wordCount++;
    }

    let result = `
      <ol>
            <li>Total number of characters: ${charCount}, words: ${wordCount}</li>
            <li>Total number of Uppercase: ${upperCount}, lowercase: ${lowerCount}</li>
            <li>Number of sentences: ${sentenceCount}</li>
        </ol>
    `
    resultWrapper.innerHTML = result;
})
searchBtn.addEventListener('click', function () {

    let originalText = input.value;
    resultWrapper.innerHTML = ''
    alert.innerHTML = ''

    // alert for no text input inside textarea
    if (originalText == "") {
        alert.innerHTML = "No text found"
        return;
    }

    let searchInput;
    // only accept a string with more than 5 chars
    //do {
    // searchInput = window.prompt("Enter what you want to search (at least 5 characters)")
    // } while (searchInput.length < 5)
    searchInput = window.prompt("Enter what you want to search (at least 5 characters)")
    if (searchInput.length == 0) {
        alert.innerHTML = "Please enter search string"
        return;
    }
    const matchesArray = Array.from(originalText.matchAll(searchInput));

    // create new element has text with search results highlighted
    const matchesElement = document.createElement("p");
    matchesElement.innerHTML = originalText.replaceAll(
        searchInput, `<mark>${searchInput}</mark>`);

    // create new element show number of seach result founds
    const numberOfMatches = document.createElement("p");
    numberOfMatches.innerHTML = `Found ${matchesArray.length} times`

    resultWrapper.appendChild(matchesElement)
    resultWrapper.appendChild(numberOfMatches)


})
