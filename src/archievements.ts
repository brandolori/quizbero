const archievementData = [
    {
        name: "Raggiungi il livello 2!",
        id: "lvl2"
    },
    {
        name: "Raggiungi il livello 3!",
        id: "lvl3"
    },
    {
        name: "Riscatta un codice bonus!",
        id: "bonuscode"
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