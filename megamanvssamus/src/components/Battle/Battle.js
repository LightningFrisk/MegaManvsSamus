import { PlayerSummary, BattleMenu, BattleAnnouncer } from 'components';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { opponentStats, playerStats } from 'shared/characters';
import { useBattleSequence } from 'hooks/useBattleSequence';
import { useAIOpponent } from 'hooks';

export const Battle = () => {
  // const [opponentHealth, setOpponnentHealth] = useState(
  //   opponentStats.maxHealth,
  // );
  // const [announcerMessage, setAnnouncerMessage] = useState('');
  // const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth);

  //above is initialized in battlesequence, or should be.

  const [sequence, setSequence] = useState({});

  const {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    announcerMessage,
    playerAnimation,
    opponentAnimation,
  } = useBattleSequence(sequence);

  const aiChoice = useAIOpponent(turn);

  useEffect(() => {
    //this sets the sequence with a random AI choice so the AI will actually do stuff
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aiChoice });
    }
  }, [turn, aiChoice, inSequence]);

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
              className={styles[playerAnimation]}
              src={playerStats.img}
            />
          </div>
          <div className={styles.opponentSprite}>
            <img
              alt={opponentStats.name}
              className={styles[opponentAnimation]} //comes from battlesequence
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
            <BattleAnnouncer
              message={
                announcerMessage || `What will ${playerStats.name} do?`
              }
            />
          </div>

          <div className={styles.hudChild}>
            <BattleMenu
              onAttack={() => setSequence({ turn, mode: 'attack' })}
              onHeal={() => setSequence({ turn, mode: 'heal' })}
              onMagic={() => setSequence({ turn, mode: 'magic' })}
            />
          </div>
        </div>
      </div>
    </>
  );
};
