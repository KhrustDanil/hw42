
import styles from './NoteList.module.css';
import PropTypes from 'prop-types';

NoteList.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

function NoteList({ title, children }) {
  return (
    <div className={styles.notes}>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}

export default NoteList;
