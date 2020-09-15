const {Bussiness} = require('../../db');

exports.bussiness_create = function (req, res) {
    //.............................. validate request.......................................................
    if (!req.body.name || !req.body.nameBusiness || !req.body.nit || !req.body.city || !req.body.phone || !req.body.email || !req.body.nameProyect) {
      return res.status(400).send({
        success: false,
        message: "¡Por Favor ingrese todos los campos requeridos *!"
      });
    }
  
    // create a natural
    let bussiness = new Bussiness(
      ({ name, nameBusiness, nit, city, phone, email, nameProyect } = req.body)
    );
  
    //............................save natural in the database.........................................................
    bussiness
      .save()
      .then(data => {
        res.send({
          success: true,
          message: "¡Solicitud registrada con exito!",
          data: data
        });
      })
      .catch(err => {
        res.status(500).send(err);
        // console.log(err)
      });
  };
  


//......................... retrieve and return all natural .................................................................
exports.all_bussiness = (req, res) => {
    Bussiness.findAll()
      .then(data => {
        var message = "";
        if (data === undefined || data.length == 0) message = "¡No hay clientes externos registrados!";
        else message = "¡Clientes externos recuperados exitosamente!";
  
        res.send({
          success: true,
          message: message,
          data: data
        });
      })
      .catch(err => {
        res.status(500).send({
          success: false,
          message: "¡Ocurrió un error mientras se importaban los clientes Externos!"
        });
      });
  };
  
  // find a single natural with a id.
  exports.bussiness_details = (req, res) => {
    Bussiness.findByPk(req.params.id)
      .then(data => {
        if (!data) {
          return res.status(404).send({
            success: false,
            message: "Cliente externo no encontrado con el id " + req.params.id
          });
        }
        res.send({
          success: true,
          message: "¡Cliente externo encontrado exitosamente!",
          data: data
        });
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            success: false,
            message: "Cliente externo no encontrado con el id " + req.params.id
          });
        }
        return res.status(500).send({
          success: false,
          message: "¡Ocurrió un error mientras se importaba el cliente Externo con el id " + req.params.id
        });
      });
  };
  
  // update a natural by the id.
  exports.bussiness_update = (req, res) => {
    // validate request
    if (!req.body.name || !req.body.nit) {
      return res.status(400).send({
        success: false,
        message: "¡Por favor ingrese el nombre y el nit!"
      });
    }
  
    // find natural and update
    Bussiness.update({name: req.body.name, nameBusiness: req.body.nameBusiness, nit: req.body.nit, city: req.body.city, phone: req.body.phone, email: req.body.email, nameProyect: req.body.nameProyect, description: req.body.description, deadline: req.body.deadline},{where: {id: req.params.id}})
      .then(data => {
        if (!data) {
          return res.status(404).send({
            success: false,
            message: "Cliente externo no encontrado con el id " + req.params.id
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
            message: "Cliente externo no encontrado con el id " + req.params.id
          });
        }
        return res.status(500).send({
          success: false,
          message: "Error al actualizar el cliente externo con el id " + err
        });
      });
  };
  
  // delete a natural with the specified id.
  exports.bussiness_delete = (req, res) => {
    Bussiness.destroy({ where: { id : req.params.id }})
      .then(data => {
        if (!data) {
          return res.status(404).send({
            success: false,
            message: "Cliente externo no encontrado con el id " + req.params.id
          });
        }
        res.send({
          success: true,
          message: "¡Cliente externo eliminado exitosamente!"
        });
      })
      .catch(err => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            success: false,
            message: "Cliente externo no encontrado con el id " + req.params.id
          });
        }
        return res.status(500).send({
          success: false,
          message: "No podemos eliminar el cliente con el id " + req.params.id
        });
      });
  };
  