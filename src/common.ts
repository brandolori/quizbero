const theme = {
    mainColor: "#d7ebba",
    backgroundColor: "#9ad2cb",
    extraColor: "#eaeaea"
}

const normalize = (value: number, range: number) => ((value - (range / 2)) / (range / 2))

export { theme, normalize }
