(() => {
  const CONTACT_ENDPOINT = '';

  const menuButton = document.getElementById('menuButton');
  const siteNav = document.getElementById('siteNav');
  const yearEl = document.getElementById('year');
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  const setStatus = (message, tone) => {
    if (!status) return;
    status.textContent = message;
    status.classList.remove('success', 'error');
    if (tone) status.classList.add(tone);
  };

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  if (menuButton && siteNav) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      siteNav.classList.toggle('open');
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (!form || !status) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      setStatus('Please complete all required fields.', 'error');
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const email = String(data.get('email') || '').trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('Please provide a valid email address.', 'error');
      return;
    }

    if (!CONTACT_ENDPOINT) {
      setStatus('Form validated. To receive messages, set CONTACT_ENDPOINT in script.js to your form/API URL.', 'success');
      return;
    }

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') || '').trim(),
          email,
          message: String(data.get('message') || '').trim(),
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('Thanks! Your request was sent successfully.', 'success');
      form.reset();
    } catch (_error) {
      setStatus('Could not send right now. Please try again or contact support by email.', 'error');
    }
  });
})();
