import { PlayerSummary } from 'components/PlayerSummary';
import styles from './styles.module.css';
import { opponentStats, playerStats } from 'shared/characters';

export const Battle = () => {

  const [opponentHealth, setOpponnentHealth] = useState(opponentStats.maxHealth);
  const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth);

  return (
    <div className={styles.main}>
      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary
            health={opponentStats.health}
            name={opponentStats.name}
            health={opponentStats.heal}
            health={opponentStats.health}
          />
        </div>
      </div>

      <div className={styles.user}>
        <div className={styles.summary}>
          <PlayerSummary main />
        </div>
      </div>
    </div>
  );
};
