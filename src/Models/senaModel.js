module.exports = (sequelize, type) => {
    return sequelize.define('sena', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING,
            required: true,
            max: 100
        },
        regionalName: {
            type: type.STRING,
            required: true,
            max: 100
        },
        phone: {
          type: type.STRING,
          required: true,
          unique: true,
          max: 50
        },
        email: {
          type: type.STRING,
          required: true,
          lowercase: true,
          unique: true,
          trim: true
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
          type: type.STRING,
          max: 25
        }    
    })
}