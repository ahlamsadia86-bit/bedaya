import { useState, useRef } from "react";
import { opportunities } from "./data/opportunities";
import { findRecommendedOpportunities } from "./engine/recommendation";
import { calculateReadiness } from "./engine/readiness";
import { generateBusinessPlan, defaultPermits } from "./engine/businessPlans";
import { getLocationInsights } from "./engine/locationInsights";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";

const initialFormData = {
  idea: "",
  location: "",
  latitude: "",
  longitude: "",
  customer: "",
  budget: "",
  experience: "Beginner",
  challenge: "",
};

function App() {
  const [page, setPage] = useState("home");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [timeAvailable, setTimeAvailable] = useState("5–10 hours/week");
  const [recommendedIdeas, setRecommendedIdeas] = useState([]);
  const [plan, setPlan] = useState(null);
  const [locationStatus, setLocationStatus] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [customerInterviewDone, setCustomerInterviewDone] = useState(false);
  const [marketingDone, setMarketingDone] = useState(false);
  const [validationCustomers, setValidationCustomers] = useState([
  { interested: "", comment: "" },
  { interested: "", comment: "" },
  { interested: "", comment: "" },
  { interested: "", comment: "" },
  { interested: "", comment: "" },
]);

const [budgetItems, setBudgetItems] = useState([
  { name: "Materials / ingredients", amount: 0 },
  { name: "Packaging", amount: 0 },
  { name: "Marketing", amount: 0 },
  { name: "Transport", amount: 0 },
]);

const [sellingPrice, setSellingPrice] = useState(25);
const [expectedCustomers, setExpectedCustomers] = useState(30);
const [costPerUnit, setCostPerUnit] = useState(15);
const [monthlyFixedCost, setMonthlyFixedCost] = useState(300);
const [startupInvestment, setStartupInvestment] = useState(1500);
  const reportRef = useRef(null);

  const skills = [
    "Cooking",
    "Baking",
    "Farming",
    "Livestock",
    "Sewing",
    "Crafts",
    "Photography",
    "Graphic Design",
    "Programming",
    "Teaching",
    "Car Repair",
    "Beauty & Makeup",
  ];

  const hasLocation = formData.latitude && formData.longitude;
  const mapPosition = hasLocation
    ? [Number(formData.latitude), Number(formData.longitude)]
    : null;
    const locationInsights = getLocationInsights(formData);

  function getReadiness() {
    return calculateReadiness({
      formData,
      selectedSkills,
      timeAvailable,
      customerInterviewDone,
      marketingDone,
    });
  }

  function getBusinessBudgetItems(idea) {
  const text = String(idea || "").toLowerCase();

  if (text.includes("bakery") || text.includes("food") || text.includes("meal")) {
    return [
      { name: "Ingredients", amount: 350 },
      { name: "Packaging", amount: 150 },
      { name: "Basic tools", amount: 400 },
      { name: "Marketing", amount: 150 },
      { name: "Transport", amount: 100 },
    ];
  }

  if (text.includes("camel")) {
    return [
      { name: "Raw product/materials", amount: 450 },
      { name: "Packaging", amount: 250 },
      { name: "Labels", amount: 150 },
      { name: "Cold storage/tools", amount: 500 },
      { name: "Marketing", amount: 200 },
    ];
  }

  if (text.includes("photo")) {
    return [
      { name: "Props", amount: 200 },
      { name: "Lighting/accessories", amount: 600 },
      { name: "Editing tools", amount: 150 },
      { name: "Transport", amount: 250 },
      { name: "Marketing", amount: 150 },
    ];
  }

  if (text.includes("tutor") || text.includes("teaching")) {
    return [
      { name: "Teaching materials", amount: 250 },
      { name: "Online tools", amount: 100 },
      { name: "Printing", amount: 100 },
      { name: "Marketing", amount: 200 },
    ];
  }

  if (text.includes("design") || text.includes("website")) {
    return [
      { name: "Design tools", amount: 150 },
      { name: "Internet/tools", amount: 100 },
      { name: "Portfolio setup", amount: 150 },
      { name: "Marketing", amount: 200 },
    ];
  }

  return [
    { name: "Materials", amount: 300 },
    { name: "Packaging", amount: 150 },
    { name: "Marketing", amount: 200 },
    { name: "Transport", amount: 150 },
  ];
}
  function resetApp() {
    setPage("home");
    setSelectedSkills([]);
    setTimeAvailable("5–10 hours/week");
    setRecommendedIdeas([]);
    setPlan(null);
    setLocationStatus("");
    setFormData(initialFormData);
    setCustomerInterviewDone(false);
    setMarketingDone(false);
    setValidationCustomers([
  { interested: "", comment: "" },
  { interested: "", comment: "" },
  { interested: "", comment: "" },
  { interested: "", comment: "" },
  { interested: "", comment: "" },
]);

setBudgetItems([
  { name: "Materials / ingredients", amount: 0 },
  { name: "Packaging", amount: 0 },
  { name: "Marketing", amount: 0 },
  { name: "Transport", amount: 0 },
]);

setSellingPrice(25);
setExpectedCustomers(30);
setCostPerUnit(15);
setMonthlyFixedCost(300);
setStartupInvestment(1500);
  }

  function clearCurrentPage() {
    setRecommendedIdeas([]);
    setLocationStatus("");
    setCustomerInterviewDone(false);
    setMarketingDone(false);

    if (page === "discover") {
      setSelectedSkills([]);
      setTimeAvailable("5–10 hours/week");
      setFormData(initialFormData);
    }

    if (page === "form") {
      setFormData(initialFormData);
      setSelectedSkills([]);
      setTimeAvailable("5–10 hours/week");
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function toggleSkill(skill) {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((item) => item !== skill)
        : [...prev, skill]
    );
  }

  function findOpportunities() {
  if (selectedSkills.length === 0) {
    setRecommendedIdeas([]);
    alert("Please select at least one skill first.");
    return;
  }

  const ranked = findRecommendedOpportunities({
    opportunities,
    selectedSkills,
    budget: Number(formData.budget),
  });

  setRecommendedIdeas(ranked);

  if (ranked.length === 0) {
    alert("No matching opportunities found. Try selecting different skills.");
  }
}

  function useOpportunity(item) {
    setFormData((prev) => ({
      ...prev,
      idea: item.name,
      customer: item.customers,
      challenge: "I need help validating demand and finding my first customers.",
    }));

    setPage("form");
  }

  function handleLocationChoice(value) {
  if (value === "detect") {
    detectLocation();
    return;
  }

  if (value === "other") {
    setFormData((prev) => ({
      ...prev,
      location: "",
      latitude: "",
      longitude: "",
    }));
    return;
  }

  const locations = {
    "Al Qua'a": {
      location: "Al Qua'a, Al Ain, UAE",
      latitude: "23.520000",
      longitude: "55.550000",
    },
    "Al Ain": {
      location: "Al Ain, UAE",
      latitude: "24.130200",
      longitude: "55.802300",
    },
    "Abu Dhabi": {
      location: "Abu Dhabi, UAE",
      latitude: "24.453900",
      longitude: "54.377300",
    },
  };

  setFormData((prev) => ({
    ...prev,
    ...locations[value],
  }));

  setLocationStatus(`${value} selected for location-based guidance.`);
}
  function detectLocation() {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by this browser.");
      return;
    }

    setLocationStatus("Detecting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude.toFixed(6);
        const longitude = position.coords.longitude.toFixed(6);
        reverseGeocode(latitude, longitude);
      },
      () =>
        setLocationStatus(
          "Location permission denied. You can enter your location manually."
        )
    );
  }

  async function reverseGeocode(latitude, longitude) {
    try {
      setLocationStatus("Finding your area name...");

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      const data = await response.json();
      const address = data.address || {};

      const area =
        address.suburb ||
        address.neighbourhood ||
        address.city_district ||
        address.city ||
        address.town ||
        address.village ||
        address.state ||
        "Detected area";

      const city = address.city || address.town || address.state || "";
      const country = address.country || "";

      const readableLocation = [area, city, country].filter(Boolean).join(", ");

      setFormData((prev) => ({
        ...prev,
        latitude,
        longitude,
        location:
          readableLocation || `Detected location: ${latitude}, ${longitude}`,
      }));

      setLocationStatus("Location added to personalize your startup plan.");
    } catch {
      setFormData((prev) => ({
        ...prev,
        latitude,
        longitude,
        location: `Detected location: ${latitude}, ${longitude}`,
      }));

      setLocationStatus("Location detected. Area name can be edited manually.");
    }
  }

  function LocationMap() {
    if (!hasLocation) return null;

    return (
      <div className="mapBox">
        <MapContainer
          center={mapPosition}
          zoom={14}
          scrollWheelZoom={false}
          className="map"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={mapPosition}>
            <Popup>📍 Your business starting point</Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }

  function generatePlan() {
  const generatedPlan = generateBusinessPlan({
    formData,
    opportunities,
  });

  const realisticBudgetItems = getBusinessBudgetItems(formData.idea);
  setBudgetItems(realisticBudgetItems);

  const realisticStartupInvestment = realisticBudgetItems.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  setStartupInvestment(realisticStartupInvestment);

  setPlan(generatedPlan);
  setPage("results");
}

  async function downloadPDF() {
    if (!reportRef.current) return;

    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${formData.idea || "bedaya"}-startup-plan.pdf`);
  }
function updateValidation(index, field, value) {
  const updated = [...validationCustomers];
  updated[index][field] = value;
  setValidationCustomers(updated);
}

function updateBudget(index, value) {
  const updated = [...budgetItems];
  updated[index].amount = Number(value);
  setBudgetItems(updated);
}

const interestedCount = validationCustomers.filter(
  (customer) => customer.interested === "yes"
).length;

const notInterestedCount = validationCustomers.filter(
  (customer) => customer.interested === "no"
).length;

const validationRecommendation =
  interestedCount >= 3
    ? "Proceed: early demand looks promising."
    : interestedCount > 0
    ? "Improve: some interest exists, but more validation is needed."
    : "Do not launch yet: validate demand before spending money.";

const totalBudget = budgetItems.reduce(
  (sum, item) => sum + Number(item.amount || 0),
  0
);

const monthlyRevenue =
  Number(sellingPrice || 0) * Number(expectedCustomers || 0);

const variableCost =
  Number(costPerUnit || 0) * Number(expectedCustomers || 0);

const monthlyOperatingCost =
  variableCost + Number(monthlyFixedCost || 0);

const monthlyProfit =
  monthlyRevenue - monthlyOperatingCost;

const profitPerCustomer =
  Number(sellingPrice || 0) - Number(costPerUnit || 0);

const breakEvenCustomers =
  profitPerCustomer > 0
    ? Math.ceil(Number(monthlyFixedCost || 0) / profitPerCustomer)
    : "Not possible";

const profitMargin =
  monthlyRevenue > 0
    ? ((monthlyProfit / monthlyRevenue) * 100).toFixed(1)
    : 0;

const paybackMonths =
  monthlyProfit > 0
    ? Math.ceil(Number(startupInvestment || 0) / monthlyProfit)
    : "Not yet profitable";
  function Header({ backTo }) {
    return (
      <header className="navbar">
        <div className="logo" onClick={resetApp}>
          Bedaya
        </div>

        <div className="navActions">
          {backTo && (
            <button className="navButton" onClick={() => setPage(backTo)}>
              Back
            </button>
          )}

          <button className="navButton secondary" onClick={clearCurrentPage}>
            Clear
          </button>
        </div>
      </header>
    );
  }

  if (page === "choose") {
    return (
      <div className="app">
        <Header backTo="home" />

        <section className="formSection">
          <div className="formBox">
            <p className="tag">Choose Your Journey</p>
            <h2>How can Bedaya help you today?</h2>

            <div className="journeyGrid">
              <button className="choiceCard" onClick={() => setPage("form")}>
                <h3>I already have a business idea</h3>
                <p>
                  Turn your idea into a checklist, roadmap, readiness score, and
                  launch plan.
                </p>
              </button>

              <button
                className="choiceCard"
                onClick={() => setPage("discover")}
              >
                <h3>Help me discover a business idea</h3>
                <p>
                  Get ranked opportunities based on your skills, budget, time,
                  and location.
                </p>
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (page === "discover") {
    return (
      <div className="app">
        <Header backTo="choose" />

        <section className="formSection">
          <div className="formBox">
            <p className="tag">Opportunity Finder</p>
            <h2>Find business ideas that match you</h2>

            <label>Your skills</label>
            <div className="skillsGrid">
              {skills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  className={
                    selectedSkills.includes(skill)
                      ? "skillButton active"
                      : "skillButton"
                  }
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>

            <label>Starting budget</label>
            <input
  name="budget"
  type="number"
  min="0"
  step="100"
  value={formData.budget}
  onChange={handleChange}
  placeholder="Example: 1500"
/>

            <label>Time available</label>
            <select
              value={timeAvailable}
              onChange={(e) => setTimeAvailable(e.target.value)}
            >
              <option>Weekends only</option>
              <option>5–10 hours/week</option>
              <option>Part-time</option>
              <option>Full-time</option>
            </select>

           <label>Choose location</label>
<div className="locationBox">
  <select
    value={
      formData.location.includes("Al Qua'a")
        ? "Al Qua'a"
        : formData.location.includes("Al Ain")
        ? "Al Ain"
        : formData.location.includes("Abu Dhabi")
        ? "Abu Dhabi"
        : ""
    }
    onChange={(e) => handleLocationChoice(e.target.value)}
  >
    <option value="">Choose location</option>
    <option value="detect">Detect Automatically</option>
    <option value="Al Qua'a">Al Qua'a</option>
    <option value="Al Ain">Al Ain</option>
    <option value="Abu Dhabi">Abu Dhabi</option>
    <option value="other">Other UAE</option>
  </select>

  {formData.location === "" && (
    <input
      name="location"
      type="text"
      placeholder="Or type your location manually"
      value={formData.location}
      onChange={handleChange}
    />
  )}

  {formData.location && (
    <div className="coordinates">
      <p>📍 {formData.location}</p>
    </div>
  )}

  <LocationMap />

  {locationStatus && <p className="locationStatus">{locationStatus}</p>}
</div>

            <button className="mainButton" onClick={findOpportunities}>
              Find Business Opportunities
            </button>

            {recommendedIdeas.length > 0 && (
              <div className="opportunityResults">
                <h3>Recommended Opportunities</h3>

                {recommendedIdeas.map((item) => (
                  <div className="opportunityCard" key={item.name}>
                    <h3>{item.name}</h3>

                    <p>
                      <strong>Opportunity Score:</strong> {item.score}/100
                    </p>

                    <p>
                      <strong>Startup Cost:</strong> AED {item.cost}
                    </p>

                    <p>
                      <strong>Difficulty:</strong> {item.difficulty}
                    </p>

                    <p>
                      <strong>Demand:</strong> {item.demand}
                    </p>

                    <p>
                      <strong>Potential Customers:</strong> {item.customers}
                    </p>

                    <p>
                      <strong>Confidence:</strong> {item.confidence}
                    </p>

                    <div className="matchReasons">
                      <strong>Business Match Breakdown</strong>
                      <ul>
                        {item.matchBreakdown?.map((match, index) => (
                          <li key={index}>
                            {match.label}: {match.stars} ({match.value}%)
                          </li>
                        ))}
                      </ul>

                      <strong>Why this is recommended:</strong>
                      <ul>
                        {item.reasons?.map((reason, index) => (
                          <li key={index}>✔ {reason}</li>
                        ))}
                      </ul>
                    </div>

                    <button
                      className="mainButton"
                      onClick={() => useOpportunity(item)}
                    >
                      Use This Idea →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  if (page === "form") {
    return (
      <div className="app">
        <Header backTo="choose" />

        <section className="formSection">
          <div className="formBox">
            <p className="tag">Business Idea Wizard</p>
            <h2>Tell us about your business idea</h2>

            <form className="businessForm">
              <label>Business idea</label>
              <input
                name="idea"
                value={formData.idea}
                onChange={handleChange}
                type="text"
                placeholder="Example: Home bakery"
              />

              <label>Choose location</label>
<div className="locationBox">
  <select
    value={
      formData.location.includes("Al Qua'a")
        ? "Al Qua'a"
        : formData.location.includes("Al Ain")
        ? "Al Ain"
        : formData.location.includes("Abu Dhabi")
        ? "Abu Dhabi"
        : ""
    }
    onChange={(e) => handleLocationChoice(e.target.value)}
  >
    <option value="">Choose location</option>
    <option value="detect">Detect Automatically</option>
    <option value="Al Qua'a">Al Qua'a</option>
    <option value="Al Ain">Al Ain</option>
    <option value="Abu Dhabi">Abu Dhabi</option>
    <option value="other">Other UAE</option>
  </select>

  {formData.location === "" && (
    <input
      name="location"
      type="text"
      placeholder="Or type your location manually"
      value={formData.location}
      onChange={handleChange}
    />
  )}

  {formData.location && (
    <div className="coordinates">
      <p>📍 {formData.location}</p>
    </div>
  )}

  <LocationMap />

  {locationStatus && <p className="locationStatus">{locationStatus}</p>}
</div>

              <label>Your skills</label>
              <div className="skillsGrid">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    className={
                      selectedSkills.includes(skill)
                        ? "skillButton active"
                        : "skillButton"
                    }
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              <label>Target customer</label>
              <input
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                type="text"
                placeholder="Example: Families, students, farms"
              />

              <label>Starting budget</label>
              <input
  name="budget"
  type="number"
  min="0"
  step="100"
  value={formData.budget}
  onChange={handleChange}
  placeholder="Example: 1500"
/>

              <label>Experience level</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              >
                <option>Beginner</option>
                <option>Some experience</option>
                <option>Experienced</option>
              </select>

              <label>Main challenge</label>
              <textarea
                name="challenge"
                value={formData.challenge}
                onChange={handleChange}
                placeholder="Example: I don't know how to find my first customers."
              />

              <button
                type="button"
                className="mainButton"
                onClick={generatePlan}
              >
                Generate My Plan
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }

  if (page === "results" && plan) {
    const liveReadiness = getReadiness();

    return (
      <div className="app">
        <Header backTo="form" />

        <div ref={reportRef}>
          <section className="resultsHero">
            <p className="tag">Your Startup Roadmap</p>
            <h1>{formData.idea || "Business Idea"} Launch Plan</h1>
            <p>
              A practical first-step plan for a first-time entrepreneur in{" "}
              {formData.location || "a rural UAE community"}.
            </p>

            {hasLocation && (
              <div className="verifiedLocation">📍 {formData.location}</div>
            )}

            <LocationMap />

            <button className="mainButton" onClick={downloadPDF}>
              Download Startup Plan PDF
            </button>
          </section>

          <section className="dashboard">
            <div className="scoreCard">
              <h2>{liveReadiness.score}/100</h2>
              <p>Business Readiness Score</p>
            </div>

            <div className="resultCard large">
              <h3>Business Readiness Breakdown</h3>

              {liveReadiness.breakdown.map((item, index) => (
                <div className="scoreRow" key={index}>
                  <div className="scoreInfo">
                    <strong>{item.title}</strong>
                    <p>{item.status}</p>
                  </div>

                  <div className="scoreValue">
                    {item.score}/{item.max}
                  </div>
                </div>
              ))}
            </div>

            <div className="resultCard">
              <h3>Improve Your Score</h3>
              <p>
                Projected score:{" "}
                <strong>{liveReadiness.projectedScore}/100</strong>
              </p>

              <ul>
                {liveReadiness.improvementActions.map((item, index) => (
                  <li key={index}>✅ {item}</li>
                ))}
              </ul>
            </div>

            <div className="resultCard">
              <h3>Launch Progress Tracker</h3>

              <div className="taskActions">
                <label>
                  <input
                    type="checkbox"
                    checked={customerInterviewDone}
                    onChange={(e) => setCustomerInterviewDone(e.target.checked)}
                  />
                  Customer interviews completed
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={marketingDone}
                    onChange={(e) => setMarketingDone(e.target.checked)}
                  />
                  Marketing page created
                </label>
              </div>

              <div className="progressOuter">
                <div
                  className="progressInner"
                  style={{ width: `${liveReadiness.progressPercent}%` }}
                ></div>
              </div>

              <p>{liveReadiness.progressPercent}% ready to launch</p>

              <p className="launchStatus">
                {liveReadiness.progressPercent >= 90
                  ? "🟢 Ready to launch"
                  : liveReadiness.progressPercent >= 70
                  ? "🟡 Nearly ready"
                  : "🔴 More preparation needed"}
              </p>

              <ul>
                {liveReadiness.progressTasks.map((item, index) => (
                  <li key={index}>
                    {item.done ? "✅" : "⬜"} {item.task}
                  </li>
                ))}
              </ul>
            </div>

            <div className="resultCard large">
              <h3>Business Summary</h3>
              <p>{plan.summary}</p>
            </div>

            <div className="resultCard large">
              <h3>Founder Profile</h3>
              <ul>
                <li>👤 Business idea: {formData.idea || "Not provided"}</li>
                <li>
                  🧠 Skills:{" "}
                  {selectedSkills.length > 0
                    ? selectedSkills.join(", ")
                    : "Not selected"}
                </li>
                <li>💰 Budget: {formData.budget}</li>
                <li>📍 Location: {formData.location || "Not provided"}</li>
                <li>🎯 Target customer: {formData.customer || "Not provided"}</li>
                <li>🕒 Time available: {timeAvailable}</li>
                <li>📈 Experience: {formData.experience}</li>
              </ul>
            </div>

            <div className="resultCard large">
              <h3>Why Bedaya Generated This Plan</h3>
              <ul>
                {plan.whyThisPlan?.map((item, index) => (
                  <li key={index}>✔ {item}</li>
                ))}
              </ul>
            </div>

            <div className="resultCard large">
              <h3>7-Day First Step Plan</h3>
              <ul>
                {plan.sevenDayPlan?.map((item, index) => (
                  <li key={index}>📌 {item}</li>
                ))}
              </ul>
            </div>

            <div className="resultCard large">
              <h3>First Recommended Action</h3>
              <p>{plan.firstAction}</p>
            </div>

            <div className="resultCard large">
              <h3>Location-Based Recommendations</h3>
              <ul>
                {plan.locationAdvice.map((item, index) => (
                  <li key={index}>📍 {item}</li>
                ))}
              </ul>
            </div>
            <div className="resultCard large">
  <h3>Realistic Location Insights</h3>
  <p>
    Bedaya uses location as context, not as live market proof. It does not claim
    that demand is guaranteed in this area.
  </p>

  <h4>Detected Community Profile</h4>
  <p>{locationInsights.profile}</p>

  <h4>Why this location matters</h4>
  <p>{locationInsights.basis}</p>

  <h4>Local Strengths</h4>
  <ul>
    {locationInsights.strengths.map((item, index) => (
      <li key={index}>✅ {item}</li>
    ))}
  </ul>

  <h4>Recommended First Customers</h4>
  <ul>
    {locationInsights.recommendedCustomers.map((item, index) => (
      <li key={index}>👥 {item}</li>
    ))}
  </ul>

  <h4>Recommended Marketing Channels</h4>
  <ul>
    {locationInsights.marketing.map((item, index) => (
      <li key={index}>📢 {item}</li>
    ))}
  </ul>

  <h4>Location-Based First Step</h4>
  <p>{locationInsights.firstMarketAdvice}</p>
</div>

            <div className="resultCard large">
              <h3>Local Entrepreneur Resources</h3>
              <ul>
                {plan.localResources.map((item, index) => (
                  <li key={index}>🏛️ {item}</li>
                ))}
              </ul>
            </div>

            <div className="resultCard large">
              <h3>Possible Requirements / Official Resources</h3>
              <p>
                This is a research checklist, not legal advice. The founder
                should confirm exact requirements through official UAE and Abu
                Dhabi channels.
              </p>

              <ul>
                {(plan.permits || defaultPermits).map((permit, index) => (
                  <li key={index}>
                    ☐{" "}
                    <a href={permit.url} target="_blank" rel="noreferrer">
                      {permit.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="resultCard">
              <h3>Startup Checklist</h3>
              <ul>
                {plan.checklist.map((item, index) => (
                  <li key={index}>✅ {item}</li>
                ))}
              </ul>
            </div>

            <div className="resultCard">
              <h3>30-Day Roadmap</h3>
              <ul>
                {plan.roadmap.map((item, index) => (
                  <li key={index}>📅 {item}</li>
                ))}
              </ul>
            </div>

            <div className="resultCard">
              <h3>Estimated Startup Costs</h3>
              <ul>
                {plan.costs.map((item, index) => (
                  <li key={index}>💰 {item}</li>
                ))}
              </ul>
            </div>
<div className="resultCard large">
  <h3>Customer Validation Tracker</h3>
  <p>
    Testable evidence: record responses from 5 potential customers before
    launching.
  </p>

  {validationCustomers.map((customer, index) => (
    <div className="validationRow" key={index}>
      <strong>Customer {index + 1}</strong>

      <select
        value={customer.interested}
        onChange={(e) =>
          updateValidation(index, "interested", e.target.value)
        }
      >
        <option value="">Interested?</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <input
        type="text"
        value={customer.comment}
        onChange={(e) =>
          updateValidation(index, "comment", e.target.value)
        }
        placeholder="Comment or objection"
      />
    </div>
  ))}

  <p>
    ✅ Interested: <strong>{interestedCount}</strong> | ❌ Not interested:{" "}
    <strong>{notInterestedCount}</strong>
  </p>

  <p className="launchStatus">{validationRecommendation}</p>
</div>

<div className="resultCard large">
  <h3>Startup Budget Planner</h3>
  <p>Enter estimated AED costs to calculate a realistic starting budget.</p>

  {budgetItems.map((item, index) => (
    <div className="budgetRow" key={index}>
      <span>{item.name}</span>
      <input
        type="number"
        min="0"
        value={item.amount}
        onChange={(e) => updateBudget(index, e.target.value)}
      />
    </div>
  ))}

  <h4>Total estimated startup budget: AED {totalBudget}</h4>
</div>

<div className="resultCard large">
  <h3>Revenue Estimator</h3>
  <p>
    Estimate whether the business can become financially realistic after launch.
  </p>

  <div className="revenueGrid">
    <label>
      Selling price per product/service
      <input
        type="number"
        min="0"
        value={sellingPrice}
        onChange={(e) => setSellingPrice(Number(e.target.value))}
      />
    </label>

    <label>
      Variable cost per product/service
      <input
        type="number"
        min="0"
        value={costPerUnit}
        onChange={(e) => setCostPerUnit(Number(e.target.value))}
      />
    </label>

    <label>
      Expected customers/orders per month
      <input
        type="number"
        min="0"
        value={expectedCustomers}
        onChange={(e) => setExpectedCustomers(Number(e.target.value))}
      />
    </label>

    <label>
      Monthly fixed expenses
      <input
        type="number"
        min="0"
        value={monthlyFixedCost}
        onChange={(e) => setMonthlyFixedCost(Number(e.target.value))}
      />
    </label>

    <label>
      Startup investment
      <input
        type="number"
        min="0"
        value={startupInvestment}
        onChange={(e) => setStartupInvestment(Number(e.target.value))}
      />
    </label>
  </div>

  <div className="financialSnapshot">
    <h4>Business Financial Snapshot</h4>
    <p>Monthly revenue: AED {monthlyRevenue}</p>
    <p>Variable monthly cost: AED {variableCost}</p>
    <p>Monthly operating cost: AED {monthlyOperatingCost}</p>
    <p>Estimated monthly profit: AED {monthlyProfit}</p>
    <p>Break-even customers/month: {breakEvenCustomers}</p>
    <p>Profit margin: {profitMargin}%</p>
    <p>Estimated payback period: {paybackMonths} month(s)</p>
  </div>
</div>
            <div className="resultCard">
              <h3>Customer Discovery Questions</h3>
              <ul>
                {plan.questions.map((item, index) => (
                  <li key={index}>🎯 {item}</li>
                ))}
              </ul>
            </div>

            <div className="resultCard large">
              <h3>Risk Assessment</h3>
              <ul>
                {plan.risks.map((item, index) => (
                  <li key={index}>⚠️ {item}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo" onClick={resetApp}>
          Bedaya
        </div>

        <nav>
          <a href="#problem">Problem</a>
          <a href="#features">Features</a>
          <a href="#impact">Impact</a>
        </nav>
      </header>

      <section className="hero">
        <div className="heroText">
          <p className="tag">From Idea to Business — One Step at a Time</p>
          <h1>Turn a local skill or idea into a real business pathway.</h1>
          <p className="subtitle">
            Bedaya helps first-time entrepreneurs discover opportunities,
            validate demand, and generate a practical startup roadmap.
          </p>

          <button className="mainButton" onClick={() => setPage("choose")}>
            Get Started →
          </button>
        </div>

        <div className="heroCard">
          <h3>What Bedaya Does</h3>
          <ul>
            <li>🧭 Finds business ideas from your skills</li>
            <li>📍 Personalizes advice using location</li>
            <li>📊 Ranks opportunities by fit</li>
            <li>🗺️ Builds a 30-day startup roadmap</li>
            <li>📄 Exports a PDF startup plan</li>
          </ul>
        </div>
      </section>

      <section id="problem" className="section">
        <h2>The Problem</h2>
        <p>
          Many people in communities such as Al Qua'a have skills, ideas, and
          local knowledge, but they do not know what first step to take, what
          costs to expect, or how to validate their idea.
        </p>
      </section>

      <section id="features" className="section">
        <h2>What Bedaya Provides</h2>

        <div className="grid">
          <div className="card">Opportunity discovery</div>
          <div className="card">Business readiness score</div>
          <div className="card">Location-based planning</div>
          <div className="card">Downloadable launch plan</div>
        </div>
      </section>

      <section id="impact" className="section">
        <h2>Community Impact</h2>
        <p>
          Bedaya lowers the barrier for first-time founders by converting local
          skills into specific, testable, and realistic business opportunities.
        </p>
      </section>
    </div>
  );
}

export default App;