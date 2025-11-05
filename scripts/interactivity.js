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
    $("body").removeClass
    ("no-scroll");
  });

  $("#menu-modal").on("click", function (e) {
    if (e.target === this) {
      console.log("Clicked outside menu content");
      $(this).addClass("hidden");
      $("body").removeClass("no-scroll");
    }
  });

  // ORIGINAL case study modal - keeping for compatibility
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
    if (!element) return;

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

// ORIGINAL openModal function - keeping for compatibility
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


// MODAL FUNCTIONALITY FOR CASE STUDIES - PRESERVING ALL ORIGINAL CONTENT

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

  // Case study data - PRESERVING ALL YOUR ORIGINAL CONTENT
  const caseStudies = {
    'mcci-automation': {
      tag: 'Marketing Automation',
      title: 'Building MCCI\'s First Email Automation Workflows',
      subtitle: 'From zero automation to intelligent, behavior-driven email flows—reducing bounce rates from 18% to 6%',
      content: `
        <div class="case-section">
          <h3>🚀 Project Overview</h3>
          <p><strong>Role:</strong> Marketing & Automation Intern<br>
          <strong>Timeline:</strong> June–August 2024<br>
          <strong>Scope:</strong> Strategy, segmentation, copywriting, automation workflows, A/B testing, CRM troubleshooting</p>
        </div>

        <div class="case-section">
          <h3>🚨 The Challenge</h3>
          <p>MCCI had <strong>never used email automation before</strong>. The system was entirely manual — no drip sequences, no triggers, no performance data. As their first marketing intern, my job was to build that structure from scratch.</p>
          <p>My manager gave me the vision — three campaigns that could lay the foundation for smarter, more scalable communication. I brought strategy, user perspective, and voice — and helped usher in a new era of marketing for the company.</p>
        </div>

        <div class="case-section">
          <h3>🎯 My Mission</h3>
          <p>To design and launch an intelligent, automated email system that would:</p>
          <ul>
            <li>Re-engage abandoned shoppers</li>
            <li>Collect insights from returning customers</li>
            <li>Nurture Milesight product buyers with co-branded storytelling</li>
            <li>Reduce bounce rates and increase conversion</li>
          </ul>
        </div>

        <div class="case-section">
          <h3>🧠 My Process</h3>

          <h4>🛠️ 1. Research & Infrastructure</h4>
          <p>My onboarding focused on researching automation best practices and how tools like Shopify, Mailchimp, and Zapier (which we didn't yet have access to) could scale outreach while keeping things personal. I approached automation not just as a workflow, but as a way to free up space for the work that really matters — human support, storytelling, and growth.</p>
          <ul>
            <li>Audited Shopify segments and cleaned up customer data</li>
            <li>Created filters for behavior-based triggers like 3+ orders and Milesight purchases</li>
            <li>Wrote reusable header/footer blocks and tracked engagement using UTM links</li>
          </ul>

          <h4>✍️ 2. Copy + Flow Design</h4>
          <p>I created over 20 emails across three campaign types, each grounded in user psychology and written to feel human and credible — but not transactional.</p>
          <ul>
            <li>Built 3–9 step drip flows depending on campaign complexity</li>
            <li>Crafted original subject lines and CTAs with variant testing</li>
            <li>Balanced urgency, warmth, and clarity in each send</li>
          </ul>

          <h4>🧪 3. Testing + Optimization</h4>
          <ul>
            <li>Manually QA'd each workflow using test data and real-time triggers</li>
            <li>Removed timing bottlenecks (like the default 24-hour cart delay)</li>
            <li>Cleaned the list to reduce bounce rate from 18% to ~6%</li>
            <li>Adjusted copy midstream based on early behavior + feedback from my manager</li>
          </ul>
        </div>

        <div class="case-stats">
          <div class="stat-item-modal">
            <span class="stat-number-modal">18% → 6%</span>
            <span class="stat-label-modal">Bounce Rate Reduction</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">20+</span>
            <span class="stat-label-modal">Emails Created</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">3</span>
            <span class="stat-label-modal">Campaign Types</span>
          </div>
        </div>

        <div class="case-section">
          <h3>🚀 What We Launched</h3>

          <h4>🛒 Abandoned Cart Recovery</h4>
          <p>Built a series of emails triggered after checkout was initiated but not completed.</p>
          <ul>
            <li>Optimized subject lines via A/B testing and adjusted send timing based on user drop-off</li>
            <li>Manually tested every step of the workflow on myself to ensure smooth delivery</li>
            <li>Reframed copy from "Don't forget this" → "Need help deciding what's best for your project?"</li>
          </ul>

          <h4>🔁 Returning Customers (3+ Orders)</h4>
          <p>Created a customer segment in Shopify for high-value repeat buyers (8% of the total customer base).</p>
          <ul>
            <li>Designed a 7-part drip survey campaign to gather insights and reinforce loyalty</li>
            <li>Wrote dynamically personalized emails with varying tone and CTA length</li>
            <li>Overcame Shopify's platform limitations by manually exporting and triggering email sends</li>
          </ul>

          <h4>📦 Milesight Lead Nurturing</h4>
          <p>Developed co-branded campaigns for MCCI's flagship IoT hardware partner, Milesight.</p>
          <ul>
            <li>Tied in LinkedIn campaign updates and the Milesight Impact Award to spark engagement</li>
            <li>Personalized CTAs based on customer type (rep contact vs. direct application)</li>
            <li>One of the emails led to a highly engaged lead that the team began closing</li>
          </ul>
        </div>

        <div class="case-section">
          <h3>🎯 Results & Reflection</h3>
          <p>This internship was both a test and a launchpad. I didn't just learn how to use Shopify's automation — I was learning how to think like a system designer, a copywriter, and a strategist all at once and how to build infrastructure that lasts.</p>

          <p>Even though this was my first exposure to email automation, I walked away having:</p>
          <ul>
            <li>Launched 3 full-funnel email campaigns from scratch</li>
            <li>Applied behavioral segmentation logic to real customer data</li>
            <li>Wrote and structured 20+ emails that blended strategy with story</li>
            <li>Built foundational workflows that the company still uses today</li>
          </ul>

          <p>More importantly, I saw the impact — not just in clicks or opens, but in a company beginning to work smarter, not harder.</p>
        </div>

        <div class="case-section">
          <h3>📈 Impact</h3>
          <p>While this was my first internship — and the company's first time implementing email automation — we began seeing early signs of success even before metrics were fully tracked.</p>

          <div style="background: var(--studio); padding: 20px; border-radius: 12px; border-left: 4px solid var(--rain-storm); margin: 20px 0; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
            <p style="font-style: italic; margin: 0; color: #484848; font-size: 16px; line-height: 1.6;">
              "We had a great response to one of the emails from the Milesight campaign you created, and we are going to get a nice sale from it! It takes a while, but things eventually work."
            </p>
            <p style="font-weight: 600; margin: 10px 0 0 0; color: #1d1d1f; font-size: 14px;">
              — Michelle Keefer, Director of Strategy & Outreach
            </p>
          </div>

          <p>These campaigns now serve as the template for all of MCCI's future automated efforts, providing a scalable system that can evolve with the business.</p>
        </div>

        <div class="case-section">
          <h3>🧠 If I Had More Time...</h3>
          <ul>
            <li>I would have integrated Zapier to expand behavioral triggers beyond Shopify's limits</li>
            <li>I'd build a live reporting dashboard to visualize campaign success and improve attribution</li>
            <li>I would have experimented with user-generated content from survey responses</li>
            <li>Write a customer journey map and align emails to lifecycle stages</li>
          </ul>
        </div>

        <div class="case-section">
          <h3>🧾 TL;DR</h3>
          <p>I helped MCCI move from zero automation to smart, behavior-driven email flows — built from scratch, tested by hand, and still running.</p>
        </div>

        <div class="case-section">
          <h3>🛠️ Tools Used</h3>
          <div class="tech-stack">
            <span class="tech-pill">Shopify Email Automations</span>
            <span class="tech-pill">Mailchimp</span>
            <span class="tech-pill">Google Sheets</span>
            <span class="tech-pill">A/B Subject Line Testing</span>
            <span class="tech-pill">Customer Behavior Filtering</span>
            <span class="tech-pill">UTM Link Tracking</span>
            <span class="tech-pill">Manual Segmentation</span>
          </div>
        </div>
      `
    },

'ai-jill': {
  tag: 'AI & Audience',
  title: 'Shop TODAY AI SMS Assistant',
  subtitle: 'Reimagining shopping through conversation',
  content: `
  <div className="case-study">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Shop TODAY AI SMS Assistant</h1>
          <p className="subtitle">Reimagining shopping through conversation</p>

          <div className="meta-grid">
            <div className="meta-item">
              <span className="meta-label">Duration</span>
              <span className="meta-value">June–August 2025</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">My Role</span>
              <span className="meta-value">Growth and product strategy, user research, journey mapping, prototyping, stakeholder storytelling</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Team</span>
              <span className="meta-value">NBC News Digital Growth Team</span>
            </div>
          </div>

          {/* Hero Image - ADD YOUR SCREENSHOT HERE */}
          <div className="hero-image-container">
            <img
              src="/path-to-your-hero-image.png"
              alt="Shop TODAY AI SMS Assistant Interface"
              className="hero-image"
            />
            {/* Placeholder if no image yet */}
            <div className="image-placeholder">
              [Add hero image/mockup of the SMS interface here]
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet the Team</h2>
          <h3 className="section-subtitle">Summer 2025 Growth Interns</h3>

          <div className="team-grid">
            <div className="team-member">
              {/* ADD HEADSHOT HERE */}
              <div className="headshot-container">
                <img
                  src="/path-to-cassandra-headshot.jpg"
                  alt="Cassandra Calibo"
                  className="headshot"
                />
                <div className="headshot-placeholder">[Headshot]</div>
              </div>
              <h4>Cassandra Calibo</h4>
              <p className="role">User Experience Research Intern</p>
            </div>

            <div className="team-member">
              {/* ADD HEADSHOT HERE */}
              <div className="headshot-container">
                <img
                  src="/path-to-sydney-headshot.jpg"
                  alt="Sydney Champagne"
                  className="headshot"
                />
                <div className="headshot-placeholder">[Headshot]</div>
              </div>
              <h4>Sydney Champagne</h4>
              <p className="role">SEO Intern</p>
            </div>

            <div className="team-member">
              {/* ADD HEADSHOT HERE */}
              <div className="headshot-container">
                <img
                  src="/path-to-douae-headshot.jpg"
                  alt="Douae Maarouf"
                  className="headshot"
                />
                <div className="headshot-placeholder">[Headshot]</div>
              </div>
              <h4>Douae Maarouf</h4>
              <p className="role">Audience Development Intern</p>
            </div>
          </div>

          <div className="partners-note">
            <strong>Cross-functional partners:</strong> Growth Product Manager, Commerce Editorial Lead,
            Engineering Feasibility Partner, UX Insights Team, Brand & Legal Advisors
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section className="context-section">
        <div className="container">
          <h2>Context: The Changing Landscape</h2>
          <p className="lead">
            The digital media landscape was shifting beneath our feet. At NBC News Digital, we observed
            a fundamental change in how audiences discovered shopping content:
          </p>

          <p>
            <strong>AI-driven overviews</strong> from Google and other search engines were now answering
            product questions directly—without users ever clicking through to publisher sites. What used
            to be a simple path (search → article → product) had become fragmented.
          </p>

          {/* ADD SCREENSHOT OF AI OVERVIEW HERE */}
          <div className="image-container">
            <img
              src="/path-to-ai-overview-screenshot.png"
              alt="Google AI Overview Impact"
              className="content-image"
            />
            <div className="image-placeholder">
              [Add screenshot of Google AI Overview showing how it intercepts search traffic]
            </div>
            <p className="image-caption">AI Overviews now answer shopping queries directly in search results</p>
          </div>

          <p>For TODAY.com, one of the most trusted sources for product recommendations, this meant:</p>
          <ul className="impact-list">
            <li>Declining organic search traffic to Shop TODAY content (63% drop post-AI Mode launch)</li>
            <li>Fewer opportunities to guide users through our curated collections</li>
            <li>Lost connections between our beloved hosts and their audiences</li>
          </ul>

          {/* ADD TRAFFIC DECLINE CHART HERE */}
          <div className="image-container">
            <img
              src="/path-to-traffic-chart.png"
              alt="Shop TODAY Traffic Decline"
              className="content-image"
            />
            <div className="image-placeholder">
              [Add chart showing traffic decline from AI Overview impact]
            </div>
            <p className="image-caption">Shop TODAY traffic dropped 63% following AI Mode integration</p>
          </div>

          <div className="highlight-box">
            <p>
              <strong>But we also saw an opportunity:</strong> our SMS channel was thriving. With $248K
              in monthly revenue and loyal subscribers who trusted TODAY's voice, SMS represented a
              high-intent, high-trust environment where we could rebuild that direct relationship.
            </p>
          </div>

          {/* ADD SMS REVENUE CHART HERE */}
          <div className="image-container">
            <img
              src="/path-to-sms-revenue-chart.png"
              alt="SMS Revenue Growth"
              className="content-image"
            />
            <div className="image-placeholder">
              [Add SMS revenue and engagement metrics chart]
            </div>
            <p className="image-caption">SMS emerged as a high-value, high-trust channel with strong engagement</p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section">
        <div className="container">
          <h2>The Problem</h2>
          <p className="lead">
            Through stakeholder interviews and audience research, we identified three core challenges:
          </p>

          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-number">1</div>
              <h3>Discovery Friction</h3>
              <p>
                Users struggled to find specific products within TODAY.com's vast shopping ecosystem.
                With multiple hosts, hundreds of articles, and constantly refreshing deals, even loyal
                readers faced choice paralysis.
              </p>
              <blockquote className="user-quote">
                "I love Jill Martin, but when I need something specific, I end up just searching Google
                and hoping I find the right TODAY article."
                <cite>— User Interview</cite>
              </blockquote>
            </div>

            <div className="problem-card">
              <div className="problem-number">2</div>
              <h3>Loss of Connection</h3>
              <p>
                AI search summaries were intercepting queries that previously led to TODAY.com, breaking
                the direct relationship between trusted hosts and their audiences.
              </p>
            </div>

            <div className="problem-card">
              <div className="problem-number">3</div>
              <h3>Generic Experience</h3>
              <p>
                The site offered the same browsing experience to everyone—whether you were a first-time
                visitor or someone who watched Steals & Deals every week. There was no memory, no
                personalization, no sense of ongoing relationship.
              </p>
            </div>
          </div>

          {/* ADD SCREENSHOT OF SITE NAVIGATION HERE */}
          <div className="image-container">
            <img
              src="/path-to-site-navigation.png"
              alt="TODAY.com Shopping Experience"
              className="content-image"
            />
            <div className="image-placeholder">
              [Add screenshot showing current TODAY.com shopping navigation/experience]
            </div>
            <p className="image-caption">The existing browsing experience lacked personalization and guidance</p>
          </div>

          <div className="insight-box">
            <strong>The core insight:</strong> People trust TODAY's hosts, but they needed a way to
            access that expertise <em>in the moment</em>—conversationally, personally, and without friction.
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="research-section">
        <div className="container">
          <h2>Research & Discovery</h2>
          <h3>Understanding the Landscape</h3>
          <p>We conducted a three-part research sprint:</p>

          <div className="research-phase">
            <h4>1. Stakeholder Alignment Workshops</h4>
            <p>
              We interviewed teams across Growth, Commerce, SEO, Editorial, Product, and Brand to map
              constraints and opportunities:
            </p>
            <ul>
              <li>Editorial needed tone and safety guardrails</li>
              <li>Commerce wanted attribution clarity for DTR links</li>
              <li>Growth sought opt-in mechanisms that felt premium, not spammy</li>
              <li>Legal required TCPA compliance and clear opt-out paths</li>
            </ul>
          </div>

          <div className="research-phase">
            <h4>2. Competitive Analysis</h4>
            <p>We studied conversational AI implementations across categories:</p>

            {/* ADD COMPETITIVE ANALYSIS SCREENSHOTS HERE */}
            <div className="competitive-grid">
              <div className="competitive-item">
                <div className="image-container">
                  <img
                    src="/path-to-meta-ai-screenshot.png"
                    alt="Meta AI Personas"
                    className="content-image"
                  />
                  <div className="image-placeholder">[Meta AI Personas Screenshot]</div>
                </div>
                <h5>Meta's AI Personas (2024)</h5>
                <p>
                  Celebrity-voiced chatbots showed that users respond to familiar personalities, but
                  authenticity concerns arose when tone felt "off"
                </p>
              </div>

              <div className="competitive-item">
                <div className="image-container">
                  <img
                    src="/path-to-nbc-sports-screenshot.png"
                    alt="NBC Sports Jim Fagan AI"
                    className="content-image"
                  />
                  <div className="image-placeholder">[NBC Sports Jim Fagan Screenshot]</div>
                </div>
                <h5>NBC Sports + Jim Fagan's AI Voice</h5>
                <p>
                  Demonstrated internal precedent for using talent voice with family consent for
                  promotional content
                </p>
              </div>

              <div className="competitive-item">
                <div className="image-container">
                  <img
                    src="/path-to-apple-business-chat.png"
                    alt="Apple Business Chat"
                    className="content-image"
                  />
                  <div className="image-placeholder">[Apple Business Chat Screenshot]</div>
                </div>
                <h5>Apple Business Chat & Grammarly</h5>
                <p>
                  Best practices for escalation, context persistence, and graceful failure states
                </p>
              </div>
            </div>

            <div className="key-insight">
              <strong>Key insight:</strong> Users valued <em>assistive</em> AI that enhanced human
              expertise, not replaced it.
            </div>
          </div>

          <div className="research-phase">
            <h4>3. User Interviews (n=6)</h4>
            <p>
              We spoke with loyal TODAY.com users (ages 39-65, all female, household income $40K–$200K+)
              about their shopping habits.
            </p>

            {/* ADD USER INTERVIEW PHOTOS/ARTIFACTS HERE */}
            <div className="image-container">
              <img
                src="/path-to-user-interviews.png"
                alt="User Interview Insights"
                className="content-image"
              />
              <div className="image-placeholder">
                [Add photo/artifact from user interview sessions or synthesis board]
              </div>
              <p className="image-caption">User interview synthesis revealed key needs and pain points</p>
            </div>

            <h5>What We Learned:</h5>

            <div className="quotes-grid">
              <blockquote className="user-quote-large">
                "I like her. She's very personable... She makes me smile, she makes me laugh."
                <cite>— Debby, 65, on Jill Martin</cite>
              </blockquote>

              <blockquote className="user-quote-large">
                "I feel like I'm being met with my best friend who's informing me of the latest sales."
                <cite>— Lara, 44</cite>
              </blockquote>

              <blockquote className="user-quote-large">
                "It's something I'd be highly likely to subscribe to, probably even pay for...
                To have one source would really help a ton."
                <cite>— Anonymous User, 39</cite>
              </blockquote>
            </div>

            <div className="findings-box">
              <h5>Users wanted:</h5>
              <ul>
                <li>Ratings, reviews, and social proof</li>
                <li>Images and rich descriptions</li>
                <li>Price comparisons and deal alerts</li>
                <li>Personalization based on past behavior</li>
                <li>A loyalty program or save-for-later feature</li>
                <li>Multiple options, not just one recommendation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Approach Section */}
      <section className="strategy-section">
        <div className="container">
          <h2>Strategic Approach</h2>

          <div className="hypothesis-box">
            <h3>Our Hypothesis</h3>
            <p>
              <em>Loyal TODAY consumers will benefit from a curated, two-way SMS experience that makes
              it easier to discover and purchase products. By reducing friction, re-engaging bounced users,
              and building on existing brand trust, an AI shopping assistant can support conversions and
              drive long-term retention.</em>
            </p>
          </div>

          <h3>Why SMS?</h3>
          <p>SMS was already TODAY's second-highest revenue driver after QR codes:</p>

          {/* ADD SMS METRICS VISUALIZATION HERE */}
          <div className="image-container">
            <img
              src="/path-to-sms-metrics.png"
              alt="SMS Performance Metrics"
              className="content-image"
            />
            <div className="image-placeholder">
              [Add SMS performance metrics: revenue, engagement, repeat visitor stats]
            </div>
            <p className="image-caption">SMS demonstrated strong performance and user loyalty</p>
          </div>

          <ul className="stats-list">
            <li><strong>$248K</strong> monthly revenue (July 2025)</li>
            <li><strong>23%</strong> of 4+ repeat visitors come from SMS</li>
            <li><strong>22%</strong> of returning clicks are SMS-driven</li>
            <li>Open rates and engagement far exceed email</li>
          </ul>

          <div className="strategic-bet-box">
            <h4>The strategic bet:</h4>
            <p>
              Meet users where they already trust us, then extend that trust through conversational AI
              anchored in host expertise.
            </p>
          </div>

          <h3>Design Principles</h3>
          <div className="principles-grid">
            <div className="principle-card">
              <span className="principle-number">1</span>
              <h4>Personality-first</h4>
              <p>Leverage Jill Martin's trusted voice and shopping authority</p>
            </div>
            <div className="principle-card">
              <span className="principle-number">2</span>
              <h4>Assistive, not automated</h4>
              <p>Offer guidance, not generic answers</p>
            </div>
            <div className="principle-card">
              <span className="principle-number">3</span>
              <h4>Ecosystem integration</h4>
              <p>Route users to curated articles <em>and</em> direct-to-retailer links</p>
            </div>
            <div className="principle-card">
              <span className="principle-number">4</span>
              <h4>Privacy & control</h4>
              <p>Clear opt-ins, easy opt-outs, no creepy tracking</p>
            </div>
            <div className="principle-card">
              <span className="principle-number">5</span>
              <h4>Editorial safety</h4>
              <p>Guardrails to ensure brand integrity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process Section */}
      <section className="design-process-section">
        <div className="container">
          <h2>Design Process</h2>

          <div className="process-step">
            <h3>1. Host Persona Development</h3>
            <p>We created detailed profiles for two potential SMS personalities:</p>

            {/* ADD PERSONA CARDS HERE */}
            <div className="persona-grid">
              <div className="persona-card">
                <div className="image-container">
                  <img
                    src="/path-to-jill-martin-persona.png"
                    alt="Jill Martin Persona"
                    className="content-image"
                  />
                  <div className="image-placeholder">[Jill Martin Persona Card]</div>
                </div>
                <h4>Jill Martin</h4>
                <ul>
                  <li><strong>Role:</strong> Host of Steals & Deals on TODAY</li>
                  <li><strong>Personality:</strong> Direct, enthusiastic, value-driven, trustworthy</li>
                  <li><strong>Tone:</strong> "This deal won't last" / "We've never seen it before on the show"</li>
                  <li><strong>Product focus:</strong> Flash sales, bundles, seasonal promos, gifts</li>
                </ul>
              </div>

              <div className="persona-card">
                <div className="image-container">
                  <img
                    src="/path-to-buddy-persona.png"
                    alt="Shop TODAY Buddy Persona"
                    className="content-image"
                  />
                  <div className="image-placeholder">[Shop TODAY Buddy Persona Card]</div>
                </div>
                <h4>Shop TODAY Buddy</h4>
                <p className="persona-note">(neutral alternative)</p>
                <ul>
                  <li>For users who didn't resonate with Jill's personality</li>
                  <li>Friendly, helpful, generic assistant</li>
                  <li>Avoided legal/rights issues around talent identity</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="process-step">
            <h3>2. Conversation Design</h3>
            <p>We mapped:</p>

            {/* ADD CONVERSATION FLOW DIAGRAM HERE */}
            <div className="image-container">
              <img
                src="/path-to-conversation-flows.png"
                alt="Conversation Flow Diagram"
                className="content-image"
              />
              <div className="image-placeholder">
                [Add conversation flow diagram showing intents, branches, and escalation paths]
              </div>
              <p className="image-caption">Conversation design mapping user intents and system responses</p>
            </div>

            <ul>
              <li><strong>User intents:</strong> Find a product, ask a question, get deal alerts, compare options</li>
              <li><strong>Guardrails:</strong> What to do when the assistant doesn't know, how to escalate, how to handle out-of-scope requests</li>
              <li><strong>Tone sliders:</strong> Adjusting formality, urgency, and warmth based on context</li>
              <li><strong>Escalation paths:</strong> When to loop in human support or redirect to web</li>
            </ul>
          </div>

          <div className="process-step">
            <h3>3. User Journey Mapping</h3>
            <p>We designed flows for:</p>

            {/* ADD USER JOURNEY MAPS HERE */}
            <div className="journey-grid">
              <div className="image-container">
                <img
                  src="/path-to-logged-in-journey.png"
                  alt="Logged-in User Journey"
                  className="content-image"
                />
                <div className="image-placeholder">[Logged-in User Journey Map]</div>
                <p className="image-caption">Journey for existing TODAY account holders</p>
              </div>

              <div className="image-container">
                <img
                  src="/path-to-new-user-journey.png"
                  alt="New User Journey"
                  className="content-image"
                />
                <div className="image-placeholder">[New User Journey Map]</div>
                <p className="image-caption">Journey for new users via QR codes and CTAs</p>
              </div>
            </div>

            <div className="sample-journey">
              <h4>Sample Journey:</h4>
              <ol>
                <li>User sees Jill mention a product on air</li>
                <li>Scans QR code → lands on TODAY.com</li>
                <li>Popup: "Chat with Jill's AI shopping assistant?"</li>
                <li>Opts in via phone number</li>
                <li>Receives welcome text with quick action menu</li>
                <li>Asks, "Do you have summer dresses under $50?"</li>
                <li>Assistant responds with curated picks + DTR links + article link</li>
                <li>User clicks through, purchases, gets follow-up thank-you + related recommendation</li>
              </ol>
            </div>
          </div>

          <div className="process-step">
            <h3>4. Prototyping</h3>
            <p>We built high-fidelity mockups in Figma, including:</p>

            {/* ADD PROTOTYPE SCREENSHOTS HERE */}
            <div className="prototype-showcase">
              <div className="image-container large">
                <img
                  src="/path-to-imessage-prototype.png"
                  alt="iMessage Prototype"
                  className="content-image"
                />
                <div className="image-placeholder">
                  [Add high-fidelity Figma prototype screenshots of the iMessage interface]
                </div>
                <p className="image-caption">High-fidelity iMessage prototype with realistic interactions</p>
              </div>

              <div className="prototype-features-grid">
                <div className="image-container">
                  <img
                    src="/path-to-memoji.png"
                    alt="Jill Martin Memoji"
                    className="content-image"
                  />
                  <div className="image-placeholder">[Jill Memoji]</div>
                  <p className="feature-label">Custom Memoji avatar</p>
                </div>

                <div className="image-container">
                  <img
                    src="/path-to-product-cards.png"
                    alt="Product Cards"
                    className="content-image"
                  />
                  <div className="image-placeholder">[Product Cards]</div>
                  <p className="feature-label">Rich product cards with images and CTAs</p>
                </div>

                <div className="image-container">
                  <img
                    src="/path-to-quick-replies.png"
                    alt="Quick Reply Chips"
                    className="content-image"
                  />
                  <div className="image-placeholder">[Quick Reply Chips]</div>
                  <p className="feature-label">Quick-reply chips for common queries</p>
                </div>

                <div className="image-container">
                  <img
                    src="/path-to-failure-states.png"
                    alt="Graceful Failures"
                    className="content-image"
                  />
                  <div className="image-placeholder">[Failure States]</div>
                  <p className="feature-label">Graceful failure messages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="solution-section">
        <div className="container">
          <h2>The Solution: AI Jill on iMessage</h2>
          <p className="lead">
            An SMS-based shopping companion that acts like an on-demand version of Jill Martin.
          </p>

          {/* ADD FINAL SOLUTION MOCKUP HERE */}
          <div className="image-container hero">
            <img
              src="/path-to-final-solution.png"
              alt="AI Jill SMS Interface"
              className="content-image"
            />
            <div className="image-placeholder">
              [Add polished final mockup of the AI Jill SMS experience]
            </div>
            <p className="image-caption">The complete AI Jill SMS shopping assistant experience</p>
          </div>

          <h3>Key Features</h3>

          <div className="features-section">
            <h4>For TODAY Account Holders (Premium Experience)</h4>
            <ul className="feature-list">
              <li>Opt-in SMS program with clear privacy terms</li>
              <li>AI agent with Jill Martin's personality and voice</li>
              <li>Tracks site interactions → personalized recommendations</li>
              <li>Two-way commerce: Ask questions, get answers, follow DTR links</li>
              <li>Traditional one-way deal blasts with Jill's tone</li>
            </ul>

            {/* ADD FEATURE SCREENSHOTS HERE */}
            <div className="feature-showcase-grid">
              <div className="image-container">
                <img
                  src="/path-to-personalization.png"
                  alt="Personalized Recommendations"
                  className="content-image"
                />
                <div className="image-placeholder">[Personalization Feature]</div>
                <p className="image-caption">Personalized product recommendations based on browsing history</p>
              </div>

              <div className="image-container">
                <img
                  src="/path-to-deal-alerts.png"
                  alt="Deal Alerts"
                  className="content-image"
                />
                <div className="image-placeholder">[Deal Alerts]</div>
                <p className="image-caption">Real-time deal alerts in Jill's signature style</p>
              </div>
            </div>

            <h4>Core Capabilities:</h4>
            <ul className="capability-list">
              <li>Retrieve products from Shop TODAY catalogue</li>
              <li>Answer product questions (colors, sizes, availability)</li>
              <li>Offer alternatives when queries can't be answered</li>
              <li>Send price-drop and restock alerts</li>
              <li>Create a "save for later" list</li>
            </ul>

            <h4>Technical Specs:</h4>
            <ul className="tech-list">
              <li>Custom Memoji for visual identity</li>
              <li>Natural language understanding via LLM (Claude, GPT-4)</li>
              <li>Integration with CMS product feed and session data</li>
              <li>SMS delivery via CPaaS platform (e.g., Twilio, Postscript)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testing Section */}
      <section className="testing-section">
        <div className="container">
          <h2>User Testing & Validation</h2>
          <p className="lead">We conducted 8 moderated usability sessions with target users.</p>

          {/* ADD TESTING PHOTOS HERE */}
          <div className="image-container">
            <img
              src="/path-to-testing-sessions.png"
              alt="User Testing Sessions"
              className="content-image"
            />
            <div className="image-placeholder">
              [Add photos or screenshots from user testing sessions]
            </div>
            <p className="image-caption">Moderated usability testing with target users</p>
          </div>

          <h3>What We Tested</h3>
          <ul>
            <li><strong>Persona clarity:</strong> Did users understand who "Jill" was?</li>
            <li><strong>Task completion:</strong> Could users find a product, ask follow-ups, and purchase?</li>
            <li><strong>Tone fit:</strong> Did the voice feel authentic and trustworthy?</li>
            <li><strong>Opt-out clarity:</strong> Could users easily unsubscribe?</li>
          </ul>

          <h3>Key Findings</h3>
          <div className="findings-grid">
            <div className="finding-card success">
              <span className="finding-icon">✅</span>
              <h4>Persona clarity beats cleverness</h4>
              <p>Simple labels like "Shop with Jill" &gt; playful names</p>
            </div>

            <div className="finding-card success">
              <span className="finding-icon">✅</span>
              <h4>Quick replies reduce drop-off</h4>
              <p>Chips like "Under $50" or "Summer dresses" sped up decision-making</p>
            </div>

            <div className="finding-card success">
              <span className="finding-icon">✅</span>
              <h4>Make hand-offs obvious</h4>
              <p>A single, bold "Open on TODAY.com" button worked best</p>
            </div>

            <div className="finding-card success">
              <span className="finding-icon">✅</span>
              <h4>Consent copy drives trust</h4>
              <p>Friendly, direct, "opt-out anytime" language tested highest</p>
            </div>
          </div>

          {/* ADD BEFORE/AFTER ITERATION SCREENSHOTS HERE */}
          <div className="iterations-showcase">
            <h3>Iterations Based on Feedback</h3>

            <div className="image-container comparison">
              <img
                src="/path-to-before-after.png"
                alt="Design Iterations"
                className="content-image"
              />
              <div className="image-placeholder">
                [Add before/after comparison showing key design iterations]
              </div>
              <p className="image-caption">Key design iterations based on user feedback</p>
            </div>

            <ul className="iteration-list">
              <li>Revised IA to surface quick actions earlier</li>
              <li>Clarified consent copy with plain-language privacy statement</li>
              <li>Simplified persona choice to binary (Jill vs. Buddy)</li>
              <li>Added quick-reply chips to reduce typing friction</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container">
          <h2>Impact & Outcomes</h2>

          <h3>Immediate Value Delivered</h3>

          <div className="impact-grid">
            <div className="impact-card">
              <h4>For the Business</h4>
              <ul>
                <li>Created a scalable framework for AI-driven engagement across NBC News properties</li>
                <li>Positioned TODAY as a leader in conversational commerce within the organization</li>
                <li>Aligned Growth, Commerce, and Product teams around shared personalization goals</li>
              </ul>
            </div>

            <div className="impact-card">
              <h4>For Users</h4>
              <ul>
                <li>Reduced friction from search → discovery → purchase</li>
                <li>Offered personalized, on-demand access to trusted shopping advice</li>
                <li>Maintained brand trust through transparent opt-ins and editorial guardrails</li>
              </ul>
            </div>

            <div className="impact-card">
              <h4>For Leadership</h4>
              <p>The prototype catalyzed strategic conversations about:</p>
              <ul>
                <li>AI integration across NBC News Digital</li>
                <li>Personalization as a pillar of the upcoming TODAY subscription product</li>
                <li>Host-led content as a differentiator in an AI-saturated landscape</li>
              </ul>
            </div>
          </div>

          {/* ADD PRESENTATION PHOTO HERE */}
          <div className="image-container">
            <img
              src="/path-to-leadership-presentation.png"
              alt="Leadership Presentation"
              className="content-image"
            />
            <div className="image-placeholder">
              [Add photo from leadership presentation or key slide]
            </div>
            <p className="image-caption">Presenting the concept to NBC News Digital leadership team</p>
          </div>

          <h3>Presentation to Senior Leadership</h3>
          <p>
            In August 2025, we presented the AI SMS Assistant concept to NBC News Digital's executive team.
            The response was enthusiastic—leadership saw this as a pilot that could:
          </p>
          <ul>
            <li>Inform broader personalization strategies for the forthcoming TODAY subscription launch</li>
            <li>Demonstrate how AI could enhance (not replace) editorial expertise</li>
            <li>Create a repeatable playbook for host-led digital experiences</li>
          </ul>

          <h3>Proposed Success Metrics</h3>
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-icon">📈</span>
              <h4>Opt-in rate</h4>
              <p>from overlays and QR codes</p>
            </div>
            <div className="metric-card">
              <span className="metric-icon">⚡</span>
              <h4>First reply time</h4>
              <p>and task completion rate</p>
            </div>
            <div className="metric-card">
              <span className="metric-icon">🔗</span>
              <h4>Click-through rate</h4>
              <p>to DTR links vs. back-to-content</p>
            </div>
            <div className="metric-card">
              <span className="metric-icon">🔄</span>
              <h4>Re-engagement</h4>
              <p>on price-drop/restock alerts</p>
            </div>
            <div className="metric-card">
              <span className="metric-icon">😊</span>
              <h4>User satisfaction</h4>
              <p>and unsubscribe rate</p>
            </div>
            <div className="metric-card">
              <span className="metric-icon">👤</span>
              <h4>Account creation</h4>
              <p>for premium features</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Next Section */}
      <section className="next-steps-section">
        <div className="container">
          <h2>What's Next</h2>
          <h3 className="section-subtitle">Roadmap to Pilot</h3>

          <div className="roadmap">
            <div className="roadmap-phase">
              <div className="phase-badge">Phase 1</div>
              <h4>Internal Validation (Q4 2025)</h4>
              <ul>
                <li>Present final concept, system architecture, and pilot plan to senior leadership</li>
                <li>Align with Subscriptions team on how account creation and preferences unlock premium SMS features</li>
                <li>Define technical requirements and vendor evaluation (Postscript AI, custom build, or hybrid)</li>
              </ul>
            </div>

            <div className="roadmap-phase">
              <div className="phase-badge">Phase 2</div>
              <h4>Limited Pilot (Q1 2026)</h4>
              <ul>
                <li>Launch with 1,000 highly engaged SMS subscribers</li>
                <li>Test "Jill" persona only to simplify scope</li>
                <li>Collect signal on: usefulness, tone fit, opt-in quality, retention, revenue impact</li>
              </ul>
            </div>

            <div className="roadmap-phase">
              <div className="phase-badge">Phase 3</div>
              <h4>Iterate & Expand (Q2 2026)</h4>
              <ul>
                <li>Add "Shop TODAY Buddy" if persona mapping supports it</li>
                <li>Integrate with TODAY Accounts and preference center</li>
                <li>Explore additional hosts (Adrianna Brach, Savannah Guthrie)</li>
                <li>Scale to broader SMS list if pilot succeeds</li>
              </ul>
            </div>

            <div className="roadmap-phase">
              <div className="phase-badge">Phase 4</div>
              <h4>Ecosystem Integration (H2 2026)</h4>
              <ul>
                <li>Extend to other NBC News properties (MSNBC, NBC News NOW)</li>
                <li>Explore voice assistant integration (Alexa, Google Assistant)</li>
                <li>Build two-way sync with TODAY.com for seamless cross-platform personalization</li>
              </ul>
            </div>
          </div>

          {/* ADD ROADMAP VISUALIZATION HERE */}
          <div className="image-container">
            <img
              src="/path-to-roadmap-visual.png"
              alt="Implementation Roadmap"
              className="content-image"
            />
            <div className="image-placeholder">
              [Add Gantt chart or timeline visualization of implementation roadmap]
            </div>
            <p className="image-caption">Phased rollout plan from pilot to full ecosystem integration</p>
          </div>
        </div>
      </section>

      {/* System Architecture Section */}
      <section className="architecture-section">
        <div className="container">
          <h2>System Architecture Overview</h2>

          <div className="architecture-link-card">
            <p>
              View the complete system architecture diagram showing data flow, integrations,
              and technical implementation:
            </p>
            <a
              href="/path-to-system-architecture-screenshot.png"
              target="_blank"
              rel="noopener noreferrer"
              className="architecture-link"
            >
              <span className="link-icon">🔗</span>
              View Full System Architecture
            </a>
          </div>

          {/* THUMBNAIL OF ARCHITECTURE HERE */}
          <div className="image-container">
            <a href="/path-to-system-architecture-screenshot.png" target="_blank" rel="noopener noreferrer">
              <img
                src="/path-to-system-architecture-screenshot.png"
                alt="System Architecture Diagram"
                className="content-image clickable"
              />
              <div className="image-placeholder">
                [Add system architecture diagram - click to view full size]
              </div>
            </a>
            <p className="image-caption">System architecture showing client, communication layer, server, data layer, and AI engine</p>
          </div>

          <div className="architecture-summary">
            <h4>Key Components:</h4>
            <ul>
              <li><strong>Client:</strong> User phone (SMS interface)</li>
              <li><strong>Communication Layer:</strong> SMS API (Twilio/Postscript)</li>
              <li><strong>Server:</strong> Constructs prompts, routes queries</li>
              <li><strong>Data Layer:</strong> User profile DB (Postgres), CMS product feed, session data (Redis)</li>
              <li><strong>AI Engine:</strong> LLM (Claude, GPT-4)</li>
              <li><strong>Analytics:</strong> DOMO dashboards for KPIs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Reflections Section */}
      <section className="reflections-section">
        <div className="container">
          <h2>Reflections</h2>

          <div className="reflection-grid">
            <div className="reflection-card">
              <h3>What I'd Do Differently</h3>

              <div className="reflection-item">
                <h4>1. Moment-based entry points</h4>
                <p>
                  I'd explore triggering the assistant from specific article contexts (e.g., "Ask Jill
                  about this product") rather than only at account signup.
                </p>
              </div>

              <div className="reflection-item">
                <h4>2. Memory & re-entry</h4>
                <p>
                  Enable the assistant to recall the last task or saved items (with privacy controls)
                  to reduce repetitive setup.
                </p>
              </div>

              <div className="reflection-item">
                <h4>3. Accessibility from the start</h4>
                <p>
                  Design voice control paths and high-contrast modes for low-vision users earlier in
                  the process.
                </p>
              </div>
            </div>

            <div className="reflection-card">
              <h3>What I Learned</h3>

              <div className="learning-item">
                <p>
                  <strong>Conversational design is hard.</strong> Anticipating every user intent and
                  failure state requires deep empathy and iteration.
                </p>
              </div>

              <div className="learning-item">
                <p>
                  <strong>AI needs guardrails, not just prompts.</strong> Editorial oversight and
                  escalation rules are what make AI feel trustworthy, not just "smart."
                </p>
              </div>

              <div className="learning-item">
                <p>
                  <strong>Personalization is a promise, not a feature.</strong> Users expect systems
                  to remember them—but only if we're transparent about what we track and why.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Status Footer */}
      <section className="project-status">
        <div className="container">
          <div className="status-card">
            <h3>Project Status</h3>
            <p>
              <strong>Prototype complete</strong>, pilot roadmap defined, awaiting Q4 2025 leadership
              review and subscriptions alignment.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation to Other Work */}
      <section className="navigation-footer">
        <div className="container">
          <div className="nav-links">
            <a href="#previous-project" className="nav-link prev">
              ← Previous Project
            </a>
            <a href="#all-work" className="nav-link">
              All Work
            </a>
            <a href="#next-project" className="nav-link next">
              Next Project →
            </a>
          </div>
        </div>
      </section>
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
      title: 'Narratives Move Markets: Forecasting Coinbase through Public Sentiment',
      subtitle: 'Exploring whether real-time digital sentiment could predict short-term stock movement of Coinbase ($COIN)',
      content: `
        <div class="case-section">
          <h3>🚀 Project Overview</h3>
          <p><strong>Duration:</strong> 4 months (February – May 2024)<br>
          <strong>Initiative:</strong> Millennium x WICC collaborative research<br>
          <strong>My Role:</strong> Led predictive modeling pipeline, co-developed sentiment alignment logic, assisted in results visualization</p>

          <p><strong>What we set out to do:</strong> Explore whether real-time digital sentiment — pulled from Reddit threads, search queries, and news headlines — could predict the short-term stock movement of Coinbase ($COIN).</p>

          <p>We weren't just analyzing vibes. We were testing whether narratives could be quantified, modeled, and ultimately, used to forecast volatility in one of the most hype-sensitive markets out there.</p>
        </div>

        <div class="case-section">
          <h3>🎯 Why Coinbase? Why Crypto?</h3>
          <p>This project was part of the Millennium x WICC initiative — a program encouraging interdisciplinary research at the intersection of finance, data science, and media.</p>

          <p>We knew from the start: if there's a market where emotion outweighs fundamentals, it's crypto. Coinbase ($COIN), as the largest U.S. crypto exchange, served as the perfect proxy — liquid, volatile, and culturally influential.</p>
        </div>

        <div class="case-section">
          <h3>👥 Meet the Team</h3>
          <p>This project was a collaboration with four brilliant minds:</p>
          <ul>
            <li><strong>Kenza Daoudi</strong></li>
            <li><strong>Varija Mehta</strong></li>
            <li><strong>Sonja Wong</strong></li>
            <li><strong>Krishna Patel</strong></li>
          </ul>
          <p><strong>My Role:</strong> I led the predictive modeling pipeline — from training ARIMA and LSTM models to validating linear regression baselines. I also co-developed sentiment alignment logic and assisted in visualizing results.</p>
        </div>

        <div class="case-section">
          <h3>🎯 01 — Framing the Challenge</h3>
          <p><strong>Our hypothesis:</strong> Digital emotion moves markets.</p>

          <p>The real question was how to quantify it. The internet speaks in sarcasm, slang, and layered subtext. A green candle emoji could mean "bullish," or it could be mocking someone's loss.</p>

          <p>So we had to design a pipeline that not only captured sentiment — but decoded it.</p>
        </div>

        <div class="case-section">
          <h3>🔧 02 — Building the Sentiment Engine</h3>
          <p><strong>We collected text data from:</strong></p>
          <ul>
            <li>Reddit (via Pushshift API)</li>
            <li>Google Trends (normalized volume scores)</li>
            <li>News headlines (via Google News)</li>
            <li>X/Twitter (scraped keyword mentions)</li>
          </ul>

          <p><strong>We then processed it using:</strong></p>
          <ul>
            <li><strong>VADER + LDA:</strong> Fast, but missed nuance</li>
            <li><strong>BERTopic + VADER:</strong> Better topic segmentation</li>
            <li><strong>BERTopic + RoBERTa:</strong> Best performance on Reddit data due to sarcasm comprehension and contextual understanding</li>
          </ul>

          <p>Each day was mapped to a sentiment score using rolling averages and volume-adjusted weightings.</p>
        </div>

        <div class="case-section">
          <h3>📊 03 — Modeling the Market</h3>
          <p>We engineered features combining stock data (open/close/high/low) with sentiment inputs. Then we tested three approaches:</p>

          <h4><strong>Linear Regression:</strong></h4>
          <ul>
            <li>Baseline model</li>
            <li>Surprisingly strongest correlation (r = 0.8604)</li>
          </ul>

          <h4><strong>LSTM (Long Short-Term Memory Recurrent Neural Net):</strong></h4>
          <ul>
            <li>Great on paper</li>
            <li>We underperformed due to limited time series length (r = 0.7731)</li>
          </ul>

          <h4><strong>ARIMA:</strong></h4>
          <ul>
            <li>Strong for traditional time series</li>
            <li>Struggled to integrate behavioral features</li>
          </ul>

          <p>We tested lag windows (1–7 days) and engineered difference features (∆ sentiment, ∆ price) for each run.</p>

          <div style="background: var(--studio); padding: 20px; border-radius: 12px; border-left: 4px solid var(--rain-storm); margin: 20px 0;">
            <p style="font-style: italic; margin: 0; color: #484848; font-size: 16px; line-height: 1.6;">
              "Sometimes, the simplest models are the sharpest tools — especially in noisy markets."
            </p>
          </div>
        </div>

        <div class="case-stats">
          <div class="stat-item-modal">
            <span class="stat-number-modal">r = 0.86</span>
            <span class="stat-label-modal">Best Correlation Score</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">4</span>
            <span class="stat-label-modal">Months Research</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">5</span>
            <span class="stat-label-modal">Team Members</span>
          </div>
        </div>

        <div class="case-section">
          <h3>🔍 04 — What We Discovered</h3>
          <ul>
            <li><strong>Reddit sentiment was the most predictive</strong> — likely due to depth of discourse and emotional candor</li>
            <li><strong>Google Trends spiked ~3–5 days before stock moves</strong> — predictive window potential</li>
            <li><strong>News tone was often reactive</strong> — not ideal for leading signals</li>
          </ul>

          <p><strong>A compelling moment:</strong> In May 2024, pro-crypto legislation passed. Coinbase rallied. But Reddit stayed cold. That emotional hesitation foreshadowed the mini-correction days later. Emotion ≠ headlines.</p>
        </div>

        <div class="case-section">
          <h3>📈 05 — Visualizing the Mood</h3>
          <p>Using BERTopic, we mapped thematic clusters (e.g. "regulation anxiety", "meme rally", "scam panic") and overlaid them with stock movement.</p>

          <p>The result: a live map of investor psyche. Peaks in "doubt" aligned with dips. Rallies in "hope" often followed media events.</p>
        </div>

        <div class="case-section">
          <h3>🚀 If I Had More Time...</h3>
          <ul>
            <li>Fine-tune RoBERTa on crypto-native slang (e.g. "rekt", "HODL", "NGMI")</li>
            <li>Integrate on-chain signals like whale wallet movements</li>
            <li>Build a real-time dashboard using Streamlit or Observable</li>
            <li>Explore causal inference models like Granger causality</li>
          </ul>
        </div>

        <div class="case-section">
          <h3>🎯 Final Reflection</h3>
          <p>This wasn't just a technical project. It was a mirror into how markets run on narrative — not just numbers.</p>

          <p>We built a system that showed how emotion, language, and momentum intersect. We learned that hype has a shape. Fear has a frequency. And belief? It shows up in data.</p>

          <div style="background: var(--studio); padding: 20px; border-radius: 12px; border-left: 4px solid var(--desert); margin: 20px 0;">
            <p style="font-style: italic; margin: 0; color: #484848; font-size: 16px; line-height: 1.6;">
              "This project fused everything I love — behavioral data, language, and machine learning — into one wild ride."
            </p>
          </div>
        </div>

        <div class="case-section">
          <h3>🧠 What We Learned</h3>
          <ul>
            <li>Emotional narrative can be forecastable, not just descriptive</li>
            <li>Simpler models can outperform when signal > complexity</li>
            <li>Data is more than numbers — it's cultural, contextual, and human</li>
          </ul>
        </div>

        <div class="case-section">
          <h3>📍 Outcome</h3>
          <ul>
            <li><strong>Validated sentiment as a predictive tool</strong> for short-term price movement</li>
            <li><strong>Built a working prototype</strong> for multimodal sentiment tracking</li>
            <li><strong>Discovered Reddit as a high-signal source</strong> for investor emotion</li>
          </ul>

          <p><strong>Next Step:</strong> Turning this prototype into a live sentiment product or plugin for investors and fintech tools.</p>
        </div>

        <div class="case-section">
          <h3>📄 Full Slide Deck</h3>
          <p>Want to explore our full research deck? View it below:</p>
          <iframe
            src="assets/millenium-deck.pdf"
            width="100%"
            height="600px"
            style="border: 1px solid #ccc; border-radius: 8px;">
          </iframe>
        </div>

        <div class="case-section">
          <h3>🛠️ Tools Used</h3>
          <div class="tech-stack">
            <span class="tech-pill">Google Colab</span>
            <span class="tech-pill">Yahoo Finance API</span>
            <span class="tech-pill">Pushshift API</span>
            <span class="tech-pill">BERTopic</span>
            <span class="tech-pill">RoBERTa</span>
            <span class="tech-pill">Scikit-Learn</span>
            <span class="tech-pill">TensorFlow</span>
            <span class="tech-pill">ARIMA</span>
            <span class="tech-pill">LSTM</span>
            <span class="tech-pill">VADER</span>
            <span class="tech-pill">LDA</span>
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
    },

    // Adding email-marketing as separate entry for compatibility
    'email-marketing': {
      tag: 'Email Marketing',
      title: 'Automated B2B Email Flows',
      subtitle: 'Built lead-nurture flows with 70% open rate using Mailchimp',
      content: `
        <div class="case-section">
          <h3>Challenge</h3>
          <p>A B2B company needed automated email workflows to nurture leads through their complex sales funnel while maintaining personalization at scale.</p>
        </div>

        <div class="case-section">
          <h3>Solution</h3>
          <p>I designed and implemented a comprehensive email automation system using Mailchimp and Shopify integration.</p>
          <ul>
            <li>Created behavioral triggers based on user actions</li>
            <li>Developed personalized content flows for different customer segments</li>
            <li>Implemented A/B testing for subject lines and content</li>
            <li>Set up advanced analytics and tracking</li>
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
            <span class="stat-number-modal">25%</span>
            <span class="stat-label-modal">Conversion Increase</span>
          </div>
        </div>

        <div class="case-section">
          <h3>Tools Used</h3>
          <div class="tech-stack">
            <span class="tech-pill">Mailchimp</span>
            <span class="tech-pill">Shopify</span>
            <span class="tech-pill">Segmentation</span>
            <span class="tech-pill">A/B Testing</span>
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

  // SMART CASE STUDY DETECTION - Intelligently maps clicks to correct case studies

  // Function to intelligently detect which case study to open
  function detectCaseStudy(element) {
    const $el = $(element);

    // First, try direct data attributes
    let caseId = $el.data('case') || $el.data('project');
    if (caseId && caseStudies[caseId]) {
      console.log("Found direct case ID:", caseId);
      return caseId;
    }

    // If no direct attribute, analyze the content intelligently
    const elementText = $el.text().toLowerCase();
    const elementHtml = $el.html().toLowerCase();
    const elementClasses = element.className.toLowerCase();
    const allContent = (elementText + ' ' + elementHtml + ' ' + elementClasses).toLowerCase();

    console.log("Analyzing content for case detection:", allContent);

    // Smart content-based detection with specific keywords
    if (allContent.includes('market sentiment') ||
        allContent.includes('sentiment analysis') ||
        allContent.includes('financial forecasting') ||
        allContent.includes('trading algorithm') ||
        allContent.includes('millennium') ||
        allContent.includes('data-analysis') ||
        allContent.includes('prediction accuracy')) {
      console.log("Detected: Data Analysis case");
      return 'data-analysis';
    }

    if (allContent.includes('jill') ||
      allContent.includes('nbcu') ||
      allContent.includes('nbcuniversal') ||
      allContent.includes('today show') ||
      allContent.includes('ai intern') ||
      allContent.includes('ai & audience') ||
      allContent.includes('ai project')) {
    console.log("Detected: AI JILL case");
    return 'ai-jill';
}
    if (allContent.includes('mcci') ||
        allContent.includes('email automation') ||
        allContent.includes('automation workflow') ||
        allContent.includes('bounce rate') ||
        allContent.includes('shopify') ||
        allContent.includes('mailchimp') ||
        allContent.includes('mcci-automation')) {
      console.log("Detected: MCCI Automation case");
      return 'mcci-automation';
    }

    if (allContent.includes('big red buzz') ||
        allContent.includes('cornell') ||
        allContent.includes('brand') ||
        allContent.includes('video series') ||
        allContent.includes('engagement increase')) {
      console.log("Detected: Branding case");
      return 'branding';
    }

    if (allContent.includes('mobile app') ||
        allContent.includes('ux research') ||
        allContent.includes('user interface') ||
        allContent.includes('accessibility') ||
        allContent.includes('usability') ||
        allContent.includes('figma') ||
        allContent.includes('ux-design')) {
      console.log("Detected: UX Design case");
      return 'ux-design';
    }

    if (allContent.includes('morocco') ||
        allContent.includes('photography') ||
        allContent.includes('visual storytelling') ||
        allContent.includes('travel series') ||
        allContent.includes('cultural stories')) {
      console.log("Detected: Photography case");
      return 'photography';
    }

    if (allContent.includes('email marketing') ||
        allContent.includes('b2b email') ||
        allContent.includes('lead nurture') ||
        allContent.includes('open rate') ||
        allContent.includes('email-marketing')) {
      console.log("Detected: Email Marketing case");
      return 'email-marketing';
    }

    if (allContent.includes('community building') ||
        allContent.includes('women in computing') ||
        allContent.includes('membership growth') ||
        allContent.includes('leadership')) {
      console.log("Detected: Community Building case");
      return 'community-building';
    }

    // If no specific match found, log what we tried to analyze
    console.log("No specific case detected for content:", allContent.substring(0, 100));
    return null;
  }

  // UNIFIED CLICK HANDLER - Handles all case study clicks
  $(document).on('click', '.showcase-item, .case-study, [data-case], .project-thumbnail, .case-study-link', function (e) {
    console.log("=== CASE STUDY CLICKED ===");
    console.log("Element type:", this.className);
    console.log("Element text:", $(this).text().substring(0, 50));

    e.preventDefault();
    e.stopPropagation();

    const detectedCase = detectCaseStudy(this);

    if (detectedCase) {
      console.log("Opening case study:", detectedCase);
      openCaseStudyModal(detectedCase);
    } else {
      console.log("ERROR: Could not detect case study type!");
      console.log("Element details:");
      console.log("- Classes:", this.className);
      console.log("- Data attributes:", $(this).data());
      console.log("- Text content:", $(this).text());

      // Show user a selection instead of defaulting
      showCaseSelectionModal();
    }
  });

  // Case selection modal for when we can't detect the right case
  function showCaseSelectionModal() {
    const selectionHTML = `
      <div class="case-study-modal" id="case-selection-modal">
        <div class="modal-container">
          <div class="modal-content">
            <div class="modal-header">
              <button class="modal-close" id="selection-modal-close">×</button>
              <h2 class="modal-title">Select Case Study</h2>
              <p class="modal-subtitle">Which case study would you like to view?</p>
            </div>
            <div class="modal-body">
              <div style="display: grid; grid-template-columns: 1fr; gap: 15px;">
                <button class="case-selection-btn" data-case="mcci-automation" style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: white; cursor: pointer; text-align: left;">
                  <strong>MCCI Email Automation</strong><br>
                  <small>Building automated email workflows from scratch</small>
                </button>
                <button class="case-selection-btn" data-case="data-analysis" style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: white; cursor: pointer; text-align: left;">
                  <strong>Market Sentiment Analysis</strong><br>
                  <small>Financial forecasting models with 40% accuracy improvement</small>
                </button>
                <button class="case-selection-btn" data-case="branding" style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: white; cursor: pointer; text-align: left;">
                  <strong>Big Red Buzz Series</strong><br>
                  <small>Video content strategy for Cornell University</small>
                </button>
                <button class="case-selection-btn" data-case="ux-design" style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: white; cursor: pointer; text-align: left;">
                  <strong>UX Design & Research</strong><br>
                  <small>User-centered design for accessibility</small>
                </button>
                <button class="case-selection-btn" data-case="photography" style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: white; cursor: pointer; text-align: left;">
                  <strong>Photography Portfolio</strong><br>
                  <small>Visual storytelling and cultural documentation</small>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    $('body').append(selectionHTML);
    $('body').css('overflow', 'hidden');

    setTimeout(() => {
      $('#case-selection-modal').addClass('active');
    }, 10);

    // Handle selection clicks
    $(document).on('click', '.case-selection-btn', function(e) {
      e.preventDefault();
      const selectedCase = $(this).data('case');
      $('#case-selection-modal').remove();
      openCaseStudyModal(selectedCase);
    });

    // Handle close
    $(document).on('click', '#selection-modal-close', function() {
      $('#case-selection-modal').removeClass('active');
      $('body').css('overflow', '');
      setTimeout(() => {
        $('#case-selection-modal').remove();
      }, 400);
    });
  }

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

  // DEBUGGING FUNCTIONS - Enhanced debugging
  function testModal() {
    console.log("Testing MCCI modal...");
    openCaseStudyModal('mcci-automation');
  }

  function testDataModal() {
    console.log("Testing Data Analysis modal...");
    openCaseStudyModal('data-analysis');
  }

  function debugCaseStudies() {
    console.log("=== ENHANCED CASE STUDY DEBUG ===");
    console.log("Available case studies:", Object.keys(caseStudies));

    // Check all possible clickable elements
    const selectors = ['.showcase-item', '.case-study', '[data-case]', '.project-thumbnail', '.case-study-link'];

    selectors.forEach(selector => {
      const elements = $(selector);
      if (elements.length > 0) {
        console.log(`\n${selector} found: ${elements.length} elements`);
        elements.each(function(i) {
          const $el = $(this);
          const text = $el.text().substring(0, 50);
          const dataCase = $el.data('case');
          const dataProject = $el.data('project');
          const detected = detectCaseStudy(this);

          console.log(`  ${i + 1}. Text: "${text}"`);
          console.log(`      data-case: "${dataCase}"`);
          console.log(`      data-project: "${dataProject}"`);
          console.log(`      Detected as: "${detected}"`);
        });
      }
    });

    console.log("=== END ENHANCED DEBUG ===");
  }

  // Function to manually test detection
  function testDetection(elementText) {
    console.log("Testing detection for:", elementText);

    // Create a fake element for testing
    const fakeElement = $(`<div>${elementText}</div>`)[0];
    const result = detectCaseStudy(fakeElement);

    console.log("Would detect as:", result);
    return result;
  }

  // Make functions globally available for testing
  window.testModal = testModal;
  window.testDataModal = testDataModal;
  window.debugCaseStudies = debugCaseStudies;
  window.openCaseStudyModal = openCaseStudyModal;
  window.testDetection = testDetection;

  // Auto-run debug on page load
  setTimeout(debugCaseStudies, 1000);

});
