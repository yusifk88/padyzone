import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
    timezones: '++id, timezone,city, people',
});
