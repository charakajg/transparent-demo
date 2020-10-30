
const eventManager = {
    eventListeners: {},
    setListener: (event, listener) => {
        eventManager.eventListeners[event] = listener;
    },
    unsetListener: (event) => {
        eventManager.eventListeners[event] = null;
    },
    emitEvent: (event, obj) => {
        const listener = eventManager.eventListeners[event];
        if (listener != null) {
            listener(obj);
        }
    }
}

export default eventManager;