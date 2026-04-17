function $(id){ return document.getElementById(id); }

function animateStatus(statusEl){
  statusEl.classList.remove("status-pop");
  // Force reflow so animation can replay on subsequent submits.
  void statusEl.offsetWidth;
  statusEl.classList.add("status-pop");
}

function setCurrentNav(){
  const path = window.location.pathname.split(/[\\/]/).pop() || "index.html";
  const map = {
    "index.html": "home-link",
    "chi-siamo.html": "chi-link",
    "servizi.html": "servizi-link",
    "come-funziona.html": "come-link",
    "contatti.html": "contatti-link",
    "faq.html": "faq-link",
    "privacy.html": "privacy-link",
    "termini.html": "termini-link"
  };
  const activeId = map[path];
  if(!activeId) return;
  const a = document.getElementById(activeId);
  if(!a) return;

  document.querySelectorAll("nav a[aria-current='page']").forEach(x => x.removeAttribute("aria-current"));
  a.setAttribute("aria-current","page");
}

function initContactForm(){
  const form = document.getElementById("contact-form");
  if(!form) return;

  const statusEl = $("contact-status");
  if(!statusEl) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    statusEl.textContent = "";
    statusEl.style.display = "block";

    const name = (form.elements["name"]?.value || "").trim();
    const company = (form.elements["company"]?.value || "").trim();
    const email = (form.elements["email"]?.value || "").trim();
    const phone = (form.elements["phone"]?.value || "").trim();
    const message = (form.elements["message"]?.value || "").trim();
    const consentChecked = form.elements["consent"] ? !!form.elements["consent"].checked : true;

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!name || !company || !email || !message || !emailOk){
      statusEl.className = "error";
      statusEl.textContent = "Controlla i campi: assicurati di inserire nome, azienda, email valida e messaggio.";
      animateStatus(statusEl);
      return;
    }
    if(!consentChecked){
      statusEl.className = "error";
      statusEl.textContent = "Per inviare la richiesta, conferma il consenso al trattamento dei dati.";
      animateStatus(statusEl);
      return;
    }

    statusEl.className = "success";
    statusEl.textContent = "Richiesta inviata con successo. Grazie, ti ricontatteremo a breve.";
    animateStatus(statusEl);
    form.reset();
  });
}

function initBabysitterForm(){
  const form = document.getElementById("babysitter-form");
  if(!form) return;

  const statusEl = $("babysitter-status");
  if(!statusEl) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    statusEl.textContent = "";
    statusEl.style.display = "block";

    const name = (form.elements["name"]?.value || "").trim();
    const city = (form.elements["city"]?.value || "").trim();
    const email = (form.elements["email"]?.value || "").trim();
    const phone = (form.elements["phone"]?.value || "").trim();
    const experience = (form.elements["experience"]?.value || "").trim();
    const availability = (form.elements["availability"]?.value || "").trim();
    const message = (form.elements["message"]?.value || "").trim();
    const consentChecked = form.elements["consent"] ? !!form.elements["consent"].checked : true;

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!name || !city || !email || !phone || !experience || !availability || !message || !emailOk){
      statusEl.className = "error";
      statusEl.textContent = "Controlla i campi obbligatori: nome, città, email valida, telefono, esperienza, disponibilità e presentazione.";
      animateStatus(statusEl);
      return;
    }
    if(!consentChecked){
      statusEl.className = "error";
      statusEl.textContent = "Per inviare la candidatura, conferma il consenso al trattamento dei dati.";
      animateStatus(statusEl);
      return;
    }

    statusEl.className = "success";
    statusEl.textContent = "Candidatura inviata con successo. Grazie per l'interesse.";
    animateStatus(statusEl);
    form.reset();
  });
}

function initRevealEffects(){
  const sections = document.querySelectorAll("main .section");
  if(!sections.length) return;

  if(!("IntersectionObserver" in window)){
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if(!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  sections.forEach((section, idx) => {
    section.classList.add("reveal-up");
    section.style.transitionDelay = `${Math.min(idx * 80, 260)}ms`;
    observer.observe(section);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Carica font (solo Home/altre pagine non hanno garanzie che il tag link sia presente)
  setCurrentNav();
  initContactForm();
  initBabysitterForm();
  initRevealEffects();
});

