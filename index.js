/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
import inquirer from 'inquirer';
*/
import fs from "fs";
import inquirer from 'inquirer';
import qr from "qr-image";

inquirer
  .prompt([
    {    
    /* Pass your questions in here */
    message: "Type in your URL",
    name: "URL",
    },
  ])
  .then((answers) => {
    var qr_svg = qr.image(answers.URL);
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));
    // Use user feedback for... whatever!!
    fs.writeFile("URL.txt",answers.URL,(err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
