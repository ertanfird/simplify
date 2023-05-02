import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import Logo from '../assets/img/Logo.svg';
import Context from '../context';
import Input from '../components/UI/Input.jsx';
import Checkbox from '../components/UI/Checkbox.jsx';
import Switch from '../components/UI/Switch.jsx';
import schema from '../helpers/schema';
import Alert from '../components/Layout/Alert';
import onRegister from '../api/Auth/Register';
import onLogin from '../api/Auth/Login';


export default function Signuppage(props) {
  const ctx = useContext(Context);
  const [checked, setChecked] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  });

  return (
    <div className='container'>
      <Alert />
      <div className="header">
        <Link to="../login" >Login</Link>
        <Switch
          type="inverse"
          onChange={ctx.handleThemeClick}
          checked={(ctx.theme === 'dark') && "checked"}
        />
      </div>
      <div className="logo">
        <img src={Logo} alt="Simplify" className="logo__picture" />Simplify
      </div>
      <form noValidate className="form" onSubmit={handleSubmit((data) => onRegister(data, ctx, onLogin))} >
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
          label="I agree to the Terms and Conditions"
          {...register("checkTerms", { required: true })}
        />
        <input type="submit" value="Sign up" className="button" />
      </form>
    </div>
  );
}
