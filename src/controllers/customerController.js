//Los controller es mejor trabajarlos por objetos
//ya qu podemos tener metodos para cada accion
// controller.save, controller.delete enter otros

const controller = {}

//Recibe una peticion req y envia una respuesta res
controller.list = (req,res)=>{
    //requerimos la conexion, podemos obtener un error err o la la conexion conn
    req.getConnection((err ,conn) => {
        //si obtenemos la conexion podemos generar un query
        //podemos obtener un error err o el resultado customer
        conn.query('SELECT * FROM customer', (err , customers) =>{
           //si err responde con un .json con el error 
            if (err){
                res.json(err);
            }
            console.log(customers)
            //si no respuesta renderiza
            res.render('customers',{
                data:customers
            });
        });
    });
};

controller.save = (req , res ) =>{
    const data = req.body;
    req.getConnection((err , conn) =>{
        conn.query('INSERT INTO customer set ?', [data], (err , customer) =>{
            //respuesta redireccioname a la ruta inicial del servidor
            res.redirect('./');
        });
    });
};

controller.edit = (req , res ) =>{
    const { id } = req.params;
    req.getConnection((err , conn) => {
        conn.query('SELECT * FROM customer WHERE id = ?', [id], (err , customer ) => {
            res.render('customer_edit', {
                data: customer[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const { name, address, phone } = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        }

        const updatedCustomer = { name, address, phone };

        conn.query('UPDATE customer SET ? WHERE id = ?', [updatedCustomer, id], (err, result) => {
            if (err) {
                res.json(err);
            }

            // Después de actualizar, redirige a la página principal
            res.redirect('/');
        });
    });
};


controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
};

module.exports = controller;