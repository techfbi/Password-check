//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const folderPath = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var correctPass = "";
var userAuthorized = false;


app.use(bodyParser.urlencoded({extended: true}));

function correctPassword(req, res, next) {
    correctPass = "Oluwafemi";
    if (req.body["password"] === correctPass) {
        userAuthorized = true;
        console.log("Correct password: ", req.body["password"]);
    }
    next();
}

app.use(correctPassword);

app.get("/", (req, res) => {
    res.sendFile(folderPath + "/public/index.html");
});

app.post("/check", (req, res) => {
    if (userAuthorized) {
        res.sendFile(folderPath + "/public/secret.html");
    } else {
        res.redirect("/");
        console.log("Wrong password: ", req.body["password"]);
    }

});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

