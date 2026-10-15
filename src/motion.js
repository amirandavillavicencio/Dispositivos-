import { animate, stagger, inView } from 'motion';

const preference = matchMedia('(prefers-reduced-motion: reduce)');
export const reduced = () => preference.matches;
const ease = [0.22, 1, 0.36, 1];
const active = new Set();
function run(target, frames, options = {}) {
  const control = animate(target, frames, { duration: reduced() ? 0 : .28, ease, ...options });
  active.add(control);
  control.then(() => active.delete(control));
  return control;
}
preference.addEventListener('change', () => {
  active.forEach(control => control.complete());
  active.clear();
});
export function animateProgress(step) {
  if (reduced()) { document.getElementById('progressFill').style.transform = `scaleX(${step / 4})`; return; }
  run('#progressFill', { scaleX: step / 4 });
}
export function enter(container) {
  if (reduced()) return;
  const cards = [...container.querySelectorAll('.campus-btn,.subject-btn,.device-btn,.result')];
  if (cards.length) run(cards, { opacity: [0, 1], y: [12, 0] }, { duration: .26, delay: stagger(Math.min(.045, .18 / cards.length)) });
  const selected = container.querySelector('[aria-pressed="true"]');
  if (selected) run(selected, { scale: [.96, 1] });
}
let previousStep = 1;
let generation = 0;
export function transition(stage, render, step) {
  const serial = ++generation;
  stage.querySelectorAll('.outgoing').forEach(el => el.remove());
  const old = stage.querySelector('.stage-inner');
  const direction = step >= previousStep ? 1 : -1;
  previousStep = step;
  render();
  const current = stage.querySelector('.stage-inner');
  if (!reduced()) {
    if (old) {
      old.classList.add('outgoing');
      old.inert = true;
      old.setAttribute('aria-hidden', 'true');
      old.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
      stage.append(old);
      run(old, { opacity: [1, 0], x: [0, -12 * direction] }, { duration: .14 }).then(() => old.remove());
    }
    run(current, { opacity: [0, 1], x: [20 * direction, 0] }, { duration: .28 });
    enter(current);
  }
  current.querySelector('h2')?.focus({ preventScroll: true });
  const finder = document.getElementById('buscador');
  if (finder.getBoundingClientRect().top < 0 || finder.getBoundingClientRect().top > innerHeight / 3) {
    finder.scrollIntoView({ behavior: reduced() ? 'instant' : 'smooth', block: 'start' });
  }
  requestAnimationFrame(() => { if (generation === serial) stage.removeAttribute('aria-busy'); });
}

export function setupMotion() {
  if (!reduced()) {
    run('h1 .line', { opacity: [0, 1], y: [20, 0] }, { duration: .48, delay: stagger(.08) });
    run('.mini-tile', { y: [0, -6, 0] }, { duration: 3.2, delay: stagger(.12) });
  }
  inView('.reveal', element => {
    if (!reduced()) run(element, { opacity: [0, 1], y: [18, 0] }, { duration: .4 });
  }, { amount: .12 });
  const press = event => {
    const target = event.target.closest('button,a.email-cta');
    if (target && !reduced()) run(target, { scale: .97 }, { duration: .09 });
  };
  const release = () => {
    if (!reduced()) document.querySelectorAll('button,a.email-cta').forEach(target => {
      if (target.style.transform) run(target, { scale: 1 }, { duration: .18 });
    });
  };
  document.addEventListener('pointerdown', press);
  document.addEventListener('pointerup', release);
  document.addEventListener('pointercancel', release);
  document.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') press(event); });
  document.addEventListener('keyup', release);
}
