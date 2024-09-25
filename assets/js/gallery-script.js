// Firebase configuration (Replace with your own configuration)

const firebaseConfig = {
  apiKey: "AIzaSyCdCFCmHLNo2v8ArtU8cLShsBI5X84oZgc",
  authDomain: "website-1b123.firebaseapp.com",
  projectId: "website-1b123",
  storageBucket: "website-1b123.appspot.com",
  messagingSenderId: "869277703799",
  appId: "1:869277703799:web:12facbcc19ecba6b793072",
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

      const data1 = data.filter((item) => item.categoryName === "1");
      const data2 = data.filter((item) => item.categoryName === "2");
      const data3 = data.filter((item) => item.categoryName === "3");
      const data4 = data.filter((item) => item.categoryName === "4");

      renderData(data1, "gallery-section-one"); // Call the render function
      renderData(data2, "gallery-section-two"); // Call the render function
      renderData(data3, "gallery-section-three");
      renderData(data4, "gallery-section-four");
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}

// Function to render data with a heading
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
