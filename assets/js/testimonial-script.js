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
      initializeOwlCarousel(); // Reinitialize the carousel after rendering
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}

// Function to render data with a heading
function renderDataTestimonials(data) {
  const container = document.getElementById("testimonial-section");

  // Render each item
  data.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.classList.add(
      "item",
      "p-2",
      "bg-white",
      "shadow-sm",
      "m-4",
      "border-radius-new"
    );
    listItem.innerHTML = `
    
    <img
    src="https://annedece.sirv.com/Images/commos.png"
    class="pb-4 comms"
  />
  <p class="text-muted">
  ${item.content}
  </p>

  <hr class="m-1" />
  <div class="d-flex align-items-center pt-3">
    <div class="author-img mr-3">
      <img
        src= ${item.imageUrl}
      />
    </div>
    <div>
      <h5 class="m-0">${item.name}</h5>
       <p class="m-0 small font-medium text-muted">
          ${item.position}
      </p>
    </div>
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

function initializeOwlCarousel() {
  // Reinitialize the Owl Carousel
  $(".owl-carousel").owlCarousel({
    items: 2,
    margin: 10,
    loop: true,
    nav: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
        autoplay: true,
      },
      600: {
        items: 2,
        autoplay: true,
      },
      1000: {
        items: 2,
      },
    },
  });
}
