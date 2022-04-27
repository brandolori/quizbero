type Archievement = {
    name: string,
    id: string,
    hidden?: boolean
}

const archievementData = [
    {
        name: "Completa il tuo primo quiz!",
        id: "firstquiz"
    },
    {
        name: "Raggiungi il livello 3!",
        id: "lvl3"
    },
    {
        name: "Raggiungi il livello 5!",
        id: "lvl5"
    },
    {
        name: "Raggiungi il livello 10!",
        id: "lvl10"
    },
    {
        name: "Riscatta un codice bonus!",
        id: "bonuscode"
    },
    {
        name: "Copia il tuo codice bonus",
        id: "copybonuscode"
    },
    {
        name: "Condividi la tua vittoria su un quiz!",
        id: "sharewin"
    },
    {
        name: "Condividi la tua sconfitta su un quiz!",
        id: "shareloss",
        hidden: true
    },
    {
        name: "Copia il tuo codice bonus",
        id: "bonuscode"
    },
    {
        name: "Completa un quiz per un pelo!",
        id: "almost",
        hidden: true
    },
    {
        name: "Supera un quiz senza commettere errori!",
        id: "noerrors"
    },
    {
        name: "Sbaglia tutte le domande di un quiz",
        id: "allerrors",
        hidden: true
    },
    {
        name: "Completa tutti e 6 i quiz bonus!",
        id: "allbonuscodes"
    },
    {
        name: "Completa un quiz in meno di 5 secondi!",
        id: "sonic",
        hidden: true
    },
    {
        name: "Trova l'easter egg dello sviluppatore",
        id: "easteregg",
        hidden: true
    },

]

const localStorageKey = "archievements"

let callback = (name: string) => { }

const readLocalStorage = () => JSON.parse(localStorage.getItem(localStorageKey)) as string[] ?? []

const getArchievements = () => {
    const unlocked = readLocalStorage()

    return archievementData.map(el => ({ ...el, unlocked: unlocked.includes(el.id) }))
}

const registerOrReplaceArchievementsListener = (cb: (name: string) => void) => {
    callback = cb
}

const unlockArchievement = (id: string) => {
    const unlocked = readLocalStorage()
    if (!unlocked.includes(id)) {

        unlocked.push(id)
        localStorage.setItem(localStorageKey, JSON.stringify(unlocked))
        callback(archievementData.find(el => el.id == id).name)
    }

}

export { getArchievements, unlockArchievement, registerOrReplaceArchievementsListener }