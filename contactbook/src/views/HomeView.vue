<template>
  <div>
    <h1 class="page-title">My Contacts</h1>
    <div class="card">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search contacts by name..." 
        class="search-bar"
      >
      
      <div v-if="filteredContacts.length === 0 && searchQuery" class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No contacts found</h3>
        <p>No contacts match your search criteria.</p>
      </div>
      
      <div v-else-if="filteredContacts.length === 0" class="empty-state">
        <div class="empty-icon">📝</div>
        <h3>No contacts yet</h3>
        <p>Add your first contact to get started!</p>
        <router-link to="/add" class="btn btn-primary">Add Contact</router-link>
      </div>
      
      <div v-else class="contacts-grid">
        <div 
          v-for="contact in filteredContacts" 
          :key="contact.id"
          class="contact-item"
          @click="$router.push('/contact/' + contact.id)"
        >
          <div class="contact-name">
            {{ contact.firstName }} {{ contact.lastName }}
          </div>
          <div class="contact-email">{{ contact.email }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { ContactStore } from '../utils/contactStore'

export default {
  name: 'HomeView',
  setup() {
    const searchQuery = ref('')
    const contacts = ref([])
    
    const loadContacts = () => {
      contacts.value = ContactStore.getContacts()
    }
    
    const sortedContacts = computed(() => {
      return [...contacts.value].sort((a, b) => {
        const lastNameA = a.lastName.toLowerCase()
        const lastNameB = b.lastName.toLowerCase()
        if (lastNameA < lastNameB) return -1
        if (lastNameA > lastNameB) return 1
        
        const firstNameA = a.firstName.toLowerCase()
        const firstNameB = b.firstName.toLowerCase()
        return firstNameA.localeCompare(firstNameB)
      })
    })
    
    const filteredContacts = computed(() => {
      const query = searchQuery.value.toLowerCase().trim()
      if (!query) return sortedContacts.value
      
      return sortedContacts.value.filter(contact => 
        contact.firstName.toLowerCase().includes(query) ||
        contact.lastName.toLowerCase().includes(query)
      )
    })
    
    onMounted(() => {
      loadContacts()
    })
    
    return {
      searchQuery,
      filteredContacts
    }
  }
}
</script>

<style scoped>
.page-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-bar {
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid #e1e5e9;
  border-radius: 50px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.search-bar:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.contacts-grid {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
}

.contact-item {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.contact-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.contact-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.contact-email {
  color: #666;
  font-size: 0.95rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  margin: 0.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .card {
    padding: 1.5rem;
    border-radius: 15px;
  }
}
</style>