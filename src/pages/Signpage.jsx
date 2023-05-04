import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

import onRegister from '../api/Auth/Register';
import onLogin from '../api/Auth/Login';

import Context from '../context';

import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../helpers/schema';

import Input from '../components/UI/Input.jsx';
import Checkbox from '../components/UI/Checkbox.jsx';
import Alert from '../components/Layout/Alert';
import Header from '../components/Layout/Header';
import Logo from '../components/Layout/Logo';
import { Link } from 'react-router-dom';


export default function Signuppage(props) {
  const ctx = useContext(Context);
  const [checked, setChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  });

  return (
    <div className='container'>
      <Alert />
      <Header path='../login' title='Login' />
      <Logo />
      <form
        noValidate
        className="form"
        onSubmit={handleSubmit((data) => onRegister(data, ctx, onLogin))}
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
        <Input
          type="password"
          placeholder='Repeat password'
          errors={errors}
          name="confirmPassword"
          {...register('confirmPassword', { required: true })}
        />
        <Checkbox
          name="checkTerms"
          errors={errors}
          checked={checked}
          setchecked={setChecked}
          label='I agree to the '
          {...register("checkTerms", { required: true })}
        >
          <Link to='../conditions' style={{marginLeft: '4px'}}>Terms and Conditions</Link>
        </Checkbox>
        <input type="submit" value="Sign up" className="button" />
      </form>
    </div>
  );
}
