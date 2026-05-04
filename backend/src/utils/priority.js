const getPriorityScore = (notification) => {
  const typeWeight = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  const weight = typeWeight[notification.type] || 0;

  const timeScore = new Date(notification.createdAt).getTime();

  return weight * 1000000000000 + timeScore;
};

const getTopNotifications = (notifications, n = 10) => {
  return notifications
    .filter((n) => !n.isRead)
    .sort((a, b) => getPriorityScore(b) - getPriorityScore(a))
    .slice(0, n);
};

module.exports = { getTopNotifications };