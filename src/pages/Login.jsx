import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {AuthContext} from '../contexts/Auth';
import classes from '../Auth.module.css';
import Header from '../components/Header';

const Login = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [errorMessage, setErrorMEssage] = useState('')

  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);


  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url = `http://localhost:5000/api/users/login`
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (!res.ok) {
          return res.json().then(data => {
            console.log(data, 'err');
             throw new Error('Authentication Failed')
          })
        }
        return res.json()
      })
      .then((data) => {
        
        const expirationTime = new Date(
           +data?.decoded?.exp * 1000
        );
        console.log(expirationTime.getTime(), 'hi');
        authCtx.login(data.token, data.user, expirationTime.toISOString());
        navigate('/')
      })
      .catch((err) => {
        setErrorMEssage(err.message)
      });
  };

  return (
    <>
        <Header />
        <section className={classes.auth}>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                <label htmlFor='email'>Your Email</label>
                <input type='email' id='email' required ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                <label htmlFor='password'>Your Password</label>
                <input
                    type='password'
                    id='password'
                    required
                    ref={passwordInputRef}
                />
                </div>
                <div className={classes.actions}>
                {!isLoading && (
                    <button>Login</button>
                )}
                {isLoading && <p>Sending request...</p>}
                {errorMessage && <h3 style={{color: 'red'}}>{errorMessage}</h3>}
                </div>
            </form>
        </section>
    </>
  );
};

export default Login;