const Sequelize = require('sequelize');

const { UUID, UUIDV4, STRING, DECIMAL, TEXT } = Sequelize;

const conn = new Sequelize('postgres://localhost/final_project');

const School = conn.define('school', {
  id:{
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false
  },
  imageURL: TEXT,

});

const Student = conn.define('student', {
  id:{
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  firstName:{
    type: STRING,
    allowNull: false
  },
  lastName:{
    type: STRING,
    allowNull: false
  },
  email:{
    type: STRING,
    notEmpty: true,
    isEmail: true

  },
  GPA: {
    type: DECIMAL
  }
});

Student.belongsTo(School);
School.hasMany(Student);
