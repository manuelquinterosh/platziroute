import React from 'react';
import { connect } from 'react-redux'; //El cual se encarga de proveer todo nuestro estado a nuestro componente
import { Link } from 'react-router-dom'; //Para manejar los enlaces a donde nos vamos a mover
import className from 'classnames'; //me permite crea logica que me permita crear validaciones y estas validaciones son las que yo le quiero pasar para poder tener estados distintos segun el componente y segun el comportamiento en el que estemos involucrando a este elemento
import gravatar from '../utils/gravatar'; //Para traer nuestro gravatar
import { logoutRequest } from '../actions'; //Se encarga de cerrar session
import '../assets/styles/components/Header.scss';
import logo from '../assets/static/logo-platzi-video-BW2.png';
import userIcon from '../assets/static/user-icon.png';

const Header = (props) => {
  const { user, isLogin, isRegister } = props;
  const hasUser = Object.keys(user).length > 0; //Para ver si tenemos o no tenemos un usuario

  const handleLogout = () => { //encargada de manejar el Logout la cual hace uso de nuestra action y la cual lo que hace es mandarle el payload que en este caso seria un objeto vacio
    props.logoutRequest({});
  };

  const headerClass = className('header', { //Esta logica nos va servir para validar si se encuentra dentro del login o dentro del registro y poder cambiar las propiedades del Css que tiene nuestro header
    isLogin, //Si tenemos esta propiedad se la asignemos a mi header e igual con la otra
    isRegister,
  });

  return (
    <header className={headerClass}>

      <Link to='/'>
        <img className='header__img' src={logo} alt='Platzi Video' />
      </Link>

      <div className='header__menu'>
        <div className='header__menu--profile'>

          {hasUser ? //Validacion para mostrar o no la imagen
            <img src={gravatar(user.email)} alt={user.email} /> :
            <img src={userIcon} alt='' />}

          <p>Perfil</p>
        </div>
        <ul>

          {hasUser ? //si nosotros tenemos un usuario mostramos el usuario de lo contrario null
            <li><a href='/'>{user.name}</a></li> :
            null}

          {hasUser ? //Se encarga de validar que tengamos o no cuenta
            <li><a href='#logout' onClick={handleLogout}>Cerrar Sesion</a></li> : (
              <li>
                <Link to='/login'>
                  Iniciar Sesión
                </Link>
              </li>
            )}

        </ul>
      </div>
    </header>
  );
};
//Se encarga de mapear nuestras propiedades del estado
const mapStateToProps = (state) => { //Quiero traerme del estado el elemento que se encarga de nuestro usuarios
  return {
    user: state.user,
  };
};

const mapDispatchToProps = { //Se encarga de todas las acciones que tenemos que disparar o que vamos enviar a nuestro documento
  logoutRequest,
};
//Se encarga de conectar los props que estamos trayendo, los dispatch que vamos a utilizar dentro de nuestro componente
export default connect(mapStateToProps, mapDispatchToProps)(Header); //Mapear lo que estamos utilizando
