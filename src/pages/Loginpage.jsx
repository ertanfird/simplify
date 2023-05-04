import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import Context from '../context';
import onLogin from '../api/Auth/Login';

import Input from '../components/UI/Input.jsx';
import Alert from '../components/Layout/Alert';
import Header from '../components/Layout/Header';
import Logo from '../components/Layout/Logo';


export default function Loginpage(props) {
  const ctx = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onBlur", });

  return (
    <div className='container'>
      <Alert />
      <Header path='../signup' title='Sign up' />
      <Logo />
      <form
        className="form"
        onSubmit={handleSubmit((data) => onLogin(data, ctx))}
      >
        <Input
          type="text"
          placeholder="UserName"
          errors={errors}
          name="userName"
          {...register('userName', { required: true })}
        />
        <Input
          type="password"
          placeholder='Password'
          errors={errors}
          name="password"
          {...register('password', { required: true })}
        />
        <input type="submit" value="Login" className="button" />
      </form>
    </div>
  );
}
