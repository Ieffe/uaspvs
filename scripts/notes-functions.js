// 'use strict'

// Read exisiting notes from local storage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes');

    try{
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e){
        return [];
    }   
}

// Save notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
}
//remove notes by id
const removeNote = (id) => {
    const index = notes.findIndex((note) => note.id === id)

    if (index > -1) {
        notes.splice(index,1);
    }
}

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {

    const noteElement = document.createElement('div');
    const noteTitleContainer = document.createElement('a');
    const noteContentContainer = document.createElement('div');
    const noteStatusContainer = document.createElement('div');
    const noteTitle = document.createElement('h3');
    const noteContent = document.createElement ('p');
    const noteStatus = document.createElement('small');

    // Setup the note title text
    if (note.title.length > 0){
        noteTitle.textContent = note.title;
    } else {
        noteTitle.textContent = 'Unnamed note';
    }

    //append title inside link
    noteTitleContainer.appendChild(noteTitle);

    //Setup the link
    noteTitleContainer.setAttribute('href', `./edit.html#${note.id}`);
    noteTitleContainer.classList.add('card-header', 'text-white', 'text-left');
    
    //setup body
    noteContentContainer.appendChild(noteContent);

    //Setup the status message
    noteStatus.textContent = generateLastEdited(note.updatedAt);
    noteStatus.classList.add();
    noteStatusContainer.appendChild(noteStatus);
    noteElement.appendChild(noteTitleContainer);
    noteElement.appendChild(noteContentContainer);
    noteElement.appendChild(noteStatusContainer);

    //apply styles
    noteElement.classList.add('card', 'bg-secondary', 'my-2');
    noteStatusContainer.classList.add('card-footer', 'text-white', 'text-right');
    noteContentContainer.classList.add('card-body', 'bg-light', 'text-justify', 'overflow-hidden', 'height-100');
    noteContent.classList.add('card-text');

    //insert 
    noteContent.innerHTML = `${note.body}`

    return noteElement;
}

const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited'){
        return notes.sort((a,b) => {
            if (a.updatedAt > b.updatedAt){
                return -1;
            } else if (a.updatedAt < b.updatedAt){
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort( (a,b) => {
            if (a.createdAt > b.createdAt){
                return -1;
            } else if (a.createdAt < b.createdAt){
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'alphabetical'){
        return notes.sort( (a,b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()){
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()){
                return 1;
            } else {
                return 0;
            }
        })
    } else {
        return notes;
    }
}

// Render application notes
const renderNotes = (notes, filters) => { 
    const notesEl = document.querySelector('#notes') 
    notes = sortNotes(notes, filters.sortBy);
    const filteredNotes = notes.filter( (note) => {
        const title = note.title.toLowerCase();
        const filter = filters.searchText.toLowerCase();
        return title.includes(filter); //|| body.includes(filter);
    })

    notesEl.innerHTML = '';

    if (filteredNotes.length > 0){
        filteredNotes.forEach( (note) => {
            const p = generateNoteDOM(note);
            notesEl.appendChild(p);
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No Notes Available'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
};

// Generate the last edited message
const generateLastEdited = (timestamp) => `Last Updated at ${moment(timestamp).format("dddd, D MMMM YYYY [at] HH.mm")}`;