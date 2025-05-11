import axios from "axios";
import { useContext, useState } from "react";
import { context } from "./user-context";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const SignIn = () => {
    const { user, setUser, setConnected } = useContext(context);
    const [valid, setValid] = useState<boolean>(true);
    const navigate = useNavigate();

    const signInUser = () => {
        axios.post("http://localhost:8080/api/user/sighin", user).
            then(({ statusText, data }) => {
                setConnected(statusText === 'OK');
                sessionStorage.setItem("user", JSON.stringify(data));
                setUser(data);
                navigate("/home");
            });
    }
    return <>
        <Box sx={{height:"500px", display: "flex", flexDirection: "column", justifyContent: "space-between",alignItems:"center" }}>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    onChange={({ target }) => setUser({ ...user, UserName: target.value })}
                />
            </div>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    onChange={({ target }) => setUser({ ...user, Password: target.value })}
                />
            </div>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Confirm Password"
                    variant="outlined"
                    onChange={({ target }) => setValid(user.Password.startsWith(target.value))}
                />
                <br />
                {valid ? <small>good</small> : <small>invalid value</small>}
            </div>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={({ target }) => setUser({ ...user, Email: target.value })}
                />
            </div>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                    onChange={({ target }) => setUser({ ...user, Phone: target.value })}
                />
            </div>
            <div>
                <TextField
                    id="outlined-basic"
                    label="TZ"
                    variant="outlined"
                    onChange={({ target }) => setUser({ ...user, Tz: target.value })}
                />
            </div>
            <Button variant="contained" endIcon={<SendIcon />} onClick={signInUser}>
                Sign In
            </Button>
        </Box>
    </>
}
export default SignIn;