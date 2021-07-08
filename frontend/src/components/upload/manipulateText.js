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
    const textWithReplacedSingleBreaks = textWithoutDoubledBreaks.replaceAll("%0A", "%0A%20")
    const textWithCorrectBreaks = textWithReplacedSingleBreaks.replaceAll("[DUMMY]", "%0A%20")
    const text = unescape(textWithCorrectBreaks)
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

function convertDMSToDD(degrees, minutes, seconds, direction) {
    let dd = Number(degrees) + Number(minutes)/60 + Number(seconds)/(60*60);

    if (direction === "S" || direction === "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
}


export const splitCoordsStringToParts = (stringValue) => {
    // possible values: 51-55N, 003-40E, 003-40.55S, 45-34W, 009-43S
    const parts = stringValue.replace(",", ".").split(/[-]+/)
    console.log("Parts", parts)
    const degree = Number(parts[0])
    const minutesSecondsDirection = parts[1]
    let minutes, seconds, direction
    console.log('hier')
    if(minutesSecondsDirection.includes(".") || minutesSecondsDirection.includes(",")) {
        const parts2 = minutesSecondsDirection.split(/[.,]+/)
        minutes = parts2[0]
        let secondsDirection = parts2[1]
        direction = secondsDirection.substr(secondsDirection.length-1)
        seconds = Number(secondsDirection.replace(direction, ""))
    } else {
        direction = minutesSecondsDirection.substr(minutesSecondsDirection.length-1)
        minutes = Number(minutesSecondsDirection.replace(direction, ""))
        seconds = ""
    }
    console.log("Degree: " + degree + " Minutes: " + minutes + " Seconds: " + seconds + "Direction: " + direction)
    const convertDms2Decimal = convertDMSToDD(degree, minutes, seconds, direction);
    console.log("Decimal: " + convertDms2Decimal);

    return convertDms2Decimal
}
