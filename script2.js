// Handle portfolio form submission
document.getElementById("portfolioForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission
  console.log("Form submitted!"); // Debugging step

  // Get user inputs
  const name = document.getElementById("name").value;
  const profession = document.getElementById("profession").value;
  const description = document.getElementById("description").value;
  const languages = document.getElementById("languages").value.split(",").map(lang => lang.trim());
  const skills = document.getElementById("skills").value.split(",").map(skill => skill.trim());
  const experience = document.getElementById("experience").value;
  const education = document.getElementById("education").value;
  const profileImage = document.getElementById("profileImage").files[0];
  const socialLinks = document.getElementById("social").value.split(",").map(link => link.trim());

  // Collect certification data
  const certificationNames = Array.from(document.getElementsByClassName("cert-name")).map(input => input.value);
  const certificationImages = Array.from(document.getElementsByClassName("cert-image")).map(input => input.files[0]);

  // Validate input (optional but recommended)
  if (!name || !profession || !description || !languages.length || !skills.length || !profileImage) {
    alert("Please fill in all required fields!");
    return;
  }

  // Show portfolio information dynamically
  displayPortfolio({
    name,
    profession,
    description,
    languages,
    skills,
    experience,
    education,
    profileImage,
    socialLinks,
    certifications: certificationNames.map((cert, index) => ({
      name: cert,
      image: certificationImages[index],
    })),
  });
});

// Add new certification input block dynamically
function addCertification() {
  console.log("Adding certification..."); // Debugging step

  const certificationsContainer = document.getElementById("certifications");

  // Create a new certification block
  const newCertBlock = document.createElement("div");
  newCertBlock.className = "form-group";

  // Certification Name Input
  const certNameLabel = document.createElement("label");
  certNameLabel.textContent = "Certification Name";
  const certNameInput = document.createElement("input");
  certNameInput.type = "text";
  certNameInput.className = "cert-name";
  certNameInput.placeholder = "Certification Name";

  // Certification Image Input
  const certImageLabel = document.createElement("label");
  certImageLabel.textContent = "Upload Certification Image";
  const certImageInput = document.createElement("input");
  certImageInput.type = "file";
  certImageInput.className = "cert-image";
  certImageInput.accept = "image/*";

  // Append fields to the certification block
  newCertBlock.appendChild(certNameLabel);
  newCertBlock.appendChild(certNameInput);
  newCertBlock.appendChild(certImageLabel);
  newCertBlock.appendChild(certImageInput);

  // Add to the container
  certificationsContainer.appendChild(newCertBlock);
}

// Display the portfolio information dynamically
function displayPortfolio(data) {
  // Clear form and hide it
  document.getElementById("portfolioForm").reset();
  document.getElementById("form-container").style.display = "none";

  // Create a portfolio display container
  const portfolioDisplay = document.createElement("div");
  portfolioDisplay.className = "portfolio-display";

  // Display profile image
  if (data.profileImage) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const profileImage = document.createElement("img");
      profileImage.src = e.target.result;
      profileImage.alt = `${data.name}'s Profile Image`; // Fixed interpolation
      profileImage.className = "profile-image";
      portfolioDisplay.appendChild(profileImage);
    };
    reader.readAsDataURL(data.profileImage);
  }

  // Display basic information
  const info = `
    <h2>${data.name}</h2>
    <h4>${data.profession}</h4>
    <p><strong>About:</strong> ${data.description}</p>
    <p><strong>Languages:</strong> ${data.languages.join(", ")}</p>
    <p><strong>Skills:</strong> ${data.skills.join(", ")}</p>
    <p><strong>Experience:</strong> ${data.experience}</p>
    <p><strong>Education:</strong> ${data.education}</p>
    <p><strong>Social Links:</strong></p>
    <ul>
      ${data.socialLinks.map(link => `<li><a href="${link}" target="_blank">${link}</a></li>`).join("")}
    </ul>
  `;
  portfolioDisplay.innerHTML += info;

  // Display certifications
  if (data.certifications.length > 0) {
    const certSection = document.createElement("div");
    certSection.className = "certifications-display";

    // Create and append the heading for certifications
    const certTitle = document.createElement("h3");
    certTitle.textContent = "Certifications:";
    certSection.appendChild(certTitle);

    // Loop through certifications and display each one
    data.certifications.forEach(cert => {
      const certDiv = document.createElement("div");
      certDiv.className = "cert-item";

      // Display certification name
      const certName = document.createElement("p");
      certName.textContent = cert.name;
      certDiv.appendChild(certName);

      // Check if the cert has an image and display it
      if (cert.image) {
        const certReader = new FileReader();
        certReader.onload = function (e) {
          const certImage = document.createElement("img");
          certImage.src = e.target.result;
          certImage.alt = `${cert.name} Certification Image`; // Fixed interpolation
          certImage.className = "cert-image-display";
          certDiv.appendChild(certImage);
        };
        certReader.readAsDataURL(cert.image);
      }

      // Append the certification div to the section
      certSection.appendChild(certDiv);
    });

    // Append the certSection to the portfolio display
    portfolioDisplay.appendChild(certSection);
  }

  // Append portfolio display to the body or any other parent container
  document.body.appendChild(portfolioDisplay);
}
