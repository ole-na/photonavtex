export const removeSpacesOnLineStart = (text) => {
    console.log("FINAL", escape(text))
    let escapedText = escape(text.toString().trim())
    const textWithoutSpacesAfterBreaks = escapedText.replaceAll("%0A%20", "%0A")
    return unescape(textWithoutSpacesAfterBreaks)
}

// Some lines have "%0A%0A" on the end and another "%0A", but all lines should have "%0A%20" on the end
export const unifyBreaksAfterLines = (textValue) => {
    let escapedText = escape(textValue.toString().trim())
    const textWithoutDoubledBreaks = escapedText.toString().replaceAll("%0A%0A", "[DUMMY]")
    console.log("with dummy", textWithoutDoubledBreaks)
    const textWithReplacedSingleBreaks = textWithoutDoubledBreaks.replaceAll("%0A", "%0A%20")
    console.log("remove einzeln breaks ", textWithReplacedSingleBreaks)
    const textWithCorrectBreaks = textWithReplacedSingleBreaks.replaceAll("[DUMMY]", "%0A%20")
    console.log("replace dummy", textWithCorrectBreaks)
    const text = unescape(textWithCorrectBreaks)
    console.log("unescaped text:", text)
    return text
}

// Tesseract can't recognize "ZCZC" and "NNNN" and changes it to another words
export const removeFirstAndLastWrongWordsAndReturnText = (text) => {
    let tmpText = text
    const words = tmpText.split(' ')
    words.shift()
    words.pop()
    if(words[words.length-1] === "[")  {
        words.pop()
    }
    const newWords = words.join(' ').trim().split(' ')
    console.log("Words:", newWords)
    return newWords.join(' ')
}