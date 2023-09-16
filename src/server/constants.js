import admin from 'firebase-admin';

// firebase admin stuff
let serviceAccount = require('../../onlinetown-4f105-firebase-adminsdk-ryhlv-c086c07b9a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();
export const auth = admin.auth();