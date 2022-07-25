module.exports = (sequelize, DataTypes) => {
  const Node = sequelize.define("node", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    parent:{
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
  return Node;
};
