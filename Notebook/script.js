function bindCollapsibleEvents() {
  var coll = document.querySelectorAll(".collapsible");

  coll.forEach(function (item) {
    item.removeEventListener("click", handleCollapsibleClick);
    item.addEventListener("click", handleCollapsibleClick);

    var removeButton = item.parentElement.querySelector('.remove_note');
    if (removeButton) {
      removeButton.removeEventListener('click', handleRemoveNoteClick);
      removeButton.addEventListener('click', handleRemoveNoteClick);
    }

    var changeNameButton = item.parentElement.querySelector('.change_notename');
    if (changeNameButton) {
      changeNameButton.removeEventListener('click', handleChangeNoteNameClick);
      changeNameButton.addEventListener('click', handleChangeNoteNameClick);
    }
  });
}

function handleTextareaChange() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";

  var content = this.closest('.content');
  content.style.maxHeight = content.scrollHeight + "px";

  saveNotesToLocalStorage();
}

function handleCollapsibleClick() {
  this.classList.toggle("active");
  var content = this.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }

  var textarea = content.querySelector('textarea');
  textarea.style.height = "auto";
  textarea.style.height = (textarea.scrollHeight) + "px";

  saveNotesToLocalStorage();
}

function handleRemoveNoteClick(event) {
  var note = this.closest('.note');
  note.remove();

  saveNotesToLocalStorage();
}

function handleChangeNoteNameClick(event) {
  var note = this.closest('.note');
  var collapsibleButton = note.querySelector('.collapsible');
  var newName = prompt('Введіть нову назву нотатки:', collapsibleButton.textContent);

  if (newName !== null) {
    collapsibleButton.textContent = newName;
    note.dataset.noteName = newName;
    saveNotesToLocalStorage();
  }
}

function saveNotesToLocalStorage() {
  var notesContainer = document.getElementById('notesContainer');
  var notes = [];
  var notesList = notesContainer.querySelectorAll('.note');

  notesList.forEach(function (noteElement, index) {
    var noteState = {
      text: noteElement.querySelector('textarea').value,
      active: noteElement.querySelector('.collapsible').classList.contains('active'),
      noteName: noteElement.dataset.noteName || 'Нова нотатка'
    };
    notes.push(noteState);

    if (index === 0) {
      noteElement.querySelector('.collapsible').classList.remove('active');
    }
  });

  localStorage.setItem('notes', JSON.stringify(notes));
}

document.addEventListener("DOMContentLoaded", function () {
  var addButton = document.querySelector('.add_note');
  var notesContainer = document.getElementById('notesContainer');

  addButton.addEventListener('click', function () {
    var newNote = document.createElement('div');
    newNote.classList.add('note');

    var collapsibleButton = document.createElement('button');
    collapsibleButton.setAttribute('type', 'button');
    collapsibleButton.classList.add('collapsible');
    collapsibleButton.textContent = 'Нова нотатка';

    var contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    var form = document.createElement('form');
    form.setAttribute('id', 'paper');
    form.setAttribute('method', 'get');
    form.setAttribute('action', '');

    var textarea = document.createElement('textarea');
    textarea.setAttribute('placeholder', 'Напишіть тут щось.');
    textarea.setAttribute('id', 'text');
    textarea.setAttribute('name', 'text');
    textarea.setAttribute('rows', '4');

    form.appendChild(textarea);
    form.appendChild(document.createElement('br'));
    contentDiv.appendChild(form);

    var removeButton = document.createElement('button');
    removeButton.setAttribute('type', 'button');
    removeButton.classList.add('remove_note');
    removeButton.textContent = 'Видалити нотатку';

    var changeNameButton = document.createElement('button');
    changeNameButton.setAttribute('type', 'button');
    changeNameButton.classList.add('change_notename');
    changeNameButton.textContent = 'Змінити назву';

    contentDiv.appendChild(removeButton);
    contentDiv.appendChild(changeNameButton);

    newNote.appendChild(collapsibleButton);
    newNote.appendChild(contentDiv);

    notesContainer.appendChild(newNote);

    bindCollapsibleEvents();

    textarea.addEventListener('input', handleTextareaChange);
    saveNotesToLocalStorage();
  });

  var storedNotes = localStorage.getItem('notes');

  if (storedNotes) {
    var notes = JSON.parse(storedNotes);

    notes.forEach(function (noteState, index) {
      var newNote = document.createElement('div');
      newNote.classList.add('note');

      var collapsibleButton = document.createElement('button');
      collapsibleButton.setAttribute('type', 'button');
      collapsibleButton.classList.add('collapsible');
      collapsibleButton.textContent = noteState.noteName || 'Нова нотатка';

      if (noteState.active) {
        collapsibleButton.classList.add('active');
      }

      var contentDiv = document.createElement('div');
      contentDiv.classList.add('content');

      var form = document.createElement('form');
      form.setAttribute('id', 'paper');
      form.setAttribute('method', 'get');
      form.setAttribute('action', '');

      var textarea = document.createElement('textarea');
      textarea.setAttribute('placeholder', 'Напишіть тут щось.');
      textarea.setAttribute('id', 'text');
      textarea.setAttribute('name', 'text');
      textarea.setAttribute('rows', '4');
      textarea.value = noteState.text;

      form.appendChild(textarea);
      form.appendChild(document.createElement('br'));
      contentDiv.appendChild(form);

      var removeButton = document.createElement('button');
      removeButton.setAttribute('type', 'button');
      removeButton.classList.add('remove_note');
      removeButton.textContent = 'Видалити нотатку';

      var changeNameButton = document.createElement('button');
      changeNameButton.setAttribute('type', 'button');
      changeNameButton.classList.add('change_notename');
      changeNameButton.textContent = 'Змінити назву';

      contentDiv.appendChild(removeButton);
      contentDiv.appendChild(changeNameButton);

      newNote.appendChild(collapsibleButton);
      newNote.appendChild(contentDiv);

      notesContainer.appendChild(newNote);

      if (index === 0) {
        collapsibleButton.classList.remove('active');
      }

      textarea.addEventListener('input', handleTextareaChange);
    });

    bindCollapsibleEvents();
  }

  // Оновлення localStorage при завантаженні сторінки
  updateLocalStorageOnLoad();
});

// Функція для оновлення localStorage при завантаженні сторінки
function updateLocalStorageOnLoad() {
  saveNotesToLocalStorage();
}
