const Product = require('../models/product');

exports.product_create = function (req, res) {
    if(!req.body.name || !req.body.price || !req.body.description || !req.body.pack){
        return res.status(400).send({
            success: false,
            message: "introduzca todos los valores"
        });
    }
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            pack: req.body.pack
        }
    );

    // grabar los datos
    product.save()
    .then(data => {
        res.send({
            success: true,
            message: 'producto creado correctamente',
            data: data
        });
    });
};
// obtener todos los productos

exports.all_products = (req, res) => {
    Product.find()
    .then(data => {
        var message = "";
        if(data === undefined || data.length == 0) message = "no hay productos";
        else message = "se han procesado los datos correctamente";

        res.send({
            success: true,
            message: message,
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "ha ocurrido un error mientras se procesaban los datos"
        });
    });
};

exports.product_details = (req, res) => {
    Product.findById(req.params.id)
    .then(data => {
        if(!data){
            return res.status(404).send({
                success: false,
                message: "producto no encontrado por su id:" + req.params.id
            });

        }
        res.send({
            success: true,
            message: "producto obtenido correctamente",
            data: data
        });
    }).catch(err => {
       if(err.kind === 'ObjectId') {
           return res.status(404).send({
               success: false,
               message: "El producto no se encuentra con este id:" + req.params.id
           });
       }
       return res.status(500),send({
           success: false,
           message: "error interno en el producto con id:" + req.params.id
       });
        });
    
};

// update del producto por su id
exports.product_update = (req, res) => {
    // validar el request
    if(!req.body.name || !req.body.price || !req.body.description || !req.body.pack ){
        return res.status(400).send({
            success: false,
            message: "introducta correcamente los datos"
        });
    }
    // encontrar el producto y modificarlo
    Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
       .then(data => {
           if(!data){
               return res.status(404).send({
                   success: false,
                   message: "Producto no encontrado con ese id:" + req.params.id
               });
           }
           res.send({
               success: true,
               data: data
           });
       }).catch(err => {
           if(err.kind === 'ObjectId') {
               return res.status(404).send({
                   success: false,
                   message: "el producto no se encuentra con ese id:" + req.params.id
               });
           }
           return res.status(500).send({
               success: false,
               message: "error en la modificación del producto con ese id:" + req.params.id
           });
       });
};

// elimianr un producto con id específico
exports.product_delete = (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then(data =>{
            if(!data){
                return res.status(404).send({
                    success: false,
                    message: "producto no encontrado con este id:" + req.params.id
                });
            }
            res.send({
                success: true,
                message: "El producto se ha elimando correctamente"
            });
        }).catch(err => {
            if(err.kind == 'ObjectId' || err.name === 'NotFound'){
                return res.status(404).send({
                    success: false,
                    message: "producto no encontrado donde id:" + req.params.id
                });
            }
            return req.status(500).send({
                success: false,
                message: "no se ha podido eliminar el producto con id:" + req.params.id
            });
        });
};
