import { useContext } from 'react';
import { context } from './user-context';
const Header = () => {
    const { connected } = useContext(context);
    return <>
        <div className='header-div'>
            <div>LOGO</div>
            <ol>
                <li>
                    {/* לנתב למסך לוגין כשלא מחובר */}
                    <a href="">
                        {connected ? <>Log Out</> : <>Log In</>}
                    </a>
                </li>
                <li>
                    <a href="">
                        Home
                    </a>
                </li>
            </ol>
        </div>
    </>
}

export default Header;