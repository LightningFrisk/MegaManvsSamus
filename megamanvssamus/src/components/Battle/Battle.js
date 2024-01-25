import { PlayerSummary, BattleMenu } from 'components';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { opponentStats, playerStats } from 'shared/characters';

export const Battle = () => {
  const [opponentHealth, setOpponnentHealth] = useState(
    opponentStats.maxHealth,
  );
  const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth);

  return (
    <>
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

      <div className={styles.characters}>
        <div className={styles.gameHeader}>
          {playerStats.name} vs {opponentStats.name}
        </div>
        <div className={styles.gameImages}>
          <div className={styles.playerSprite}>
            <img
              alt={playerStats.name}
              //className={styles.}
              src={playerStats.img}
            />
          </div>
          <div className={styles.opponentSprite}>
            <img
              alt={opponentStats.name}
              //className={styles.}
              src={opponentStats.img}
            />
          </div>
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

        <div className={styles.hud}>
          <div className={styles.hudChild}>
            <BattleMenu
              onAttack={() => console.log('Attack')}
              onHeal={() => console.log('Heal')}
              onMagic={() => console.log('Magic')}
            />
          </div>
        </div>
      </div>
    </>
  );
};
