<template>
  <div v-if="contact">
    <h1 class="page-title">Edit Contact</h1>
    <div class="card">
      <div class="form-container">
        <div class="form-group">
          <label class="form-label">First Name *</label>
          <input 
            v-model="form.firstName" 
            type="text" 
            class="form-input" 
            required
            placeholder="Enter first name"
          >
        </div>
        
        <div class="form-group">
          <label class="form-label">Last Name *</label>
          <input 
            v-model="form.lastName" 
            type="text" 
            class="form-input" 
            required
            placeholder="Enter last name"
          >
        </div>
        
        <div class="form-group">
          <label class="form-label">Email *</label>
          <input 
            v-model="form.email" 
            type="email" 
            class="form-input" 
            required
            placeholder="Enter email address"
          >
        </div>
        
        <div class="form-group">
          <label class="form-label">Phone</label>
          <input 
            v-model="form.phone" 
            type="tel" 
            class="form-input"
            placeholder="Enter phone number"
          >
        </div>
        
        <div class="form-group">
          <label class="form-label">Company</label>
          <input 
            v-model="form.company" 
            type="text" 
            class="form-input"
            placeholder="Enter company name"
          >
        </div>
        
        <div class="form-group">
          <label class="form-label">Notes</label>
          <textarea 
            v-model="form.notes" 
            class="form-input" 
            rows="4"
            placeholder="Add any notes about this contact"
          ></textarea>
        </div>
        
        <div class="actions">
          <button @click="updateContact" class="btn btn-primary">
            Update Contact
          </button>
          <router-link :to="'/contact/' + id" class="btn btn-secondary">
            Cancel
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="card">
    <div class="empty-state">
      <div class="empty-icon">❌</div>
      <h3>Contact not found</h3>
      <p>The contact you're trying to edit could not be found.</p>
      <router-link to="/" class="btn btn-primary">Back to Contacts</router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ContactStore } from '../utils/contactStore'

export default {
  name: 'EditContactView',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const contact = ref(null)
    const form = ref({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      notes: ''
    })
    
    const loadContact = () => {
      contact.value = ContactStore.getContactById(props.id)
      if (contact.value) {
        Object.assign(form.value, contact.value)
      }
    }
    
    const validateForm = () => {
      if (!form.value.firstName.trim()) {
        alert('First name is required')
        return false
      }
      if (!form.value.lastName.trim()) {
        alert('Last name is required')
        return false
      }
      if (!form.value.email.trim()) {
        alert('Email is required')
        return false
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(form.value.email)) {
        alert('Please enter a valid email address')
        return false
      }
      
      return true
    }
    
    const updateContact = () => {
      if (!validateForm()) {
        return
      }
      
      const success = ContactStore.updateContact(props.id, { ...form.value })
      
      if (success) {
        router.push(`/contact/${props.id}`)
      } else {
        alert('Failed to update contact')
      }
    }
    
    onMounted(loadContact)
    watch(() => props.id, loadContact)
    
    return {
      contact,
      form,
      updateContact
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

.form-container {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid #e1e5e9;
  border-radius: 15px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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
  .page-title {
    font-size: 2rem;
  }
  
  .card {
    padding: 1.5rem;
    border-radius: 15px;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    margin: 0.25rem 0;
  }
}
</style>