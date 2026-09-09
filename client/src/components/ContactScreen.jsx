import { useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function ContactScreen({ onBack }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', question: '' });
  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'email') {
      setEmailError(EMAIL_REGEX.test(e.target.value) ? '' : 'Please enter a valid email address (e.g. name@example.com)');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(form.email)) {
      setEmailError('Please enter a valid email address (e.g. name@example.com)');
      return;
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      alert('Your message has been submitted! Check your email for a confirmation.');
      onBack();
    } catch {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '1rem' }}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '400px' }}>
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        {emailError && <span style={{ color: 'red', fontSize: '0.8rem' }}>{emailError}</span>}
        <textarea name="question" placeholder="Your question" value={form.question} onChange={handleChange} required rows={4} />
        <button type="submit">Submit</button>
      </form>
      <button onClick={onBack}>Back to Home</button>
    </div>
  );
}

export default ContactScreen;
