console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  console.log(data);
  self.registration.showNotification(data.head, {
    body: data.content,
    icon: "http://image.ibb.co/frYOFd/tmlogo.png"
  });
});
