/**
 * Appointment form — client-side only (no backend exists for this
 * take-home). Validates required fields and shows an accessible
 * success/error message via the existing aria-live status element.
 */
(function () {
  const form = document.getElementById('appointment-form');
  if (!form) return;

  const status = document.getElementById('form-status');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = 'Please fill in all required fields with valid details.';
      status.dataset.state = 'error';
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    status.textContent = "Thanks! We've received your details and will confirm your appointment shortly.";
    status.dataset.state = 'success';
    form.reset();
  });
})();
