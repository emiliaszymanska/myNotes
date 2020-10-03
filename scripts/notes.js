let noteNumber = 0;
const addButton = document.querySelector('.add-note');

(() => {
    getData();
    window.setInterval(saveData, 5 * 1000);
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

        clonedTemplate.querySelector('button.button-delete').addEventListener('click', function () {
            localStorage.removeItem('id_' + noteNumber);
            this.closest('div.note').remove();
        });

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

function getData() {
    for (let i = 0; i < localStorage.length; i++) {
        let noteKey = localStorage.key(i);

        if (noteKey.includes('id_')) {
            let note = JSON.parse(localStorage.getItem(noteKey));
            let title = note.title;
            let content = note.content;

            addNote(title, content);
        }
    }
}
