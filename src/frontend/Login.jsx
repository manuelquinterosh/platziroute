import React, { useState } from 'react'; //React hook
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginRequest } from './actions';
import Header from './components/Header';
import './assets/styles/components/Login.scss';
import googleIcon from './assets/static/google-icon.png';
import twitterIcon from './assets/static/twitter-icon.png';

const Login = (props) => {
  const [form, setValues] = useState({ //Trae dos valores: uno es el formulario y el otro el que me va permitir guardar los valores que estoy obteniendo. Y estos vienen de useState
    email: '',
  });

  const handleInput = (event) => { //Se va encargar de manejar los cambios cada ves que vayamos a escribir en los input
    setValues({
      ...form,
      [event.target.name]: event.target.value, //El es el nombre del input y el value es lo que estoy typeando
    });
  };

  const handleSubmit = (event) => { //Cuando nosotros le demos enviar a nuestro formulario va ha capturar la informacion y esta lo va presentar donde sea necesario
    event.preventDefault(); //Para matar el funcionamiento de html en los formularios
    props.loginRequest(form);
    props.history.push('/');
  };

  return (
    <>
      <Header isLogin />
      <section className='login'>
        <section className='login__container'>
          <h2>Inicia sesión</h2>
          <form className='login__container--form' onSubmit={handleSubmit}>
            <input name='email' className='input' type='text' placeholder='Correo' onChange={handleInput} />
            <input name='password' className='input' type='password' placeholder='Contraseña' onChange={handleInput} />
            <button className='button' type='button'>Iniciar sesión</button>
            <div className='login__container--remember-me'>
              <label htmlFor='cbox1'>
                <input type='checkbox' id='cbox1' value='first_checkbox' />
                {' '}
                Recuérdame
              </label>
              <a href='/'>Olvidé mi contraseña</a>
            </div>
          </form>
          <section className='login__container--social-media'>
            <div>
              <img src={googleIcon} alt='Google Icon' />
              {' '}
              Inicia sesión con Google
            </div>
            <div>
              <img src={twitterIcon} alt='Twitter Icon' />
              {' '}
              Inicia sesión con Twitter
            </div>
          </section>
          <p className='login__container--register'>
            No tienes ninguna cuenta
            {' '}
            {' '}
            <Link to='/register'>
              Regístrate
            </Link>
          </p>
        </section>
      </section>
    </>
  );
};

const mapDispatchToProps = { //Nos permite enviar la informacion a nuestros action para que puedan trabajar con ella
  loginRequest,
};

export default connect(null, mapDispatchToProps)(Login);
