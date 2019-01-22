export default (sequelize, DataTypes) => {
  const ParentLocation = sequelize.define('ParentLocation', {
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
  }, {});

  ParentLocation.associate = (models) => {
    ParentLocation.hasMany(models.SubLocation, {
      as: 'subLocations',
      foreignKey: 'parentLocationId',
    });
  };
  return ParentLocation;
};
