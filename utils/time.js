export function formatMessageDate(timestamp) {
    const date = timestamp.toDate();
    const now = new Date();
  
    const isToday = date.toDateString() === now.toDateString();
  
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);
  
    if (date > oneWeekAgo) {
      return date.toLocaleDateString('fr-FR', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    }
  }
  