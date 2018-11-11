import * as Sequelize from 'sequelize'

export let name = 'guild'

export let config = {
  timestamps: true
}

export let table = {
  id: {
    type: Sequelize.CHAR(30),
    allowNull: false,
    unique: true,
    primaryKey: true
  }
}