import { useState } from 'react';
import styles from './styles.module.css';
import { Battle, StartMenu } from 'components';

export const App = () => {
  const [mode, setMode] = useState('start');

  return (
    <div className={styles.main}>
      {mode === 'start' && (
        <StartMenu onStartClick={() => setMode('battle')} />
      )}
      {mode === 'battle' && <Battle />}
      {mode === 'gameOver' && <>Game Over</>}
    </div>
  );
};
