export default (sequelize, DataTypes) => {
  const SubLocation = sequelize.define('SubLocation', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Location already exists',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Location name field cannot be empty',
        },
        len: {
          args: [2, 30],
          msg: 'Location name characters must be minimum 2 and maximum 30',
        },
      },
    },
    maleResidents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    femaleResidents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalResidents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {});

  SubLocation.associate = (models) => {
    SubLocation.belongsTo(models.ParentLocation, {
      foreignKey: 'parentLocationId',
      as: 'parentLocation',
      onDelete: 'CASCADE',
    });
  };
  return SubLocation;
};
