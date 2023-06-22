import { useEffect, useState } from "react";
import { v4 as uuid} from 'uuid';
import Suggestion from "./suggestion";

export default function SuggestionList({path, userid}) {
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState("");
    
    useEffect(() => {
        request();
    }, []);

    const request = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userid: userid })
        };
        fetch(`${path}/suggestion/get`, requestOptions)
        .then(resp => resp.json())
        .then(suggestion => {
            if (suggestions) {
                setSuggestions(suggestion);
            }
        })
        .catch(() => setError("Error"));
    }

    return (
        <div id="suggestions">
            <Suggestion userid={userid} path={path} update={(value) => setSuggestions([...suggestions, value])} />
            User : {userid}
            <ul>
            {suggestions.map(suggestion => <li key={uuid()}>Title : {suggestion.title}   Description : {suggestion.description}</li>)}
            </ul>
            {error}
        </div>
    )
}