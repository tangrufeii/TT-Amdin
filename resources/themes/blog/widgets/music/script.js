(function () {
  const config = window.TT_PORTAL_WIDGET_CONFIGS?.music || {};
  const widget = document.querySelector('[data-widget-key="music"]');
  if (!widget) return;

  const title = widget.querySelector('[data-role="title"]');
  const artist = widget.querySelector('[data-role="artist"]');
  const player = widget.querySelector('[data-role="player"]');
  const error = widget.querySelector('[data-role="error"]');

  if (title) title.textContent = config.title || '音乐歌单';
  if (artist) artist.textContent = `${normalizeServer(config.server)} / ${config.type || 'playlist'} / ${config.id || '未配置ID'}`;

  if (!player) return;
  if (!config.id) {
    showError(error, '请先配置音乐平台和歌单 ID');
    return;
  }

  loadMetingAssets()
    .then(() => {
      player.innerHTML = '';
      player.appendChild(createMetingElement(config, { fixed: false, mini: false }));
    })
    .catch(() => {
      showError(error, '音乐播放器资源加载失败，请检查网络或 CDN 配置');
    });

  function normalizeServer(server) {
    const map = {
      netease: '网易云音乐',
      tencent: 'QQ音乐',
      kugou: '酷狗音乐',
      xiami: '虾米音乐',
      baidu: '百度音乐'
    };
    return map[server] || server || '未配置平台';
  }

  function showError(target, message) {
    if (!target) return;
    target.hidden = false;
    target.textContent = message;
  }

  function loadMetingAssets() {
    window.TT_PORTAL_ASSET_PROMISES = window.TT_PORTAL_ASSET_PROMISES || {};
    if (window.TT_PORTAL_ASSET_PROMISES.meting) {
      return window.TT_PORTAL_ASSET_PROMISES.meting;
    }

    window.TT_PORTAL_ASSET_PROMISES.meting = Promise.all([
      loadStyle('https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css'),
      loadScript('https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js'),
      loadScript('https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js')
    ]);
    return window.TT_PORTAL_ASSET_PROMISES.meting;
  }

  function loadStyle(href) {
    if (document.querySelector(`link[href="${href}"]`)) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  function loadScript(src) {
    if (document.querySelector(`script[src="${src}"]`)) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  function createMetingElement(options, override) {
    const element = document.createElement('meting-js');
    const attrs = {
      server: options.server || 'netease',
      type: options.type || 'playlist',
      id: options.id,
      api: options.api || undefined,
      fixed: override.fixed,
      mini: override.mini,
      theme: options.theme || '#27c498',
      autoplay: Boolean(options.autoplay),
      loop: options.loop || 'all',
      order: options.order || 'list',
      preload: options.preload || 'auto',
      volume: options.volume ?? 0.7,
      'list-folded': Boolean(options.listFolded),
      'list-max-height': options.listMaxHeight || '320px'
    };
    Object.entries(attrs).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;
      element.setAttribute(key, String(value));
    });
    return element;
  }
})();
