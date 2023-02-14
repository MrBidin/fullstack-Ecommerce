import bcrypt from 'bcryptjs';

const user = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('dsfsdfdf', 10),
    isAdmin: true
  },
  {
    name: 'Bidin',
    email: 'bidin@gmail.com',
    password: bcrypt.hashSync('dfjlkeruj;lld', 10)
  },
  {
    name: 'Alexandra',
    email: 'alexandra@gmail.com',
    password: bcrypt.hashSync('hlrtrujgr', 10)
  }
];

export default user;