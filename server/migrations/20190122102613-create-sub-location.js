module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SubLocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      maleResidents: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      femaleResidents: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      totalResidents: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      parentLocationId: {
        references: {
          model: 'ParentLocations',
          key: 'id',
          as: 'parentLocationId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
      },
    });
  },
  down: (queryInterface) => queryInterface.dropTable('SubLocations'),
};
