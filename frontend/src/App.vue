<template>

  <!--Header -->
  <nav class="navbar navbar-expand-sm">
  <div class="container-fluid align-items-center">
    <a class="navbar-brand" href="#">
      
      <a>NoteShare</a></a>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Inicio</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">Semestres</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/nosotros">Nosotros</router-link>
        </li>
      </ul>
    </div>
    <div class="btn-group">
      <button class="navbar-toggler dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="dropdown-menu dropdown-menu-right dropdown-menu-bottom"  aria-labelledby="dropdownMenuButton1">
        <li><router-link class="dropdown-item" to="/">Inicio</router-link></li>
        <li><router-link class="dropdown-item" to="/about">Semestres</router-link></li>
        <li><router-link class="dropdown-item" to="/nosotros">Nosotros</router-link></li>
      </ul>
    </div>
  </div>
</nav>







  <body class=" container">
    <router-view/>
  </body>
  


  <div class=" d-flex flex-column min-vh-100">
 
    <!-- Footer-->
    <footer  class=" mt-auto bg-dark text-center text-lg-start text-white">
     <!-- Grid container -->
    <div class="container p-4">
      <!--Grid row-->
      <div class="row mt-4">
        <!--Grid column-->
        <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase">Code Core</h5>

          
        </div>
        <!--Grid column-->

        <!--Grid column-->
        <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase">Execution of the contract</h5>

          <ul class="list-unstyled">
            <li>
              <a href="#!" class="text-white"><i class="fas fa-shipping-fast fa-fw fa-sm me-2"></i>Supply</a>
            </li>
            <li>
              <a href="#!" class="text-white"><i class="fas fa-backspace fa-fw fa-sm me-2"></i>Returns</a>
            </li>
            <li>
              <a href="#!" class="text-white"><i class="far fa-file-alt fa-fw fa-sm me-2"></i>Regulations</a>
            </li>
            <li>
              <a href="#!" class="text-white"><i class="far fa-file-alt fa-fw fa-sm me-2"></i>Privacy policy</a>
            </li>
          </ul>
        </div>
        <!--Grid column-->

       

        <!--Grid column-->
        <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase">Contáctanos</h5>

          <ul class="list-unstyled">
            <li>
              <a jsname="hSRGPd" class="WpHeLc VfPpkd-mRLv6 no-link-style" href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=giselle_cruz%40ciencias.unam.mx&amp;authuser=0" target="_blank" aria-label="Enviar correo a giselle_cruz@ciencias.unam.mx" data-tooltip-enabled="true" data-tooltip-id="tt-c234" jsaction="">giselle_cruz@ciencias.unam.mx</a>
            </li>
            <li>
              <a jsname="hSRGPd" class="WpHeLc VfPpkd-mRLv6 no-link-style" href="https://mail.google.com/mail/?view=cm&fs=1&to=josuemt02%40ciencias.unam.mx&authuser=0" target="_blank" aria-label="Enviar correo a josuemt02@ciencias.unam.mx" data-tooltip-enabled="true" data-tooltip-id="tt-c234" jsaction="">josuemt02@ciencias.unam.mx</a>
            </li>
            <li>
              <a jsname="hSRGPd" class="WpHeLc VfPpkd-mRLv6 no-link-style" href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=GustavoNoel%40ciencias.unam.mx&amp;authuser=0" target="_blank" aria-label="Enviar correo a GustavoNoel@ciencias.unam.mx" data-tooltip-enabled="true" data-tooltip-id="tt-c222" jsaction=""> GustavoNoel@ciencias.unam.mx</a>
            </li>
          </ul>
        </div>
        <!--Grid column-->
      </div>
      <!--Grid row-->
    </div>
    <!-- Grid container -->

      <!-- Derechos de autor -->
      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
        © 2024 Derechos de autor:
        <a class="text-white" href="#!">CodeCore.com</a>
      </div>
      <!-- Derechos de autor -->
    </footer>
  </div>
</template>

<style>
.logo {
  width: 50px; /* Cambia el tamaño de la anchura según sea necesario */
  height: auto; /* Esto mantiene la relación de aspecto */
}
.logo2{
  width: auto;
  height: 30px;
}

#app & body & nav{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: rgb(241, 246, 250);
}

nav{
  background-color: #7BC9FF;
  position: fixed;
  z-index: 1000; /* Asegura que la barra de navegación esté por encima de otros elementos */
}

.navbar .nav-link {
  margin-right: 1rem; /* Espacio a la derecha de cada enlace */
}

.navbar .navbar-toggler {
  border: none; /* Opcional: elimina el borde del botón del toggler para un aspecto más limpio */
}

/* Ajustes para que los enlaces se muestren correctamente en móviles */
@media (max-width: 768px) {
  .navbar .navbar-nav .nav-link {
    margin-right: 0; /* Elimina el margen derecho en vistas móviles */
  }
}
nav a.router-link-exact-active {
  color: #8576FF;
}

.d-flex {
  display: flex;
  flex-direction: column;
}

.min-vh-100 {
  min-height: 100vh;
}

.mt-auto {
  margin-top: auto;
}

/* Elimina el margen exterior del contenedor del footer para que se extienda por completo */
.container.my-5 {
  margin: 0;
  width: 100%; /* Asegúrate de que el contenedor del footer tenga un ancho del 100% */
  max-width: 100%; /* Asegúrate de que el contenedor del footer no esté limitado por un ancho máximo */
  
}

/* Asegúrate de que la clase bg-dark y text-white no estén siendo sobreescritas por otros estilos */
.bg-dark {
  background-color: #343a40 !important; /* Utiliza !important para sobrescribir cualquier otro estilo si es necesario */
}

.text-white {
  color: #fff !important; /* Utiliza !important para sobrescribir cualquier otro estilo si es necesario */
}
nav {
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
}
.no-link-style {
  text-decoration: none !important;
  color: inherit !important;
  cursor: pointer;

}
.dropdown-menu {
  right: 0 !important; /* Asegura que la lista desplegable esté completamente a la derecha */
  left: auto !important; /* Asegura que la lista desplegable no tenga un valor de izquierda */
}

footer{
  padding: 10px ;
  z-index: 2; /* Asegura que la barra de navegación esté por encima de otros elementos */
  
}
.container{
  background-color: transparent;
  padding-color: rgba(255, 255, 255, 0.5); /* Padding transparente (blanco con opacidad del 50%) */
}
.d-flex {
  display: flex;
  flex-direction: column;
}

.min-vh-100 {
  min-height: 100vh;
}

</style>
