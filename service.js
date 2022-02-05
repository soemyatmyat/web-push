// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option

const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

// saveSubscription saves the subscription to the backend
const saveSubscription = async subscription => {
  const SERVER_URL = 'http://localhost:4000/save-subscription' //subscription shall be routed to save-subscription
  const response = await fetch(SERVER_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  })
  return response.json()

}


//Subscribe the user to web push registerServiceWorker
self.addEventListener('activate', async () => {
  // This will be called only once when the service worker is activated.
  // When calling the subscribe() method, we pass in an options object, which consists of both required and optional parameters.
  console.log("activating...")
  try {
    const options = {
      userVisibleOnly: true, //a mandatory field for chrome, agreement to say there's no silent push.
      applicationServerKey:urlBase64ToUint8Array('BKD0IH4Eq6-_8-k8vViFfsFttmT8rkM1lXPB6uTwngR-Q27M4JFr4yFZJ3y56-gYBcBvFkXvD5-MlZfX0FHd-Fc')
      //used by a push service to identify the application subscribing a user and ensure that the same application is messaging that user. In firebased browser,it's VAPID
    }
    const subscription=await self.registration.pushManager.subscribe(options)
    console.log(JSON.stringify(subscription))
    const response=await saveSubscription(subscription)
    console.log(response)
  } catch (err) {
    console.log('Error', err)
  }
})

self.addEventListener('push', function(event) {
  console.log("listening to push");
  if (event.data) {
    console.log('Push event!! ', event.data.text());
    showLocalNotification("Web Push", event.data.text(),self.registration);
  } else {
    console.log('Push event but no data')
  }
})

const showLocalNotification = (title, body, swRegistration) => {
  console.log('Showing Local Notification..')
  const options = {
      body: body
  };
  console.log(swRegistration)
  swRegistration.showNotification(title, options);

}
