var admin = require("firebase-admin");

var serviceAccount = require("./react-linkedin-67bc5-firebase-adminsdk-8ok8h-7112d08220.json");

var uid = process.argv[2];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

admin
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log("custom claims set for user", uid);
    process.exit();
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
