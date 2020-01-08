// DECLARATIONS & REQUIREMENTS
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

// const electron = require("electron");
// const electronHTMLto = require("electron-html-to");

var username;
var usercolor;

var gitInfo;

// store pdf?
// var ;

// COLOR DEFENITIONS
const colors = {
    green: {
      wrapperBackground: "#E6E1C3",
      headerBackground: "#C1C72C",
      headerColor: "black",
      photoBorderColor: "#black"
    },
    blue: {
      wrapperBackground: "#5F64D3",
      headerBackground: "#26175A",
      headerColor: "white",
      photoBorderColor: "#73448C"
    },
    pink: {
      wrapperBackground: "#879CDF",
      headerBackground: "#FF8374",
      headerColor: "white",
      photoBorderColor: "#FEE24C"
    },
    red: {
      wrapperBackground: "#DE9967",
      headerBackground: "#870603",
      headerColor: "white",
      photoBorderColor: "white"
    }
  };

// INQUIRER PROMPT
inquirer.prompt([
  {
    type: "input",
    name: "username",
    message: "What is your GitHub username?"
  },
  {
    type: "checkbox",
    message: "What is your favorite color?",
    name: "color",
    choices: [
      "green", 
      "blue", 
      "pink", 
      "red"
    ]
  },
]).then(function(response) {
  username = response.username;
  usercolor = response.color;

  const queryURL = "https://api.github.com/users/" + username;
  axios.get(queryURL).then(function(response) {
    gitInfo = response;
    console.log("Hello " + username + "! Your favorite color is " + usercolor + ".")
    // console.log(gitInfo.data);

    // console.log(gitInfo.data.login);
    // console.log(gitInfo.data.name);
    // console.log(gitInfo.data.avatar_url);
    // console.log(gitInfo.data.bio);
    // console.log(gitInfo.data.public_repos);
    // console.log(gitInfo.data.followers);
    // console.log(gitInfo.data.following);

    // // THESE NEED TO BE LINKED
    // console.log(gitInfo.data.location);
    // console.log(gitInfo.data.html_url);
    // console.log(gitInfo.data.blog);

    // generateHTML();

    // console.log(colors[data.usercolor]);


    generateHTML();

  });
});


// GENERATE HTML
function generateHTML() {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <title>Test Profile PDF</title>
      <!-- Bootstrap CSS -->
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      <style>
        @page {
          margin: 0;
        }
        *,
        *::after,
        *::before {
        box-sizing: border-box;
        }
        html, body {
        padding: 0;
        margin: 0;
        }
        html, body, .wrapper {
        height: 100%;
        }
        .wrapper {
          /* TEMP */
          /* background-color: pink;
          padding-top: 100px; */
          /* ORIG */
          padding-top: 100px;
        }
        body {
        background-color: white;
        -webkit-print-color-adjust: exact !important;
        font-family: 'Cabin', sans-serif;
        }
        main {
        background-color: #E9EDEE;
        height: auto;
        padding-top: 30px;
        }
        h1, h2, h3, h4, h5, h6 {
        font-family: 'BioRhyme', serif;
        margin: 0;
        }
        h1 {
        font-size: 3em;
        }
        h2 {
        font-size: 2.5em;
        }
        h3 {
        font-size: 2em;
        }
        h4 {
        font-size: 1.5em;
        }
        h5 {
        font-size: 1.3em;
        }
        h6 {
        font-size: 1.2em;
        }
        .photo-header {
        position: relative;
        margin: 0 auto;
        margin-bottom: -50px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        /* TEMP */
        /* background-color: blue;
        color: black; */
        /* ORIG */
        padding: 10px;
        width: 95%;
        border-radius: 6px;
        }
        .photo-header img {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        object-fit: cover;
        margin-top: -75px;
        /* TEMP */
        /* border: 6px solid red; */
        /* ORIG */
        box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
        }
        .photo-header h1, .photo-header h2 {
        width: 100%;
        text-align: center;
        }
        .photo-header h1 {
        margin-top: 10px;
        }
        .links-nav {
        width: 100%;
        text-align: center;
        padding: 20px 0;
        font-size: 1.1em;
        }
        .nav-link {
        display: inline-block;
        margin: 5px 10px;
        }
        .workExp-date {
        font-style: italic;
        font-size: .7em;
        text-align: right;
        margin-top: 10px;
        }
        .container2 {
        padding: 50px;
        padding-left: 100px;
        padding-right: 100px;
        }
        .row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-top: 20px;
          margin-bottom: 20px;
        }
        .card {
          padding: 20px;
          border-radius: 6px;
          /* TEMP */
          /* background-color: yellowgreen;
          color: purple; */
          /* ORIG */
          margin: 20px;
        }
        .col {
        flex: 1;
        text-align: center;
        }
        a, a:hover {
        text-decoration: none;
        color: inherit;
        font-weight: bold;
        }
        @media print { 
          body { 
            zoom: .75; 
          } 
        }
      </style>
    </head>

    <body>
      <div class="container wrapper">
        <!-- PHOTO-HEADER -->
        <div class="photo-header">
          <!-- GITHUB PROF PIC -->
          <img src="${gitInfo.data.avatar_url}" class="card-img" alt="user profile pic">
          <h1>Hello!</h1>
          <!-- GITHUB NAME -->
          <h2>My name is <span>${gitInfo.data.name}</span></h2>

          <div class="row">
            <div class="col">
              <a href="${gitInfo.data.location}" class="">My Location</a>
            </div>
            <div class="col">
              <a href="${gitInfo.data.html_url}" class="">GitHub</a>
            </div>
            <div class="col">
              <a href="${gitInfo.data.blog}" class="">Blog</a>
            </div>
          </div>
        <!-- END PHOTO-HEADER -->
        </div>

        <div class="container2">
          <!-- FIRST ROW -->
          <div class="row">
            <div class="col">
              <h4>${gitInfo.data.bio}</h2>
            </div>
          </div>

          <!-- SECOND ROW -->
          <div class="row">
            <div class="col">
              <div class="card">
                <h3>Public Repositories</h3>
                <h4>${gitInfo.data.public_repos}</h4>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <h3>Followers</h3>
                <h4>${gitInfo.data.followers}</h4>
              </div>
            </div>
          </div>

          <!-- THIRD ROW -->
          <div class="row">
            <div class="col">
              <div class="card">
                <h3>GitHub Stars</h3>
                <h4>Number goes Here</h4>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <h3>Following</h3>
                <h4>${gitInfo.data.following}</h4>
              </div>
            </div>
          </div>
        <!-- END CONTAINER -->
        </div>

    </body>
    `;
  };



































// var electron = require("electron");
// var proc = require("child_process");

// var inquirer = require("inquirer");
// var fs = require('fs');

//     convertFactory = require("electron-html-to");

// var conversion = convertFactory({
//     converterPath: convertFactory.converters.PDF
// });

// conversion({ html: '<h1>Text HTML Conversion</h1>' }, function(err, result) {
//     if (err) {
//         return console.error(err)
//     }
//     console.log(result.numberOfPages);
//     console.log(result.logs);
//     result.stream.pipe(fs.createWriteStream('./testFolder/test.pdf'));
// })
