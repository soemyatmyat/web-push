Description:
A simple web page enabling the push notifications for the web.
---------------------------------------------------------------------------------<br>
Overview <br>
---------------------------------------------------------------------------------<br>
Tech Components <br>
1. Service Workers: they reside in browser and are responsible for delivering the messages to browsers. <br>
Note A: Service Workers are registered only once (browserId + website URL + device ID) a.k.a Subscription Token<br>
Note B: Service Workers are event-oriented, there needs to be some kind of events/actions happened for push notification to trigger.<br>
Note C: In Chrome Dev tools, Application > Service Worker is available to unregister the service worker and refresh the app.<br>
Note D: It is an independent javascript thread which runs on the background and can run even when the page has been closed.<br>
2. Push Service/Notification API (Client-Side): Browser based notifications API <br>
(Firebase for Google, Firefox, etc. and APNS for Safari) <br>
3. Push API (Server-Side): provided by Push Service Provider <br>
4. Web SDK: relay the tasks to Server-side Push API, ask for permission and register the serviceWorker<br>

Project structure<br>
1. [Service Worker] service.js: to be placed at the root of the domain to listen to the events of the entire origin domain. <br>
Notification permission should not be in the main function. Check out this https://developers.google.com/web/fundamentals/push-notifications/permission-ux on where it should be placed for production app. <br>
2. [Web SDK] index.js: responsible for asking notification permission and registering the service worker, for this small project, it's just a simple js.

In reality, it all depends on how the coding has been implemented. Some websites register the service worker in users browser without the permission prompt. These service workers are just staying in the users browsers until users wipe out the caches and reset the settings of browser. [[Code: navigator.serviceWorker.register("serviceworker.js")]]

Does it make sense for the service worker to stay there when there isn't any explicit permission granted for browser push...
Some websites, however, only register the service worker when user has granted the permission for notifications.

Only when permission is granted, service worker should be activated.

Source >> Service Worker Lifecycle: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle


3. [Entry Page] index.html: where index.js loaded (can be asynced in order not to have an impact on website performance)

---------------------------------------------------------------------------------<br>
For Testing:
---------------------------------------------------------------------------------<br>
Make sure to enable the notifications
For MacOS,
a. notifications settings -> google chrome -> allow notification
b. notifications settings -> disable Do not distrub



Resources:
https://developer.mozilla.org/en-US/docs/Web/API/notification
https://developers.google.com/web/fundamentals/primers/service-workers
https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
