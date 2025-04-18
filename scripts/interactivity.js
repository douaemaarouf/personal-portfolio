$(document).ready(function () {
  console.log("Document ready");

  // hamburger menu
  $("#hamburger-btn").on("click", function () {
    console.log("Hamburger clicked");
    $("#menu-modal").removeClass("hidden");
    $("body").addClass("no-scroll");
  });

  $("#close-menu").on("click", function () {
    console.log("Close menu clicked");
    $("#menu-modal").addClass("hidden");
    $("body").removeClass("no-scroll");
  });

  $("#menu-modal").on("click", function (e) {
    if (e.target === this) {
      console.log("Clicked outside menu content");
      $(this).addClass("hidden");
      $("body").removeClass("no-scroll");
    }
  });

  // case study modal
  $(".case-study .project-thumbnail").on("click", function (e) {
    e.preventDefault();
    const projectId = $(this).data("project");
    console.log("Opening modal for project:", projectId);
    openModal(this); // 👈 This calls the function defined below
  });

  $("#close-modal").on("click", function () {
    console.log("Close project modal");
    $("#modal-overlay").addClass("hidden");
    $("body").removeClass("no-scroll");
  });

  $("#modal-overlay").on("click", function (e) {
    if (e.target === this) {
      console.log("Clicked outside project modal");
      $(this).addClass("hidden");
      $("body").removeClass("no-scroll");
    }
  });
});

function openModal(clickedElement) {
  const projectId = $(clickedElement).data("project");
  let title = "", description = "", tech = "";

  if (projectId === "email-marketing") {
    title = "Automated B2B Email Flows";
    description = "Built lead-nurture flows with 70% open rate using Mailchimp.";
    tech = "Mailchimp, Shopify, Segmentation";
  } else if (projectId === "branding") {
    title = "Branding & Digital Content Strategy";
    description = "Co-led the launch of the 'Big Red Buzz' video series. Developed branding guidelines to create a cohesive university brand identity.";
    tech = "Adobe Creative Suite (Photoshop, Lightroom, Bridge)";
  } else if (projectId === "ux-research") {
    title = "Product Design & UX Research";
    description = "Designed user-friendly interfaces for mobile apps, focusing on accessibility and engagement. Conducted UX research to optimize user flows. Created wireframes and prototypes using Figma.";
    tech = "Figma, Adobe XD, Prototyping";
  }

  $("#modal-title").text(title);
  $("#modal-description").text(description);
  $("#modal-tech-list").text(tech);
  $("#modal-image").attr("src", "images/laptop.jpg");

  $("#modal-overlay").removeClass("hidden");
  $("body").addClass("no-scroll");
}
