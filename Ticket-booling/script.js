

const sections = document.querySelectorAll("section");
let currentPage = 0;
const seats = [];
const total = 50;

const totalEl = document.getElementById("totalSeats");
const bookedEl = document.getElementById("bookedSeats");
const remainingEl = document.getElementById("remainingSeats");
const seatGrid = document.getElementById("seatGrid");

// Create seat grid
for (let i = 1; i <= total; i++) {
  const seat = document.createElement("div");
  seat.className = "seat";
  seat.innerHTML = `<span>${i}</span>`;
  seat.dataset.index = i;
  seat.addEventListener("click", () => toggleSeat(seat));
  seatGrid.appendChild(seat);
  seats.push(seat);
}

function toggleSeat(seat) {
  if (seat.classList.contains("booked")) return;
  seat.classList.add("booked");
  updateCounts();
}

function updateCounts() {
  const booked = seats.filter(seat => seat.classList.contains("booked")).length;
  bookedEl.textContent = booked;
  remainingEl.textContent = total - booked;
}

function nextPage() {
  changePage(currentPage + 1);
}

function prevPage() {
  changePage(currentPage - 1);
}

function changePage(index) {
  if (index < 0 || index >= sections.length) return;
  sections[currentPage].classList.remove("active");
  currentPage = index;
  sections[currentPage].classList.add("active");
}

function goToPayment() {
  if (parseInt(bookedEl.textContent) === 0) {
    alert("Please book at least one seat.");
    return;
  }
  changePage(2);
}

function makePayment() {
  const mobile = document.getElementById("mobile").value.trim();
  if (mobile === "6374172856") {
    alert("Payment successful!\nThank you for booking.");
  } else {
    alert("Invalid mobile number. Try again.");
  }
}

updateCounts();