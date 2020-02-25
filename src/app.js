const sendForm = document.getElementById('send-form');

sendForm.addEventListener('submit', createNote);


function createNote(e) {
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;

    const notes = {
        name: name,
        date: date,
        description: description
    }

    if(localStorage.getItem('newNote') === null) {
        let newNote = [];
        newNote.push(notes);
        localStorage.setItem('newNote', JSON.stringify(newNote));
    } else {
        let newNote = JSON.parse(localStorage.getItem('newNote'));
        newNote.push(notes);
        localStorage.setItem('newNote', JSON.stringify(newNote));
    }
    
    e.preventDefault();
    sendForm.reset();

    showNote()
}

function showNote() {
    let newNote = JSON.parse(localStorage.getItem('newNote'));
    let noteUi = document.getElementById('note-ui');

    noteUi.innerHTML = '';

    newNote.map(function(element) {
        noteUi.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">${element.date}</p>
                    <p class="card-text">${element.description}</p>

                    <button class="btn btn-danger" onclick="deleteNote('${element.name}')">Delete</button>
                </div>
            </div>
        `;
    })

}

function deleteNote(name) {
    let newNote = JSON.parse(localStorage.getItem('newNote'));

    for(i = 0; i < newNote.length; i++) {
        if(newNote[i].name === name) {
            newNote.splice(i, 1);

            alert('Seguro que desea eliminar la tarea?');
        }

    }

    localStorage.setItem('newNote', JSON.stringify(newNote));
    showNote();
}

showNote();