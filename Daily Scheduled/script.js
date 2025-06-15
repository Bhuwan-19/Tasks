document.addEventListener("DOMContentLoaded", function () {
    updateDate();
    loadTimeSlots();
    loadNotes();
});

function updateDate() {
    const now = new Date();
    document.getElementById("currentDate").textContent = `Today's Date: ${now.toDateString()}`;
}

// Time Schedule Functions
let timeSlots = JSON.parse(localStorage.getItem("timeSlots")) || [
    { time: "08:00 - 09:00", activity: "Morning Exercise" },
    { time: "09:00 - 10:00", activity: "Breakfast" }
];

function loadTimeSlots() {
    const scheduleBody = document.getElementById("scheduleBody");
    if (!scheduleBody) return;

    scheduleBody.innerHTML = "";
    timeSlots.forEach((slot, index) => {
        let row = document.createElement("tr");

        // Editable Time
        let timeCell = document.createElement("td");
        let timeInput = document.createElement("input");
        timeInput.type = "text";
        timeInput.value = slot.time;
        timeInput.onchange = (e) => updateTime(index, e.target.value);
        timeCell.appendChild(timeInput);
        row.appendChild(timeCell);

        // Editable Activity
        let activityCell = document.createElement("td");
        let activityInput = document.createElement("input");
        activityInput.type = "text";
        activityInput.value = slot.activity;
        activityInput.onchange = (e) => updateActivity(index, e.target.value);
        activityCell.appendChild(activityInput);
        row.appendChild(activityCell);

        // Remove Button
        let actionCell = document.createElement("td");
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.onclick = () => removeTimeSlot(index);
        actionCell.appendChild(removeBtn);
        row.appendChild(actionCell);

        scheduleBody.appendChild(row);
    });

    saveTimeSlots();
}

function addTimeSlot() {
    timeSlots.push({ time: "New Time", activity: "New Activity" });
    loadTimeSlots();
}

function removeTimeSlot(index) {
    timeSlots.splice(index, 1);
    loadTimeSlots();
}

function updateTime(index, value) {
    timeSlots[index].time = value;
    saveTimeSlots();
}

function updateActivity(index, value) {
    timeSlots[index].activity = value;
    saveTimeSlots();
}

function saveTimeSlots() {
    localStorage.setItem("timeSlots", JSON.stringify(timeSlots));
}

// Notes Functions
function saveNote() {
    const note = document.getElementById("noteInput").value;
    localStorage.setItem("activityNote", note);
    loadNotes();
}

function clearNote() {
    localStorage.removeItem("activityNote");
    document.getElementById("savedNote").textContent = "";
}

function loadNotes() {
    const savedNote = localStorage.getItem("activityNote");
    if (savedNote) {
        document.getElementById("savedNote").textContent = savedNote;
    }
}