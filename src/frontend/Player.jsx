//UseEffect: Sirve para poder manejar el efecto que se va encargar de encontrar el ID
import React, { useEffect } from 'react'; //Si queremos transmitir un efecto que nos permita ejecutar una action que se va encargar de tener el ID y luego mandarsela a nuestro reducer, para eso utilizamos hook
import { connect } from 'react-redux';
import { getVideoSource } from './actions';
import './assets/styles/components/Player.scss';
import NotFound from './NotFound';

const Player = (props) => {

  const { match, playing } = props;

  const { id } = match.params;

  //Para validar si hay un video que se esta ejecuntando o si existe este elemento para saber si le podemos mostrar a nuestro usuario el video o el mensaje de error, porque no esta siendo encontrado dentro de nuestro reducer
  //Object.keys: Para saber cuantos elementos tiene ese objeto y de esta forma saber que si tiene mas de 0 elementos
  const hasPlaying = Object.keys(playing).length > 0;

  useEffect(() => {
    props.getVideoSource(id); //Le pasamos el ID para que luego vaya a nuestro reducer y filtre por medio de ese ID y de esa forma obtengamos en el estado el arreglo con el ID que nosotros tenemos y asi poder tener el source
  }, []); //Pasamos un arreglo vacio para no generar un arreglo infinito

  return hasPlaying ? ( //Si hasPlaying es verdadero entonces muestra el reproductor y obtemoe el Id de ese elemento y el source
    <div className='Player'>
      <video controls autoPlay>
        <source src={playing.source} type='video/mp4' />
      </video>
      <div className='Player-back'>
        <button type='button' onClick={() => props.history.goBack()}>
          Regresar
        </button>
      </div>
    </div>
  ) : <NotFound />; //Si no encontro muestrame este error
};

const mapStateToProps = (state) => { //Para obtener la configuracion del estado
  return {
    playing: state.playing, //Retornar el playing que tenemos en el initialState
  };
};

const mapDispatchToProps = { //Para conectar nuestra action
  getVideoSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
