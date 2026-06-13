const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", () => {
    localStorage.setItem(
      "lastReservationRequest",
      new Date().toLocaleString()
    );
  });
}