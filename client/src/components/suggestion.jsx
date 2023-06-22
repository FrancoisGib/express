import { useState } from "react";

export default function Suggestion({userid, path, update}) {
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userid: userid, description: description, title: title})
        };
        fetch(`${path}/suggestion/create`, requestOptions)
        .then(resp => resp.json())
        .then(suggestion => {
            console.log(suggestion);
            update(suggestion);
            setTitle("");
            setDescription("");
        })
        .catch(() => setError("Error"));
    }

    return (
        <div id="register">
            <input type="text" placeholder="Title" value={title} onChange={event => setTitle(event.target.value)} />
            <textarea value={description} onChange={event => setDescription(event.target.value)} />
            <input type="submit" value="Submit" onClick={handleSubmit} />
            {error}
        </div>
    )
}