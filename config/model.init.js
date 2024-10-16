const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const sequelize = require("./database"); // Ensure this points to your database config
const models = {};

// Read and initialize models
fs.readdirSync(__dirname)
  .filter((file) => {
    // Only process files that are JS and not specific non-model files
    return (
      file.endsWith(".js") &&
      file !== "index.js" &&
      file !== "database.js" &&
      file !== "model.init.js" &&
      file !== "passport-config.js"
    );
  })
  .forEach((file) => {
    try {
      const model = require(path.join(__dirname, file));

      // Ensure the model is a function and return an instance
      if (typeof model === "function") {
        const modelInstance = model(sequelize, Sequelize.DataTypes);
        models[modelInstance.name] = modelInstance;
      } else {
        console.warn(`Model in file ${file} is not a function.`);
      }
    } catch (error) {
      console.error(`Error loading model ${file}:`, error);
    }
  });

// Set up associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models); // Set up associations if they exist
  }
});

// Export sequelize instance and models
module.exports = {
  sequelize,
  ...models,
};
