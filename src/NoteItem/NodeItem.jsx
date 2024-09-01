import styles from './NoteItem.module.css';
import PropTypes from 'prop-types';

NoteItem.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

function NoteItem({ note }) {
  return (
    <div className={styles.note}>
      <h3 className={styles.title}>Title: {note.title}</h3>
      <div>
      <p className={styles.text}>Text: {note.text}</p>
      </div>
    </div>
  );
}

export default NoteItem;
