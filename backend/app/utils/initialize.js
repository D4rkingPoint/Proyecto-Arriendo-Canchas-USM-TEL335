const { User } = require('../models'); 
const bcrypt = require('bcryptjs');
const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

const createAdminIfNotExists = async () => {
  try {
    const admin = await User.findOne({ where: { is_admin: true } });

    if (!admin) {

      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

      await User.create({
        email: ADMIN_EMAIL,
        nombre:'admin',
        apellido:'',
        password: hashedPassword,
        is_admin: true  
      });

      console.log('Administrador creado con éxito.');
    } else {
      console.log('Ya existe un administrador.');
    }
  } catch (error) {
    console.error('Error al verificar o crear administrador:', error);
  }
};

module.exports = createAdminIfNotExists;
