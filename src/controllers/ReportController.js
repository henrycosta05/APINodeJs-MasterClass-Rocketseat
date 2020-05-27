const {Op} = require('sequelize');
const User = require('../models/User');

module.exports = {
  async show( req, res ) {
    //Encontrar todos usuários que tem email que termina com ...
    //Desses usuários eu quero buscar todos que moram na rua ...
    //Desses usuários eu quero buscar as tecnologias que começam com React
    const user = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.like]: '%@example.com'
        }
      },
      include: [
        {
          association: 'addresses',
          where: {
            street: 'Rua da Renner'
          }
        }, //endereços
        {
          association: 'techs',
          where: {
            name: {
              [Op.like]: 'Node%'
            }
          }
        }, //tecnologia
      ]
    })

    return res.json( user );
  }
};