require('dotenv').config();

// Setting default environment variables.
process.env = {
  AZURE_STORAGE_CONTAINER_NAME: 'uploadithelper',
  PORT: '5050',
  STATIC_FILES: 'public',
  ...process.env
};

// Checks for required environment variables.
[
  'AZURE_STORAGE_ACCOUNT_KEY',
  'AZURE_STORAGE_ACCOUNT_NAME',
  'AZURE_STORAGE_CONTAINER_NAME',
  'BOT_ID',
  'BOT_TENANT_ID'
].forEach(name => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} must be set.`);
  }
});

const { join } = require('path');
const restify = require('restify');

const server = restify.createServer();
const { PORT, STATIC_FILES } = process.env;

server.use(restify.plugins.queryParser());

// Registering routes.
server.get('/api/azurestorage/uploadsastoken', require('./routes/azureStorage/uploadSASToken'));
server.get('/api/directline/token', require('./routes/directLine/token'));
server.post('/api/messages', async (req, res) => {
  try {
      // Your async logic here
      res.send({ message: 'Message processed' });
  } catch (error) {
      next(error); // Handle errors by passing them to the next function
  }
});


// We will use the REST API server to serve static web content to simplify deployment for demonstration purposes.
STATIC_FILES &&
  server.get(
    '/*',
    restify.plugins.serveStatic({
      directory: join(__dirname, '..', STATIC_FILES),
      default: 'index.html'
      
    })
  );

server.listen(PORT, () => {
  STATIC_FILES && console.log(`Will serve static content from ${STATIC_FILES}`);

  console.log(`Rest API server is listening to port ${PORT}`);
});
