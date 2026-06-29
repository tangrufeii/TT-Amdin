(function () {
  const config = window.TT_PORTAL_WIDGET_CONFIGS?.music || {};
  const player = document.querySelector('[data-role="music-floating"]');
  if (!player) return;

  const title = player.querySelector('[data-role="title"]');
  const artist = player.querySelector('[data-role="artist"]');
  const toggle = player.querySelector('[data-role="toggle"]');
  const state = player.querySelector('[data-role="state"]');

  if (title) title.textContent = config.title || '音乐歌单';
  if (artist) artist.textContent = `${normalizeServer(config.server)} / ${config.type || 'playlist'}`;

  if (!toggle || !state) return;
  toggle.addEventListener('click', () => {
    const inlinePlayer = document.querySelector('[data-widget-key="music"] .aplayer');
    if (!inlinePlayer) {
      state.textContent = '未就绪';
      return;
    }
    inlinePlayer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const playButton = inlinePlayer.querySelector('.aplayer-button');
    if (playButton) {
      playButton.click();
    }
    state.textContent = state.textContent === '播放' ? '暂停' : '播放';
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

})();
