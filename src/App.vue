<script setup lang="ts">
import { Button, InputText, Menubar } from 'primevue'
import { computed, ref } from 'vue'
import vNote from './components/Note.vue'
import type { Note } from './interfaces/note.model'

const notes = ref<Note[]>([])
const search = ref('')
const lastId = ref(0)

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
  },
  {
    label: 'Features',
    icon: 'pi pi-star',
  },
  {
    label: 'Projects',
    icon: 'pi pi-search',
    items: [
      {
        label: 'Components',
        icon: 'pi pi-bolt',
      },
      {
        label: 'Blocks',
        icon: 'pi pi-server',
      },
      {
        label: 'UI Kit',
        icon: 'pi pi-pencil',
      },
      {
        label: 'Templates',
        icon: 'pi pi-palette',
        items: [
          {
            label: 'Apollo',
            icon: 'pi pi-palette',
          },
          {
            label: 'Ultima',
            icon: 'pi pi-palette',
          },
        ],
      },
    ],
  },
  {
    label: 'Contact',
    icon: 'pi pi-envelope',
  },
])

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
}

const filteredNotes = computed(() => {
  const query = search.value.toLowerCase()

  return notes.value.filter((note) => {
    return note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)
  })
})
</script>

<template>
  <div class="card">
    <Menubar
      :model="items"
      class="flex"
      :pt="{
        rootList: '!flex-col',
      }"
    />
  </div>

  <div class="card flex justify-center">
    <InputText type="text" v-model="search" />
  </div>

  <ul class="flex flex-wrap gap-4">
    <li class="list-none" v-for="note in filteredNotes" :key="note.id">
      <vNote :note="note" @delete="deleteNote" />
    </li>
  </ul>

  <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />
  <Button label="Save" @click="addNote()" />
  <RouterView />
</template>
