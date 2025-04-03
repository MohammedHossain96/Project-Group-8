interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Array<{
    badgeLevel: number;
    category: string;
  }>;
}

const BadgeModal = ({ isOpen, onClose, badges }: BadgeModalProps) => {
  if (!isOpen) return null;

  const getMedal = (level: number) => {
    switch (level) {
      case 1: return '🥉';
      case 2: return '🥈';
      case 3: return '🥇';
      default: return '⭕';
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Congratulations! 🎉</h3>
        <p>You've earned {badges.length > 1 ? 'new badges' : 'a new badge'}!</p>
        
        {badges.map((badge, index) => (
          <div key={index} className="badge-display" style={{ margin: '10px 0' }}>
            <span className="large-medal">{getMedal(badge.badgeLevel)}</span>
            <p>{badge.category}</p>
          </div>
        ))}
        
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BadgeModal;
