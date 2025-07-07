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
      tag: 'Financial Research',
      title: 'Narratives Move Markets: Forecasting Coinbase through Public Sentiment',
      subtitle: 'Exploring whether real-time digital sentiment could predict short-term stock movement of Coinbase ($COIN)',
      content: `
        <div class="case-section">
          <h3>🚀 Project Overview</h3>
          <p><strong>Duration:</strong> 4 months (February – May 2024)<br>
          <strong>Initiative:</strong> Millennium x WICC interdisciplinary research program<br>
          <strong>Team:</strong> 5-person collaborative research team</p>

          <p><strong>What we set out to do:</strong> Explore whether real-time digital sentiment — pulled from Reddit threads, search queries, and news headlines — could predict the short-term stock movement of Coinbase ($COIN).</p>

          <p>We weren't just analyzing vibes. We were testing whether <em>narratives could be quantified, modeled, and ultimately, used to forecast volatility</em> in one of the most hype-sensitive markets out there.</p>
        </div>

        <div class="case-section">
          <h3>🎯 Why Coinbase? Why Crypto?</h3>
          <p>This project was part of the <strong>Millennium x WICC initiative</strong> — a program encouraging interdisciplinary research at the intersection of finance, data science, and media.</p>

          <p>We knew from the start: if there's a market where emotion outweighs fundamentals, it's crypto. Coinbase ($COIN), as the largest U.S. crypto exchange, served as the perfect proxy — <strong>liquid, volatile, and culturally influential</strong>.</p>
        </div>

        <div class="case-section">
          <h3>👥 Meet the Team</h3>
          <p>This project was a collaboration with four brilliant minds: <strong>Kenza Daoudi, Varija Mehta, Sonja Wong, and Krishna Patel</strong>.</p>

          <p><strong>My Role:</strong> I led the predictive modeling pipeline — from training ARIMA and LSTM models to validating linear regression baselines. I also co-developed sentiment alignment logic and assisted in visualizing results.</p>
        </div>

        <div class="case-section">
          <h3>🔬 Framing the Challenge</h3>
          <p><strong>Our hypothesis:</strong> Digital emotion moves markets.</p>

          <p>The real question was how to quantify it. The internet speaks in sarcasm, slang, and layered subtext. A green candle emoji could mean "bullish," or it could be mocking someone's loss.</p>

          <p>So we had to design a pipeline that not only captured sentiment — but <em>decoded it</em>.</p>
        </div>

        <div class="case-section">
          <h3>🛠️ Building the Sentiment Engine</h3>

          <h4>📊 Data Collection Sources:</h4>
          <ul>
            <li><strong>Reddit</strong> (via Pushshift API)</li>
            <li><strong>Google Trends</strong> (normalized volume scores)</li>
            <li><strong>News headlines</strong> (via Google News)</li>
            <li><strong>X/Twitter</strong> (scraped keyword mentions)</li>
          </ul>

          <h4>🧠 Processing Pipeline:</h4>
          <ul>
            <li><strong>VADER + LDA:</strong> Fast, but missed nuance</li>
            <li><strong>BERTopic + VADER:</strong> Better topic segmentation</li>
            <li><strong>BERTopic + RoBERTa:</strong> Best performance on Reddit data due to sarcasm comprehension and contextual understanding</li>
          </ul>

          <p>Each day was mapped to a sentiment score using rolling averages and volume-adjusted weightings.</p>
        </div>

        <div class="case-section">
          <h3>📈 Modeling the Market</h3>
          <p>We engineered features combining stock data (open/close/high/low) with sentiment inputs. Then we tested three approaches:</p>

          <h4>🔸 Linear Regression:</h4>
          <ul>
            <li>Baseline model</li>
            <li><strong>Surprisingly strongest correlation (r = 0.8604)</strong></li>
          </ul>

          <h4>🔸 LSTM (Long Short-Term Memory Neural Net):</h4>
          <ul>
            <li>Great on paper</li>
            <li>Underperformed due to limited time series length (r = 0.7731)</li>
          </ul>

          <h4>🔸 ARIMA:</h4>
          <ul>
            <li>Strong for traditional time series</li>
            <li>Struggled to integrate behavioral features</li>
          </ul>

          <p>We tested lag windows (1–7 days) and engineered difference features (∆ sentiment, ∆ price) for each run.</p>

          <div style="background: var(--studio); padding: 20px; border-radius: 12px; border-left: 4px solid var(--rain-storm); margin: 20px 0; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
            <p style="font-style: italic; margin: 0; color: #484848; font-size: 16px; line-height: 1.6;">
              "Sometimes, the simplest models are the sharpest tools — especially in noisy markets."
            </p>
          </div>
        </div>

        <div class="case-stats">
          <div class="stat-item-modal">
            <span class="stat-number-modal">0.86</span>
            <span class="stat-label-modal">Best Correlation (Linear)</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">4</span>
            <span class="stat-label-modal">Data Sources</span>
          </div>
          <div class="stat-item-modal">
            <span class="stat-number-modal">3</span>
            <span class="stat-label-modal">ML Models Tested</span>
          </div>
        </div>

        <div class="case-section">
          <h3>🔍 What We Discovered</h3>
          <ul>
            <li><strong>Reddit sentiment was the most predictive</strong> — likely due to depth of discourse and emotional candor</li>
            <li><strong>Google Trends spiked ~3–5 days before stock moves</strong> — predictive window potential</li>
            <li><strong>News tone was often reactive</strong> — not ideal for leading signals</li>
          </ul>

          <p><strong>A compelling moment:</strong> In May 2024, pro-crypto legislation passed. Coinbase rallied. But Reddit stayed cold. That emotional hesitation foreshadowed the mini-correction days later. <em>Emotion ≠ headlines</em>.</p>
        </div>

        <div class="case-section">
          <h3>📊 Visualizing the Mood</h3>
          <p>Using BERTopic, we mapped thematic clusters (e.g. "regulation anxiety", "meme rally", "scam panic") and overlaid them with stock movement.</p>

          <p><strong>The result:</strong> a live map of investor psyche. Peaks in "doubt" aligned with dips. Rallies in "hope" often followed media events.</p>
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
          <h3>🎯 Key Learnings</h3>
          <ul>
            <li><strong>Emotional narrative can be forecastable, not just descriptive</strong></li>
            <li><strong>Simpler models can outperform when signal > complexity</strong></li>
            <li><strong>Data is more than numbers — it's cultural, contextual, and human</strong></li>
          </ul>

          <div style="background: var(--studio); padding: 20px; border-radius: 12px; border-left: 4px solid var(--rain-storm); margin: 20px 0; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
            <p style="font-style: italic; margin: 0; color: #484848; font-size: 16px; line-height: 1.6;">
              "This project fused everything I love — behavioral data, language, and machine learning — into one wild ride."
            </p>
          </div>
        </div>

        <div class="case-section">
          <h3>📈 Impact & Outcomes</h3>
          <ul>
            <li><strong>Validated sentiment as a predictive tool</strong> for short-term price movement</li>
            <li><strong>Built a working prototype</strong> for multimodal sentiment tracking</li>
            <li><strong>Discovered Reddit as a high-signal source</strong> for investor emotion</li>
          </ul>

          <p><strong>Next Step:</strong> Turning this prototype into a live sentiment product or plugin for investors and fintech tools.</p>
        </div>

        <div class="case-section">
          <h3>🛠️ Tools & Technologies</h3>
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
            <span class="tech-pill">VADER Sentiment</span>
            <span class="tech-pill">Google Trends API</span>
          </div>
        </div>
      `
    }
    
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
