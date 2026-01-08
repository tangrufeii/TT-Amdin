type PluginMessagePayload = {
  pluginId?: string;
  type?: string;
  data?: Record<string, any>;
};

declare global {
  interface Window {
    __ttPluginMessageHandler__?: (event: MessageEvent<PluginMessagePayload>) => void;
  }
}

export function setupPluginMessageBridge() {
  const handlerKey: keyof Window = '__ttPluginMessageHandler__';
  if (window[handlerKey]) {
    return;
  }

  const handler = (event: MessageEvent<PluginMessagePayload>) => {
    const payload = event.data;
    if (!payload || typeof payload !== 'object') return;
    const { pluginId, type, data } = payload;
    if (!pluginId) return;

    const message = typeof data?.message === 'string' ? data.message : JSON.stringify(data || {});
    const title = `[${pluginId}] ${type || 'message'}`;
    console.info('[plugin] message received:', payload);
    window.$notification?.info({
      title,
      content: message,
      duration: 5000
    });
    window.$message?.info(`${title}: ${message}`);
  };

  window.addEventListener('message', handler as EventListener);
  window[handlerKey] = handler;
}
