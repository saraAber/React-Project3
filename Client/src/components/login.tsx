import axios from "axios";
import { useContext, useRef } from "react";
import { context } from "./user-context";

const Login = () => {
    const { setConnected } = useContext(context);
    const loginUser = (UserName?: string, Password?: string) => {
        if (UserName && Password) {
            axios.post("http://localhost:8080/api/user/login", { UserName, Password }).
                then(({ statusText }) => setConnected(statusText === 'OK'));
        }
    }
    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    return <>
        <div>
            <label>enter your name :</label>
            <input type="text" placeholder="name" ref={inputNameRef} />
        </div>
        <div>
            <label>enter your password :</label>
            <input type="password" placeholder="password" ref={inputPasswordRef} />
        </div>
        <button onClick={() => loginUser(inputNameRef.current?.value, inputPasswordRef.current?.value)}>Log In</button>
        New to My-App? <a href="#" target="_blank">Sign In</a>
        {/* לחיצה על הקישור תוביל למסך הרשמה */}
    </>

}
export default Login;