const {Sena} = require('../../db');

exports.sena_create = function (req, res) {
    //.............................. validate request.......................................................
    if (!req.body.name || !req.body.regionalName  || !req.body.phone || !req.body.email || !req.body.nameProyect) {
      return res.status(400).send("¡Por Favor ingrese todos los campos requeridos *!");
    }
  
    // create a natural
    let sena = new Sena(
      ({ name, regionalName, phone, email, nameProyect, description, deadline } = req.body)
    );
  
    //............................save natural in the database.........................................................
    sena
      .save()
      .then(data => {
        res.send("¡Solicitud registrada con exito!");
      })
      .catch(err => {
        res.status(500).send("¡Ocurrio un error al registrar la solicitud!");
        console.log(err)
      });
  };
  


//......................... retrieve and return all natural .................................................................
exports.all_sena = (req, res) => {
    Sena.findAll()
      .then(data => {
        var message = "";
        if (data === undefined || data.length == 0) message = "¡No hay clientes internos registrados!";
        else message = "¡Clientes internos recuperados exitosamente!";
  
        res.send({
          success: true,
          message: message,
          data: data
        });
      })
      .catch(err => {
        res.status(500).send({
          success: false,
          message: "¡Ocurrió un error mientras se importaban los clientes Internos!"
        });
      });
  };
  
  // find a single natural with a id.
  exports.sena_details = (req, res) => {
    Sena.findByPk(req.params.id)
      .then(data => {
        if (!data) {
          return res.status(404).send({
            success: false,
            message: "Cliente interno no encontrado con el id " + req.params.id
          });
        }
        res.send({
          success: true,
          message: "¡Cliente interno encontrado exitosamente!",
          data: data
        });
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            success: false,
            message: "Cliente interno no encontrado con el id " + req.params.id
          });
        }
        return res.status(500).send({
          success: false,
          message: "¡Ocurrió un error mientras se importaba el cliente Interno con el id " + req.params.id
        });
      });
  };
  
  // update a natural by the id.
  exports.sena_update = (req, res) => {
    // validate request
    if (!req.body.name || !req.body.regionalName) {
      return res.status(400).send({
        success: false,
        message: "¡Por favor ingrese el nombre y el nombre de la Regional!"
      });
    }
  
    // find natural and update
    Sena.update({name: req.body.name, regionalName: req.body.regionalName, phone: req.body.phone, email: req.body.email, nameProyect: req.body.nameProyect, description: req.body.description, deadline: req.body.deadline},{where: {id: req.params.id}})
      .then(data => {
        if (!data) {
          return res.status(404).send({
            success: false,
            message: "Cliente interno no encontrado con el id " + req.params.id
          });
        }
        res.send({
          success: true,
          data: data
        });
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            success: false,
            message: "Cliente interno no encontrado con el id " + req.params.id
          });
        }
        return res.status(500).send({
          success: false,
          message: "Error al actualizar el cliente interno con el id " + err
        });
      });
  };
  
  // delete a natural with the specified id.
  exports.sena_delete = (req, res) => {
    Sena.destroy({ where: { id : req.params.id }})
      .then(data => {
        if (!data) {
          return res.status(404).send({
            success: false,
            message: "Cliente interno no encontrado con el id " + req.params.id
          });
        }
        res.send({
          success: true,
          message: "¡Cliente interno eliminado exitosamente!"
        });
      })
      .catch(err => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            success: false,
            message: "Cliente interno no encontrado con el id " + req.params.id
          });
        }
        return res.status(500).send({
          success: false,
          message: "No podemos eliminar el cliente interno con el id " + req.params.id
        });
      });
  };

  exports.log = (req, res) => {
    console.log('WORKS');
    res.status(200).send('WORKS')
  }
  