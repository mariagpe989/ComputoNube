const usersCtrl = {};
const passport = require('passport');

const User = require('../models/User')
// Renderizar el formulario de registro
usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup'); // Asegúrate de tener una vista llamada signup.hbs o similar
};

// Manejar la lógica de registro (guardar el usuario)
usersCtrl.signup = async (req, res) => {
    const errors = [];
    [{text: ''}]
    const { name, email, password, confirm_password } = req.body;

    // Validaciones
    if (password !== confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe tener al menos 4 caracteres' });
    }

    if (errors.length > 0) {
        // Renderiza el formulario de registro con errores y los datos ingresados previamente
        return res.render('users/signup', {
            errors,
            name,
            email
        })
    }else {
        const emailUser = await User.findOne ({email: email});
        if(emailUser){
            req.flash ('error_msg', 'Correo existente');
            res.redirect('/users/signup');
        } else {
            const newUser = new User ({name, email, password});
            newUser.password =  await newUser.encryptPassword(password)
            req.flash('succes_msg', 'Estas Registrado');
            await newUser.save();
            res.redirect('/users/signin');
        }
    }
};

// Renderizar el formulario de inicio de sesión
usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin'); // Asegúrate de tener una vista llamada signin.hbs o similar
};

// Manejar la lógica de inicio de sesión
usersCtrl.signin = passport.authenticate('local',{
    failureRedirect: 'user/signin',
    successRedirect:'/notes',
    failureFlash:true
});

// Manejar el cierre de sesión
usersCtrl.logout = (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).send("Error al cerrar sesión");
      }
      req.flash('success_msg', 'Sesión cerrada exitosamente');
      res.redirect('/'); // Redirige a la página principal después de cerrar sesión
    });
  };
  


module.exports = usersCtrl;

