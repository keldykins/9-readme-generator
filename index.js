const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
  {
    type: "input",
    name: "title",
    message: "What is your project title?",
  },
  {
    type: "input",
    name: "description",
    message: "What is the description of your project?",
  },
  {
    type: "input",
    name: "tableofcontents",
    message: "What is your table of contents?",
  },
  {
    type: "input",
    name: "installation",
    message: "What is the installation of your project?",
  },
  {
    type: "input",
    name: "usage",
    message: "Enter the projects usage",
  },
  {
    type: "input",
    name: "contributing",
    message: "Enter the contributors of the project",
  },
  {
    type: "input",
    name: "tests",
    message: "Enter the projects tests",
  },
  {
    type: "input",
    name: "license",
    message: "Enter the license information",
  },
];

function promptUser(array) {
  return inquirer.prompt(array);
}

function generateMarkdown(results) {
  return `
  # ${results.title}
## ${results.description}
## ${results.tableofcontents}
## ${results.license}
## ${results.contributing}
## ${results.tests}
  ![GitHub repo size](https://img.shields.io/github/repo-size/scottydocs/README-template.md)
`;
}

promptUser(questions)
  .then(function (answers) {
    const md = generateMarkdown(answers);

    return writeFileAsync("README.md", md);
  })
  .then(function () {
    console.log("Successfully wrote to README.md");
  })
  .catch(function (err) {
    console.log(err);
  });
