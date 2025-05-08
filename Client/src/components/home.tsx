import { useContext } from "react";
import { context } from "./user-context";

const Home = () => {
    const { user, connected } = useContext(context);

    return <>
        <p> Welcome {connected ? <>{user.UserName}</> : <></>} !</p>
        <p>Recipedia is an encyclopedia of recipes.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adip
            isicing elit. Maiores iusto ipsa, laudantium molestiae, placeat veli
            t explicabo sapiente sequi rerum numquam, quaerat iste veniam natus
            ipsum magnam consectetur amet modi! Iure!
        </p>
    </>
}
export default Home;