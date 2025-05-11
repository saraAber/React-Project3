import { useContext, useEffect } from 'react';
import { context } from './user-context';
import { Link, useNavigate } from 'react-router-dom';
const Header = () => {
    const { setUser, connected, setConnected } = useContext(context);
    const navigate = useNavigate();

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
        <header>
            <div>Recipedia</div>
            <ol>
                <li>
                    <Link to={"login"}>
                        {connected ? <>Log Out</> : <>Log In</>}
                    </Link>
                </li>
                <li>
                    <Link to={"home"}>Home</Link>
                </li>
                <li>
                    <Link to={"recipes"}>Recipes</Link>
                </li>
            </ol>
        </header >
    </>
}

export default Header;