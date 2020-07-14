import React from 'react';
import fetch from 'isomorphic-unfetch';

export default function login() {
    const { loginList, setLoginList } = React.useState('');
    React.useEffect(() => {
        fetch('/api/logins/46')
            .then(response => response.json())
            .then(data => {
                const list = data.map((login, idx) => <li key={idx}>{login.lastLogin}</li>);
                setLoginList(list);
            });
    }, [loginList]);
    return (
        <>
            <h3>My latest logins</h3>
            <ul>{loginList}</ul>
        </>
    );
}
