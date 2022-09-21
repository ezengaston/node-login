const express = require("express");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

const app = express();

const users = [];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const name = req.body.name;
    const email = req.body.email;

    users.push({
      id: v4(),
      name,
      email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch (e) {
    res.redirect("/register");
  }
});

app.listen(3005);
