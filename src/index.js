const app = require ('./server');
require ('./database');


app.listen(4000,()=>{
    console.log ('servidor en puerto 4000')
})