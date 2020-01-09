// DECLARATIONS & REQUIREMENTS
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const convertFactory = require('electron-html-to');

var username;
var usercolor;
var userprofile;
var gitInfo;

// COLOR DEFENITIONS
const colors = {
    green: {
      wrapperBackground: "#E6E1C3",
      headerBackground: "#C1C72C",
      headerColor: "black",
      photoBorderColor: "black"
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
  usercolor = colors[response.color];

  const queryURL = "https://api.github.com/users/" + username;
  axios.get(queryURL).then(function(response) {

    gitInfo = response;
    var userObj = {
      gitInfo: gitInfo,
      usercolor: usercolor
    };
    console.log(gitInfo.data)
    return userObj;
    
  }).then(function(userObj) {
    userprofile = username + ".html";
    fs.writeFile(userprofile, generateHTML(userObj), function
    (err) {
      if (err) {
        throw err;
      }
      console.log("Success!")

      // PDF CONVERSION
      fs.readFile(userprofile, 'utf8', (err, htmlString) => {
        // add local path in case your HTML has relative paths
        htmlString = htmlString.replace(/href="|src="/g, match => {
          // return match + 'file://Desktop/hw-repos/Developer-Profile-Generator/profiles';
        });
        const conversion = convertFactory({
          converterPath: convertFactory.converters.PDF,
          allowLocalFilesAccess: true
        });
        conversion({ html: htmlString }, (err, result) => {
          if (err) return console.error(err);
          result.stream.pipe(fs.createWriteStream('./profiles/' + username + '.pdf'));
          conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
        });
      });

      
    });
  });
});



// GENERATE HTML
function generateHTML(data) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <title>${data.gitInfo.data.name}</title>
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
          /* ORIG */
          background-color: ${data.usercolor.wrapperBackground};
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
        /* ORIG */
        background-color: ${data.usercolor.headerBackground};
         color: ${data.usercolor.headerColor};
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
        /* ORIG */
        border: 6px solid ${data.usercolor.photoBorderColor};


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
          /* ORIG */
          background-color: ${data.usercolor.headerBackground};
           color: ${data.usercolor.headerColor};
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


