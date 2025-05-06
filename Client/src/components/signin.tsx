import axios from "axios";
import { useContext, useState } from "react";
import { context } from "./user-context";

const SignIn = () => {
    const { user, setUser, setConnected } = useContext(context);
    const [valid, setValid] = useState<boolean>(true);
    const signInUser = (userDetails: typeof user) => {
        axios.post("http://localhost:8080/api/user/sighin", userDetails).
            then(({ statusText }) => setConnected(statusText === 'OK'));
    }
    return <>
        <div>
            <label>enter your name : </label>
            <input type="text" placeholder="name" onChange={({ target }) => setUser({ ...user, UserName: target.value })} />
        </div>
        <div>
            <label>enter your password : </label>
            <input type="password" placeholder="password" onChange={({ target }) => setUser({ ...user, Password: target.value })} />
        </div>
        <div>
            <label>enter twice your password : </label>
            <input type="password" placeholder="password" onChange={({ target }) => setValid(user.Password.startsWith(target.value))} />
            {valid ? <small>good</small> : <small>invalid value</small>}
        </div>
        <div>
            <label>enter your email : </label>
            <input type="text" placeholder="email" onChange={({ target }) => setUser({ ...user, Email: target.value })} />
        </div>
        <div>
            <label>enter your phone : </label>
            <input type="text" placeholder="phone" onChange={({ target }) => setUser({ ...user, Phone: target.value })} />
        </div>
        <div>
            <label>enter your tz : </label>
            <input type="text" placeholder="tz" onChange={({ target }) => setUser({ ...user, Tz: target.value })} />
        </div>
        <button onClick={() => signInUser(user)}>Sign In</button>
    </>
}
export default SignIn;