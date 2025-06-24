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
    openModal(this);
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

  function typeWriterEffect(elementId, text, speed = 100, delay = 2000) {
    const element = document.getElementById(elementId);
    const chars = Array.from(text);
    let index = 0;

    function type() {
      if (index < chars.length) {
        element.textContent += chars[index];
        index++;
        setTimeout(type, speed);
      } else {
        setTimeout(() => {
          element.textContent = "";
          index = 0;
          setTimeout(type, 500);
        }, delay);
      }
    }

    type();
  }

  typeWriterEffect("typewriter-text", "Hey hey, I'm Douae! 👋", 100, 3000, 800);
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

function animateNumbers() {
  const statNumbers = document.querySelectorAll('.stat-number');

  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));

    // Check if target is valid
    if (isNaN(target)) {
      console.log('Invalid target for:', stat);
      return;
    }

    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    stat.classList.add('counting');

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        current = target;
        stat.classList.remove('counting');
        stat.classList.add('complete');
        clearInterval(timer);
      }

      // Format the display
      if (target === 70) {
        stat.textContent = Math.floor(current) + '%';
      } else if (target === 2000) {
        stat.textContent = Math.floor(current).toLocaleString() + '+';
      } else {
        stat.textContent = Math.floor(current);
      }
    }, 16);
  });
}

function startRepeatingAnimation() {
  animateNumbers(); // Run immediately

  // Then repeat every 5 seconds (5000ms)
  setInterval(() => {
    // Reset all numbers to 0 first
    document.querySelectorAll('.stat-number').forEach(stat => {
      stat.classList.remove('counting', 'complete');
      stat.textContent = '0';
    });

    // Small delay before starting animation again
    setTimeout(() => {
      animateNumbers();
    }, 200);

  }, 10000); // Repeat every 10 seconds
}

// Make sure DOM is loaded and section exists
$(document).ready(function () {
  const aboutSection = $('.about-snapshot');

  if (aboutSection.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            startRepeatingAnimation(); // Start the repeating animation
          }, 200);
          observer.unobserve(entry.target); // Only trigger once when first visible
        }
      });
    });

    observer.observe(aboutSection[0]);
  }
});


// Enhanced iPhone Gallery JavaScript with Scroll Indicator

$(document).ready(function () {

  const photoGrid = $('.photo-grid-phone');
  const phoneGallery = $('.phone-gallery');

  if (!photoGrid.length) return;

  // Hide scroll indicator when user starts scrolling
  photoGrid.on('scroll', function () {
    const scrollTop = $(this).scrollTop();

    if (scrollTop > 20) {
      phoneGallery.addClass('scrolled');
    } else {
      phoneGallery.removeClass('scrolled');
    }
  });

  // Photo modal functionality (keeping it simple)
  $('.photo-item img').off('click').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const imgSrc = $(this).attr('src');
    if (!imgSrc || imgSrc.includes('data:')) return;

    const modal = $(`
      <div class="image-modal" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        cursor: pointer;
        backdrop-filter: blur(10px);
      ">
        <img src="${imgSrc}" style="
          max-width: 90%;
          max-height: 90%;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        ">
      </div>
    `);

    $('body').append(modal);

    modal.on('click', function () {
      $(this).remove();
    });
  });

  // Optional: Click on scroll indicator to demo scroll
  $('.scroll-indicator').on('click', function () {
    photoGrid[0].scrollTo({
      top: 200,
      behavior: 'smooth'
    });
  });

  // Simple demo scroll when gallery comes into view (one time only)
  let hasShownDemo = false;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasShownDemo) {
          hasShownDemo = true;
          setTimeout(() => {
            photoGrid[0].scrollTo({
              top: 150,
              behavior: 'smooth'
            });
            setTimeout(() => {
              photoGrid[0].scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }, 2000);
          }, 3000);
          observer.unobserve(entry.target);
        }
      });
    });

    photoGrid.each(function () {
      observer.observe(this);
    });
  }

});


// MODAL FUNCTIONALITY FOR CASE STUDIES

$(document).ready(function () {
  console.log("Document ready - checking for showcase items");

  // Check if showcase items exist
  const showcaseItems = $('.showcase-item');
  console.log("Found showcase items:", showcaseItems.length);

  // Log each item's data-case attribute
  showcaseItems.each(function (index) {
    const caseId = $(this).data('case');
    console.log(`Item ${index}:`, caseId);
  });

  // Case study data
  const caseStudies = {
    'email-marketing': {
      tag: 'B2B Marketing',
      title: 'Automated Email Campaigns',
      subtitle: 'Built lead-nurture flows with advanced segmentation that achieved 70% open rates',
      content: `
        <div class="case-section">
          <h3>Challenge</h3>
          <p>eCornell needed to improve their student engagement and conversion rates through more effective email marketing. Their existing campaigns had low open rates and poor segmentation.</p>
        </div>

        <div class="case-section">
          <h3>Solution</h3>
          <p>I designed and implemented automated email campaigns with advanced behavioral segmentation, personalized content paths, and strategic timing optimization.</p>
          <ul>
            <li>Created 5 distinct customer journey flows based on user behavior</li>
            <li>Implemented dynamic content personalization using student data</li>
            <li>A/B tested subject lines, send times, and content formats</li>
            <li>Set up automated triggers based on course interactions</li>
          </ul>
        </div>

        <div class="case-stats">
          <div class="stat-item-modal">
            <span class="stat-number-modal">70%</span>
            <span class="stat-label-modal">Open Rate</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">45%</span>
            <span class="stat-label-modal">Click Rate</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">2,000+</span>
            <span class="stat-label-modal">Students Reached</span>
          </div>
        </div>

        <div class="case-section">
          <h3>Results</h3>
          <p>The new email campaigns resulted in significantly higher engagement rates and improved student enrollment in continuing education programs.</p>

          <h3>Tech Stack</h3>
          <div class="tech-stack">
            <span class="tech-pill">Mailchimp</span>
            <span class="tech-pill">Zapier</span>
            <span class="tech-pill">Google Analytics</span>
            <span class="tech-pill">A/B Testing</span>
          </div>
        </div>
      `
    },

    'branding': {
      tag: 'Brand Strategy',
      title: 'Big Red Buzz Series',
      subtitle: 'Video content strategy that increased Cornell brand engagement by 300%',
      content: `
        <div class="case-section">
          <h3>Challenge</h3>
          <p>Cornell needed a fresh approach to showcase student life and academic programs that would resonate with prospective students and increase social media engagement.</p>
        </div>

        <div class="case-section">
          <h3>Strategy</h3>
          <p>I co-led the development of "Big Red Buzz," a video content series featuring authentic student stories and behind-the-scenes campus life.</p>
          <ul>
            <li>Developed content strategy and brand guidelines</li>
            <li>Coordinated with 15+ student ambassadors</li>
            <li>Created consistent visual identity across platforms</li>
            <li>Managed production timeline and content calendar</li>
          </ul>
        </div>

        <div class="case-stats">
          <div class="stat-item-modal">
            <span class="stat-number-modal">300%</span>
            <span class="stat-label-modal">Engagement Increase</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">50K+</span>
            <span class="stat-label-modal">Total Views</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">12</span>
            <span class="stat-label-modal">Episodes</span>
          </div>
        </div>

        <div class="case-section">
          <h3>Impact</h3>
          <p>The series became Cornell's most successful social media campaign, leading to increased campus visit requests and improved brand perception among target demographics.</p>

          <h3>Tools Used</h3>
          <div class="tech-stack">
            <span class="tech-pill">Adobe Premiere</span>
            <span class="tech-pill">Photoshop</span>
            <span class="tech-pill">Social Media Analytics</span>
            <span class="tech-pill">Content Strategy</span>
          </div>
        </div>
      `
    },

    'ux-design': {
      tag: 'UX Design',
      title: 'Mobile App Interface',
      subtitle: 'User-centered design for accessibility that improved usability scores by 85%',
      content: `
        <div class="case-section">
          <h3>Challenge</h3>
          <p>A local non-profit needed a mobile app interface that would be accessible to users with diverse abilities while maintaining an intuitive and engaging user experience.</p>
        </div>

        <div class="case-section">
          <h3>Research & Design Process</h3>
          <p>I conducted extensive user research and accessibility testing to create an inclusive design that serves all users effectively.</p>
          <ul>
            <li>Interviewed 25+ users with varying accessibility needs</li>
            <li>Created user personas and accessibility guidelines</li>
            <li>Designed wireframes and interactive prototypes</li>
            <li>Conducted usability testing with screen readers</li>
            <li>Implemented WCAG 2.1 AA compliance standards</li>
          </ul>
        </div>

        <div class="case-stats">
          <div class="stat-item-modal">
            <span class="stat-number-modal">85%</span>
            <span class="stat-label-modal">Usability Improvement</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">4.8/5</span>
            <span class="stat-label-modal">User Rating</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">100%</span>
            <span class="stat-label-modal">WCAG Compliance</span>
          </div>
        </div>

        <div class="case-section">
          <h3>Key Features</h3>
          <ul>
            <li>High contrast mode with customizable color schemes</li>
            <li>Voice navigation and screen reader optimization</li>
            <li>Large touch targets and simplified navigation</li>
            <li>Multi-language support with right-to-left text</li>
          </ul>

          <h3>Design Tools</h3>
          <div class="tech-stack">
            <span class="tech-pill">Figma</span>
            <span class="tech-pill">Adobe XD</span>
            <span class="tech-pill">Accessibility Testing</span>
            <span class="tech-pill">User Research</span>
          </div>
        </div>
      `
    },

    'photography': {
      tag: 'Photography',
      title: 'Morocco Travel Series',
      subtitle: 'Documenting cultural stories and landscapes across Morocco',
      content: `
        <div class="case-section">
          <h3>Project Overview</h3>
          <p>A personal photography project documenting the diverse landscapes, architecture, and cultural moments across Morocco, from the Sahara Desert to the coastal cities.</p>
        </div>

        <div class="case-section">
          <h3>Approach</h3>
          <p>I spent three weeks traveling across Morocco, focusing on authentic moments and the interplay between traditional and modern life.</p>
          <ul>
            <li>Street photography in Marrakech and Tangier</li>
            <li>Landscape photography in the Sahara Desert</li>
            <li>Architectural details of traditional riads and modern buildings</li>
            <li>Portrait photography of local artisans and nomads</li>
          </ul>
        </div>

        <div class="case-stats">
          <div class="stat-item-modal">
            <span class="stat-number-modal">500+</span>
            <span class="stat-label-modal">Photos Captured</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">8</span>
            <span class="stat-label-modal">Cities Visited</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">3</span>
            <span class="stat-label-modal">Weeks Travel</span>
          </div>
        </div>

        <div class="case-section">
          <h3>Featured Locations</h3>
          <ul>
            <li>Sahara Desert - Nomadic life and endless dunes</li>
            <li>Larache - Coastal beauty and fishing communities</li>
            <li>Tangier - Where Africa meets Europe</li>
            <li>Traditional Architecture - Doors, tiles, and geometric patterns</li>
          </ul>

          <h3>Equipment & Post-Processing</h3>
          <div class="tech-stack">
            <span class="tech-pill">Canon EOS R6</span>
            <span class="tech-pill">Adobe Lightroom</span>
            <span class="tech-pill">Photoshop</span>
            <span class="tech-pill">Travel Photography</span>
          </div>
        </div>
      `
    },

    'data-analysis': {
      tag: 'Data Science',
      title: 'Market Sentiment Analysis',
      subtitle: 'Financial forecasting models that improved prediction accuracy by 40%',
      content: `
        <div class="case-section">
          <h3>Challenge</h3>
          <p>Millennium Partners needed more accurate market sentiment analysis to improve their trading algorithms and risk assessment models.</p>
        </div>

        <div class="case-section">
          <h3>Solution</h3>
          <p>I developed machine learning models that analyze social media sentiment, news sentiment, and market indicators to predict market movements.</p>
          <ul>
            <li>Built web scrapers for financial news and social media data</li>
            <li>Implemented natural language processing for sentiment analysis</li>
            <li>Created ensemble models combining multiple data sources</li>
            <li>Developed real-time dashboard for monitoring sentiment trends</li>
          </ul>
        </div>

        <div class="case-stats">
          <div class="stat-item-modal">
            <span class="stat-number-modal">40%</span>
            <span class="stat-label-modal">Accuracy Improvement</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">1M+</span>
            <span class="stat-label-modal">Data Points Analyzed</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">95%</span>
            <span class="stat-label-modal">Model Confidence</span>
          </div>
        </div>

        <div class="case-section">
          <h3>Technical Implementation</h3>
          <p>The model processes real-time data streams and provides actionable insights for trading decisions, with automated alerts for significant sentiment shifts.</p>

          <h3>Tech Stack</h3>
          <div class="tech-stack">
            <span class="tech-pill">Python</span>
            <span class="tech-pill">TensorFlow</span>
            <span class="tech-pill">NLP</span>
            <span class="tech-pill">Data Visualization</span>
            <span class="tech-pill">APIs</span>
          </div>
        </div>
      `
    },

    'community-building': {
      tag: 'Leadership',
      title: 'Community Building',
      subtitle: 'Growing Women in Computing from 500 to 2,000+ active members',
      content: `
        <div class="case-section">
          <h3>Challenge</h3>
          <p>As Co-President of Women in Computing at Cornell, I needed to revitalize a declining organization and create meaningful opportunities for underrepresented students in tech.</p>
        </div>

        <div class="case-section">
          <h3>Strategy</h3>
          <p>I implemented a comprehensive growth strategy focused on community building, professional development, and inclusive programming.</p>
          <ul>
            <li>Redesigned event programming with industry professionals</li>
            <li>Created mentorship program connecting students with alumni</li>
            <li>Launched technical workshops and coding bootcamps</li>
            <li>Established partnerships with major tech companies</li>
            <li>Implemented social media strategy for community engagement</li>
          </ul>
        </div>

        <div class="case-stats">
          <div class="stat-item-modal">
            <span class="stat-number-modal">300%</span>
            <span class="stat-label-modal">Membership Growth</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">50+</span>
            <span class="stat-label-modal">Events Organized</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">15</span>
            <span class="stat-label-modal">Company Partners</span>
          </div>
        </div>

        <div class="case-section">
          <h3>Impact</h3>
          <p>The organization became one of the most active student groups on campus, with increased job placement rates and stronger alumni network engagement.</p>

          <h3>Key Initiatives</h3>
          <div class="tech-stack">
            <span class="tech-pill">Mentorship Program</span>
            <span class="tech-pill">Technical Workshops</span>
            <span class="tech-pill">Industry Events</span>
            <span class="tech-pill">Community Building</span>
          </div>
        </div>
      `
    }
  };

  // Open modal function
  function openCaseStudyModal(caseId) {
    console.log("openCaseStudyModal called with:", caseId);

    const caseData = caseStudies[caseId];
    if (!caseData) {
      console.log("No case data found for:", caseId);
      return;
    }

    console.log("Creating modal HTML...");

    // Create modal HTML
    const modalHTML = `
      <div class="case-study-modal" id="case-modal">
        <div class="modal-container">
          <div class="modal-content">
            <div class="modal-header">
              <button class="modal-close" id="modal-close">×</button>
              <div class="modal-tag">${caseData.tag}</div>
              <h2 class="modal-title">${caseData.title}</h2>
              <p class="modal-subtitle">${caseData.subtitle}</p>
            </div>
            <div class="modal-body">
              ${caseData.content}
            </div>
          </div>
        </div>
      </div>
    `;

    // Add modal to page
    $('body').append(modalHTML);
    console.log("Modal added to body");

    // Prevent body scroll
    $('body').css('overflow', 'hidden');

    // Show modal with animation
    setTimeout(() => {
      $('#case-modal').addClass('active');
      console.log("Modal activated");
    }, 10);
  }

  // Close modal function
  function closeCaseStudyModal() {
    $('#case-modal').removeClass('active');
    $('body').css('overflow', '');

    setTimeout(() => {
      $('#case-modal').remove();
    }, 400);
  }

  // Enhanced click handler with debugging
  $(document).on('click', '.showcase-item', function (e) {
    console.log("Showcase item clicked!");

    const caseId = $(this).data('case');
    console.log("Case ID:", caseId);

    if (caseId) {
      console.log("Opening modal for:", caseId);
      openCaseStudyModal(caseId);
    } else {
      console.log("No case ID found!");
    }
  });

  // Close modal events
  $(document).on('click', '#modal-close', closeCaseStudyModal);
  $(document).on('click', '.case-study-modal', function (e) {
    if (e.target === this) {
      closeCaseStudyModal();
    }
  });

  // Close with Escape key
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $('#case-modal').length) {
      closeCaseStudyModal();
    }
  });

  // Test function to verify modal functionality
  function testModal() {
    console.log("Testing modal...");
    openCaseStudyModal('email-marketing');
  }

  // You can call testModal() in the browser console to test
  window.testModal = testModal;

});
