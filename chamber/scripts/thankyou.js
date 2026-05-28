const results = document.querySelector("#results");

const params = new URLSearchParams(window.location.search);

results.innerHTML = `
  <p><strong>First Name:</strong> ${params.get("first")}</p>

  <p><strong>Last Name:</strong> ${params.get("last")}</p>

  <p><strong>Email:</strong> ${params.get("email")}</p>

  <p><strong>Phone:</strong> ${params.get("phone")}</p>

  <p><strong>Business Name:</strong> ${params.get("business")}</p>

  <p><strong>Timestamp:</strong> ${params.get("timestamp")}</p>
`;