const theme = {
    mainColor: "#d7ebba",
    backgroundColor: "#9ad2cb",
    cardColor: "#eaeaea",
    balooColor: "#3f3f3f"
}

const normalize = (value: number, range: number) => ((value - (range / 2)) / (range / 2))

export { theme, normalize }
