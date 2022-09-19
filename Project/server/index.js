const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Movie = require("./models/movies.js");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTION");
  next();
});

app.post("/store-movies", (req, res, next) => {
  fs.readFile("titles.json", (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    let body = data.toString();
    body = JSON.parse(body);
    body.forEach((ele) => {
      let arr = ele.genres.slice(1, ele.genres.length - 1);
      arr = arr.split(",");
      const movie = new Movie({
        title: ele.title,
        type: ele.type,
        description: ele.description,
        release_year: ele.release_year,
        age_certification: ele.age_certification,
        runtime: ele.runtime,
        genres: arr,
        seasons: ele.seasons,
        imdb_score: ele.imdb_score,
      });
      movie.save();
    });
    console.log(body.length);
    return res.status(200).json({
      message: "Success",
    });
  });
  // .then((saved) => {
  //   res.status(201).json({
  //     message: "Success",
  //     data: saved,
  //   });
  // })
  // .catch((err) => {
  //   console.log(err);
  //   res.status(500).json({
  //     message: "Error",
  //   });
  // });
});

app.post("/movies", (req, res, next) => {
  const pageNo = req.body.pageno || 1;
  Movie.find()
    .skip((pageNo - 1) * 50)
    .limit(50)
    .then((data) => {
      res.status(200).json({
        message: "Success",
        pageno: pageNo,
        data: data,
        reqDate: req.body.date,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error",
      });
    });
});

mongoose.connect("mongodb://mongodb:27017/prime-shows", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Mongodb Connected!!");
    app.listen(80);
  }
});
