import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Logo from '../assets/img/Logo.svg';
import Context from '../context';
import Input from '../components/UI/Input.jsx';
import Switch from '../components/UI/Switch.jsx';
import { onLogin } from '../api/Auth';
import Alert from '../components/Layout/Alert';


export default function Loginpage(props) {
  const ctx = useContext(Context);

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
  });


  return (
    <div className='container'>
      <Alert />
      <div className="header">
        <Link to="../signup" >Sign up</Link>
        <Switch
          type="inverse"
          onChange={ctx.handleThemeClick}
          checked={(ctx.theme === 'dark')  && "checked"}
        />
      </div>
      <div className="logo">
        <img src={Logo} alt="Simplify" className="logo__picture" />Simplify
      </div>
      <form className="form" onSubmit={handleSubmit((data)=>onLogin(data, ctx))}>
        <Input
          type="text"
          placeholder="UserName"
          errors={errors}
          name="userName"
          autoComplete="off"
          {...register('userName', { required: true })}
        />
        <Input
          type="password"
          placeholder='Password'
          errors={errors}
          name="password"
          autoComplete="new-password"
          {...register('password', { required: true })}
        />
        <input type="submit" value="Login" className="button" />
      </form>
    </div>
  );
}
