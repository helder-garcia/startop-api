var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        

var config = require('./config');

var mongoose = require('mongoose');

mongoose.connect(config.db[app.settings.env]); 

var User = require('./app/models/user');
var Project = require('./app/models/project');

var router = express.Router(); 

// Users Routes
router.get("/users", async (req, res) => {
    const users = await User.find()
    res.send(users)
});
router.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        res.send(user)
    } catch {
        res.status(404)
        res.send({ error: "User not found." })
    }
});
router.post("/users", async (req, res) => {
    const user = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        whatsapp: req.body.whatsapp,
        type: req.body.type,
	projects: req.body.projects
    })
    await user.save()
    res.send(user)
})
router.patch("/users/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })

        if (req.body.username) {
           user.username = req.body.username;
        }

        if (req.body.name) {
            user.name = req.body.name;
        }

        if (req.body.email) {
            user.email = req.body.email;
        }

        if (req.body.password) {
            user.password = req.body.password;
        }

        if (req.body.phone) {
            user.phone = req.body.phone;
        }

        if (req.body.type) {
            user.type = req.body.type;
        }

        if (req.body.projects) {
            user.projects = req.body.projects;
        }

        await user.save()
        res.send(user)
    } catch {
        res.status(404)
        res.send({ error: "User not found." })
    }
});
router.delete("/users/:id", async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "User not found." })
    }
});

// Projects Routes
router.get("/projects", async (req, res) => {
    const projects = await Project.find()
    res.send(projects)
});
router.get("/projects/:id", async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.id })
        res.send(project)
    } catch {
        res.status(404)
        res.send({ error: "Project not found." })
    }
});
router.post("/projects", async (req, res) => {
    // const projectOwner = await User.findOne({ _id: req.body.owner });
    const project = new Project({
        name: req.body.name,
        description: req.body.description,
        businessPlan: req.body.businessPlan,
        videoPitch: req.body.videoPitch,
        presentation: req.body.presentation,
        segment: req.body.segment,
	projectStatus: req.body.projectStatus,
	owner: req.body.owner
    })
    await project.save()
    res.send(project)
})
router.patch("/projects/:id", async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.id })

        if (req.body.name) {
            project.name = req.body.name;
        }

        if (req.body.description) {
            project.description = req.body.description;
        }

        if (req.body.businessPlan) {
            project.businessPlan = req.body.businessPlan;
        }

        if (req.body.videoPitch) {
            project.videoPitch = req.body.videoPitch;
        }

        if (req.body.presentation) {
            project.presentation = req.body.presentation;
        }

        if (req.body.segment) {
            project.segment = req.body.segment;
        }

        if (req.body.projectStatus) {
            project.projectStatus = req.body.projectStatus;
        }

        if (req.body.owner) {
            project.owner = req.body.owner;
        }

        await project.save()
        res.send(project)
    } catch {
        res.status(404)
        res.send({ error: "Project not found." })
    }
});
router.delete("/projects/:id", async (req, res) => {
    try {
        await Project.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Project not found." })
    }
});

// Register our route
app.use('/', router);

// Start the server
app.listen(port);
console.log('Running on port ' + port);
