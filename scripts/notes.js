let noteNumber = 0;
const addButton = document.querySelector('.add-note');

function addNote(title = '', description = '') {
    const addNewNote = function () {
        noteNumber++;

        const template = document.querySelector('#note-template');
        const clonedTemplate = document.importNode(template.content, true);

        clonedTemplate.querySelector('input.note-title').value = title;
        clonedTemplate.querySelector('textarea.note-text').value = description;

        return clonedTemplate;
    }

    const note = addNewNote();
    document.getElementById('notes').appendChild(note);
}

addButton.addEventListener('click', () => addNote())
