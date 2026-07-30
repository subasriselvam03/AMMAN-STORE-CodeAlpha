const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));
console.log("Sever file loaded");

app.get("/", function (req, res) {
    console.log("Home route called");
    res.send("Home Changed");
});

app.get("/products", function (req, res) {
    db.query("SELECT * FROM products", function(err, result)
{
    if(err)
    {
        res.send(err);
    }else{
        res.json(result);
    }

});
});

app.get("/test",function(req,res){
    res.send("Test Route Working");});
    app.post("/register",function(req,res){
        const {username, email, password } = req.body;
        db.query(
            "INSERT INTO users(username, email, password) VALUES(?, ?, ?)",
            [username, email, password],
            function(err, result){
                if(err){
                    res.send(err);
                }
                else{
                    res.send("User Registered Successfully");
                }
            }
        );
    });
    app.post("/login", function(req,res){
        const{ email, password} = req.body;
        db.query("SELECT * FROM users WHERE email = ?" ,
            [email],
            function(err,result){
                if(err){
                    res.send(err);
                }else{
                    if(result.length === 0){
                        res.json({
                            message:"User not Found"
                        });
                    }else{
                        if(result[0].password === password){
                           res.json({
                            message: "Login Successful",
                            username: result[0].username
                           });
                        }else{
                            res.json({
                                message: "Invalid Password"});
                        }
                    }
                }
            }
        );
    });
    app.post("/place-order",function(req,res){
        const{
            username,product_name,quantity,total_price}=req.body;
            db.query("INSERT INTO orders(username, product_name,quantity, total_price)VALUES(?,?,?,?)",
                [username, product_name,quantity, total_price],
                function(err,result){
                    if(err){
                        res.send(err)
                    }else{
                        res.send("Order placed Successfully")
                    }
                }
                );
        });
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});