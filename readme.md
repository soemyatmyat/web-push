Description:
A simple web page enabling the push notifications for the web.
---------------------------------------------------------------------------------<br>
Overview <br>
---------------------------------------------------------------------------------<br>
Tech Components <br>
1. Service Workers: they reside in browser and are responsible for delivering the messages to browsers. <br>
Note A: Service Workers are registered only once (browserId + website URL + device ID).
Note B: Service Workers are event-oriented, there needs to be some kind of events/actions happened for push notification to trigger.
Note C: In Chrome Dev tools, Application > Service Worker is available to unregister the service worker and refresh the app.
2. Notifications API (Client-Side): Browser based notifications API (Firebase for Google, Firefox, etc. and APNS for Safari) <br>
3. Push API (Server-Side): provided by Push Service Provider <br>

Project structure<br>
1. service.js: to be placed at the root of the domain to listen to the events of the entire origin domain. <br>
Notification permission should not be in the main function. Check out this https://developers.google.com/web/fundamentals/push-notifications/permission-ux on where it should be placed for production app. <br>



https://developer.mozilla.org/en-US/docs/Web/API/notification
