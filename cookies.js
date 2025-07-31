document.addEventListener('DOMContentLoaded', function () {
  const COOKIE_NAME = 'cookieConsent_v2';
  const VISITOR_COOKIE = 'visitorType';
  const COOKIE_DURATION_DAYS = 365;

  // ====== Cookie Functions ======
  function setCookie(name, value, days, category = 'essential') {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`;
    
    // Track if this is a new or returning visitor
    if (name === COOKIE_NAME && value === 'accepted') {
      const visitorType = getCookie(VISITOR_COOKIE) ? 'returning' : 'first_time';
      if (!getCookie(VISITOR_COOKIE)) {
        document.cookie = `${VISITOR_COOKIE}=${visitorType};expires=${date.toUTCString()};path=/`;
      }
    }
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  // ====== UI & Logic ======
  if (!getCookie(COOKIE_NAME)) {
    // Inject CSS (Futuristic, Minimal, E-commerce Style)
    const style = document.createElement('style');
    style.textContent = `
      #cookie-consent-bar {
        position: fixed;
        bottom: 20px;
        right: 20px;
        max-width: 320px;
        background: #fff;
        color: #1a1a1a;
        font-size: 13px;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
        z-index: 9999;
        font-family: 'Inter', -apple-system, sans-serif;
        border: 1px solid #f0f0f0;
        transform: translateY(10px);
        opacity: 0;
        animation: fadeInUp 0.3s ease-out forwards;
      }
      @keyframes fadeInUp {
        to { transform: translateY(0); opacity: 1; }
      }
      #cookie-consent-bar p {
        margin: 0 0 12px;
        line-height: 1.5;
      }
      #cookie-consent-bar .buttons {
        display: flex;
        gap: 8px;
      }
      #cookie-consent-bar button {
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
      }
      #cookie-consent-bar .accept {
        background: #000;
        color: #fff;
      }
      #cookie-consent-bar .reject {
        background: #f5f5f5;
        color: #666;
      }
      #cookie-consent-bar .settings {
        background: transparent;
        color: #000;
        text-decoration: underline;
      }
      #cookie-consent-bar .settings:hover {
        color: #555;
      }
      #cookie-consent-bar .categories {
        display: none;
        margin-top: 12px;
        border-top: 1px solid #eee;
        padding-top: 12px;
      }
      #cookie-consent-bar .category {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
      }
      #cookie-consent-bar .category label {
        font-size: 12px;
      }
      #cookie-consent-bar .toggle {
        position: relative;
        display: inline-block;
        width: 36px;
        height: 20px;
      }
      #cookie-consent-bar .toggle input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      #cookie-consent-bar .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #ddd;
        transition: .3s;
        border-radius: 20px;
      }
      #cookie-consent-bar .slider:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 2px;
        bottom: 2px;
        background: white;
        transition: .3s;
        border-radius: 50%;
      }
      #cookie-consent-bar input:checked + .slider {
        background: #000;
      }
      #cookie-consent-bar input:checked + .slider:before {
        transform: translateX(16px);
      }
    `;
    document.head.appendChild(style);

    // Inject HTML (Sleek, E-commerce Style)
    const bar = document.createElement('div');
    bar.id = 'cookie-consent-bar';
    bar.innerHTML = `
      <p>We use cookies to enhance your experience. Choose your preferences or accept all.</p>
      <div class="buttons">
        <button class="accept">Accept All</button>
        <button class="reject">Reject</button>
        <button class="settings">Settings</button>
      </div>
      <div class="categories">
        <div class="category">
          <label>Essential <small>(Required)</small></label>
          <label class="toggle">
            <input type="checkbox" checked disabled>
            <span class="slider"></span>
          </label>
        </div>
        <div class="category">
          <label>Analytics</label>
          <label class="toggle">
            <input type="checkbox" checked>
            <span class="slider"></span>
          </label>
        </div>
        <div class="category">
          <label>Marketing</label>
          <label class="toggle">
            <input type="checkbox" checked>
            <span class="slider"></span>
          </label>
        </div>
      </div>
    `;
    document.body.appendChild(bar);

    // ====== Event Handlers ======
    // Toggle Settings
    const settingsBtn = bar.querySelector('.settings');
    const categoriesDiv = bar.querySelector('.categories');
    settingsBtn.addEventListener('click', () => {
      categoriesDiv.style.display = categoriesDiv.style.display === 'block' ? 'none' : 'block';
    });

    // Accept All (Track & Close)
    bar.querySelector('.accept').addEventListener('click', () => {
      setCookie(COOKIE_NAME, 'accepted', COOKIE_DURATION_DAYS);
      setCookie('analyticsConsent', 'true', COOKIE_DURATION_DAYS);
      setCookie('marketingConsent', 'true', COOKIE_DURATION_DAYS);
      bar.remove();
      initTracking(); // (See below)
    });

    // Reject (Only Essential)
    bar.querySelector('.reject').addEventListener('click', () => {
      setCookie(COOKIE_NAME, 'rejected', COOKIE_DURATION_DAYS);
      bar.remove();
    });

    // Custom Settings (Checkbox Logic)
    const toggles = bar.querySelectorAll('.categories input[type="checkbox"]:not(:disabled)');
    toggles.forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const category = e.target.closest('.category').querySelector('label').textContent.trim().toLowerCase();
        setCookie(`${category}Consent`, e.target.checked ? 'true' : 'false', COOKIE_DURATION_DAYS);
      });
    });
  }

  // ====== Tracking Logic ======
  function initTracking() {
    const visitorType = getCookie(VISITOR_COOKIE) || 'first_time';
    console.log(`Visitor type: ${visitorType}`); // Replace with actual tracking (GA, FB Pixel, etc.)
    
    if (getCookie('analyticsConsent') === 'true') {
      // Load Google Analytics, etc.
      console.log('Analytics tracking enabled');
    }
    
    if (getCookie('marketingConsent') === 'true') {
      // Load Facebook Pixel, etc.
      console.log('Marketing tracking enabled');
    }
  }

  // Initialize tracking if already accepted
  if (getCookie(COOKIE_NAME) === 'accepted') {
    initTracking();
  }
});