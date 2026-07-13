/**
 * Typed cross-component signals coordinating the splash screen and the hero
 * 3D viewer. Replaces the previous stringly-typed contract that lived on the
 * `window` object (`window.__muktaHeroModelReady` / `__muktaSplashComplete`)
 * and untyped DOM events (`"mukta:hero-model-ready"` / `"mukta:splash-complete"`).
 *
 * Both components import this module. Because ES modules are singletons, the
 * signal instances are shared even though the components are dynamically
 * imported. Each signal is a one-way latch: once fired it stays fired, and any
 * subscriber that attaches afterwards can read the current value via `get()`.
 */

type Listener = () => void;

export type LatchSignal = {
  /** Current latched value (false until `notify()` is first called). */
  get: () => boolean;
  /** Latch the signal to true and notify all current subscribers (idempotent). */
  notify: () => void;
  /** Subscribe to the latch firing. Returns an unsubscribe function. */
  subscribe: (listener: Listener) => () => void;
};

function createLatchSignal(): LatchSignal {
  let fired = false;
  const listeners = new Set<Listener>();

  return {
    get: () => fired,
    notify() {
      if (fired) return;
      fired = true;
      listeners.forEach((listener) => listener());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

/** Fired by the hero viewer once its GLB model has loaded. */
export const heroModelReadySignal = createLatchSignal();

/** Fired by the splash screen once it has finished fading out. */
export const splashCompleteSignal = createLatchSignal();
