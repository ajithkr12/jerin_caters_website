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
let currentImageIndex = 0;
let currentData1 = [];
let currentData2 = [];
let currentData3 = [];
let currentData4 = [];
let currentData = [];
function loadData() {
  db.collection("gallery")
    .get() // Replace with your Firestore collection name
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data()); // Add document data to the array
      });

      currentData1 = data.filter((item) => item.categoryName === "1");
      currentData2 = data.filter((item) => item.categoryName === "2");
      currentData3 = data.filter((item) => item.categoryName === "3");
      currentData4 = data.filter((item) => item.categoryName === "4");

      renderData(currentData1, "gallery-section-one"); // Call the render function
      renderData(currentData2, "gallery-section-two"); // Call the render function
      renderData(currentData3, "gallery-section-three");
      renderData(currentData4, "gallery-section-four");
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}

// Function to render data with a heading
function renderData(data, parentDiv) {
  const container = document.getElementById(parentDiv);

  // Render each item
  data.forEach((item, index) => {
    const listItem = document.createElement("div");
    listItem.classList.add("col-lg-3", "col-md-6", "col-sm-6");
    listItem.innerHTML = `
      <div class="gallery-box" onclick="openModal(${index},'${parentDiv}')">
        <div class="single-gallery">
          <div class="gallery-img smoll-img" style="background-image: url(${item.imageUrl});"></div>
        </div>
      </div>
    `;
    container.appendChild(listItem);
  });
}

function openModal(index, parentDiv) {
  currentImageIndex = index;

  if (parentDiv == "gallery-section-one") {
    currentData = currentData1;
  } else if (parentDiv == "gallery-section-two") {
    currentData = currentData2;
  } else if (parentDiv == "gallery-section-three") {
    currentData = currentData3;
  } else {
    currentData = currentData4;
  }

  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");

  if (currentData[currentImageIndex]) {
    modalImage.src = currentData[currentImageIndex].imageUrl; // Set image source
    modal.style.display = "flex"; // Show modal
  } else {
    console.error("Image not found for index: " + currentImageIndex);
  }
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none"; // Hide modal
}

function changeImage(direction) {
  currentImageIndex += direction;

  // Wrap around if at the beginning or end
  if (currentImageIndex < 0) {
    currentImageIndex = currentData.length - 1; // Go to last item
  } else if (currentImageIndex >= currentData.length) {
    currentImageIndex = 0; // Go to first item
  }

  const modalImage = document.getElementById("modalImage");
  if (currentData[currentImageIndex]) {
    modalImage.src = currentData[currentImageIndex].imageUrl; // Update the image
  } else {
    console.error("Image not found for index: " + currentImageIndex);
  }
}
// Load data when the page loads
window.onload = loadData;
