let noteNumber = 0;
const addButton = document.querySelector('.add-note');

(() => {
    addButton.addEventListener('click', () => addNote());
}) ();

function addNote(title = '', content = '') {
    const addNewNote = function () {
        noteNumber++;

        const template = document.querySelector('#note-template');
        const clonedTemplate = document.importNode(template.content, true);

        clonedTemplate.querySelector('div.note').setAttribute('id', 'id_' + noteNumber);
        clonedTemplate.querySelector('input.note-title').value = title;
        clonedTemplate.querySelector('textarea.note-text').value = content;

        return clonedTemplate;
    }

    const note = addNewNote();
    document.querySelector('#notes').appendChild(note);
}

function saveData() {
    let notes = document.querySelectorAll('div.note');

    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];

        let noteJSON = {'title': note.querySelector('input.note-title').value,
                        'content': note.querySelector('textarea.note-text').value};

        localStorage.setItem(note.id, JSON.stringify(noteJSON));
    }
}
