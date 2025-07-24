import type { Note } from '@/interfaces/note.model'
import { reactive } from 'vue'

export const store = reactive({
  notes: [] as Note[],

  addNote(): void {
    this.notes.push({
      id: crypto.randomUUID(),
      title: 'Note Title',
      content: 'Note Content',
    })
    console.log(this.notes)
  },
  deleteNote(id: string): void {
    this.notes = this.notes.filter((note) => note.id !== id)
  },
})
