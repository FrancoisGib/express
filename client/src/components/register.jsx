import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Register({path}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nav, setNav] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        };
        fetch(`${path}/client/create`, requestOptions)
        .then(resp => resp.json())
        .then(client => {
            if (client.username === username) {
                setNav(true);
            }
            else {
                setError("Un utilisateur possède déjà ce nom de compte")
            }
        })
        .catch(() => setError("Error"));
    }

    return (
        <div id="register">
            <input type="text" placeholder="Username" name="username" value={username} onChange={event => setUsername(event.target.value)} />
            <input type="password" placeholder="Password" name="password" value={password} onChange={event => setPassword(event.target.value)} />
            <input type="submit" value="Submit" onClick={handleSubmit} />
            {error}
            {nav && <Navigate to='/'/>}
        </div>
    )
}