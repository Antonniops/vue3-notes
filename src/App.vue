<script setup lang="ts">
import { IconField, InputIcon, InputText } from 'primevue'
import { computed, ref } from 'vue'
import vNote from './components/Note.vue'
import { useNotesStore } from './store/store'

const search = ref('')
const isDarkMode = ref(false)
const { notes, addNote, deleteNote } = useNotesStore()

function toggleDarkMode() {
  document.documentElement.classList.toggle('my-app-dark')
  isDarkMode.value = !isDarkMode.value
}

const filteredNotes = computed(() => {
  console.log('notes.value:', notes.value)
  console.log('type:', typeof notes.value)

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
  </nav>

  <div>
    <i
      class="pi pi-sun text-amber-300 hover:text-amber-200 cursor-pointer hover:ring-amber-200 fixed top-7 right-7"
      style="font-size: 1.5rem"
      @click="toggleDarkMode()"
      v-if="!isDarkMode"
    />
    <i
      class="pi pi-moon text-gray-300 hover:text-gray-200 cursor-pointer fixed top-7 right-7"
      style="font-size: 1.5rem"
      @click="toggleDarkMode()"
      v-if="isDarkMode"
    />
  </div>
  <i
    class="pi pi-plus text-green-400 p-2 hover:text-green-300 hover:cursor-pointer hover:ring hover:ring-green-200 rounded-full fixed bottom-7 right-7"
    style="font-size: 1.5rem"
    @click="addNote()"
  />

  <ul class="flex flex-row flex-wrap justify-center sm:gap-2 mt-5">
    <li class="list-none w-1/2 sm:w-60 md:w-70" v-for="note in filteredNotes" :key="note.id">
      <vNote :note="note" @delete="deleteNote(note.id)" />
    </li>
  </ul>

  <RouterView />
</template>
