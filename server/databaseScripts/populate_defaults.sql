------------------ group ---
TRUNCATE groups CASCADE;
INSERT INTO groups (group_id, name)
VALUES (1, 'Welcome');
----------------- user_groups --------------
------------------ notebooks ---------------
TRUNCATE notebooks CASCADE;
INSERT INTO notebooks (notebook_id, group_id, name)
VALUES (1, 1, 'AppConfig'),
  (2, 1, 'Webpack'),
  (3, 1, 'Frontend'),
  (4, 1, 'Backend');
----------------- cards --------------------
TRUNCATE cards CASCADE;
-- ------------AppConfig-----------------------
INSERT INTO cards (
    notebook_id,
    title,
    description,
    status
  )
VALUES (
    1,
    'Step 1',
    'In your root project directory (inside of your terminal) run command $ npm init -y. This creates your package.json file where you will need to install all of your dependencies and identify your scripts.',
    0
  ),
  (
    1,
    'Step 2',
    'Install your package dependencies. Run this command: npm i @babel/core @babel/preset-env @babel/preset-react babel-loader babel-preset-react css-loader file-loader url-loader webpack webpack cli webpack-dev-server ',
    0
  );
-- ------------Webpack-----------------------
INSERT INTO cards (
    notebook_id,
    title,
    description,
    resources,
    status
  )
VALUES (
    2,
    'Create your webpack.config.js',
    'Create a file named webpack.config.js at the top most level of your app, but still within the app folder',
    'https://webpack.js.org/configuration/',
    0
  ),
  (
    2,
    'Import your modules',
    'Require in necessary modules at the top of the webpack config file using CommonJS require syntax. Starter modules to import are: webpack, path, HtmlWebpackPlugin.',
    'https://webpack.js.org/configuration/',
    0
  ),
  (
    2,
    'Create a module.exports object',
    'Your module.exports object should start with a keys of entry, output, mode, and module. Inside of here, you’re going to be setting up your entry points, output path, modules and mode.',
    'https://webpack.js.org/configuration/',
    0
  ),
  (
    2,
    'If you’re working with a backend',
    'It’s important to create a devServer object that will contain a proxy and a route that the proxy will route to',
    'https://webpack.js.org/configuration/dev-server/',
    0
  ),
  (
    2,
    'Examples of a properly setup Webpack',
    'Included is a properly set up webpack that allows usage of frontend and backend',
    'https://github.com/mrtommyliang/Coductivity-2.0/blob/main/webpack.config.js',
    0
  );
-- ------------FrontEnd-----------------------
INSERT INTO cards (
    notebook_id,
    title,
    description,
    resources,
    status
  )
VALUES (
    3,
    'Make sure you have relevant react dependencies installed',
    'To install run the following commands: npm i react react-router-dom',
    'https://github.com/facebook/react',
    0
  ),
  (
    3,
    'Create a client a folder that contains relevant files',
    'This includes index.html, App.jsx, index.js index.css (Your file structure may vary)',
    'https://reactjs.org/docs/getting-started.html',
    0
  ),
  (
    3,
    'Creating your first components',
    'For best practice, create a components folder within your client folder. WIthin here, you’ll be naming your components that can either end in .js or .jsx syntax (User preference!)',
    'https://reactjs.org/docs/components-and-props.html',
    0
  ),
  (
    3,
    'Create some styles',
    'For best practice, create a styles folder within your client folder. Within here, you should match the file name to your component name for consistency. (Just make sure they are a .css or .scss file)',
    'https://create-react-app.dev/docs/adding-a-stylesheet/',
    0
  ),
  (
    3,
    'Optional: Making a request to your backend',
    'There are many ways to go about this. Your webpack configuration should have already proxied a request to your backend. A request should be made to an endpoint defined in your backend.',
    'https://reactjs.org/docs/faq-ajax.html',
    0
  );
-- ---------BackEnd---------------------------------
INSERT INTO cards (
    notebook_id,
    title,
    description,
    resources,
    status
  )
VALUES (
    4,
    'Make sure you have relevant backend dependencies installed',
    'To install, run the following commands: npm i express pg nodemon',
    'https://expressjs.com/',
    0
  ),
  (
    4,
    'Backend File Structuring',
    'Create a server folder that exists within your project folder. This process should be similar to your frontend folder structure creation. Within your server folder, you should also have api.js, controller.js, and routes.js',
    'https://www.terlici.com/2014/08/25/best-practices-express-structure.html',
    0
  ),
  (
    4,
    'Defining your server',
    'Within your server.js, import relevant dependencies include path, express, assigning the variable app to the execution of express and import your route file. This is also where you will be defining what port you should be listening on.',
    'https://expressjs.com/en/starter/hello-world.html',
    0
  ),
  (
    4,
    'Defining your models',
    'Within your models.js, this is where you should import pg or postgres at the top of the file. You should also be making your connections here to your database. Don’t forget to export!',
    'https://expressjs.com/en/guide/database-integration.html',
    0
  ),
  (
    4,
    'Defining your routes',
    'Within your routes.js, define your routes to the proper end points and identify what kind of request you’re trying to make.',
    'https://expressjs.com/en/starter/basic-routing.html ',
    0
  ),
  (
    4,
    'Defining your middleware',
    'Within your controller.js, define the middleware that’s going to be hit depending the endpoint that’s been met',
    'https://expressjs.com/en/guide/using-middleware.html',
    0
  ),
  (
    4,
    'Optional: Test your requests with postman',
    'A great tool for seeing if your backend is connected is Postman',
    'https://www.postman.com/',
    0
  );