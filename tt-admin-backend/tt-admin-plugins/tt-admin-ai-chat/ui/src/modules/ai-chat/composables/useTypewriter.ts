import { ref, onUnmounted } from 'vue';

export interface TypewriterOptions {
  /** 每秒输出字符数 */
  speed?: number;
  /** 标点后暂停时间(ms) - 中文标点 */
  pauseChinese?: number;
  /** 标点后暂停时间(ms) - 英文标点 */
  pauseEnglish?: number;
}

export interface TypewriterState {
  /** 当前显示内容 */
  displayContent: string;
  /** 完整内容 */
  fullContent: string;
  /** 是否正在打字 */
  isTyping: boolean;
}

export function useTypewriter(options: TypewriterOptions = {}) {
  const {
    speed = 70,
    pauseChinese = 160,
    pauseEnglish = 90
  } = options;

  const isTyping = ref(false);
  const displayContent = ref('');
  const fullContent = ref('');
  const messageId = ref<string | null>(null);

  let buffer = '';
  let streamDone = false;
  let typingTimer: number | null = null;
  let rafId: number | null = null;
  let lastTs = 0;
  let pauseUntil = 0;

  function stepTyping(timestamp: number) {
    if (!lastTs) {
      lastTs = timestamp;
    }

    if (pauseUntil && timestamp < pauseUntil) {
      rafId = window.requestAnimationFrame(stepTyping);
      return;
    }

    const delta = timestamp - lastTs;
    lastTs = timestamp;
    let charsToFlush = Math.floor((delta / 1000) * speed);

    if (charsToFlush < 1) {
      rafId = window.requestAnimationFrame(stepTyping);
      return;
    }

    while (charsToFlush > 0 && buffer.length) {
      const nextChar = buffer[0];
      buffer = buffer.slice(1);
      displayContent.value += nextChar;
      charsToFlush -= 1;

      // 中文标点暂停
      if (/[，。！？；：]/.test(nextChar)) {
        pauseUntil = timestamp + pauseChinese;
        break;
      }
      // 英文标点暂停
      if (/[,.!?;:]/.test(nextChar)) {
        pauseUntil = timestamp + pauseEnglish;
        break;
      }
    }

    if (buffer.length || !streamDone) {
      rafId = window.requestAnimationFrame(stepTyping);
      return;
    }

    finalize();
  }

  function finalize() {
    if (buffer.length) return;
    displayContent.value = fullContent.value;
    stop(false);
  }

  function start(id: string, text: string) {
    stop(true);
    messageId.value = id;
    fullContent.value = text || '';
    displayContent.value = '';
    buffer = fullContent.value;
    streamDone = true;
    isTyping.value = true;
    lastTs = 0;
    pauseUntil = 0;

    typingTimer = window.setInterval(() => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(stepTyping);
      }
    }, 16);
  }

  function startStream(id: string) {
    stop(true);
    messageId.value = id;
    fullContent.value = '';
    displayContent.value = '';
    buffer = '';
    streamDone = false;
    isTyping.value = true;
    lastTs = 0;
    pauseUntil = 0;

    typingTimer = window.setInterval(() => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(stepTyping);
      }
    }, 16);
  }

  function enqueue(text: string) {
    if (!text) return;
    buffer += text;
    fullContent.value += text;
  }

  function complete() {
    streamDone = true;
  }

  function stop(reset: boolean) {
    if (typingTimer) {
      window.clearInterval(typingTimer);
      typingTimer = null;
    }
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
    isTyping.value = false;

    if (reset) {
      buffer = '';
      streamDone = false;
      messageId.value = null;
    }
  }

  function isActive(id: string) {
    return isTyping.value && messageId.value === id;
  }

  onUnmounted(() => {
    stop(true);
  });

  return {
    isTyping,
    displayContent,
    fullContent,
    messageId,
    start,
    startStream,
    enqueue,
    complete,
    stop,
    isActive
  };
}
