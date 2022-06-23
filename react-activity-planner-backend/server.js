const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const models = require('./models');
const session = require('express-session');
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(session({
    secret: 'superSecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 60 * 60000
    }
}))

app.get('/activities', (req, res) => {
    models.Activity.findAll().then((activities) => {
        res.json(activities);
    })
})

app.get('/activities/:userID', (req, res) => {
    let userID = parseInt(req.params.userID);

    if(typeof userID !== 'number'){
        res.json({});
        return
    }
    
    models.Activity.findAll({
        where: {
            user_id: userID
        }, order: [["completed", "ASC"], ["favorite", "DESC"], ["due_date", "ASC"]]
    }).then((activities) => {
        res.json(activities);
    })
})

// app.get('/dates/:activityID', (req, res) => {
//     let activityID = parseInt(req.params.activityID);

//     models.Activity
// })

app.post('/activities', (req, res) => {
    let { user_id, title, body, due_date } = req.body;

    models.Activity.create({
        user_id: user_id,
        title: title,
        body: body,
        due_date: due_date

    }).then(result => {
        res.json(result)
    })
})

app.post('/login', (req, res) => {
    let { username, password } = req.body;

    models.User.findOne({
        where: { username: username }
    }).then((user) => {
        if (!user) {
            res.json({ error: 'no user found with given username' })
            return;
        }

        bcrypt.compare(password, user.password, (err, match) => {
            if (match) {
                req.session.user = user;
                res.json({ user_id: user.id, success: true })
            } else {
                res.json({ error: 'incorrect password' })
            }
        })
    })
})

app.post('/register', (req, res) => {

    let { username, email, password } = req.body;

    models.User.findOne({
        where: { username: username }
    }).then((user) => {
        if (user) {
            res.json({ error: 'username already exists' })
            return;
        }

        bcrypt.hash(password, 10, (err, hash) => {
            models.User.create({
                username: username,
                email: email,
                password: hash,
            })
                .catch(err => { "error found: ", err })
                .then((result) => {
                    res.json({ success: true });
                })
        });
    })
})


//mark activity as completed
app.patch('/activities/:id', (req, res) => {
    let activityID = parseInt(req.params.id);
    let complete = req.body.completed;

    models.Activity.update({ completed: complete }, { where: { id: activityID } })
        .then(result => {
            console.log(result);
            return res.json(result)
        })
})

app.patch('/favorites/:id', (req, res) => {
    let activityID = parseInt(req.params.id);
    let favorite = req.body.favorite;

    console.log(activityID);
    console.log('here');

    models.Activity.update({ favorite: favorite }, { where: { id: activityID } })
        .then(result => {
            console.log(result);
            return res.json(result)
        })
})

app.delete('/activities/:id', (req, res) => {
    let activityID = parseInt(req.params.id);

    models.Activity.destroy({ where: { id: activityID } })
        .then(result => {
            return res.json(result);
        })
})

app.listen(PORT, function () {
    console.log('App is now listening on port 3001...');
});