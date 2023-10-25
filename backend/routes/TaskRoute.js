const {Router} = require("express")
const {getTasks, saveTask, deleteTask, updateTask} = require("../controllers/TaskControllers")
const SignUp = require('../controllers/SignUp');
const router = Router();
const login = require('../controllers/login');
const auth = require('../controllers/auth');


router.post('/signup', SignUp); //routing
router.post('/login',login);
router.post('/auth', auth)

router.get("/get", getTasks);  //  it associates the /get route with the getTasks function, 
router.post("/save", saveTask);
router.put("/update/:id", updateTask); //In the context of a RESTful API, the HTTP PUT method is used to update or replace an existing resource or resource representation on the server.
router.delete("/delete/:id", deleteTask);


module.exports = router;