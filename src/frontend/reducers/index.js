const reducer = (state, action) => {

  switch (action.type) { //Nos permite recivir el type y evaluarlo dentro de un caso y asi saber que hare con mi estado

    case 'SET_FAVORITE':
      return {
        ...state, //Traemos el estado que yo ya tengo
        myList: [...state.myList, action.payload], // state.myList: Es el elemento voy actualizar o cambiar dentro del estado. action.payload: El objeto que voy a guardar en esta lista
      };
    case 'DELETE_FAVORITE':
      return {
        ...state,
        //lo que hacemos es comparar que items.id tenga esa desigualdad que nosotros estamos comparando para saber si tenemos o no el item que estamos buscando
        //En caso de que no lo tenga. Regresa un nuevo arreglo con el elemento que esta cumpliendo esta condicion
        myList: state.myList.filter((items) => items.id !== action.payload),
      };
    case 'LOGIN_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'REGISTER_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'GET_VIDEO_SOURCE':
      return {
        ...state,
        //Metodo find: Sirve para hacer una busqueda dentro de los arreglos que nosotros tenemos con la informacion de los item
        //el item seria los elemento que tiene y va iterar por cada uno de ellos y va obtener item.id, porque es el filtro que nosotros vamos hacer y si coincide con action.payload nosotros vamos a obtener ese elemento
        playing: state.trends.find((item) => item.id === Number(action.payload)) || //si no encuenta en las tendencias va buscar en los originales
                state.original.find((item) => item.id === Number(action.payload)) ||
                [], //Y si no encuentra el elemento retornara un elemento vacio
      };
    default:
      return state; // Si no coincide con ningun de los casos va retornar nuestro estado
  }
};

export default reducer;
