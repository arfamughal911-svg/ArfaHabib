

  // ── FORM VALIDATION ──
  const form = document.getElementById('contactForm');

  function getVal(id) { return document.getElementById(id).value.trim(); }
  function setErr(id, errId, show) {
    const el = document.getElementById(id);
    const err = document.getElementById(errId);
    if (show) { el.classList.add('error'); err.style.display = 'block'; }
    else { el.classList.remove('error'); err.style.display = 'none'; }
    return !show;
  }

  function validateForm() {
    let valid = true;
    const fname = getVal('fname');
    const lname = getVal('lname');
    const email = getVal('email');
    const phone = getVal('phone');
    const subject = getVal('subject');
    const message = getVal('message');

    if (!fname) valid = setErr('fname', 'fnameErr', true) && valid;
    else setErr('fname', 'fnameErr', false);

    if (!lname) valid = setErr('lname', 'lnameErr', true) && valid;
    else setErr('lname', 'lnameErr', false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) valid = setErr('email', 'emailErr', true) && valid;
    else setErr('email', 'emailErr', false);

    if (phone && !/^[\d\s\+\-\(\)]{7,15}$/.test(phone)) { valid = setErr('phone', 'phoneErr', true) && valid; }
    else setErr('phone', 'phoneErr', false);

    if (!subject) valid = setErr('subject', 'subjectErr', true) && valid;
    else setErr('subject', 'subjectErr', false);

    if (!message || message.length < 20) valid = setErr('message', 'messageErr', true) && valid;
    else setErr('message', 'messageErr', false);

    return valid;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
      // Build mailto link to send email to owner
      const fname = getVal('fname');
      const lname = getVal('lname');
      const email = getVal('email');
      const subject = getVal('subject');
      const message = getVal('message');
      const phone = getVal('phone');

      const body = `Name: ${fname} ${lname}%0AEmail: ${email}%0APhone: ${phone}%0ASubject: ${subject}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
      const mailtoLink = `mailto:info@paf-iast.edu.pk?subject=${encodeURIComponent('PAF-IAST Website Inquiry: ' + subject)}&body=${body}`;
      window.location.href = mailtoLink;

      document.getElementById('successMsg').style.display = 'block';
      form.reset();
      setTimeout(() => { document.getElementById('successMsg').style.display = 'none'; }, 6000);
    }
  });

  // Real-time validation on blur
  ['fname','lname','email','phone','subject','message'].forEach(id => {
    document.getElementById(id).addEventListener('blur', validateForm);
  });

  // Smooth scroll offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

////

// ── SCROLL REVEAL ANIMATION ──
  document.addEventListener('DOMContentLoaded', () => {
    // Select all the elements we want to animate
    const animateElements = document.querySelectorAll(
      '.prog-card, .why-card, .news-card, .about-text, .about-img-wrap, .form-card, .contact-info'
    );

    // Create the IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If the element is visible on screen
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: Stop observing once it has animated so it doesn't repeat
          observer.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0.15 // Triggers when 15% of the element is visible
    });

    // Attach the observer to each element
    animateElements.forEach((el) => observer.observe(el));
  });