module.exports = (sequelize, type) => {
    return sequelize.define('bussiness', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
        },
        name: {
            type: type.STRING,
            required: true,
            max: 100
        },
        nameBusiness: {
            type: type.STRING,
            required: true,
            max: 100
        },
        nit: {
            type: type.STRING,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            max: 100
        },
        city: {
            type: type.STRING,
            required: true,
            max: 50
        },
        phone: {
            type: type.STRING,
            required: true,
            unique: true,
            max: 16
        },     
        email: {
          type: type.STRING,
          required: true,
          lowercase: true,
          unique: true,
          trim: true,
          max: 150
        },
        nameProyect: {
          type: type.STRING,
          required: true,
          unique: true,
          max: 100
        },
        description: {
          type: type.STRING,
          max: 5000
        },    
        deadline: {
          type: type.DATE,
          max: 25
        }    
    })
}