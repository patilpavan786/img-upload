import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import style from "./Register.module.css"
import { Link, useNavigate } from 'react-router-dom';

export default  function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    setError('');
    e.preventDefault();
    if (!(name && email && phone)) {
      setError('Please enter all fields');
      return;
    }
    if (phone.length !== 10) {
      setError('Please enter correct phone no.');
      return;
    }
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setError('Please enter a valid email');
      return;
    }


    const newContact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
      password,
    };

    const previousContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    let newContacts = [newContact, ...previousContacts];

    localStorage.setItem('contacts', JSON.stringify(newContacts));
    setName('');
    setEmail('');
    setPhone('');
    setPassword("");
    alert('User added successfully.');
    navigate("/Home")
  };

  return (
    <div className={style.main}>
   
      <form className={style.form} style={{ fontSize: '20px' }} onSubmit={handleSubmit}>
      <h1>SignUp</h1>
        <section >
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder='name'
          />
        </section>
        <section >
          <label htmlFor="email">Email</label>
          <input
           className={style.intBox}
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder='Email'
          />
        </section>
        <section >
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            placeholder='Mobile No'
          />
        </section>
        <section >
          <label htmlFor="password">Password</label>
          <input
          className={style.passwordInput}
            id="password"
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder='Password'
          />
        </section>
        <section>
          {error && <p style={{ fontSize: '12px', color: 'White' }}>{error}</p>}
        </section>
        <button  type="submit">Submit</button>
     
      </form>
    </div>
  );
}
