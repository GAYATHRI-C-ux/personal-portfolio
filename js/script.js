/**
 * ============================================================================
 * Gayathri C - Software Developer Portfolio Scripts
 * Bento Grid UI (DevBen Style)
 * Vanilla JavaScript (ES6+) - Zero dependencies
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Project Detail Data from Resume
  // --------------------------------------------------------------------------
  const projectDetails = {
    skillgap: {
      title: 'Employment Outcome & Skill Gap Tracking Platform',
      category: 'Career Analytics • Skill Matching • Python • SQLite',
      image: 'assets/images/project-skill-gap.svg',
      problem: 'Graduating IT students and early-career software developers often struggle to identify the exact technical competencies and framework proficiencies required by tech recruiters, leading to misaligned interview preparation and missed opportunities.',
      solution: 'Architected a comprehensive platform that benchmarks individual developer skills against live industry job specifications. The system calculates competency match percentages, detects specific skill gaps, recommends targeted certification tracks (MongoDB, Microsoft, IBM), and tracks post-training employment placement outcomes.',
      techStack: ['Python', 'HTML5 & CSS3', 'SQLite Database', 'Competency Gap Analytics', 'Placement Tracking Engine'],
      repoUrl: 'https://github.com/GAYATHRI-C-ux'
    },
    mongoai: {
      title: 'AI-Powered Applications with MongoDB (Vector Search & RAG)',
      category: 'AI Vector Search • RAG Architecture • MongoDB Atlas • AI Agents',
      image: 'assets/images/project-mongodb-ai.svg',
      problem: 'Traditional keyword search engines fail to understand semantic developer intent, while standalone LLMs without knowledge grounding frequently hallucinate outdated or incorrect domain data.',
      solution: 'Engineered an end-to-end intelligent application leveraging MongoDB Atlas Vector Search and Retrieval-Augmented Generation (RAG). Queries are converted into high-dimensional vector embeddings, matched via cosine similarity against indexed document collections, and routed into an AI agent loop for grounded, hallucination-free decision making.',
      techStack: ['MongoDB Atlas', 'Vector Search Indexing', 'RAG Pipeline', 'Python', 'AI Agents', 'Embeddings API'],
      repoUrl: 'https://github.com/GAYATHRI-C-ux'
    },
    ecom: {
      title: 'Modern Web & E-Commerce Storefront',
      category: 'Web Application • HTML5 • CSS3 Grid • JavaScript (ES6+)',
      image: 'assets/images/project-ecommerce.svg',
      problem: 'Many e-commerce templates rely on bulky external libraries and complex frameworks, which slows down initial page load times and complicates lightweight product catalog management.',
      solution: 'Developed a high-performance web storefront built entirely with semantic HTML5, modern CSS Grid, and vanilla JavaScript (ES6+). Features interactive product catalog filtering, real-time cart persistence via browser LocalStorage, coupon code verification, and a responsive multi-step checkout simulation.',
      techStack: ['HTML5 Semantic Markup', 'CSS3 Grid & Flexbox', 'Vanilla JavaScript (ES6+)', 'Browser LocalStorage API'],
      repoUrl: 'https://github.com/GAYATHRI-C-ux'
    }
  };

  // --------------------------------------------------------------------------
  // 2. DOM Ready Initialization
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initDynamicYear();
    initSliderMenu();
    initProjectSlider();
    initContactModal();
    initProjectModal();
    initContactForm();
  });

  // --------------------------------------------------------------------------
  // 3. Dynamic Copyright Year
  // --------------------------------------------------------------------------
  function initDynamicYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  // --------------------------------------------------------------------------
  // 4. Off-Canvas Slide-Over Drawer Menu (Slider Menu)
  // --------------------------------------------------------------------------
  function initSliderMenu() {
    const toggleBtn = document.getElementById('slider-menu-toggle');
    const backdrop = document.getElementById('slider-drawer-backdrop');
    const closeBtn = document.getElementById('slider-close-btn');
    const drawerLinks = document.querySelectorAll('.slider-nav-link');

    if (!toggleBtn || !backdrop || !closeBtn) return;

    const openDrawer = () => {
      backdrop.classList.add('is-open');
      backdrop.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };

    const closeDrawer = () => {
      backdrop.classList.remove('is-open');
      backdrop.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggleBtn.focus();
    };

    toggleBtn.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);

    // Close when clicking directly on backdrop
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeDrawer();
    });

    // Close on any navigation link click
    drawerLinks.forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. Interactive Project Carousel Slider
  // --------------------------------------------------------------------------
  function initProjectSlider() {
    const slides = document.querySelectorAll('.project-slide-item');
    const prevBtn = document.getElementById('slider-prev-btn');
    const nextBtn = document.getElementById('slider-next-btn');
    const counterEl = document.getElementById('slider-counter');
    const badgeEl = document.getElementById('slider-badge');
    const titleEl = document.getElementById('slider-info-title');
    const descEl = document.getElementById('slider-info-desc');
    const tagsEl = document.getElementById('slider-info-tags');
    const viewBtn = document.getElementById('slider-info-view-btn');

    if (!slides.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    const updateSlider = (index) => {
      // Loop around
      if (index < 0) {
        currentIndex = slides.length - 1;
      } else if (index >= slides.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      // Update active slide class
      slides.forEach((slide, idx) => {
        if (idx === currentIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      const activeSlide = slides[currentIndex];
      const badge = activeSlide.getAttribute('data-badge') || 'PROJECT';
      const title = activeSlide.getAttribute('data-title') || '';
      const desc = activeSlide.getAttribute('data-desc') || '';
      const tags = (activeSlide.getAttribute('data-tags') || '').split(',');
      const projectId = activeSlide.getAttribute('data-id') || 'skillgap';

      // Update text & counter
      if (counterEl) {
        counterEl.textContent = `0${currentIndex + 1} / 0${slides.length}`;
      }
      if (badgeEl) {
        badgeEl.textContent = badge;
      }
      if (titleEl) {
        titleEl.textContent = title;
      }
      if (descEl) {
        descEl.textContent = desc;
      }
      if (tagsEl) {
        tagsEl.innerHTML = tags
          .map((t) => `<span class="tag-pill">${escapeHtml(t.trim())}</span>`)
          .join('');
      }
      if (viewBtn) {
        viewBtn.setAttribute('data-modal', projectId);
      }
    };

    prevBtn.addEventListener('click', () => {
      updateSlider(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
      updateSlider(currentIndex + 1);
    });

    // Touch swipe support on project slides
    const viewport = document.getElementById('project-slides-viewport');
    if (viewport) {
      let touchStartX = 0;
      let touchEndX = 0;

      viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 45) {
          updateSlider(currentIndex + 1); // Swipe left -> next
        } else if (touchEndX - touchStartX > 45) {
          updateSlider(currentIndex - 1); // Swipe right -> prev
        }
      }, { passive: true });
    }
  }

  // --------------------------------------------------------------------------
  // 6. Contact Form Modal
  // --------------------------------------------------------------------------
  function initContactModal() {
    const modal = document.getElementById('contact-modal');
    const openBtn = document.getElementById('btn-open-contact-modal');
    const closeBtn = document.getElementById('contact-modal-close');

    if (!modal || !closeBtn) return;

    const openModal = (e) => {
      if (e) e.preventDefault();
      modal.classList.add('is-active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const firstInput = modal.querySelector('input');
      if (firstInput) firstInput.focus();
    };

    const closeModal = () => {
      modal.classList.remove('is-active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (openBtn) openBtn.focus();
    };

    if (openBtn) {
      openBtn.addEventListener('click', openModal);
    }

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        closeModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. Project Detail Modal
  // --------------------------------------------------------------------------
  function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('project-modal-content');
    const closeBtn = document.getElementById('project-modal-close');

    if (!modal || !content || !closeBtn) return;

    const openProject = (projectId) => {
      const data = projectDetails[projectId];
      if (!data) return;

      const techBadges = data.techStack
        .map((t) => `<span class="tag-pill" style="font-size: 0.75rem; padding: 0.25rem 0.65rem; margin-right: 0.35rem; margin-bottom: 0.35rem; display: inline-block;">${escapeHtml(t)}</span>`)
        .join('');

      content.innerHTML = `
        <img src="${data.image}" alt="${escapeHtml(data.title)}" style="width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 1.25rem; border: 1px solid var(--border-subtle);">
        
        <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-gold); display: block; margin-bottom: 0.4rem; letter-spacing: 0.05em;">
          ${escapeHtml(data.category)}
        </span>

        <h3 style="font-size: 1.65rem; margin-bottom: 1rem; color: var(--text-title); line-height: 1.25;">
          ${escapeHtml(data.title)}
        </h3>

        <div style="margin-bottom: 1rem;">
          <strong style="display: block; font-size: 0.8125rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.3rem; letter-spacing: 0.04em;">Problem Being Solved:</strong>
          <p style="font-size: 0.9375rem; line-height: 1.6; color: var(--text-body);">${escapeHtml(data.problem)}</p>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <strong style="display: block; font-size: 0.8125rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.3rem; letter-spacing: 0.04em;">Implementation &amp; Solution:</strong>
          <p style="font-size: 0.9375rem; line-height: 1.6; color: var(--text-body);">${escapeHtml(data.solution)}</p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <strong style="display: block; font-size: 0.8125rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem; letter-spacing: 0.04em;">Technologies Used:</strong>
          <div style="display: flex; flex-wrap: wrap;">${techBadges}</div>
        </div>

        <div style="display: flex; gap: 0.75rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle);">
          <a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-message-launch" style="width: auto; padding: 0.65rem 1.25rem; font-size: 0.8125rem;">
            <span>View on GitHub</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      `;

      modal.classList.add('is-active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };

    const closeProject = () => {
      modal.classList.remove('is-active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    // Event delegation for any button with data-modal
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-modal]');
      if (btn) {
        e.preventDefault();
        const id = btn.getAttribute('data-modal');
        openProject(id);
      }
    });

    closeBtn.addEventListener('click', closeProject);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProject();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        closeProject();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. Contact Form Validation & Mailto
  // --------------------------------------------------------------------------
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const msgInput = document.getElementById('contact-msg');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !msgInput.value.trim()) {
        showToast('Please fill in all required fields.');
        return;
      }

      const recipient = 'cgayathri286@gmail.com';
      const subject = encodeURIComponent(`[Portfolio Inquiry] ${subjectInput.value} - ${nameInput.value.trim()}`);
      const body = encodeURIComponent(
        `Hello Gayathri,\n\nMy name is ${nameInput.value.trim()} (${emailInput.value.trim()}).\n\nTopic: ${subjectInput.value}\n\nMessage:\n${msgInput.value.trim()}\n\nLooking forward to speaking with you.`
      );

      showToast('Opening your email client to send...');
      setTimeout(() => {
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      }, 350);
    });
  }

  // --------------------------------------------------------------------------
  // 9. Toast Helper
  // --------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.add('is-visible');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3200);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();
