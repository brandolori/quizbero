import fpjs from "@fingerprintjs/fingerprintjs"

const alphabet = 'abcdef'.split('');

const bonusCodes = ["ae3a7694", "8bbad384", "8a366fad", "0ee2ff14", "197048d1", "bac3938d"]

// returns one of the 6 codes above, making sure that they are distributed evenly
// using a fingerprinting library
const generateBonusCode = async () => {
    const library = await fpjs.load()
    const fingerprint = (await library.get()).visitorId.toLowerCase().split("")
    const firstLetter = fingerprint.filter(el => alphabet.includes(el))[0] ?? "a"
    return bonusCodes[alphabet.indexOf(firstLetter)]
}

const localStorageKey = "bonuscode"

const getBonusCode = async () => {
    let code = localStorage.getItem(localStorageKey)
    if (!code) {
        code = await generateBonusCode()
        localStorage.setItem(localStorageKey, code)
    }

    return code
}

export default getBonusCode

export { bonusCodes }