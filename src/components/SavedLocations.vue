<template>
  <aside class="panel saved-panel">
    <div class="saved-panel__header">
      <div>
        <h2 class="panel-title">Saved locations</h2>
        <p class="panel-subtitle">Save up to 8 locations for quick weather checks.</p>
      </div>
      <button class="save-btn" @click="saveCurrentLocation">Save current</button>
    </div>

    <ul v-if="savedLocations.length" class="saved-list">
      <li v-for="location in savedLocations" :key="location">
        <button class="location-link" @click="loadSavedLocation(location)">{{ location }}</button>
        <button class="delete-btn" :aria-label="`Remove ${location}`" @click="removeSavedLocation(location)">×</button>
      </li>
    </ul>

    <p v-else class="panel-subtitle empty-copy">No saved locations yet.</p>
  </aside>
</template>

<script>
import { useWeatherStore } from '../store/weatherStore'

export default {
  name: 'SavedLocations',
  computed: {
    savedLocations() {
      return useWeatherStore().state.savedLocations
    }
  },
  methods: {
    saveCurrentLocation() {
      useWeatherStore().saveCurrentLocation()
    },
    async loadSavedLocation(location) {
      await useWeatherStore().loadSavedLocation(location)
    },
    removeSavedLocation(location) {
      useWeatherStore().removeSavedLocation(location)
    }
  }
}
</script>

<style scoped>
.saved-panel {
  padding: 1.25rem;
}

.saved-panel__header {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: flex-start;
}

.save-btn,
.location-link,
.delete-btn {
  font: inherit;
}

.save-btn {
  border: 0;
  background: rgba(109, 74, 255, 0.12);
  color: var(--accent-dark);
  padding: 0.75rem 1rem;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
}

.saved-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: grid;
  gap: 0.6rem;
}

.saved-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 14px;
  padding: 0.65rem;
  border: 1px solid var(--border);
}

.location-link {
  border: 0;
  background: transparent;
  color: var(--text-main);
  text-align: left;
  cursor: pointer;
  flex: 1;
}

.delete-btn {
  border: 0;
  background: #ffe4e8;
  color: #b42318;
  border-radius: 999px;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
}

.empty-copy {
  margin-top: 1rem;
}
</style>
