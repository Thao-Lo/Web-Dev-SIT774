const processBtn = document.getElementById("processBtn");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

const input = document.getElementById("inputText");
const resultWrapper = document.getElementById("resultWrapper")
const capchaWrapper = document.getElementById("capchaWrapper")  // 7.2C

const alert = document.getElementById("alert")

// --- RESET BUTTON ---
resetBtn.addEventListener('click', function () {
    input.value = '';
    resultWrapper.innerHTML = ''
    alert.innerHTML = ''
})

// --- PROCESS BUTTON ---
processBtn.addEventListener('click', function () {
    processBtn.disabled = true;     // 7.2C
    capchaWrapper.hidden = false;   // 7.2C
    displayCaptchaCode()            // 7.2C - get freash captcha code

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

// --- SEARCH BUTTON ---
searchBtn.addEventListener('click', function () {
    searchBtn.disabled = true;    // 7.2C
    capchaWrapper.hidden = false; // 7.2C  - can also use d-none inside classname
    displayCaptchaCode()          // 7.2C  - get freash captcha code


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

//7.2C
const refreshBtn = document.getElementById("refreshBtn");
const verifyBtn = document.getElementById("verifyBtn");
const randomCode = document.getElementById("randomCode");
const inputCaptchaCode = document.getElementById("inputCaptchaCode");
const codeAlert = document.getElementById("codeAlert");

const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; //62

// --- REFRESH BUTTON ---
refreshBtn.addEventListener('click', function () { // generate new captcha code each time button clicked
    displayCaptchaCode()
});

// --- VERIFY BUTTON ---
verifyBtn.addEventListener('click', function () {
    let captchaCode = randomCode.innerHTML;
    codeAlert.innerHTML = ""

    let validateCode = inputCaptchaCode.value;
    if (validateCode.trim(" ") === captchaCode.trim(" ")) { //validate code
        searchBtn.disabled = false;
        processBtn.disabled = false;
        capchaWrapper.hidden = true;
        inputCaptchaCode.value = ""
    } else {
        codeAlert.innerHTML = "Code not match! try again"
        inputCaptchaCode.value = ""
    }
})

function displayCaptchaCode() {
    let captchaCode = generateCaptcha(5, alphanumericChars); // Captcha Code: 5 letters & pattern 
    randomCode.innerHTML = ''
    randomCode.innerHTML = captchaCode;
}

function generateCaptcha(length, characters) {
    let captcha = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * charactersLength)); // 0 - 61
    }
    return captcha;
}
