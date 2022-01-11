//import express and cors modules
// express is for building the Rest APIs
// cors provides Express middleware to enable CORS with various options
const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const webpush=require("web-push");

// create an Express App and then add body-parser (json and urlencoded)
// and cors middlewares using app.use() method.
const app = express();
var corsOptions = {
  origin: "http://localhost:4000" //origin is set to port 8081
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Web Push Demo." });
});

//=====================================================
// Web Push =: START
//=====================================================
//setting: this should be seperated but for Demo, we keep everything in one file)
const vapidKeys={
  publicKey:'BKD0IH4Eq6-_8-k8vViFfsFttmT8rkM1lXPB6uTwngR-Q27M4JFr4yFZJ3y56-gYBcBvFkXvD5-MlZfX0FHd-Fc',
  privateKey: 'OQ_YEviY-rpNr6dNaHx4V716zGkxcN9nxC4p-hE0LKg'
}
//setting VAPID keys
webpush.setVapidDetails(
  'mailto:soemyatmyat@protonmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend='') => {
  webpush.sendNotification(subscription, dataToSend)
}

// Web Push DB Storing Subscription ID
//storing the subscription value in memory variable
const dummyDb = { subscription: null };
//in reality, it should be stored in Db
const saveToDatabase = async subscription => {
  dummyDb.subscription = subscription;
};


// Web Push Notification Routing
// The new /save-subscription endpoint to save the subscription id
app.post('/save-subscription', async (req, res) => {
  const subscription = req.body
  await saveToDatabase(subscription)//Method to save the subscription to Database
  res.json({ message: 'success' })
})

app.get('/send-notification', (req, res) => {
  const subscription = dummyDb.subscription; //get subscription from db
  const message = 'Hello Stranger!';
  sendNotification(subscription, message);
  res.json({ message: 'message sent' });
})


//=====================================================
// Web Push =: END
//=====================================================

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
