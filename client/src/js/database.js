import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// GIVEN: export const putDb = async (content) => console.error('putDb not implemented');
// DONE: Add logic to a method that accepts some content and adds it to the database
// REF: 19.3.24 - IndexedDB CRUD
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ content: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// DONE: Add logic for a method that gets all the content from the database
// GIVEN: export const getDb = async () => console.error('getDb not implemented');
// REF: 19.3.24 - IndexedDB CRUD
export const getDb = async () => {
  console.log('GET all from the database');
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
