import {useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'

const SignUp = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const passwordInputRef = useRef();
  const userName = useRef();


  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:5000/api/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: userName.current.value, email: emailInputRef.current.value, password: passwordInputRef.current.value, name: nameInputRef.current.value})
    })
      .then((res) => {
        if (res.ok) {
          navigate('/login')
        } else {
          return res.json()
        }
      })
      .then((data) => {
        setErrorMsg(data.message)
      })
      .catch(e => {
        setErrorMsg(e.message)
      })
  }

  return (
    <>
        <Header />
        <div style = {{margin: '10px auto', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}} >
            <h2>
                SignUp To Our Application
            </h2>
            <br />
            <form onSubmit = {handleSubmit} >
                <label htmlFor="email">Email: </label>
                <input required ref= {emailInputRef} style={{ display: 'block', width: '100%' }} type="text" name = 'email'/>
                <br />
                <br />
                <label htmlFor="name">Name: </label>
                <input required ref= {nameInputRef} style={{ display: 'block', width: '100%' }} type="text" name = 'name'/>
                <br />
                <br />
                <label htmlFor="password">Password: </label>
                <input required ref = {passwordInputRef} style={{ display: 'block', width: '100%' }} type="text" name = 'password'/>
                <br />
                <br />
                <label htmlFor="username">UserName: </label>
                <input required ref = {userName} style={{ display: 'block', width: '100%' }} type="text" name = 'username'/>
                <br />
                <br />
                <input type="submit" value="Sign Up" />
            </form>
            {errorMsg && (
              <p style={{marginTop: '20px', textAlign: 'center', color: 'red'}}>{errorMsg}</p>
            )}
        </div>
    </>
  )
}

export default SignUp