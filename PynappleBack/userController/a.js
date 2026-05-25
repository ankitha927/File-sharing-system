const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
dotenv.config();

let activeTokens = {};

function generateToken() {
  return crypto.randomBytes(20).toString("hex");
}

const tuploadImage = async (request, response) => {
  const fileObj = {
    path: request.file.path,
    name: request.file.originalname,
    user: request.body.uid,
  };

  try {
    const token = generateToken();
    const expiry = Date.now() + 60 * 1000;

    activeTokens[token] = {
      fileObj: fileObj,
      expiry: expiry,
    };

    const temporaryLink = `${process.env.backend}/api/v1/tfile/${token}`;
    response.status(200).json({ path: temporaryLink });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
};

const tgetImage = async (request, response) => {
  try {
    const token = request.params.fileId;
    // console.log("Came inside", token)
    if (token in activeTokens && activeTokens[token].expiry > Date.now()) {
      const fileObj = activeTokens[token].fileObj;

      const htmlPath = path.join(__dirname, "../static/download.html");
      fs.readFile(htmlPath, "utf8", (err, html) => {
        if (err) {
          console.error("Error reading HTML file:", err);
          return response.status(500).send("Error reading HTML file");
        }

        const htmlResponse = html.replace("${token}", token);
        return response.status(200).send(htmlResponse);
      });
    } else {
      const htmlPath = path.join(__dirname, "../static/expiry.html");
      fs.readFile(htmlPath, "utf8", (err, html) => {
        if (err) {
          console.error("Error reading HTML file:", err);
          return response.status(500).send("Error reading  file");
        }
        const htmlResponse = html.replace("${token}", token);
        return response.status(200).send(htmlResponse);
      });
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ msg: error.message });
  }
};

const tdownloadFile = async (request, response) => {
  try {
    const token = request.params.fileId;

    console.log("Download triggered for", token);
    if (token in activeTokens && activeTokens[token].expiry > Date.now()) {
      const fileObj = activeTokens[token].fileObj;

      response.download(fileObj.path, fileObj.name, (err) => {
        if (err) {
          console.error("Error during download:", err);
          return response.status(500).send("Error downloading file");
        } else {
          delete activeTokens[token];
          console.log("File downloaded successfully");
        }
      });
    } else {
      const htmlPath = path.join(__dirname, "../static/expiry.html");
      fs.readFile(htmlPath, "utf8", (err, html) => {
        if (err) {
          console.error("Error reading HTML file:", err);
          return response.status(500).send("Error reading HTML file");
        }
        // Replace the token placeholder in the HTML file
        const htmlResponse = html.replace("${token}", token);
        return response.status(200).send(htmlResponse);
      });
      // response.status(403).json({ msg: 'Access denied or link expired.' });
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ msg: error.message });
  }
};

module.exports = {
  tuploadImage,
  tgetImage,
  tdownloadFile,
};
