const buyButton = document.getElementById("buy-button");
const modal = document.getElementById("status-modal");
const loadingView = document.getElementById("loading-view");
const successView = document.getElementById("success-view");
const closeButton = document.getElementById("close-modal");
const doneButton = document.getElementById("done-button");
const toast = document.getElementById("toast");
let processingTimer = null;
let toastTimer = null;

document.getElementById("year").textContent = new Date().getFullYear();

function openModal() {
  if (processingTimer) window.clearTimeout(processingTimer);
  modal.hidden = false;
  loadingView.hidden = false;
  successView.hidden = true;
  buyButton.disabled = true;
  document.body.style.overflow = "hidden";

  // Demo-only loading state. No payment or hardware command is sent.
  processingTimer = window.setTimeout(() => {
    loadingView.hidden = true;
    successView.hidden = false;
    doneButton.focus();
  }, 1600);
}

function closeModal() {
  if (processingTimer) {
    window.clearTimeout(processingTimer);
    processingTimer = null;
  }
  modal.hidden = true;
  buyButton.disabled = false;
  document.body.style.overflow = "";
  buyButton.focus();
}

buyButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
doneButton.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal && !successView.hidden) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden && !successView.hidden) {
    closeModal();
  }
});

// Keep this clearly marked as a simulation until a real backend is connected.
