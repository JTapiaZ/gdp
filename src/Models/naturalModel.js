module.exports = (sequelize, type) => {
    return sequelize.define('natural', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
        },
        name: {
            type: type.STRING,
            required: true,
            max: 100
        },
        iDocument: {
          type: type.STRING,
          required: true,
          lowercase: true,
          unique: true,
          trim: true
        },
        city: {
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
          type: type.DATE,
          max: 25
        },
    })
}