import { useContext } from "react";
import { context } from "./user-context";

const Home = () => {
    const { user, connected } = useContext(context);
    
    return <>
        Welcome {connected ? <p>{user.UserName}</p> : <></>} !
    </>
}
export default Home;