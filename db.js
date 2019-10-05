const Sequelize = require('sequelize');

const { UUID, UUIDV4, STRING, DECIMAL, TEXT } = Sequelize;

const conn = new Sequelize('postgres://localhost/final_project',{logging: false});

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
    validate:{
       notEmpty: true,
    isEmail: true
    }
  },
  GPA: {
    type: DECIMAL
  }
});

Student.belongsTo(School);
School.hasMany(Student);
let  mapOverSchool
try{
  mapOverSchool = async (schools) => await Promise.all(schools.map( school => School.create(school)));
}
catch(err){
  console.log(err)
}
const mapOverStudent = async (students) => await Promise.all(students.map( student => Student.create(student)));

const syncAndSeed = async ()=> {
  await conn.sync({force: true});



};

module.exports = {
  syncAndSeed,
  models:{
    School,
    Student
  },
  mapOverSchool,
  mapOverStudent
};

syncAndSeed();
