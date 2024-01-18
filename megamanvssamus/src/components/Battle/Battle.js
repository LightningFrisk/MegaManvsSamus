import { PlayerSummary } from 'components/PlayerSummary';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { opponentStats, playerStats } from 'shared/characters';

export const Battle = () => {
  const [opponentHealth, setOpponnentHealth] = useState(
    opponentStats.maxHealth,
  );
  const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth);

  return (
    <div className={styles.main}>
      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary
            health={opponentHealth}
            name={opponentStats.name}
            maxHealth={opponentStats.maxHealth}
            level={opponentStats.level}
          />
        </div>
      </div>

      <div className={styles.user}>
        <div className={styles.summary}>
          <PlayerSummary
            main={true}
            health={playerHealth}
            name={playerStats.name}
            maxHealth={playerStats.maxHealth}
            level={playerStats.level}
          />
        </div>
      </div>
    </div>
  );
};
