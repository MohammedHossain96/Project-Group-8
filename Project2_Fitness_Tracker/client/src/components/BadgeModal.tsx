interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badgeLevel: number;
  category: string;
}

const BadgeModal = ({ isOpen, onClose, badgeLevel, category }: BadgeModalProps) => {
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
        <h2>Congratulations! 🎉</h2>
        <p>You've earned a new badge!</p>
        <div className="badge-display">
          <span className="large-medal">{getMedal(badgeLevel)}</span>
          <p>{category}</p>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BadgeModal;
