import Realm from 'realm';


const Note = {
    name: 'Note',
    primaryKey: 'id',
    properties: {
        id: 'int',
        title: 'string',
        local: 'string',
        description: 'string',
        date: 'date'
    }
};

const options = {
    schema: [Note]
}
export const insertNote = newNote => new Promise ((resolve, reject)=>{
    Realm.open(options).then(realm => {
        const tmp = realm.objects('Note').sorted('id', true)[0];
        const id = tmp ?  tmp.id + 1 : 1;
        note.id = id;
        note.date = note.date ?? new Date();
        realm.write(() => {
            realm.create('Note', newNote);
            resolve(newNote);
        });
    }).catch((error) => reject(error));
});

export const updateNote = upNote => new Promise ((resolve, reject)=>{
    Realm.open(options).then(realm => {
        realm.write(() => {
            const note = realm.objectForPrimaryKey('Note', upNote.id);
            note.title = upNote.title;
            note.local = upNote.local;
            note.description = upNote.description;
            note.date = upNote.date ?? new Date();
            resolve();
        });
    }).catch((error) => reject(error));
});

export const deleteNote = deleteNote => new Promise ((resolve, reject)=>{
    Realm.open(options).then(realm => {
        realm.write(() => {
            const note = realm.objectForPrimaryKey('Note', deleteNote);
            realm.delete(note);
            resolve();
        });
    }).catch((error) => reject(error));
});

export const readNote = () => new Promise ((resolve, reject)=>{
    Realm.open(options).then(realm => {
        const notes = realm.objects('Note');
        resolve(notes);
    }).catch((error) => reject(error));
});

export const RealmDB = new Realm(options);