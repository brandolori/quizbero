const archievementData = [
    {
        name: "Raggiungi il livello 2",
        id: "0"
    },
]

let callback = (name: string) => { }

const readLocalStorage = () => JSON.parse(localStorage.getItem("archievements")) as string[] ?? []

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
        localStorage.setItem("archievements", JSON.stringify(unlocked))
        callback(archievementData.find(el => el.id == id).name)
    }

}

export { getArchievements, unlockArchievement, registerOrReplaceArchievementsListener }