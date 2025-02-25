const symptomsList = [
    "itching", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing", "shivering", "chills",
    "joint_pain", "stomach_pain", "acidity", "ulcers_on_tongue", "muscle_wasting", "vomiting",
    "burning_micturition", "spotting_urination", "fatigue", "weight_gain", "anxiety",
    "cold_hands_and_feets", "mood_swings", "weight_loss", "restlessness", "lethargy",
    "patches_in_throat", "irregular_sugar_level", "cough", "high_fever", "sunken_eyes",
    "breathlessness", "sweating", "dehydration", "indigestion", "headache", "yellowish_skin",
    "dark_urine", "nausea", "loss_of_appetite", "pain_behind_the_eyes", "back_pain", "constipation",
    "abdominal_pain", "diarrhoea", "mild_fever", "yellow_urine", "yellowing_of_eyes"
];

const symptomsDropdown = document.getElementById("symptoms");
const selectedSymptomsDiv = document.getElementById("selected-symptoms");

// Populate dropdown
symptomsList.forEach(symptom => {
    const option = document.createElement("option");
    option.value = symptom;
    option.textContent = symptom.replace(/_/g, " ");
    symptomsDropdown.appendChild(option);
});

// Store selected symptoms
let selectedSymptoms = [];

// Listen for symptom selection
symptomsDropdown.addEventListener("change", function () {
    const selectedOptions = Array.from(symptomsDropdown.selectedOptions).map(opt => opt.value);

    // Add only new selections
    selectedOptions.forEach(symptom => {
        if (!selectedSymptoms.includes(symptom)) {
            selectedSymptoms.push(symptom);
            displaySelectedSymptoms();
        }
    });
});

// Function to display selected symptoms
function displaySelectedSymptoms() {
    selectedSymptomsDiv.innerHTML = ""; // Clear previous

    selectedSymptoms.forEach(symptom => {
        const symptomTag = document.createElement("div");
        symptomTag.classList.add("symptom-tag");
        symptomTag.textContent = symptom.replace(/_/g, " ");

        // Add remove button
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.textContent = "×";
        removeBtn.onclick = function () {
            selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
            displaySelectedSymptoms();
        };

        symptomTag.appendChild(removeBtn);
        selectedSymptomsDiv.appendChild(symptomTag);
    });
}

// Function to predict disease
async function predictDisease() {
    if (selectedSymptoms.length === 0) {
        alert("Please select at least one symptom.");
        return;
    }

    const requestData = { symptoms: selectedSymptoms };

    try {
        const response = await fetch("http://127.0.0.1:8000/api/predict/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById("result").textContent = "Predicted Disease: " + result.predicted_disease;
        } else {
            document.getElementById("result").textContent = "Error: " + (result.detail || "Prediction failed.");
        }
    } catch (error) {
        document.getElementById("result").textContent = "An error occurred. Please try again.";
    }
}
