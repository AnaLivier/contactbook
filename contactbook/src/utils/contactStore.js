// src/utils/contactStore.js
export const ContactStore = {
  key: 'contact-book-data',
  
  getContacts() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  },
  
  saveContacts(contacts) {
    localStorage.setItem(this.key, JSON.stringify(contacts));
  },
  
  addContact(contact) {
    const contacts = this.getContacts();
    contact.id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    contacts.push(contact);
    this.saveContacts(contacts);
    return contact.id;
  },
  
  updateContact(id, updatedContact) {
    const contacts = this.getContacts();
    const index = contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...updatedContact };
      this.saveContacts(contacts);
      return true;
    }
    return false;
  },
  
  deleteContact(id) {
    const contacts = this.getContacts();
    const filtered = contacts.filter(c => c.id !== id);
    this.saveContacts(filtered);
    return true;
  },
  
  getContactById(id) {
    const contacts = this.getContacts();
    return contacts.find(c => c.id === id);
  },
  
  initializeSampleData() {
    if (this.getContacts().length === 0) {
      const killBillContacts = [
        {
          id: 'beatrix-kiddo-001',
          firstName: 'Beatrix',
          lastName: 'Kiddo',
          email: 'blackmamba@deadlyvipers.com',
          phone: '(555) REVENGE',
          company: 'Deadly Viper Assassination Squad',
          notes: 'The Bride - Expert in martial arts and swordsmanship'
        },
        {
          id: 'bill-davidson-002',
          firstName: 'Bill',
          lastName: 'Davidson',
          email: 'bill@assassinleader.com',
          phone: '(555) DEATH-01',
          company: 'DVAS Leadership',
          notes: 'Leader of the Deadly Viper Assassination Squad'
        },
        {
          id: 'oren-ishii-003',
          firstName: 'O-Ren',
          lastName: 'Ishii',
          email: 'cottonmouth@yakuza.jp',
          phone: '(555) KATANA-1',
          company: 'Tokyo Yakuza',
          notes: 'Cottonmouth - Queen of the Tokyo underworld'
        },
        {
          id: 'elle-driver-004',
          firstName: 'Elle',
          lastName: 'Driver',
          email: 'californianmountainsnake@viper.com',
          phone: '(555) ONE-EYE',
          company: 'Deadly Viper Assassination Squad',
          notes: 'California Mountain Snake - One-eyed assassin'
        },
        {
          id: 'vernita-green-005',
          firstName: 'Vernita',
          lastName: 'Green',
          email: 'copperhead@suburbanmom.com',
          phone: '(555) MOM-KILL',
          company: 'Suburban Life / Ex-DVAS',
          notes: 'Copperhead - Former assassin turned suburban mother'
        },
        {
          id: 'budd-davidson-006',
          firstName: 'Budd',
          lastName: 'Davidson',
          email: 'sidewinder@trailer.com',
          phone: '(555) BOUNCER',
          company: 'Strip Club Security',
          notes: "Sidewinder - Bill's brother, former assassin"
        },
        {
          id: 'gogo-yubari-007',
          firstName: 'Gogo',
          lastName: 'Yubari',
          email: 'gogo@schoolgirl.jp',
          phone: '(555) METEOR',
          company: 'O-Ren Bodyguard',
          notes: 'Deadly schoolgirl bodyguard with meteor hammer'
        },
        {
          id: 'hattori-hanzo-008',
          firstName: 'Hattori',
          lastName: 'Hanzo',
          email: 'hanzo@swordmaster.jp',
          phone: '(555) KATANA',
          company: 'Hanzo Steel',
          notes: 'Legendary swordsmith - Master craftsman'
        },
        {
          id: 'pai-mei-009',
          firstName: 'Pai',
          lastName: 'Mei',
          email: 'whitebeard@wudang.cn',
          phone: '(555) MASTER',
          company: 'Wudang Temple',
          notes: 'Kung Fu master - Teacher of the Five Point Palm Exploding Heart Technique'
        },
        {
          id: 'johnny-mo-010',
          firstName: 'Johnny',
          lastName: 'Mo',
          email: 'johnny@yakuzaboss.jp',
          phone: '(555) BOSS-88',
          company: 'Crazy 88',
          notes: 'Leader of the Crazy 88 - O-Ren Ishii lieutenant'
        }
      ];
      
      this.saveContacts(killBillContacts);
    }
  }
};