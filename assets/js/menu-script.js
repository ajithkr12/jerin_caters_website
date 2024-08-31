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
  db.collection("menu_list")
    .get() // Replace with your Firestore collection name
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data()); // Add document data to the array
      });

      const data1 = data.filter((item) => item.categoryName === "SOUTH_INDIAN");
      const data2 = data.filter((item) => item.categoryName === "CHINESE");
      const data3 = data.filter((item) => item.categoryName === "ARABIAN");

      renderData(data1, "South Indian"); // Call the render function
      renderData(data2, "Chinese"); // Call the render function
      renderData(data1, "Arabian");
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}

// Function to render data with a heading
function renderData(data, heading) {
  const container = document.getElementById("menu-map-section");

  // Create and append the heading
  const headingElement = document.createElement("div");
  headingElement.classList.add(
    "menu-tittle",
    "text-center",
    "mb-30",
    "col-lg-12",
    "col-md-12"
  );
  headingElement.innerHTML = `<h2>${heading} Menu</h2>`;
  container.appendChild(headingElement);

  // Render each item
  data.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.classList.add("col-lg-4", "col-md-6");
    listItem.innerHTML = `

            <div class="single-menu mb-100">
            <div class="menu-img">
              <img src="${item.imageUrl}" alt="" />
            </div>
            <div class="menu-cap">
              <h4>
                <a href="blog_details.html">${item.heading}</a>
              </h4>
              <p class="color1">${item.content}</p>
            </div>
          </div>




          `;
    container.appendChild(listItem);
  });
}

// Load data when the page loads
window.onload = loadData;
