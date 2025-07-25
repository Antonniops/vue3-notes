// src/stores/useNotesStore.ts
import { ref, watch } from 'vue'
import type { Note } from '@/interfaces/note.model'

// Estado principal (fuera de la función para mantener estado global)
const storedNotes = localStorage.getItem('notes')
const notes = ref<Note[]>(storedNotes ? JSON.parse(storedNotes) : [])

// Guardado automático
watch(
  notes,
  (newNotes) => {
    localStorage.setItem('notes', JSON.stringify(newNotes))
  },
  { deep: true },
)

// Store tipo Pinia
export function useNotesStore() {
  function addNote() {
    notes.value.push({
      id: crypto.randomUUID(),
      title: 'Note Title',
      content: 'Note Content',
    })
  }

  function deleteNote(id: string) {
    notes.value = notes.value.filter((note) => note.id !== id)
  }

  return {
    notes,
    addNote,
    deleteNote,
  }
}
