const User = require('../models/user');

const initialUsers = [
  {
    username: 'GobtheBoon',
    name: 'Martin Memer',
    password: 'bananaynay'
  },
  {
    username: 'FullStackBob',
    name: 'Bobrosky Ross',
    password: 'bobross!'
  },
  {
    username: 'FullStacksKimmo',
    name: 'Kimmo',
    password: 'kimmokinkku123'
  },
];

const usersInDb = async () => {
	users = await User.find({})
	return users.map(user => user.toJSON())
}

module.exports = {
  initialUsers, usersInDb
}