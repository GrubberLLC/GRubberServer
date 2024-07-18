const admin = require('firebase-admin');
const serviceAccount = require('path/to/serviceAccountKey.json'); // Adjust the path to your service account key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
