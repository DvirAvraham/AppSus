export default {
  template: `
          <header class="app-header">
              <div class="logo">
                  <img src="https://i.ibb.co/zJWLhKj/black-horse-head-logo-templates-2.png" alt="">
                  <h1>Appsus</h1>
                </div>
                <nav class="nav-bar">
                    <div class='nav-btn' @click="toggleNav">
                      <img src="https://i.ibb.co/7n6wXr2/grid-icon.png"  alt="">
                  </div>
                  <div class="nav-container" :class="showNavClass">
                    <div>
                      <router-link @click="toggleNav" to="/"><i class="fa-solid fa-house"></i></router-link> 
                      <p>Home</p>
                    </div>  
                    <div>
                      <router-link @click="toggleNav" to="/email"><i class="fa-solid fa-envelope"></i></router-link> 
                      <p>Email</p>
                    </div>
                    <div>
                      <router-link @click="toggleNav" to="/notes"><i class="fa-solid fa-note-sticky"></i></router-link>
                      <p>Notes</p>
                    </div>  
                    <div>
                        <router-link  @click="toggleNav" to="/book"><i class="fa-solid fa-book"></i></router-link>
                        <p>Books</p>
                    </div>
                   </div>
              </nav>
          </header>
      
      `,
  data() {
    return {
      showNav: false,
    };
  },
  methods: {
    toggleNav() {
      this.showNav = !this.showNav;
    },
  },
  computed: {
    showNavClass() {
      return { 'open-nav': this.showNav };
    },
  },
};
