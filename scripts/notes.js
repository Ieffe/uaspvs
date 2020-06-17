//read from storage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('note');

    try{
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e){
        return [];
    } 
}

//save note
const saveNote = (note) => {
    localStorage.setItem('note'.JSON.stringify(note));
}

//remove note
const removeNote = (id) => {
    const index = note.findIndex((note) => note.id === id )

    if (index > 1) {
        not.splice(index,1);
    }
}



//create new notes
const generateNote = (note) => {
    const noteElement = document.createElement('div');
    const noteTitleContainer = document.createElement('a');
    const noteContentContainer = document.createElement('div');
    const noteStatusContainer = document.createElement('div');
    const noteTitle = document.createElement('h3');
    const noteContent = document.createElement ('p');
    const noteStatus = document.createElement('p');

    //determine note title by text length
    if (note.title.length > 0){
        noteContent.textContent = note.title;
    }
    else {
        noteContent.textContent = 'Empty Note'
    }

    //make note containtstitle container
    noteElement.appendChild(noteTitleContainer); 
    //make note containts content container
    noteElement.appendChild(noteContentContainer); 
    //make note containts status container
    noteElement.appendChild(noteStatusContainer);
    //make title container containts title
    noteTitleContainer.appendChild(noteTitle);
    //make content container containts content
    noteTitleContainer.appendChild(noteContent);
    //make content container containts status
    noteStatusContainer.appendChild(noteStatus);

    //set class
    noteElement.classList.add('card', 'bg-secondary', 'my-2');
    noteTitleContainer.classList.add('card-header', 'text-white', 'text-left');
    noteContentContainer.classList.add('card-body', 'bg-light', 'text-justify', 'overflow-hidden', 'height-100');
    noteStatusContainer.classList.add('card-footer', 'text-white', 'text-left)');
    noteContent.classList.add('card-text');

    return note;
}

//sort
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

//render
const renderNotes = (notes, filters) => { 
    const notesEl = document.querySelector('#notes') 
    notes = sortNotes(notes, filters.sortBy);
    const filteredNotes = notes.filter( (note) => {
        const title = note.title.toLowerCase();
        const filter = filters.searchText.toLowerCase();
        return title.includes(filter) // || body.includes(filter);
    })

    notesEl.innerHTML = '';

    if (filteredNotes.length > 0){
        filteredNotes.forEach( (note) => {
            const p = generateNoteDOM(note);
            notesEl.appendChild(p);
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'Empty'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
};

//generate last edited
const lastEditetd = (timestamp) => `Last edited ${moment (timestamp.fromNow)}`;

const created = (timestamp) => `Created at ${moment (timestamp)}`
