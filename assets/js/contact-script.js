// Firebase configuration (replace with your Firebase project settings)
const firebaseConfig = {
  apiKey: "AIzaSyCTT-7d9y-fXWAqN0wCNwT2VB1ezHZitt4",
  authDomain: "testproject-80d23.firebaseapp.com",
  databaseURL:
    "https://testproject-80d23-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testproject-80d23",
  storageBucket: "testproject-80d23.appspot.com",
  messagingSenderId: "675304146337",
  appId: "1:675304146337:web:17838009d1e7603fca77e0",
  measurementId: "G-4J3PT933SQ",
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

document
  .getElementById("data-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Get form values
    const senderMail = document.getElementById("senderMail").value;
    const senderName = document.getElementById("senderName").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    const dateTime = getCurrentDateTime();

    // Submit data to Firestore
    db.collection("messages")
      .add({
        senderMail: senderMail,
        senderName: senderName, // Convert to number if needed
        subject: subject,
        message: message,
        date: dateTime,
      })
      .then(() => {
        alert("Data submitted successfully!");
        document.getElementById("data-form").reset(); // Reset the form
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });
  });

// Function to generate the current date and time in the format "10 Jan 2024 10:30 AM"
function getCurrentDateTime() {
  const now = new Date();

  // Format options
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  // Format the date
  const formattedDate = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Format the time
  const formattedTime = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Combine date and time into desired format
  return `${formattedDate} ${formattedTime}`;
}
