import { useState } from "react";

const Header = () => {
    const [connected, SetConnected] = useState(false);
    return <>
        <div>logo</div>
        <ol>
            <li>{connected ? <>log out</> : <>log in</>}</li>
            <button onClick={() => SetConnected(!connected)}>log</button>
        </ol>
    </>
}

export default Header;