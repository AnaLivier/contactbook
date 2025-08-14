<template>
  <div v-if="contact" class="card">
    <div class="contact-detail">
      <div class="contact-avatar">
        {{ getInitials(contact.firstName, contact.lastName) }}
      </div>
      <h1 class="detail-name">{{ contact.firstName }} {{ contact.lastName }}</h1>
      
      <div class="detail-info">
        <div class="info-item">
          <div class="info-label">Email</div>
          <div class="info-value">{{ contact.email }}</div>
        </div>
        <div v-if="contact.phone" class="info-item">
          <div class="info-label">Phone</div>
          <div class="info-value">{{ contact.phone }}</div>
        </div>
        <div v-if="contact.company" class="info-item">
          <div class="info-label">Company</div>
          <div class="info-value">{{ contact.company }}</div>
        </div>
        <div v-if="contact.notes" class="info-item">
          <div class="info-label">Notes</div>
          <div class="info-value">{{ contact.notes }}</div>
        </div>
      </div>
      
      <div class="actions">
        <router-link :to="'/edit/' + contact.id" class="btn btn-primary">
          Edit Contact
        </router-link>
        <button @click="deleteContact" class="btn btn-danger">
          Delete Contact
        </button>
        <router-link to="/" class="btn btn-secondary">
          Back to Contacts
        </router-link>
      </div>
    </div>
  </div>
  <div v-else class="card">
    <div class="empty-state">
      <div class="empty-icon">❌</div>
      <h3>Contact not found</h3>
      <p>The requested contact could not be found.</p>
      <router-link to="/" class="btn btn-primary">Back to Contacts</router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ContactStore } from '../utils/contactStore'

export default {
  name: 'ContactDetailView',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const contact = ref(null)
    const router = useRouter()
    
    const loadContact = () => {
      contact.value = ContactStore.getContactById(props.id)
    }
    
    const deleteContact = () => {
      if (confirm('Are you sure you want to delete this contact?')) {
        ContactStore.deleteContact(props.id)
        router.push('/')
      }
    }
    
    const getInitials = (firstName, lastName) => {
      return (firstName?.charAt(0) + lastName?.charAt(0)).toUpperCase()
    }
    
    onMounted(loadContact)
    watch(() => props.id, loadContact)
    
    return {
      contact,
      deleteContact,
      getInitials
    }
  }
}
</script>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.contact-detail {
  text-align: center;
  padding: 2rem;
}

.contact-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  margin: 0 auto 2rem;
  font-weight: 700;
}

.detail-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
}

.detail-info {
  display: grid;
  gap: 1rem;
  max-width: 400px;
  margin: 2rem auto;
  text-align: left;
}

.info-item {
  padding: 1rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

.info-label {
  font-weight: 600;
  color: #667eea;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  color: #333;
  font-size: 1.1rem;
  margin-top: 0.25rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
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

.btn-secondary {
  background: #f8f9fa;
  color: #666;
  border: 2px solid #e1e5e9;
}

.btn-secondary:hover {
  background: #e9ecef;
  transform: translateY(-1px);
}

.btn-danger {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
}

.btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
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

@media (max-width: 768px) {
  .actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    margin: 0.25rem 0;
  }
  
  .detail-name {
    font-size: 2rem;
  }
  
  .contact-detail {
    padding: 1rem;
  }
}
</style>