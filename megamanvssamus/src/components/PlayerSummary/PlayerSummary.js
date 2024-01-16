import { HealthBar } from 'components/HealthBar';
import styles from './styles.module.css';

const red = '#821200';
const blue = '#1953cb';

export const PlayerSummary = ({
  main = false,
  name,
  level,
  health,
  maxHealth,
}) => {
  //if that main is true then render red, if not, blue.
  return (
    <div
      style={{ backgroundColor: main ? red : blue }}
      className={styles.main}
    >
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.level}>LVL: {level}</div>
      </div>
      <div className={styles.health}>
        <HealthBar label="HP" value={health} maxValue={maxHealth} />
      </div>
    </div>
  );
};
// Name, Level, Health Bar of each character
// Conditional Class name, or Styles const for diff users
