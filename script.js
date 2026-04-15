// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Form handler (demo — swap in real backend / email service later)
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const note = document.getElementById('formNote');
  const data = Object.fromEntries(new FormData(form).entries());

  console.log('Request submitted:', data);
  note.textContent = `Thanks, ${data.name}! We got your request for ${data.business} and will be in touch soon.`;
  form.reset();
}
