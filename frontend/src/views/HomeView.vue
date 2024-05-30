<template>
  <div class="main-container">
    <div class="tp-bgimg2"></div>
    <div class="team-container2">
      <div v-for="member in teamMembers" :key="member.id" class="team-member2">
        <div class="member-card2">
          <div class="member-image2">
            <a :href="member.liga" target="_blank">
              <img :src="member.imageUrl" :alt="member.name" />
            </a>
          </div>
          <p id="name">{{ member.name }}</p>
          <p id="descrip">{{ member.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      teamMembers: [
        {
          id: 1,
          name: 'MINERVA',
          imageUrl: 'static/img/Minerva.png',
          liga:'https://sites.google.com/ciencias.unam.mx/minerva-facultaddeciencias/inicio',
          description: 'Ponemos la ciencia al servicio de la sociedad, a través de productos, servicios y procesos que ayudarán a tu empresa a ser más competitiva',
        },
        {
          id: 2,
          name: 'BOLSA DE TRABAJO PRÁCTICAS PROFESIONALES',
          imageUrl: 'static/img/BolsaDeTrabajo.png',
          liga:'https://sites.google.com/a/ciencias.unam.mx/bolsa',
          description: 'Nuestras empresas aliadas colocan aquí las oportunidades laborales para nuestros alumnos y egresados',
        },
        {
          id: 3,
          name: 'EXALUMNOS ',
          imageUrl: 'static/img/EgresadoFac.jpeg',
          liga:'https://sites.google.com/ciencias.unam.mx/vinculacion/exalumnos',
          description: 'Si fuiste alumno de la Facultad de Ciencias y quieres seguir siendo parte de nuestra comunidad, aquí encontrarás la forma de hacerlo',
        }
      ]
    }
  },
  methods: {
    updateContainerHeight() {
      const teamContainer = this.$el.querySelector('.team-container2');
      const backgroundImage = document.querySelector('.tp-bgimg2');
      if (teamContainer && backgroundImage) {
        const minHeight = 500; // Altura mínima en píxeles
        const containerHeight = teamContainer.offsetHeight;
        backgroundImage.style.height = `${Math.max(containerHeight, minHeight)}px`;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.updateContainerHeight();
      window.addEventListener('resize', this.updateContainerHeight);
    });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateContainerHeight);
  }
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.tp-bgimg2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  background-color: rgb(242, 242, 242);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  background-image: url('../../public/static/img/NuevoFondo.jpg'); /* Asegúrate de que la ruta es correcta */
  transition: height 0.3s;
  min-height: 100%; /* Altura mínima */
}

.main-container {
  position: relative;
  z-index: 1;
  padding-top: 60px; /* Ajusta según sea necesario */
}

.team-container2 {
  margin-top: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: transparent;
}

.team-member2 {
  margin: 20px;
  text-align: center;
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
}

.member-card2 {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 400px;
  background-color: transparent;
}

.member-image2 img {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

#name {
  font-size: 16px;
  color: rgb(255, 255, 255);
  font-weight: bold;
}

#descrip {
  font-size: 14px;
  color: rgb(255, 255, 255);
  font-weight: bold;
}
</style>
