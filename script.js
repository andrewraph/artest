document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------
     WORLD CLOCKS 
  ------------------------- */

  function formatTime(timeZone, label) {

    const now = new Date();

    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone
    };

    const time = new Intl.DateTimeFormat('en-GB', options).format(now);

    const colonVisible = now.getSeconds() % 2 === 0;

    return `
      <span class="tz-label">${label}</span>
      <span class="tz-time">
        ${time.replace(
          ':',
          `<span class="colon ${colonVisible ? 'on' : ''}">:</span>`
        )}
      </span>
    `;
  }

  function setClock(id, zone, label) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = formatTime(zone, label);
  }

  function updateClocks() {
    setClock('chi', 'America/Chicago', 'CHI');
    setClock('nyc', 'America/New_York', 'NYC');
    setClock('la', 'America/Los_Angeles', 'LA');
    setClock('par', 'Europe/Paris', 'PAR');
    setClock('lon', 'Europe/London', 'LON');
    setClock('mil', 'Europe/Rome', 'MIL');
  }

  updateClocks();
  setInterval(updateClocks, 1000);


  /* -------------------------
     SMOOTH HORIZONTAL SCROLL
  ------------------------- */

  const gallery = document.querySelector('.gallery-track');
  const mq = window.matchMedia('(min-width: 900px)');

  let targetScroll = 0;
  let currentScroll = 0;
  let animationFrame = null;

  const ease = 0.094; // ← adjust this

  function animateScroll() {

    currentScroll += (targetScroll - currentScroll) * ease;

    gallery.scrollLeft = currentScroll;

    animationFrame = requestAnimationFrame(animateScroll);
  }

  function enableDesktopScroll() {

    if (!gallery) return;

    targetScroll = gallery.scrollLeft;
    currentScroll = gallery.scrollLeft;

    window.addEventListener('wheel', onWheel, { passive: false });

    if (!animationFrame) {
      animateScroll();
    }
  }

  function disableDesktopScroll() {

    window.removeEventListener('wheel', onWheel);

    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  }

  function onWheel(e) {

    targetScroll += e.deltaY;

    const maxScroll = gallery.scrollWidth - gallery.clientWidth;

    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

    e.preventDefault();
  }

  function handleModeChange(e) {

    if (e.matches) {
      enableDesktopScroll();
    } else {
      disableDesktopScroll();
    }
  }

  handleModeChange(mq);

  mq.addEventListener('change', handleModeChange);


  /* -------------------------
     ELSEWHERE TOGGLE
  ------------------------- */

  const elsewhereToggle = document.querySelector('.elsewhere-toggle');
  const elsewhereContent = document.querySelector('.elsewhere-content');

  if (elsewhereToggle && elsewhereContent) {

    elsewhereToggle.addEventListener('click', (e) => {

      e.preventDefault();

      elsewhereContent.classList.toggle('open');

    });

  }

});
