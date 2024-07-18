const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
