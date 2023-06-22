import { NavLink } from "react-router-dom";

export default function Main({handleLogout}) {
    return (
        <div id="main" >
            <NavLink to='/login' ><input type='button' value='Login'/></NavLink>
            <NavLink to='/register' ><input type='button' value='Register'/></NavLink>
            <input type='button' value='Logout' onClick={handleLogout} />
        </div>
    )
}