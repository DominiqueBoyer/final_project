const Sequelize = require('sequelize');

const { UUID, UUIDV4, STRING, DECIMAL, TEXT } = Sequelize;

const conn = new Sequelize('postgres://localhost/final_project', {logging: false});

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

const mapOverSchool = async (schools) => await Promise.all(schools.map( school => School.create(school)));
const mapOverStudent = async (students) => await Promise.all(students.map( student => Student.create(student)));

const syncAndSeed = async ()=> {
  await conn.sync({force: true});
  const schools = [
    { name: 'MIT', imageURL: '' },
    { name: 'Harvard', imageURL: '' },
    { name: 'UCLA', imageURL: '' },
    { name: 'CCNY', imageURL: '' },
    { name: 'CAL POLY SLO', imageURL: '' }
  ];
  const [ mit, harvard, ucla, ccny, cpSLO ] = await mapOverSchool(schools);

  const students = [
    { firstName: 'Larry', lastName:'Smith', email:'larry@gmail.com', GPA: 3.0, schoolId: ucla.id },
    { firstName: 'Grace', lastName:'Jones', email:'grace@gmail.com', GPA: 2.6, schoolId: harvard.id },
    { firstName: 'Tommy', lastName:'Lee', email:'tom@gmail.com', GPA: 3.2, schoolId: null },
    { firstName: 'Dominique', lastName:'Boyer', email:'dominique@gmail.com', GPA: 4.0, schoolId: cpSLO.id },
    { firstName: 'Zoe', lastName:'the Cat', email:'cat@gmail.com', GPA: 2.0, schoolId: cpSLO.id}
  ];
  const [larry, grace, tommy, dominique, zoe ] = await mapOverStudent(students);

};

module.exports = {
  syncAndSeed,
  models:{
    School,
    Student
  }
};

