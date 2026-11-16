"use strict";

// All factors below are illustrative classroom assumptions, NOT official measurements.
// Every category is converted to kg CO2e per year before being added.
function calculateFootprint(values) {
  const dailyFood = { plant: 2, vegetarian: 3, mixed: 5, meat: 7 };
  return {
    Home: values.electricity * 12 * 0.5 / values.household,
    Travel: values.car * 52 * 0.2 / values.passengers + values.flight * 90,
    Food: dailyFood[values.diet] * 365,
    Electronics: values.devices * 70,
    Shopping: values.clothes * 10
  };
}

const form = document.getElementById("footprint-form");
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
const previous = document.getElementById("prev");
const next = document.getElementById("next");
const restart = document.getElementById("restart");
let currentStep = 0;

function showStep(index, moveFocus = true) {
  currentStep = index;
  panels.forEach((panel, i) => { panel.hidden = i !== index; });
  tabs.forEach((tab, i) => {
    tab.setAttribute("aria-selected", String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
  });
  previous.disabled = index === 0;
  next.hidden = index === 6;
  restart.hidden = index !== 6;
  next.textContent = index === 5 ? "Calculate" : "Next";
  document.getElementById("card-title").textContent = index === 6 ? "Your result" : "Fill the form below";
  if (moveFocus) panels[index].focus({ preventScroll: true });
}

// Show an invalid field's panel BEFORE asking the browser to focus the field.
function validateStep(index) {
  const inputs = panels[index].querySelectorAll("input, select");
  for (const input of inputs) {
    if (!input.checkValidity()) {
      showStep(index, false);
      input.reportValidity();
      return false;
    }
  }
  return true;
}

function showResult() {
  for (let i = 0; i < 6; i++) {
    if (!validateStep(i)) return;
  }
  const values = Object.fromEntries(new FormData(form));
  const categories = calculateFootprint(values);
  const total = Object.values(categories).reduce((sum, value) => sum + value, 0);
  document.getElementById("total").textContent = (total / 1000).toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  document.getElementById("total-kg").textContent = total.toLocaleString("en", { maximumFractionDigits: 1 });
  const name = values.name.trim();
  // textContent keeps user-supplied names as text, never executable HTML.
  document.getElementById("result-greeting").textContent = name ? `${name}, here is your estimated annual footprint.` : "Your estimated annual footprint";
  const body = document.getElementById("breakdown");
  body.replaceChildren();
  for (const [category, value] of Object.entries(categories)) {
    const row = document.createElement("tr");
    const label = document.createElement("th");
    label.scope = "row";
    label.textContent = category;
    const amount = document.createElement("td");
    amount.className = "text-end";
    amount.textContent = value.toLocaleString("en", { maximumFractionDigits: 1 });
    row.append(label, amount);
    body.append(row);
  }
  const largest = Object.keys(categories).reduce((a, b) => categories[a] >= categories[b] ? a : b);
  const tips = {
    Home: "Try switching off unused lights and reducing unnecessary air-conditioning use.",
    Travel: "Consider sharing rides, walking short distances, or using public transport where available.",
    Food: "Try more plant-based meals and plan portions to reduce food waste.",
    Electronics: "Keep devices longer and repair them when practical.",
    Shopping: "Buy fewer new items, repair clothes, or choose second-hand options."
  };
  document.getElementById("tip").textContent = `${largest} is the largest category in this estimate. ${tips[largest]}`;
  showStep(6);
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => index === 6 ? showResult() : showStep(index));
  // Arrow keys move focus; Enter or Space activates the focused tab.
  tab.addEventListener("keydown", event => {
    let target;
    if (event.key === "ArrowRight") target = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") target = (index + tabs.length - 1) % tabs.length;
    if (event.key === "Home") target = 0;
    if (event.key === "End") target = tabs.length - 1;
    if (target !== undefined) {
      event.preventDefault();
      tabs.forEach((item, i) => { item.tabIndex = i === target ? 0 : -1; });
      tabs[target].focus();
    }
  });
});

form.addEventListener("submit", event => {
  event.preventDefault();
  if (currentStep >= 5) showResult();
  else if (validateStep(currentStep)) showStep(currentStep + 1);
});
previous.addEventListener("click", () => showStep(Math.max(0, currentStep - 1)));
restart.addEventListener("click", () => {
  form.reset();
  showStep(0);
});
