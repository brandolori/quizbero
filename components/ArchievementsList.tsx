import { getArchievements } from "../src/archievements";
import makeStyles from "../src/makeStyles";

const styles = makeStyles({
    archievement: {
        backgroundColor: "var(--cardcolor)",
        borderRadius: 20,
        padding: 30,
        border: "none",
        boxShadow: "0 8px 8px -4px grey",
        lineHeight: "1.5rem",
        display: "flex",
        fontWeight: "bold",
        width: "100%",
        margin: "10px 0px",
        alignItems: "center",
        textAlign: "start",
    }
})

const Archievement = ({ completed, desc }: { completed: boolean, desc: string }) => <div style={styles.archievement}>
    <img style={{ marginRight: 15 }} width={30} height={30} src={completed ? "/img/check.png" : "/img/cross.png"} alt="" />
    {desc}
</div>

const ArchievementsList = () => <>
    {getArchievements().map(el => <Archievement key={el.id} desc={el.name} completed={el.unlocked} />)}
</>

export default ArchievementsList