DROP TABLE AppConfig;
DROP TABLE FrontEnd;
DROP TABLE Webpack;
DROP TABLE Personal;
DROP TABLE BackEnd;
----------Table Creations -----------------------
---------- Table for AppConfig -----------
CREATE TABLE AppConfig (
  "id" serial NOT NULL,
  "title" varchar,
  "description" varchar
);
---------- Table for Peronsal -----------
CREATE TABLE Personal (
  "id" serial NOT NULL,
  "title" varchar,
  "description" varchar
);
---------- Table for Webpack Config -----------
CREATE TABLE Webpack
(
  "id" serial NOT NULL,
  "title" varchar,
  "description" varchar,
  "resources" varchar,
  "iscompleted" boolean
);
---------- Table for Front End -----------
CREATE TABLE FrontEnd
(
  "id" serial NOT NULL,
  "title" varchar,
  "description" varchar,
  "resources" varchar,
  "iscompleted" boolean
);
---------- Table for Back End -----------
CREATE TABLE BackEnd
(
  "id" serial NOT NULL,
  "title" varchar,
  "description" varchar,
  "resources" varchar,
  "iscompleted" boolean
);


----------Table Inserts -----------------------

----------AppConfig-----------------------

INSERT INTO AppConfig
  (id, title, description) 
VALUES 
  (1, 'Step 1', 'In your root project directory (inside of your terminal) run command “npm init -y”. This creates your package.json file where you will need to install all of your dependencies and identify your scripts.');
---- 
INSERT INTO AppConfig
  (id, title, description) 
VALUES 
  (2, 'Step 2', 'Install your package dependencies. Run this command:
npm i @babel/core @babel/preset-env @babel/preset-react babel-loader babel-preset-react css-loader file-loader url-loader webpack webpack cli webpack-dev-server ');

------------Webpack-----------------------
INSERT INTO Webpack
  (id, title, description, resources, iscompleted)
VALUES
  (1, 'Create your webpack.config.js', 'Create a file named webpack.config.js at the top most level of your app, but still within the app folder', 'https://webpack.js.org/configuration/', false);
INSERT INTO Webpack
  (id, title, description, resources, iscompleted)
VALUES
  (2, 'Import your modules', 'Require in necessary modules at the top of the webpack config file using common js “require” syntax. Starter modules to import are: webpack, path, HtmlWebpackPlugin.', 'https://webpack.js.org/configuration/', false);
INSERT INTO Webpack
  (id, title, description, resources, iscompleted)
VALUES
  (3, 'Create a module.exports object that will start with a key of entry, output, mode, module', 'Inside of here, you’re going to be setting up your entry points, output path, modules and mode.', 'https://webpack.js.org/configuration/', false);
INSERT INTO Webpack    
  (id, title, description, resources, iscompleted)
VALUES
  (4, 'If you’re working with a backend', 'It’s important to create a devServer object that will contain a proxy and a route that the proxy will route to', 'https://webpack.js.org/configuration/dev-server/', false);
INSERT INTO Webpack
  (id, title, description, resources, iscompleted)
VALUES
  (5, 'Examples of a properly setup Webpack', 'Included is a properly set up webpack that allows usage of frontend and backend', 'https://github.com/mrtommyliang/Coductivity-2.0/blob/main/webpack.config.js', false);


------------FrontEnd-----------------------
INSERT INTO FrontEnd
  (id, title, description, resources, iscompleted)
VALUES
  (1, 'Make sure you have relevant react dependencies installed', 'To install run the following commands: npm i react react-router-dom', 'https://github.com/facebook/react', false);
INSERT INTO FrontEnd
  (id, title, description, resources, iscompleted)
VALUES
  (2, 'Create a client a folder that contains relevant files', 'This includes index.html, App.jsx, index.js index.css (Your file structure may vary)', 'https://reactjs.org/docs/getting-started.html', false);
INSERT INTO FrontEnd
  (id, title, description, resources, iscompleted)
VALUES
  (3, 'Creating your first components', 'For best practice, create a components folder within your client folder. WIthin here, you’ll be naming your components that can either end in .js or .jsx syntax (User preference!)', 'https://reactjs.org/docs/components-and-props.html', false);
INSERT INTO FrontEnd
  (id, title, description, resources, iscompleted)
VALUES
  (4, 'Create some styles', 'For best practice, create a styles folder within your client folder. Within here, you should match the file name to your component name for consistency. (Just make sure they are a .css or .scss file)', 'https://create-react-app.dev/docs/adding-a-stylesheet/', false);
INSERT INTO FrontEnd
  (id, title, description, resources, iscompleted)
VALUES
  (5, 'Optional: Making a request to your backend', 'There are many ways to go about this. Your webpack configuration should have already proxied a request to your backend. A request should be made to an endpoint defined in your backend.', 'https://reactjs.org/docs/faq-ajax.html', false);

---------BackEnd---------------------------------
INSERT INTO BackEnd
  (id, title, description, resources, iscompleted)
VALUES
  (1, 'Make sure you have relevant backend dependencies installed', 'To install, run the following commands: npm i express pg nodemon', 'https://expressjs.com/', false);
INSERT INTO BackEnd
  (id, title, description, resources, iscompleted)
VALUES
  (2, 'Backend File Structuring', 'Create a server folder that exists within your project folder. This process should be similar to your frontend folder structure creation. Within your server folder, you should also have api.js, controller.js, and routes.js', 'https://www.terlici.com/2014/08/25/best-practices-express-structure.html', false);
INSERT INTO BackEnd
  (id, title, description, resources, iscompleted)
VALUES
  (3, 'Defining your server', 'Within your server.js, import relevant dependencies include path, express, assigning the variable app to the execution of express and import your route file. This is also where you will be defining what port you should be listening on.', 'https://expressjs.com/en/starter/hello-world.html', false);
INSERT INTO BackEnd
  (id, title, description, resources, iscompleted)
VALUES
  (4, 'Defining your models', 'Within your models.js, this is where you should import pg or postgres at the top of the file. You should also be making your connections here to your database. Don’t forget to export!', 'https://expressjs.com/en/guide/database-integration.html', false);
INSERT INTO BackEnd
  (id, title, description, resources, iscompleted)
VALUES
  (5, 'Defining your routes', 'Within your routes.js, define your routes to the proper end points and identify what kind of request you’re trying to make.', 'https://expressjs.com/en/starter/basic-routing.html ', false);
INSERT INTO BackEnd
  (id, title, description, resources, iscompleted)
VALUES
  (6, 'Defining your middleware', 'Within your controller.js, define the middleware that’s going to be hit depending the endpoint that’s been met', 'https://expressjs.com/en/guide/using-middleware.html', false);
INSERT INTO BackEnd
  (id, title, description, resources, iscompleted)
VALUES
  (7, 'Optional: Test your requests with postman', 'A great tool for seeing if your backend is connected is Postman', 'https://www.postman.com/', false);