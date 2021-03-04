import md5 from 'md5';

//Nuestro hash
const gravatar = (email) => {
  const base = 'https://gravatar.com/avatar/';
  const formattedEmail = (email).trim().toLowerCase();
  const hash = md5(formattedEmail, { encoding: 'binary' });
  return `${base}${hash}`; //La url para poder presentar nuestro avatar
};

export default gravatar;
