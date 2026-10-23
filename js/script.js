
/* Gayathri C - Portfolio JavaScript */

(function () {
  'use strict';

  const GITHUB_REPO =
    'https://github.com/GAYATHRI-C-ux/Student-Internship-System';

  const projectDetails = {
    skillgap: {
      title: 'STUDENT INTERNSHIP SYSTEM',
      category: 'Student Internship System',
      image: 'assets/images/project-skill-gap.svg',
      problem: 'Students need a simple system to understand internship opportunities and career skills.',
      solution: 'The Student Internship System helps manage student internship information and applications.',
      techStack: ['Python', 'SQLite', 'Algorithms'],
      repoUrl: GITHUB_REPO
    },

    mongoai: {
      title: 'AI Applications with MongoDB',
      category: 'AI Vector Search and RAG',
      image: 'assets/images/project-mongodb-ai.svg',
      problem: 'Traditional search may not understand the meaning of user queries.',
      solution: 'Uses MongoDB Vector Search and Retrieval-Augmented Generation.',
      techStack: ['MongoDB', 'Python', 'RAG'],
      repoUrl: 'https://github.com/GAYATHRI-C-ux'
    },

    ecom: {
      title: 'Modern Web & E-Commerce Storefront',
      category: 'Web Application',
      image: 'assets/images/project-ecommerce.svg',
      problem: 'Online stores need simple product browsing and cart management.',
      solution: 'A storefront using HTML, CSS and JavaScript.',
      techStack: ['HTML', 'CSS', 'JavaScript'],
      repoUrl: 'https://github.com/GAYATHRI-C-ux'
    },

    intern: {
      title: 'STUDENT INTERNSHIP SYSTEM',
      category: 'Java Application',
      image: 'assets/images/project-internship.svg',
      problem: 'Students need to manage internship applications.',
      solution: 'A Java application demonstrating internship application management.',
      techStack: ['Java', 'OOP', 'Scanner'],
      repoUrl: GITHUB_REPO
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    initDynamicYear();
    initSliderMenu();
    initProjectSlider();
    initContactModal();
    initProjectModal();
    initContactForm();
  });

  // Dynamic copyright year
  function initDynamicYear() {
    const year = document.getElementById('current-year');

    if (year) {
      year.textContent = new Date().getFullYear();
    }
  }

  // Navigation menu
  function initSliderMenu() {
    const toggle = document.getElementById('slider-menu-toggle');
    const backdrop = document.getElementById('slider-drawer-backdrop');
    const close = document.getElementById('slider-close-btn');

    if (!toggle || !backdrop || !close) return;

    function openMenu() {
      backdrop.classList.add('is-open');
      backdrop.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      close.focus();
    }

    function closeMenu() {
      backdrop.classList.remove('is-open');
      backdrop.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggle.focus();
    }

    toggle.addEventListener('click', openMenu);
    close.addEventListener('click', closeMenu);

    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeMenu();
    });

    document.querySelectorAll('.slider-nav-link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  // Project slider
  function initProjectSlider() {
    const slides = document.querySelectorAll('.project-slide-item');
    const prev = document.getElementById('slider-prev-btn');
    const next = document.getElementById('slider-next-btn');
    const counter = document.getElementById('slider-counter');
    const badge = document.getElementById('slider-badge');
    const title = document.getElementById('slider-info-title');
    const desc = document.getElementById('slider-info-desc');
    const tags = document.getElementById('slider-info-tags');
    const viewBtn = document.getElementById('slider-info-view-btn');

    if (!slides.length || !prev || !next) return;

    let current = 0;

    function updateSlider(index) {
      current = (index + slides.length) % slides.length;

      slides.forEach(function (slide, i) {
        slide.classList.toggle('active', i === current);
      });

      const slide = slides[current];
      const projectId = slide.dataset.id || 'skillgap';
      const project = projectDetails[projectId] || projectDetails.skillgap;

      if (counter) {
        counter.textContent =
          String(current + 1).padStart(2, '0') +
          ' / ' +
          String(slides.length).padStart(2, '0');
      }

      if (badge) {
        badge.textContent = slide.dataset.badge || 'PROJECT';
      }

      if (title) {
        title.textContent = slide.dataset.title || project.title;
      }

      if (desc) {
        desc.textContent = slide.dataset.desc || '';
      }

      if (tags) {
        tags.replaceChildren();

        (slide.dataset.tags || '').split(',').forEach(function (tag) {
          const span = document.createElement('span');
          span.className = 'tag-pill';
          span.textContent = tag.trim();

          if (tag.trim()) tags.appendChild(span);
        });
      }

      // Always make the project button a GitHub link.
      if (viewBtn) {
        viewBtn.removeAttribute('data-modal');

        if (viewBtn.tagName === 'A') {
          viewBtn.href = project.repoUrl;
          viewBtn.target = '_blank';
          viewBtn.rel = 'noopener noreferrer';
          viewBtn.querySelector('span')?.replaceChildren(
            document.createTextNode('View on GitHub')
          );
        }
      }
    }

    prev.addEventListener('click', function () {
      updateSlider(current - 1);
    });

    next.addEventListener('click', function () {
      updateSlider(current + 1);
    });

    const viewport = document.getElementById('project-slides-viewport');

    if (viewport) {
      let startX = 0;

      viewport.addEventListener('touchstart', function (e) {
        startX = e.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', function (e) {
        const endX = e.changedTouches[0].screenX;

        if (startX - endX > 45) updateSlider(current + 1);
        if (endX - startX > 45) updateSlider(current - 1);
      }, { passive: true });
    }

    updateSlider(0);
  }

  // Contact modal
  function initContactModal() {
    const modal = document.getElementById('contact-modal');
    const open = document.getElementById('btn-open-contact-modal');
    const close = document.getElementById('contact-modal-close');

    if (!modal || !close) return;

    function openModal() {
      modal.classList.add('is-active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      modal.querySelector('input')?.focus();
    }

    function closeModal() {
      modal.classList.remove('is-active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      open?.focus();
    }

    open?.addEventListener('click', openModal);
    close.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        closeModal();
      }
    });
  }

  // Project details modal
  function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('project-modal-content');
    const close = document.getElementById('project-modal-close');

    if (!modal || !content || !close) return;

    function openProject(id) {
      const data = projectDetails[id];
      if (!data) return;

      content.replaceChildren();

      const heading = document.createElement('h3');
      heading.textContent = data.title;

      const category = document.createElement('p');
      category.textContent = data.category;

      const problemTitle = document.createElement('strong');
      problemTitle.textContent = 'Problem Being Solved:';

      const problem = document.createElement('p');
      problem.textContent = data.problem;

      const solutionTitle = document.createElement('strong');
      solutionTitle.textContent = 'Implementation & Solution:';

      const solution = document.createElement('p');
      solution.textContent = data.solution;

      const techTitle = document.createElement('strong');
      techTitle.textContent = 'Technologies Used:';

      const tech = document.createElement('p');
      tech.textContent = data.techStack.join(', ');

      const link = document.createElement('a');
      link.href = data.repoUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'btn-message-launch';
      link.textContent = 'View on GitHub ↗';

      content.append(
        heading,
        category,
        problemTitle,
        problem,
        solutionTitle,
        solution,
        techTitle,
        tech,
        link
      );

      modal.classList.add('is-active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      close.focus();
    }

    // Only elements that intentionally request a modal open it.
    document.addEventListener('click', function (e) {
      const button = e.target.closest('[data-modal]');

      if (button && button.id !== 'slider-info-view-btn') {
        e.preventDefault();
        openProject(button.getAttribute('data-modal'));
      }
    });

    close.addEventListener('click', function () {
      modal.classList.remove('is-active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('is-active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        modal.classList.remove('is-active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  // Contact form
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('contact-name');
      const email = document.getElementById('contact-email');
      const subject = document.getElementById('contact-subject');
      const message = document.getElementById('contact-msg');

      if (
        !name?.value.trim() ||
        !email?.value.trim() ||
        !message?.value.trim()
      ) {
        showToast('Please fill in all required fields.');
        return;
      }

      const recipient = 'cgayathri286@gmail.com';
      const mailSubject = encodeURIComponent(
        '[Portfolio Inquiry] ' + subject.value + ' - ' + name.value.trim()
      );

      const body = encodeURIComponent(
        'Hello Gayathri,\n\n' +
        'My name is ' + name.value.trim() +
        ' (' + email.value.trim() + ').\n\n' +
        'Topic: ' + subject.value + '\n\n' +
        'Message:\n' + message.value.trim()
      );

      showToast('Opening your email client...');

      setTimeout(function () {
        window.location.href =
          'mailto:' + recipient +
          '?subject=' + mailSubject +
          '&body=' + body;
      }, 350);
    });
  }

  // Toast notification
  let toastTimer;

  function showToast(message) {
    const toast = document.getElementById('toast');
    const text = document.getElementById('toast-message');

    if (!toast || !text) return;

    text.textContent = message;
    toast.classList.add('is-visible');

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 3200);
  }

})();
