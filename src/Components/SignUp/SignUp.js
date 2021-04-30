import React, { useState } from 'react';
import { useHistory } from 'react-router';
import db, { auth } from '../../firebase';
import './SignUp.css';

function SignUp() {
  const history = useHistory();
  const initialState = {
    fname: '',
    lname: '',
    phno: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const [state, setState] = useState(initialState);
  const [error, setError] = useState();

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  }

  const signup = event =>{
    event.preventDefault();

    if(state.password === state.confirmPassword){
      auth.createUserWithEmailAndPassword(state.email, state.password)
        .then(authUser => {
          const uid = authUser.user.uid;

          auth.currentUser
            .updateProfile({
              displayName: `${state.fname} ${state.lname}`
            });
          
          db.doc(`customers/${state.email}`)
            .set({
              uid: uid,
              phno: state.phno,
            })
            .then(() => {
              auth.signInWithEmailAndPassword(state.email, state.password)
                .then(() => history.push('/'));
            })
            .catch(err => console.log(err));
        })
        .catch(error => setError(error.message));
    }
    console.log(state);
  }

  const openSignInModal = () => {
    document.querySelector('.header__actions > div > button').click(); // open login modal.
  }
  return (
    <div className='signUp'>
      <div className='container'>
        <form onSubmit={signup}>
          <h3>Register</h3>
  
          <div className='form-group'>
            <label>First name</label>
            <input type='text' className='form-control' name='fname' value={state.fname} onChange={handleChange} required />
          </div>

          <div className='form-group'>
            <label>Last name</label>
            <input type='text' className='form-control' name='sname' value={state.sname} onChange={handleChange} required />
          </div>

          <div className='form-group'>
            <label>Email</label>
            <input type='email' className='form-control' name='email' value={state.email} onChange={handleChange} required />
          </div>

          <div className='form-group'>
            <label>Phone Number</label>
            <input type='number' className='form-control' 
              pattern='^\d{10}$' title='Should contain 10 digits.'
              name='phno' value={state.phno} onChange={handleChange} required 
            />
          </div>

          <div className='form-group'>
            <label>Password</label>
            <input type='password' className='form-control' name='password' value={state.password} onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <label>Confirm Password</label>
            <input type='password' className='form-control' name='confirmPassword' value={state.confirmPassword} onChange={handleChange} required />
          </div>
          
          <button type='submit' className='btn btn-dark btn-lg btn-block'>
            Register
          </button>

            {error && 
              <div className="alert alert-danger alert-dismissible fade show m-3" role="alert">
                {error}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            }

          <button type='button' className="btn btn-link btn-block" onClick={openSignInModal}>
            Already registered Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
