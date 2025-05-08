import axios from "axios";
import { useContext, useState } from "react";
import { context } from "./user-context";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const { user, setUser, setConnected } = useContext(context);
    const [valid, setValid] = useState<boolean>(true);
    const navigate = useNavigate();

    const signInUser = (userDetails: typeof user) => {
        axios.post("http://localhost:8080/api/user/sighin", userDetails).
            then(({ statusText, data }) => {
                setConnected(statusText === 'OK');
                sessionStorage.setItem("user", data);
                setUser(data);
                navigate("/home");
            });
    }
    return <>
        <div>
            <label>name : </label>
            <input type="text" placeholder="name" onChange={({ target }) => setUser({ ...user, UserName: target.value })} />
        </div>
        <div>
            <label>password : </label>
            <input type="password" placeholder="password" onChange={({ target }) => setUser({ ...user, Password: target.value })} />
        </div>
        <div>
            <label>confirm password : </label>
            <input type="password" placeholder="password" onChange={({ target }) => setValid(user.Password.startsWith(target.value))} />
            {valid ? <small>good</small> : <small>invalid value</small>}
        </div>
        <div>
            <label> email : </label>
            <input type="text" placeholder="email" onChange={({ target }) => setUser({ ...user, Email: target.value })} />
        </div>
        <div>
            <label> phone : </label>
            <input type="text" placeholder="phone" onChange={({ target }) => setUser({ ...user, Phone: target.value })} />
        </div>
        <div>
            <label> tz : </label>
            <input type="text" placeholder="tz" onChange={({ target }) => setUser({ ...user, Tz: target.value })} />
        </div>
        <button onClick={() => signInUser(user)}>Sign In</button>
    </>
}
export default SignIn;