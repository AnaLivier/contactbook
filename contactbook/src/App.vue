<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="navbar-content">
        <router-link to="/" class="logo">Contact Book</router-link>
        <ul class="nav-links">
          <li><router-link to="/" class="nav-link">All Contacts</router-link></li>
          <li><router-link to="/add" class="nav-link">Add Contact</router-link></li>
        </ul>
      </div>
    </nav>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
:root {
  --primary-start: #11998e;
  --primary-end: #38ef7d;
  --bg-start: #11998e;
  --bg-end: #38ef7d;
}


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(135deg, var(--bg-start) 0%, var(--bg-end) 100%);
  min-height: 100vh;
  color: #333;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-start);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1rem;
  list-style: none;
}

.nav-link {
  color: #666;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: var(--primary-start);
  color: white;
  transform: translateY(-1px);
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
  }
  
  .navbar-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>