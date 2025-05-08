import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { context } from "./user-context";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const { setConnected, setUser } = useContext(context);
    const navigate = useNavigate();
    const loginUser = (UserName?: string, Password?: string) => {
        if (UserName && Password) {
            axios.post("http://localhost:8080/api/user/login", { UserName, Password }).
                then(({ statusText, data }) => {
                    setConnected(statusText === 'OK');
                    sessionStorage.setItem("user", JSON.stringify(data));
                    setUser(data);
                });
            navigate("/home");
        }
    }
    useEffect(() => {
        setUser((prev: any) => ({ ...prev, Id: "0" }));
        setConnected(false);
        sessionStorage.removeItem("user");
    }, [])
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
        <br />
        New to Recipedia ? <Link to={"/signin"}>Sign In</Link>
    </>

}
export default Login;