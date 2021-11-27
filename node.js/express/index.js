import express from 'express';
import Joi from 'joi';
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'English'},
    {id: 2, name: 'Math'},
    {id: 3, name: 'Computer'}
];

app.get('/', (req, res) => {
    res.send('Hello nodejs!!');
});

// get方法带参数的写法
app.get('/api/course/:id', (req, res) => {
  let course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send(`There is no such course whose id is ${req.params.id}`);
  else res.send(course);
});

// ge方法中的query参数,即问号后面的参数
app.get('/api/course', (req, res) => {
    res.send(req.query);
});

// post方法
app.post('/api/upCourse', (req, res) => {
    const error = validateCourse(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id : courses.length,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// put方法
app.put('/api/course/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        res.status(404).send(`There is no such course whose id is ${req.params.id}`);
        return;
    }
    const { error } = validateCourse(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    
    course.name = req.body.name;
    res.send(course);
    console.log(courses[req.params.id - 1]);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

const port = process.env.MY_TEST_PORT || 3000;
app.listen(port, () => console.log(`The app is listening to the ${port}`));
