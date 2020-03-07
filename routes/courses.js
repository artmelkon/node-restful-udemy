  const express = require('express');
  const router = express.Router();

  const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'}
  ];
  
  router.get('/', (req, res, next) => {
  res.send(courses);
  })
  
  router.post('/', (req, res, next) => {
  const { error } = validateCourse(req.body);
  if(error) return res.status(400).send(error.details[0].message)
  
  const course = {
  id: courses.length + 1,
  name: req.body.name
  }
  courses.push(course);
  res.send(course);
  })
  
  router.put('/:id', (req, res) => {
  // look up the course if exist update if not then send 404
  const course = courses.find( c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The requested ID could not be found...!');
  
  // validate
  // if invalid, return 400 -bad request
  const { error } = validateCourse(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  // update course
  course.name = req.body.name;
  
  // return response
  res.send(course);
  });
  
  router.delete('/:id', (req, res) => {
  const course = courses.find( c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('Requested ID could not be found...!');
  
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  
  res.send(course);
  })
  
  router.get('/:id', (req, res, next) => {
  const course = courses.find( c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('Requested ID could not be found...!');
  res.send(course);
  
  // =========================================
  /* Another variation to get the request  */
  // =========================================
  
  // const courseIndex = courses.findIndex( c => c.id === parseInt(req.params.id));
  // // console.log(parseInt(req.params.id));
  // console.log(courses[courseIndex]);
  
  // if(courseIndex < 0) res.status(404).send("Requested course could not be found...!");
  // return res.send(courses[courseIndex]);
  })
  
  function validateCourse(course) {
  const schema = { name: Joi.string().min(3).required() }
  return Joi.validate(course, schema);
  }

module.exports = router;