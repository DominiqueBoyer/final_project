const express = require('express');
const app = express();
const db = require('./db');
const { mapOverSchool, mapOverStudent} = db;
const { School, Student } = db.models;
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/src', express.static(path.join(__dirname, 'src')));


app.use(express.json());

app.get('/', async (req, res, next)=>{
  try{
    res.sendFile( await path.join(__dirname, './index.html'));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/students', async (req, res, next) =>{
  const student = await Student.create(req.body)
  res.send( student )
});

app.delete('/api/students/:id', async (req, res, next)=>{
  await Student.destroy({where: {id: req.params.id}})
  res.sendStatus(204)
});

app.put('api/students/:id', async (req, res, next )=>{
  const student = await Student.update(req.body.schoolId, {where: {id: req.params.id }, returning: true })
  res.send( student[1] )
})
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
  .then(()=> {

    app.listen(3000, ()=> console.log('LISTENING ON 3000'));
  })

