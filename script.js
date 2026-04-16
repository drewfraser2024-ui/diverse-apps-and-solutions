// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Form handler — sends submissions to diverseappsandsolutions@gmail.com via FormSubmit
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const note = document.getElementById('formNote');
  const submitBtn = form.querySelector('button[type="submit"]');
  const data = Object.fromEntries(new FormData(form).entries());

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  note.textContent = '';

  try {
    const res = await fetch('https://formsubmit.co/ajax/diverseappsandsolutions@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: `New app request from ${data.business || data.name}`,
        _template: 'table',
        _autoresponse: `Hi ${data.name},\n\nThanks for reaching out to Diverse Apps and Solutions! We got your request for ${data.business} and we'll be in touch within 1 business day to discuss next steps.\n\nIn the meantime, if you have any questions, feel free to reply to this email or call us at (619) 353-4290.\n\nTalk soon,\nThe Diverse Apps and Solutions Team`,
        ...data
      })
    });

    if (!res.ok) throw new Error('Request failed');

    note.textContent = `Thanks, ${data.name}! We got your request for ${data.business} and will be in touch within 1 business day.`;
    note.style.color = '';
    form.reset();
  } catch (err) {
    note.textContent = 'Something went wrong. Please email us directly at diverseappsandsolutions@gmail.com.';
    note.style.color = '#ff6b6b';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Request';
  }
}
