const listeners = {};

export const EventBus = {
  subscribe(event, callback) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(callback);
  },
  unsubscribe(event, callback) {
    if (!listeners[event]) return;
    listeners[event] = listeners[event].filter(cb => cb !== callback);
  },
  publish(event, data) {
    if (!listeners[event]) return;
    listeners[event].forEach(cb => cb(data));
  },
};
