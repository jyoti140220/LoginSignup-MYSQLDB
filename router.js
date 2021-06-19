const express = require('express');
const routes = express.Router()
const mysql = require('mysql');
var router = express.Router()
const readlinesync = require('readline-sync').question
var router = express();
router.use(express.json());

//create mysql connection
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jyoti34@12',
    database: 'LoginSignupDB'

})


//connect the database
mysqlConnection.connect((err) => {
    if (!err)
        console.log("DB connection succeded..")
    else
        console.log("DB connection failed \n Error :" + JSON.stringify(err, undefined, 2))

})
router.get('/signup', (req, res) => {
    //both password same or not
    if (req.body.password1 != req.body.password2) {
        res.send("both password are not same")
    } else {
        if (req.body.password1.includes("@") && req.body.password1.includes("1") || req.body.password1.includes("2")) {
            mysqlConnection.query("SELECT * FROM USERDETIALS", (err, result, fields) => {
                if (!err) {
                    var a = true
                    var i = 0
                    while (i < result.length) {
                        if (result[i]['NAME'] == req.body.name && result[i]["PASSWORD"] == req.body.password1) {
                            a = false
                        }
                        i++
                    }
                    //user not exit for signup
                    if (a==true) {
                        res.send(`Congrats ${req.body.name} You Are Signed Up Successfully`)
                        var sql = `INSERT INTO USERDETIALS (NAME,PASSWORD,PASSWORD2) VALUES(?,?,?)`
                        mysqlConnection.query(sql, [req.body.name, req.body.password1, req.body.password2], (err, result, fields) => {
                            if (!err) {
                                console.log(result)
                            } else {
                                console.log(err)
                            }
                        })
                    //user alreday exit for signup
                    }else{
                        res.send(`ALEREADY EXISTS.... \n Congrats ${req.body.name} You Are Signed Up Successfully`)
                    }
                }else {
                    var err=err
                    // console.log(err)
                }
            })
        } else {
            res.send("atlist password should contain one special charcter and one number :-")
        }
    }
})

router.get('/login',(req,res)=>{
    mysqlConnection.query("SELECT * FROM USERDETIALS", (err, result, fields) => {
        if (!err) {
        //     console.log("***")
            var a = true,str="PROFILES :--"
            var i = 0
            while (i < result.length) {
                if (result[i]['NAME'] == req.body.name && result[i]["PASSWORD"] == req.body.password1) {
                    a = false
                }
                i++
            }
            if (a==true){
                res.send("invalid user name and password")
            }else{
                res.send(`login succesfully\n\n${str}\n UserName :- ${req.body.name}\n Gender :- ${req.body.gender}\n Bio :- ${req.body.bio}\n Hobbies :- ${req.body.hobbies}\n Dob :- ${req.body.dob}`)
            }
        }
    })
        

})
module.exports = router