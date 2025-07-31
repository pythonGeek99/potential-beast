// ====== Cookie Functions (Keep These!) ======
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}

// ====== Updated Visitor Detection ======
const visitorType = getCookie('visitorType'); // Sync with your consent script!

if (visitorType === 'returning') {
  // Returning visitor
  setTimeout(() => {
    showIslandMessage("👋 Good to see you again. <br> Let’s fix what’s not compounding.");
  }, 4000);
} else if (!visitorType) {
  // First-time visitor (only set cookie if it doesn't exist)
  setCookie('visitorType', 'first_time', 365); // Long expiry for accuracy
}


// Initialize dynamic island
const island = document.createElement('div');
island.className = 'dynamic-island';
island.innerHTML = `
  <div class="island-content">
    <div class="default-state">insightDock</div>
    <div class="expanded-state">
      <div class="message-content"></div>
      <button class="close-expansion">×</button>
    </div>
  </div>
`;
document.body.appendChild(island);

// Check if any modal is open (don't show island if true)
function isModalOpen() {
  return document.getElementById('modal')?.style.display === 'flex' || 
         document.getElementById('rescueContainer')?.style.display === 'block';
}

// Show message with attention effect
function showIslandMessage(message, duration = 5000) {
  if (isModalOpen()) return;
  
  const content = island.querySelector('.message-content');
  content.textContent = message;
  
  island.classList.add('expanded', 'attention');
  
  setTimeout(() => {
    island.classList.remove('attention');
  }, 1000);
  
  if (duration) {
    setTimeout(() => {
      island.classList.remove('expanded');
    }, duration);
  }
}

// Close button handler
island.querySelector('.close-expansion').addEventListener('click', () => {
  island.classList.remove('expanded');
});

// Section visibility observer with mock messages
function setupSectionObservers() {
  const sections = {
    '#header-clearfix': {
      message: "Most tools report data. Ours weaponsizes it. You’re home",
      fired: false
    },
    '#explore-btn': {
      message: "💡Click ‘Explore’— Go ahead press it Your Next Big Breakthrough Starts Here.",
      fired: false
    },
    '#darlley-store': {
      message: "Before → After: From ‘Why isn’t this working?’ to ‘Why is everything working?’ CGM forces your channels to collaborate ",
      fired: false
    },
    '#cgm-comp': {
      message: "Your agency doesn't want you to see this comparison.",
      fired: false
    },
    '#testimonial-section': {
      message: "Still receiving PDFs like it’s 2012? We give clients a live dashboard to track store performance in real time.",
      fired: false
    },
    '#contact': {
      message: "📞 Ready to get started? Contact us today! [REPLACE WITH CTA MESSAGE]",
      fired: false
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const sectionId = entry.target.id;
      const sectionData = sections[`#${sectionId}`];
      
      if (entry.isIntersecting && sectionData && !sectionData.fired) {
        showIslandMessage(sectionData.message);
        sectionData.fired = true;
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  });

  // Observe all sections we want to track
  Object.keys(sections).forEach(sectionId => {
    const element = document.querySelector(sectionId);
    if (element) {
      observer.observe(element);
    } else {
      console.warn(`Section not found: ${sectionId}`);
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupSectionObservers();
  
  // Time-based triggers
setTimeout(() => {
  if (!isModalOpen()) {
    const content = island.querySelector('.message-content');
    content.innerHTML = `
      💬 Still exploring? Let's talk!<br>
      <a href="https://wa.me/234XXXXXXXXXX" target="_blank" style="
        display: inline-block;
        padding: 10px 16px;
        background-color: #25D366;
        color: white;
        border-radius: 6px;
        text-decoration: none;
        font-weight: bold;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        margin-top: 2px;
        transition: background-color 0.3s ease;
      " onmouseover="this.style.backgroundColor='#1ebe5d'" onmouseout="this.style.backgroundColor='#25D366'">
        📱 Message us on WhatsApp
      </a>
    `;

    island.classList.add('expanded', 'attention');

    setTimeout(() => {
      island.classList.remove('attention');
    }, 1000);

    setTimeout(() => {
      island.classList.remove('expanded');
    }, 10000); // show for 10s
  }
}, 60000);



  // Exit intent detection
  document.addEventListener('mouseout', (e) => {
    if (e.clientY < 0 && !isModalOpen()) {
      showIslandMessage("⏰ Wait! You’ve spent time here—let us return the favor with a free Store audit. No catch, just value.", 10000);
    }
  });
});

// Fallback scroll triggers (optional)
let scrollTriggersFired = [];
window.addEventListener('scroll', () => {
  if (isModalOpen()) return;
  
  const scrollPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
  
  if (window.scrollY > headerHeight) {
    // 25% scroll
    if (scrollPct >= 25 && !scrollTriggersFired.includes(25)) {
      showIslandMessage("Still there? 👀 Take your time—when you're ready, We’ve got some insights that could level up your store.");
      scrollTriggersFired.push(25);
    }
    
    // 50% scroll
    if (scrollPct >= 50 && !scrollTriggersFired.includes(50)) {
      showIslandMessage(" If you’re running a Shopify, WooCommerce, BigCommerce, or any DTC brand—we see you 👀 You're exactly who we built this for.");
      scrollTriggersFired.push(50);
    }
    
    // 75% scroll
    if (scrollPct >= 75 && !scrollTriggersFired.includes(75)) {
      showIslandMessage("🎁 Almost done! Here's a special gift...free Store Audit");
      scrollTriggersFired.push(75);
    }
  }
});