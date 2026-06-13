const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");
const year = document.querySelector("#year");
const visitMessage = document.querySelector("#visit-message");

if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (visitMessage) {
  const lastVisit = localStorage.getItem("silverSageLastVisit");
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome to Silver Sage Motel.";
  } else {
    const days = Math.floor((now - Number(lastVisit)) / 86400000);

    visitMessage.textContent =
      days < 1
        ? "Welcome back! You visited earlier today."
        : `Welcome back! Your last visit was ${days} day${days === 1 ? "" : "s"} ago.`;
  }

  localStorage.setItem("silverSageLastVisit", now);
}