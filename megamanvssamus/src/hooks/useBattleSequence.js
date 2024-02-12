import { useEffect, useState } from 'react';
import {
  attack,
  heal,
  magic,
  opponentStats,
  playerStats,
  wait,
} from 'shared';

export const useBattleSequence = sequence => {
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(
    opponentStats.maxHealth,
  );
  const [announcerMessage, setAnnouncerMessage] = useState('');
  const [playerAnimation, setPlayerAnimation] = useState('static');
  const [opponentAnimation, setOpponentAnimation] = useState('static');

  useEffect(() => {
    const { mode, turn } = sequence;

    if (mode) {
      const attacker = turn === 0 ? playerStats : opponentStats;
      const receiver = turn === 0 ? opponentStats : playerStats;

      switch (mode) {
        case 'attack': {
          const damage = attack({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has chosen to attack!`);

            await wait(1000);

            turn === 0
              ? setPlayerAnimation('attack')
              : setOpponentAnimation('attack');
            await wait(100); //attack happens

            turn === 0
              ? setPlayerAnimation('static')
              : setOpponentAnimation('static');
            await wait(500); //stop attack animation for attacker

            turn === 0
              ? setOpponentAnimation('damage')
              : setPlayerAnimation('damage');
            await wait(750); //damage anim for defender

            turn === 0
              ? setOpponentAnimation('static')
              : setPlayerAnimation('static'); //stop damage anim

            setAnnouncerMessage(`${receiver.name} felt that!`);

            turn === 0
              ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              : setPlayerHealth(h => (h - damage > 0 ? h - damage : 0));
            //for state, does damage if the result would be greater than 0, otherwise if it is 0 we return exactly zero, avoids negative numbers
            await wait(2000);

            setAnnouncerMessage(`Now it is ${receiver.name}'s turn!`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0); //if turn is 0, set 1, otherwise set to 0
            //I hate this notation tbh but i need to get used to it
            setInSequence(false);
          })();

          break;
        }

        case 'magic': {
          const damage = magic({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has cast a spell!`);

            await wait(1000);

            turn === 0
              ? setPlayerAnimation('magic')
              : setOpponentAnimation('magic');
            await wait(100); //attack happens

            turn === 0
              ? setPlayerAnimation('static')
              : setOpponentAnimation('static');
            await wait(500); //stop attack animation for attacker

            turn === 0
              ? setOpponentAnimation('damage')
              : setPlayerAnimation('damage');
            await wait(750); //damage anim for defender

            turn === 0
              ? setOpponentAnimation('static')
              : setPlayerAnimation('static'); //stop damage anim

            setAnnouncerMessage(
              `${receiver.name} doesn't know what hit them!`,
            );

            turn === 0
              ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              : setPlayerHealth(h => (h - damage > 0 ? h - damage : 0));
            //for state, does damage if the result would be greater than 0, otherwise if it is 0 we return exactly zero, avoids negative numbers
            await wait(2000);

            setAnnouncerMessage(`Now it is ${receiver.name}'s turn!`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0); //if turn is 0, set 1, otherwise set to 0
            //I hate this notation tbh but i need to get used to it
            setInSequence(false);
          })();

          break;
        }

        case 'heal': {
          const recovered = heal({ receiver: attacker });

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has chosen to heal!`);
            await wait(1000);

            turn === 0
              ? setPlayerAnimation('magic')
              : setOpponentAnimation('magic');
            await wait(1000);

            turn === 0
              ? setPlayerAnimation('static')
              : setOpponentAnimation('static');
            await wait(500);

            setAnnouncerMessage(`${attacker.name} has recovered health.`);

            turn === 0
              ? setPlayerHealth(h =>
                  h + recovered <= attacker.maxHealth
                    ? h + recovered
                    : attacker.maxHealth,
                ) //if below max health, heal amount, otherwise set to max health instead
              : setOpponentHealth(h =>
                  h + recovered <= attacker.maxHealth
                    ? h + recovered
                    : attacker.maxHealth,
                );
            await wait(2500);

            setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        default:
          break;
      }
    }
  }, [sequence]);

  return {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    announcerMessage,
    playerAnimation,
    opponentAnimation,
  };
};
