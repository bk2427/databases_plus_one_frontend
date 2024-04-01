
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';


// import { BACKEND_URL } from '../../constants';

// const USERS_ENDPOINT = `${BACKEND_URL}/users`;

// function AddUserForm({ setError, fetchUsers }) {
// 	const [first_name, setFirstName] = useState('');
// 	const [last_name, setLastName] = useState('');
// 	const [email, setEmail] = useState('');
// 	const [password, setPassword] = useState('');
//     const [userIds, setUserIds] = useState([]);


// 	const changeFirstName = (event) => { setFirstName(event.target.value); };
// 	const changeLastName  = (event) => {  setLastName(event.target.value); };
// 	const changeEmail  = (event) => {  setEmail(event.target.value); };
// 	const changePassword  = (event) => {  setPassword(event.target.value); };
  


// 	const addUser = (event) => {
// 		event.preventDefault();
// 		axios.post(USERS_ENDPOINT, { "first name": first_name, "last name": last_name, email: email, password: password }) // actual attribute name: this file's var/val
// 			.then((response) => {
// 				setError('');
// 				fetchUsers();
// 			})
// 			.catch((e) => {
// 			    if (e.response && e.response.data && e.response.data.message) {
// 			        setError(e.response.data.message);
// 			    } else {
// 			        setError('There was a problem adding a user');
// 			    }
// 			});
// 	};

// 	return (
// 		<form>
// 			<label htmlFor="first_name">
// 				First Name
// 			</label>
// 			<input type="text" id="first_name" value={first_name} onChange={changeFirstName} />

// 			<label htmlFor="last_name">
// 				Last Name
// 			</label>
// 			<input type="text" id="last_name" value={last_name} onChange={changeLastName} />

// 			<label htmlFor="email">
// 				Email
// 			</label>
// 			<input type="text" id="email" value={email} onChange={changeEmail} />

// 			<label htmlFor="password">
// 				Password
// 			</label>
// 			<input type="text" id="password" value={password} onChange={changePassword} />

// 			<button type="submit" onClick={addUser}>Create Account</button>
            
// 		</form>
// 	);
// }


// function CreateAccount() {
//     const [error, setError] = useState('');
//     const [users, setUsers] = useState([]);
//     const [message, setMessage] = useState('');

//     const fetchUsers = () => {
//         axios.get(USERS_ENDPOINT)
//         .then((response) => {
//             const usersObject = response.data.DATA;
//             const usersArray = Object.values(usersObject);
//             setUsers(usersArray);
            
//         })
//         .catch((error) => {
//             if (error.response && error.response.data && error.response.data.message) {
//             setError(error.response.data.message);
//             } else {
//             setError('There was a problem fetching all users.');
//             }
//         });
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);



//     return (
//          <div className="wrapper">
//             {error && (
//                 <div className="error-message">{error}</div>
//             )}

//             <AddUserForm setError={setError} fetchUsers={fetchUsers} />
//             {message && <p>{message}</p>}
//             <Link to="/">Back to Login</Link>
//         </div>
//       );

// }

// export default CreateAccount;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `${BACKEND_URL}/users`;

function CreateAccount() {
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]); // Define the users state
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get(USERS_ENDPOINT)
            .then((response) => {
                const usersObject = response.data.DATA;
                const usersArray = Object.values(usersObject);
                setUsers(usersArray);
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError('There was a problem fetching all users.');
                }
            });
    };

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const changeFirstName = (event) => { setFirstName(event.target.value); };
    const changeLastName = (event) => { setLastName(event.target.value); };
    const changeEmail = (event) => { setEmail(event.target.value); };
    const changePassword = (event) => { setPassword(event.target.value); };

    const addUser = (event) => {
        event.preventDefault();
        // Check if the email already exists
        if (users.some(user => user.email === email)) {
            setError('Email already exists');
            return;
        }

        axios.post(USERS_ENDPOINT, { "first name": first_name, "last name": last_name, email: email, password: password })
            .then(() => {
                setError('');
                setSuccessMessage('Account added, return to login');
                fetchUsers();
            })
            .catch((e) => {
                if (e.response && e.response.data && e.response.data.message) {
                    setError(e.response.data.message);
                } else {
                    setError('There was a problem adding a user');
                }
            });
    };

    return (
        <div className="wrapper">
            {error && (
                <div className="error-message">{error}</div>
            )}

            {successMessage && (
                <div className="success-message">{successMessage}</div>
            )}

            <form onSubmit={addUser}>
                <label htmlFor="first_name">First Name</label>
                <input type="text" id="first_name" value={first_name} onChange={changeFirstName} required />

                <label htmlFor="last_name">Last Name</label>
                <input type="text" id="last_name" value={last_name} onChange={changeLastName} required />

                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} onChange={changeEmail} required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={changePassword} required />

                <button type="submit">Create Account</button>
            </form>

            <Link to="/">Back to Login</Link>
        </div>
    );
}

export default CreateAccount;
