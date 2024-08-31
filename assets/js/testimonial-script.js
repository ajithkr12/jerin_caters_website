// Firebase configuration (Replace with your own configuration)

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// Function to load and display data

function loadData() {
  db.collection("gallery")
    .get() // Replace with your Firestore collection name
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data()); // Add document data to the array
      });

      const data1 = data.filter((item) => item.categoryName === "1").slice(-8);
      const data2 = data.filter((item) => item.categoryName === "2").slice(-8);
      const data3 = data.filter((item) => item.categoryName === "3").slice(-8);
      const data4 = data.filter((item) => item.categoryName === "4").slice(-8);

      renderData(data1, "gallery-section-one"); // Call the render function
      renderData(data2, "gallery-section-two"); // Call the render function
      renderData(data3, "gallery-section-three");
      renderData(data4, "gallery-section-four");
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });

  db.collection("testimonials")
    .get() // Replace with your Firestore collection name
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data()); // Add document data to the array
      });

      renderDataTestimonials(data); // Call the render function
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}

// Function to render data with a heading
function renderDataTestimonials(data) {
  const container = document.getElementById("testimonial-sectionA");

  // Render each item
  data.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.classList.add("snip1192");
    listItem.innerHTML = `

    <blockquote>${item.content}</blockquote>
    <div class="author">
      <img
        src=${item.imageUrl}
        alt="sq-sample29"
      />
      <h5>${item.name}<span>${item.companyName}-${item.companyName}</span></h5>
    </div>

          `;
    container.appendChild(listItem);
  });
}
function renderData(data, parentDiv) {
  const container = document.getElementById(parentDiv);

  // Render each item
  data.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.classList.add("col-lg-3", "col-md-6", "col-sm-6");
    listItem.innerHTML = `

    <div class="gallery-box">
      <div class="single-gallery">
        <div
          class="gallery-img smoll-img"
          style="
            background-image: url(${item.imageUrl});
          "
        ></div>
        <div class="g-caption">
          <span>$25</span>
          <h4>${item.heading}</h4>
          <p>Ut enim ad minim veniam quis nostr.</p>
          <a href="#" class="btn order-btn">Order Now</a>
        </div>
      </div>
    </div>
          `;
    container.appendChild(listItem);
  });
}
// Load data when the page loads
window.onload = loadData;
