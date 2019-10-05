const express = require('express');
const app = express();
const db = require('./db');
const { mapOverSchool, mapOverStudent} = db;
const { School, Student } = db.models;
const path = require('path');


app.use(express.json());
app.get('/', async (req, res, next)=>{
  try{
    res.sendFile( await path.join(__dirname, './index.html'));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/schools', async(req, res, next ) =>{
  School.findAll()
    .then( school => res.send(school))
    .catch(next)
});

app.get('/api/students', async (req, res, next ) =>{
  Student.findAll()
    .then( student => res.send(student))
    .catch(next)
});

db.syncAndSeed()
  .then(async ()=> {
    const schools = [
      { name: 'MIT', imageURL: '' },
      { name: 'Harvard', imageURL: '' },
      { name: 'UCLA', imageURL: '' },
      { name: 'CCNY', imageURL: '' },
      { name: 'Brown', imageURL: '' },
      { name: 'Apex Tech', imageURL: '' },
      { name: 'CAL POLY SLO', imageURL: '' }
    ];
    const [ mit, harvard, ucla, ccny, brown, apexTech, cpSLO ] = await mapOverSchool(schools);

    const students = [
      { firstName: 'Larry', lastName:'Smith', email:'larry@gmail.com', GPA: 3.0, schoolId: ucla.id },
      { firstName: 'Grace', lastName:'Jones', email:'grace@gmail.com', GPA: 2.6, schoolId: harvard.id },
      { firstName: 'Tommy', lastName:'Lee', email:'tom@gmail.com', GPA: 3.2, schoolId: null },
      { firstName: 'Dominique', lastName:'Boyer', email:'dominique@gmail.com', GPA: 4.0, schoolId: cpSLO.id },
      { firstName: 'Zoe', lastName:'the Cat', email:'cat@gmail.com', GPA: 2.0, schoolId: null}
    ];
    const [larry, grace, tommy, dominique, zoe ] = await mapOverStudent(students);
    app.listen(3000, ()=> console.log('LISTENING ON 3000'));
  })

