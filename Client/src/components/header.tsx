import { useContext, useEffect, useState } from 'react';
import { context } from './user-context';
import { Link, useNavigate } from 'react-router-dom';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import CreateSharpIcon from '@mui/icons-material/CreateSharp';
import CakeSharpIcon from '@mui/icons-material/CakeSharp';
import CategorySharpIcon from '@mui/icons-material/CategorySharp';

const Header = () => {
    const { setUser, connected, setConnected } = useContext(context);
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    useEffect(() => {
        const loggedInUser = sessionStorage.getItem("user");
        if (!loggedInUser) {
            navigate("login");
        }
        else {
            if (loggedInUser !== null) {
                const userDetails = JSON.parse(loggedInUser);
                setUser(userDetails);
                setConnected(true);
            }
        }
    }, []);

    return <>
        <header style={{ padding: "25px 0" }}>
            <div style={{padding:"0 30px"}}>Recipedia</div>
            <Box sx={{ margin: "0 0 0 800px" }}>
                <BottomNavigation
                    style={{ backgroundColor: "rgb(25,118,210)" }}
                    showLabels
                    value={value}
                    onChange={(_, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction
                        label={connected ? "Log Out" : "Log In"}
                        icon={<CreateSharpIcon />}
                        component={Link}
                        to="/login"
                        style={{ margin: "0 10px" ,color:"white"}}
                    />
                    <BottomNavigationAction
                        label="Home"
                        icon={<HomeSharpIcon />}
                        component={Link}
                        to="/home"
                       style={{ margin: "0 10px" ,color:"white"}}
                    />
                    <BottomNavigationAction
                        label="Recipes"
                        icon={<CakeSharpIcon />}
                        component={Link}
                        to="/recipes"
                       style={{ margin: "0 10px" ,color:"white"}}
                    />
                    <BottomNavigationAction
                        label="Categories"
                        icon={<CategorySharpIcon />}
                        component={Link}
                        to="/categories"
                        style={{ margin: "0 10px" ,color:"white"}}
                    />
                </BottomNavigation>
            </Box>
        </header >
    </>
}

export default Header;