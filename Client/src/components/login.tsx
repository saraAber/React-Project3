import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { context } from "./user-context";
import { Link, useNavigate } from "react-router-dom";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type User = {
    UserName: string,
    Password: string
}
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const { setConnected, setUser } = useContext(context);
    const [userDetails, setUserDetails] = useState<User>({ UserName: "", Password: "" })
    const navigate = useNavigate();

    const loginUser = () => {
        axios.post("http://localhost:8080/api/user/login", { UserName: userDetails.UserName, Password: userDetails.Password }).
            then(({ statusText, data }) => {
                setConnected(statusText === 'OK');
                sessionStorage.setItem("user", JSON.stringify(data));
                setUser(data);
            });
        navigate("/home");
    }

    useEffect(() => {
        setUser((prev: any) => ({ ...prev, Id: "0" }));
        setConnected(false);
        sessionStorage.removeItem("user");
    }, [])

    return <>
        <div>
            <label>Enter your nickname : </label>
            <TextField
                id="outlined-basic"
                label="nickname"
                variant="outlined"
                onChange={({ target }) => setUserDetails({ ...userDetails, UserName: target.value })}
            />
        </div>
        <div>
            <label>Enter your password : </label>
            <FormControl sx={{ m: 1, width: '225px' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={({ target }) => setUserDetails({ ...userDetails, Password: target.value })}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={
                                    showPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
        </div>
        <Button variant="outlined" onClick={loginUser}>Log In</Button>
        <br />
        New to Recipedia ? 
        <Button
            variant="outlined"
            component={Link}
            to="/signin"
        >
            Sign In
        </Button>
    </>
}
export default Login;