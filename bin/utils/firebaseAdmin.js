const admin = require('firebase-admin');
require('dotenv').config();
// const serviceAccount = require('./grubber-81361-4727726bcab3.json');
const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;