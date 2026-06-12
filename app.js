// Application logic for Simon's Web Apps Integration Portal

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. Core State Management
  // ==========================================
  let activeAppId = null;
  let targetAppIdToUnlock = null;
  
  // Load unlocked apps list from sessionStorage (locks reset when tab closes)
  let unlockedApps = new Set(JSON.parse(sessionStorage.getItem("unlocked_apps") || "[]"));

  // DOM Elements - Navigation & Shell
  const body = document.body;
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const backBtn = document.getElementById("backBtn");
  const headerRightActions = document.getElementById("headerRightActions");
  const navDrawer = document.getElementById("navDrawer");
  const drawerScrim = document.getElementById("drawerScrim");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const lockAllBtn = document.getElementById("lockAllBtn");
  
  const headerTitle = document.getElementById("headerTitle");
  const headerLogo = document.getElementById("headerLogo");

  // DOM Elements - Lists & Grids
  const publicNavList = document.getElementById("publicNavList");
  const restrictedNavList = document.getElementById("restrictedNavList");
  const publicGrid = document.getElementById("publicGrid");
  const restrictedGrid = document.getElementById("restrictedGrid");

  // DOM Elements - Viewport Sections
  const dashboardSection = document.getElementById("dashboardSection");
  const iframeSection = document.getElementById("iframeSection");
  const appIframe = document.getElementById("appIframe");
  const iframeLoader = document.getElementById("iframeLoader");
  
  // Header Iframe Actions
  const iframeReloadBtn = document.getElementById("iframeReloadBtn");
  const iframeExternalBtn = document.getElementById("iframeExternalBtn");


  // DOM Elements - Modal Dialog
  const passwordModal = document.getElementById("passwordModal");
  const passwordForm = document.getElementById("passwordForm");
  const passcodeInput = document.getElementById("passcodeInput");
  const passwordToggleBtn = document.getElementById("passwordToggleBtn");
  const eyeIcon = document.getElementById("eyeIcon");
  const passwordErrorMsg = document.getElementById("passwordErrorMsg");
  
  const modalAppIcon = document.getElementById("modalAppIcon");
  const modalTitle = document.getElementById("modalTitle");
  const modalCancelBtn = document.getElementById("modalCancelBtn");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  // ==========================================
  // 2. Initialize Page Themes
  // ==========================================
  const savedTheme = localStorage.getItem("portal_theme") || "dark";
  if (savedTheme === "light") {
    body.classList.remove("theme-dark");
    body.classList.add("theme-light");
  } else {
    body.classList.remove("theme-light");
    body.classList.add("theme-dark");
  }

  themeToggleBtn.addEventListener("click", () => {
    if (body.classList.contains("theme-dark")) {
      body.classList.replace("theme-dark", "theme-light");
      localStorage.setItem("portal_theme", "light");
    } else {
      body.classList.replace("theme-light", "theme-dark");
      localStorage.setItem("portal_theme", "dark");
    }
  });

  // ==========================================
  // 3. Dynamic Rendering of Web Apps
  // ==========================================
  function renderAppLists() {
    publicNavList.innerHTML = "";
    restrictedNavList.innerHTML = "";
    publicGrid.innerHTML = "";
    restrictedGrid.innerHTML = "";

    CONFIG.apps.forEach(app => {
      const isUnlocked = app.isPublic || unlockedApps.has(app.id);
      
      // A. Create Nav List Element for Sidebar Drawer
      const navItem = document.createElement("li");
      navItem.className = `nav-item ${activeAppId === app.id ? 'active' : ''}`;
      navItem.dataset.id = app.id;
      
      let lockStateHTML = "";
      if (!app.isPublic) {
        lockStateHTML = isUnlocked 
          ? `<span class="nav-status unlocked-icon">🔓</span>` 
          : `<span class="nav-status locked-icon">🔒</span>`;
      }

      navItem.innerHTML = `
        <span class="nav-icon">${app.icon}</span>
        <span class="nav-label">${app.title}</span>
        ${lockStateHTML}
      `;
      
      navItem.addEventListener("click", () => handleAppSelect(app.id));

      if (app.isPublic) {
        publicNavList.appendChild(navItem);
      } else {
        restrictedNavList.appendChild(navItem);
      }

      // B. Create Dashboard Card Grid Layout
      const card = document.createElement("div");
      card.className = "app-card";
      card.dataset.id = app.id;

      let badgeClass = "public";
      let badgeText = "公開服務";
      if (!app.isPublic) {
        if (isUnlocked) {
          badgeClass = "unlocked";
          badgeText = "已解鎖";
        } else {
          badgeClass = "private";
          badgeText = "需驗證";
        }
      }

      card.innerHTML = `
        <div class="card-header">
          <div class="card-icon">${app.icon}</div>
          <span class="card-badge ${badgeClass}">${badgeText}</span>
        </div>
        <div class="card-info">
          <h4 class="card-title">${app.title}</h4>
          <p class="card-description">${app.description}</p>
        </div>
      `;

      card.addEventListener("click", () => handleAppSelect(app.id));

      if (app.isPublic) {
        publicGrid.appendChild(card);
      } else {
        restrictedGrid.appendChild(card);
      }
    });

    // Toggle Visibility of the Lock All Button
    const hasUnlockedPrivateApps = CONFIG.apps.some(app => !app.isPublic && unlockedApps.has(app.id));
    lockAllBtn.style.display = hasUnlockedPrivateApps ? "flex" : "none";
  }

  // ==========================================
  // 4. App Selection & Iframe Loading
  // ==========================================
  function handleAppSelect(appId) {
    const app = CONFIG.apps.find(a => a.id === appId);
    if (!app) return;

    closeDrawer();

    // Verify Passcode Security
    if (!app.isPublic && !unlockedApps.has(app.id)) {
      openUnlockModal(app.id);
      return;
    }

    loadAppInIframe(app);
  }

  function loadAppInIframe(app) {
    activeAppId = app.id;
    
    // Toggle dashboard and show iframe
    dashboardSection.style.display = "none";
    iframeSection.style.display = "flex";
    
    // Update top header display
    headerTitle.textContent = app.title;
    headerLogo.textContent = app.icon;
    
    // Toggle header actions for active app view
    menuToggleBtn.style.display = "none";
    backBtn.style.display = "flex";
    headerRightActions.style.display = "flex";

    // Show loading spinner and set src
    iframeLoader.classList.remove("hidden");
    appIframe.src = app.url;

    // Refresh navbar selection state
    renderAppLists();
  }

  // Reset viewport and return to main dashboard
  function returnToDashboard() {
    activeAppId = null;
    appIframe.src = "about:blank";
    
    iframeSection.style.display = "none";
    dashboardSection.style.display = "block";
    
    headerTitle.textContent = CONFIG.portalTitle;
    headerLogo.textContent = "🧠";
    
    // Toggle header actions for dashboard view
    menuToggleBtn.style.display = "flex";
    backBtn.style.display = "none";
    headerRightActions.style.display = "none";
    
    renderAppLists();
  }

  // Handle iframe load trigger to hide spinner
  appIframe.addEventListener("load", () => {
    // Check if iframe was actually loaded with application URL
    if (appIframe.src && appIframe.src !== "about:blank") {
      iframeLoader.classList.add("hidden");
    }
  });

  // Action Buttons inside Top Header
  iframeReloadBtn.addEventListener("click", () => {
    if (activeAppId) {
      iframeLoader.classList.remove("hidden");
      // Set src again to force reload
      appIframe.src = appIframe.src;
    }
  });

  iframeExternalBtn.addEventListener("click", () => {
    if (activeAppId) {
      const app = CONFIG.apps.find(a => a.id === activeAppId);
      if (app) {
        window.open(app.url, "_blank");
      }
    }
  });

  backBtn.addEventListener("click", returnToDashboard);


  // ==========================================
  // 5. Drawer (Navigation) Mechanics
  // ==========================================
  function openDrawer() {
    navDrawer.classList.add("open");
    drawerScrim.classList.add("open");
    navDrawer.setAttribute("aria-hidden", "false");
    drawerScrim.setAttribute("aria-hidden", "false");
  }

  function closeDrawer() {
    navDrawer.classList.remove("open");
    drawerScrim.classList.remove("open");
    navDrawer.setAttribute("aria-hidden", "true");
    drawerScrim.setAttribute("aria-hidden", "true");
  }

  menuToggleBtn.addEventListener("click", openDrawer);
  drawerCloseBtn.addEventListener("click", closeDrawer);
  drawerScrim.addEventListener("click", closeDrawer);

  // ==========================================
  // 6. Security Lock / Passcode Modal
  // ==========================================
  function openUnlockModal(appId) {
    const app = CONFIG.apps.find(a => a.id === appId);
    if (!app) return;

    targetAppIdToUnlock = appId;
    
    // Set Modal App details
    modalAppIcon.textContent = app.icon;
    modalTitle.textContent = `${app.title} 驗證解鎖`;
    
    // Clear elements
    passcodeInput.value = "";
    passcodeInput.type = "password";
    resetEyeIcon();
    passwordErrorMsg.style.display = "none";
    passcodeInput.classList.remove("input-error");

    // Display Modal
    passwordModal.classList.add("open");
    passwordModal.setAttribute("aria-hidden", "false");
    
    // Auto-focus input on mobile (slight delay to bypass animations transition)
    setTimeout(() => {
      passcodeInput.focus();
    }, 150);
  }

  function closeUnlockModal() {
    passwordModal.classList.remove("open");
    passwordModal.setAttribute("aria-hidden", "true");
    targetAppIdToUnlock = null;
  }

  modalCloseBtn.addEventListener("click", closeUnlockModal);
  modalCancelBtn.addEventListener("click", closeUnlockModal);
  
  // Helper to hash string using SHA-256
  async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
  
  // Submit verification form (Async for SHA-256 hashing)
  passwordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!targetAppIdToUnlock) return;

    const app = CONFIG.apps.find(a => a.id === targetAppIdToUnlock);
    if (!app) return;

    const enteredKey = passcodeInput.value.trim();
    
    // Hash the entered key
    const enteredKeyHash = await sha256(enteredKey);
    
    if (enteredKeyHash === app.keywordHash) {
      // Unlocked successfully!
      unlockedApps.add(app.id);
      sessionStorage.setItem("unlocked_apps", JSON.stringify(Array.from(unlockedApps)));
      
      closeUnlockModal();
      loadAppInIframe(app);
    } else {
      // Trigger error display
      passwordErrorMsg.style.display = "block";
      passcodeInput.classList.add("input-error");
      passcodeInput.focus();
      passcodeInput.select();
    }
  });

  // Password Visibility Toggle Button
  passwordToggleBtn.addEventListener("click", () => {
    if (passcodeInput.type === "password") {
      passcodeInput.type = "text";
      // Change to "Slash Eye" icon
      eyeIcon.innerHTML = `
        <path d="M12 7c-2.76 0-5 2.24-5 5 0 .65.13 1.26.36 1.82l2.92-2.92c.56-.23 1.17-.36 1.82-.36 2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.82l2.92-2.92c.23-.56.36-1.17.36-1.82 0-4.39-4-7.5-9-7.5zm.08 6.13l-4.21 4.21c1.24.73 2.64 1.16 4.13 1.16 5 0 9-3.11 9-7.5 0-1.28-.35-2.48-.96-3.53l-2.03 2.03c.12.47.18.97.18 1.5 0 1.66-1.34 3-3 3-.53 0-1.03-.06-1.5-.18v.01zm-3.32-3.32l-3.5-3.5L3.83 7.74 5.9 9.8c-.57 1.05-.9 2.25-.9 3.2 0 4.39 4 7.5 9 7.5 1.49 0 2.89-.43 4.13-1.16l2.13 2.13 1.41-1.41L10.17 8.41l-1.41 1.4z" fill="currentColor"/>
      `;
    } else {
      passcodeInput.type = "password";
      resetEyeIcon();
    }
  });

  function resetEyeIcon() {
    eyeIcon.innerHTML = `
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
    `;
  }

  // ==========================================
  // 7. Lock All Action Button
  // ==========================================
  lockAllBtn.addEventListener("click", () => {
    unlockedApps.clear();
    sessionStorage.removeItem("unlocked_apps");
    
    // If we locked the currently active app, go back to dashboard
    if (activeAppId) {
      const activeApp = CONFIG.apps.find(a => a.id === activeAppId);
      if (activeApp && !activeApp.isPublic) {
        returnToDashboard();
        return;
      }
    }
    
    renderAppLists();
  });

  // ==========================================
  // 8. Start Rendering Initial State
  // ==========================================
  renderAppLists();
});
