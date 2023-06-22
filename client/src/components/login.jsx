import { useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import '../style/login.css';

export default function Login({path, request}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = () => {
        const clientOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username: username, password: password})
        };
        fetch(`${path}/client/get`, clientOptions)
        .then(resp => resp.json())
        .then(client => {
            if (client.username === username) {
                fetch(`${path}/connection/create`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({userid: client.userid})
                }).then(resp => resp.json())
                .then(connection => {
                    if (connection.userid === client.userid) {
                        Cookies.set("user", JSON.stringify({userid: connection.userid, connid: connection.connid}), {expires: 7, secure: true});
                        request();
                        setConnected(true);
                    }
                    else {
                        setError("Error");
                    }
                });
            }
            else {
                setError("Identifiants incorrectes");
            }
        });
    }

    return (
        <div id="login">
            <p>{error}</p>
            <div className="input-field" >
            <input type="text" placeholder="Username" name="username" value={username} onChange={event => setUsername(event.target.value)} />
            <input type="password" placeholder="Password" name="password" value={password} onChange={event => setPassword(event.target.value)} />
            <input type="submit" value="Submit" onClick={handleSubmit} />
            {connected && <Navigate to='/' replace={true} />}
        </div>
        </div>
    )
}