import { useAppDispatch, useAppSelector, addNote, clearNotes } from '../store';
import NoteList from '../NoteList/NoteList';
import NoteItem from '../NoteItem/NodeItem';
import styles from './App.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(10, 'Title must be at most 10 characters'),
  text: yup
    .string()
    .required('Text is required')
    .min(5, 'Text must be at least 5 characters')
    .max(50, 'Text must be at most 50 characters'),
});

const App = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes.notes);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(
      addNote({
        title: data.title,
        text: data.text,
      })
    );
    reset();
  };

  const handleClearNotes = () => {
    dispatch(clearNotes());
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Title"
            {...register('title')}
            className={styles.input}
          />
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}
        </div>
        <div>
          <textarea
            placeholder="Text"
            {...register('text')}
            className={styles.text}
          />
          {errors.text && <p className={styles.error}>{errors.text.message}</p>}
        </div>
        <button type="submit" className={styles.button}>
          Add Note
        </button>
      </form>

      <div>
        {notes.length === 0 ? (
          <p className={styles.no_notes}>No notes</p>
        ) : (
          <NoteList title="Notes">
            {notes.map((note, index) => (
              <NoteItem key={index} note={note} index={index} />
            ))}
            <button
              onClick={handleClearNotes}
              className={styles.button_del}
            >
              Delete Notes
            </button>
          </NoteList>
        )}
      </div>
    </div>
  );
};

export default App;
