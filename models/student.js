module.exports = (sequelize, DataTypes) => {
  // define the model
  const Student = sequelize.define("Student", {
    // define columns in the data base (name and type)
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    starID: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    present: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  });

  // create or update table in the database.
  Student.sync({ force: false }).then(() => {
    console.log("Synced student table");
  });
  return Student;
};
