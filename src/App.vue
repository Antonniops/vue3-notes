<script setup lang="ts">
import { IconField, InputIcon, InputText } from 'primevue'
import { computed, ref } from 'vue'
import vNote from './components/Note.vue'
import type { Note } from './interfaces/note.model'

const notes = ref<Note[]>([])
const search = ref('')
const lastId = ref(0)
const isDarkMode = ref(false)

function addNote(): void {
  notes.value.push({
    id: lastId.value,
    title: 'Note Title' + Date.now(),
    content: 'Note Content',
  })

  lastId.value++
}

function deleteNote(id: number): void {
  notes.value = notes.value.filter((note) => note.id !== id)
}

function toggleDarkMode() {
  document.documentElement.classList.toggle('my-app-dark')
  isDarkMode.value = !isDarkMode.value
}

const filteredNotes = computed(() => {
  const query = search.value.toLowerCase()

  return notes.value.filter((note) => {
    return note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)
  })
})
</script>

<template>
  <nav class="flex flex-row justify-between items-center">
    <IconField class="mx-auto">
      <InputIcon class="pi pi-search" />
      <InputText type="text" v-model="search" placeholder="Buscar nota" />
    </IconField>

    <div>
      <i class="pi pi-plus text-amber-400 mr-2" style="font-size: 1.5rem" @click="addNote()" />
      <i
        class="pi pi-sun text-amber-300 hover:text-amber-200 cursor-pointer hover:ring-amber-200"
        style="font-size: 1.5rem"
        @click="toggleDarkMode()"
        v-if="!isDarkMode"
      />
      <i
        class="pi pi-moon text-gray-300 hover:text-gray-200 cursor-pointer"
        style="font-size: 1.5rem"
        @click="toggleDarkMode()"
        v-if="isDarkMode"
      />
    </div>
  </nav>

  <ul class="flex flex-wrap gap-4 mt-5">
    <li class="list-none" v-for="note in filteredNotes" :key="note.id">
      <vNote :note="note" @delete="deleteNote" />
    </li>
  </ul>

  <RouterView />
</template>
