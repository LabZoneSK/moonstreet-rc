import React, { useState } from 'react';
import { auth } from '../../firebase';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
    

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then(() => {
      // dispatch loading user data

    }).catch((error) => {
      setErrorMsg({errorMsg: error.message });
    });
  };

  return (
    <div className="login">
      <div className="login__form">
        <form onSubmit={handleSubmit}>
          <h1>MoonStreet</h1>
          <input type="text" placeholder="username/email" defaultValue={email} onChange={handleEmailChange} /><br />
          <input type="password" defaultValue={password} onChange={handlePasswordChange} /><br />
          <button type="submit">Login</button>
          <p>{errorMsg}</p>
        </form>
      </div>
    </div>
  )

}

export default Login;
