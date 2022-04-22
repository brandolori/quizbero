import makeStyles from "../src/makeStyles"

const styles = makeStyles({
    card: {
        backgroundColor: "var(--maincolor)",
        width: "80%",
        height: 400,
        borderRadius: 40,
        padding: 40,
        boxShadow: "0 8px 8px -4px grey"
    }
})

export default () => <>
    <h1>Quercia Verde</h1>
    <div style={styles.card}>unibo ricicla il  30% della carta utilizzata</div>
    <h3>1 di 4</h3>
</>