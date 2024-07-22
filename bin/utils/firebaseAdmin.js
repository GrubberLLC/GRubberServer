const admin = require('firebase-admin');
require('dotenv').config();

// const serviceAccount = require('./grubber-81361-4727726bcab3.json');
const serviceAccountBase64 = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;