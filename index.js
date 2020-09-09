const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
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
      name: "license",
      message: "Enter the projects license",
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
      name: "License",
      message: "Enter the license information",
    },
  ]);
}

function generateMD(answers) {
  return `
  # ${answers.title}

${answers.license}
  ![GitHub repo size](https://img.shields.io/github/repo-size/scottydocs/README-template.md)
  
## ${answers.description}

  
  ## Installing <project_name>
  
  To install <project_name>, follow these steps:
  
  Linux and macOS:
  ```
  <install_command>
  ```
  
  Windows:
  ```
  <install_command>
  ```
  ## Using <project_name>
  
  To use <project_name>, follow these steps:
  
  ```
  <usage_example>
  ```
  
  Add run commands and examples you think users will find useful. Provide an options reference for bonus points!
  
  ## Contributing to <project_name>
  <!--- If your README is long or you have some specific process or steps you want contributors to follow, consider creating a separate CONTRIBUTING.md file--->
  To contribute to <project_name>, follow these steps:
  
  1. Fork this repository.
  2. Create a branch: `git checkout -b <branch_name>`.
  3. Make your changes and commit them: `git commit -m '<commit_message>'`
  4. Push to the original branch: `git push origin <project_name>/<location>`
  5. Create the pull request.
  
  Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).
  
  ## Contributors
  
  Thanks to the following people who have contributed to this project:
  
  * [@scottydocs](https://github.com/scottydocs) 📖
  * [@cainwatson](https://github.com/cainwatson) 🐛
  * [@calchuchesta](https://github.com/calchuchesta) 🐛
  
  You might want to consider using something like the [All Contributors](https://github.com/all-contributors/all-contributors) specification and its [emoji key](https://allcontributors.org/docs/en/emoji-key).
  
  ## Contact
  
  If you want to contact me you can reach me at <your_email@address.com>.
  
  ## License
  <!--- If you're not sure which open license to use see https://choosealicense.com/--->
  
  This project uses the following license: [<license_name>](<link>).
`;
}

promptUser()
  .then(function (answers) {
    const html = generateHTML(answers);

    return writeFileAsync("index.html", html);
  })
  .then(function () {
    console.log("Successfully wrote to index.html");
  })
  .catch(function (err) {
    console.log(err);
  });
