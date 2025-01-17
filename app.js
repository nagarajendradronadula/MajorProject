if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}
// console.log(process.env.secret);
//console.log("MongoDB URL:", process.env.ATLASDB);
// console.log("Session Secret:", process.env.SECRET);


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");


const dbUrl = process.env.ATLASDB;

// console.log("MongoDB URL (dbUrl):", dbUrl);

if (!dbUrl) {
  console.error("Error: MongoDB URL is not defined. Check your environment variables.");
  process.exit(1);  // Exit if dbUrl is not set, to prevent further errors
}

const store = MongoStore.create({
  mongoUrl: dbUrl,
  // crypto:{
  //   secret: process.env.SECRET,
  // },
  touchAfter: 24 * 60 * 60,
});

store.once("error", (e) => {
  console.log("SESSION STORE ERROR", e);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 1000,
    httpOnly: true,
  },
};

// const mongoUrl = "mongodb://127.0.0.1:27017/wonderlust";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose.connect(dbUrl)
.then(() => {
  console.log("Connected to Database");
})
.catch(err => {
  console.log("Database connection error:", err);
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  // console.log(res.locals.success);
  next();
})

// app.get("/demouser", async (req, res) => {
//   let fakeUser = {
//     email: "student@gmail.com",
//     username: "delta-student-apnacollege",
//   };

//   let registeredUser = await User.register(fakeUser, "HelloWorld!");
//   res.send(registeredUser);
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// Error handling
// app.all("*", (req, res, next) => {
//   next(new expressError(404, "Page Not Found"));
// });

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something Went Wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
  console.log(err);
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
