import { ref, computed } from 'vue';
import type { ChatSession } from '../api';

export interface SessionGroup {
  key: string;
  label: string;
  items: ChatSession[];
}

export function useSessions() {
  const sessions = ref<ChatSession[]>([]);
  const activeSessionId = ref<number | null>(null);
  const searchKeyword = ref('');

  const filteredSessions = computed(() => {
    if (!searchKeyword.value.trim()) {
      return sessions.value;
    }
    const keyword = searchKeyword.value.toLowerCase();
    return sessions.value.filter(session =>
      session.title.toLowerCase().includes(keyword) ||
      (session.summary && session.summary.toLowerCase().includes(keyword))
    );
  });

  const groupedSessions = computed<SessionGroup[]>(() => {
    const groups: SessionGroup[] = [
      { key: 'today', label: '今天', items: [] },
      { key: 'week', label: '本周', items: [] },
      { key: 'earlier', label: '更早', items: [] }
    ];

    const now = new Date();
    const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const day = (startToday.getDay() + 6) % 7;
    const startWeek = new Date(startToday);
    startWeek.setDate(startToday.getDate() - day);

    filteredSessions.value.forEach(session => {
      const raw = session.lastMessageTime || session.createTime;
      const date = raw ? new Date(raw) : null;

      if (!date || Number.isNaN(date.getTime())) {
        groups[2].items.push(session);
        return;
      }

      if (date >= startToday) {
        groups[0].items.push(session);
      } else if (date >= startWeek) {
        groups[1].items.push(session);
      } else {
        groups[2].items.push(session);
      }
    });

    return groups.filter(group => group.items.length > 0);
  });

  const activeSession = computed(() => {
    if (!activeSessionId.value) return null;
    return sessions.value.find(s => s.id === activeSessionId.value) || null;
  });

  const activeSessionTitle = computed(() => {
    return activeSession.value?.title || 'AI Chat';
  });

  function setSessions(list: ChatSession[]) {
    sessions.value = list;
  }

  function addSession(session: ChatSession) {
    sessions.value = [session, ...sessions.value];
  }

  function removeSession(id: number) {
    sessions.value = sessions.value.filter(s => s.id !== id);
    if (activeSessionId.value === id) {
      activeSessionId.value = null;
    }
  }

  function setActiveSession(id: number | null) {
    activeSessionId.value = id;
  }

  function updateSessionTitle(id: number, title: string) {
    const session = sessions.value.find(s => s.id === id);
    if (session) {
      session.title = title;
    }
  }

  function setSearchKeyword(keyword: string) {
    searchKeyword.value = keyword;
  }

  return {
    sessions,
    activeSessionId,
    searchKeyword,
    filteredSessions,
    groupedSessions,
    activeSession,
    activeSessionTitle,
    setSessions,
    addSession,
    removeSession,
    setActiveSession,
    updateSessionTitle,
    setSearchKeyword
  };
}
