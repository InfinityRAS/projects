const express = require("express");
const path = require("path");
const port = 8000;
const fs = require("fs");
const e = require("express");

const app = express();
app.use('/static', express.static(__dirname + '/static'));
app.use(express.urlencoded())

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));

app.get('/', (req, res) => {
    res.status(200).render('index.pug');
});

app.get('/signin', (req, res) => {
    res.status(200).render('signin.pug', {cont: "Sign in and Enjoy!"});
});

app.post('/signin', (req, res) => {
    const { id, pass } = req.body;
    const data = Array.from(fs.readFileSync("logNames.json", {"encoding": "utf-8"}))

    console.log(data)

    data.forEach(e => {
        if (e.id == id) {
            console.log("id matched!")

            if (e.pass == pass) {
                console.log("pass matched!")
                res.send("sign in success")
            }

            else res.status(200).render("signin.pug", {cont: "Invalid Credentials"})
        }

        else res.status(200).render("signin.pug", {cont: "Invalid Credentials"})
    });

    console.log(id,pass)

    res.status(200).send("all okay")
});

app.get("*", (req, res) => {
    res.status(404).send("not found")
})

app.post("*", (req, res) => {
    res.status(404).send("not found")
})

app.listen(port, () => {
    console.log(`Website has been succesfully started. URL: http://127.0.0.1:${port}`);
});
