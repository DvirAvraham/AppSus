export default {
  template: `
            <section class="home-page-container">


            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
                <div class="logo">
                  <img  src="https://i.ibb.co/zJWLhKj/black-horse-head-logo-templates-2.png" alt="">
                  <h2>Appsus</h2>
                  
                </div>
                <div>
                    <h1>
                        <span>Our apps</span>
                        <div class="message">
                            <div class="word1">books</div>
                            <div class="word2">notes</div>
                            <div class="word3">email</div>
                        </div>
                    </h1>
                </div>

                <div class="home-page-nav">
                    <div class="white-screen-container">
                    </div>
                    <div>
                      <router-link @click="toggleNav" to="/email"><i class="fa-solid fa-envelope"></i></router-link> 
                      <!-- <p>Email</p> -->
                    </div>
                    <div>
                      <router-link @click="toggleNav" to="/notes"><i class="fa-solid fa-note-sticky"></i></router-link>
                      <!-- <p>Notes</p> -->
                    </div>  
                    <div>
                        <router-link to="/book"><i class="fa-solid fa-book"></i></router-link>
                        <!-- <p>Books</p> -->
                    </div>
                </div> 
            </section>

        
        `,
};
