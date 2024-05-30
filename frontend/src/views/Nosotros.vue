<template>
  <div>
    <div class="content"></div>
    <div class="team-container">
      <div v-for="member in teamMembers" :key="member.id" class="team-member">
        <div class="member-card">
          <div class="member-image">
            <img :src="member.imageUrl" :alt="member.name" />
          </div>
          <h3>{{ member.name }}</h3>
          <p id="pos">{{ member.position }}</p>
          <button @click="toggleInfo(member)">{{ member.showInfo ? 'Ver menos' : 'Ver más' }}</button>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>{{ activeMember.name }}</h3>
        <p>{{ activeMember.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teamMembers: [
        {
          id: 1,
          name: 'Karen Giselle Cruz Zuñiga',
          position: 'CEO & Co-Fundador',
          imageUrl: 'static/integrantes/Giselle.jpg',
          description: 'Estudiante de Ciencias de la Computación, apasionada por el diseño de interfaces de usuario. En CodeCore, su habilidad para crear experiencias de usuario intuitivas y atractivas nos ayuda a ofrecer soluciones web innovadoras. Con conocimientos en HTML, CSS, JavaScript y herramientas de diseño como Figma y Adobe XD, aporta creatividad y precisión a cada proyecto.',
          showInfo: false
        },
        {
          id: 2,
          name: 'Josué Eduardo Morales Torres',
          position: 'CLO & Co-Fundador',
          imageUrl: 'static/integrantes/Josue.jpeg',
          description: 'Estudiante de Ciencias de la Computación, apasionado por el desarrollo web. Con una sólida experiencia en backend, frontend y bases de datos,  domina tecnologías como HTML, CSS, JavaScript, Python y SQL. En CodeCore, su versatilidad y capacidad para trabajar en todas las capas de una aplicación web nos permiten ofrecer soluciones completas y eficientes.',
          showInfo: false
        },
        {
          id: 3,
          name: 'Gustavo Betanzos',
          position: 'CLO & Co-Fundador',
          imageUrl: 'static/integrantes/Gus.jpeg',
          description: '',
          showInfo: false
        }
      ],
      showModal: false,
      activeMember: {}
    }
  },
  methods: {
    toggleInfo(member) {
      this.activeMember = member;
      this.showModal = !this.showModal;
    },
    closeModal() {
      this.showModal = false;
    }
  }
}
</script>

<style scoped>
.team-container {
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: transparent;
}

.team-member {
  margin: 20px;
  text-align: center;
  width: 300px;
  height: 330px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
}

.member-card {
  background-color: rgba(255, 255, 255);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 330px;
  
}

.member-image img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #7BC9FF;
}

.member-info {
  margin-top: 10px;
  text-align: left;
}
.member-card button {
  margin-top: auto; /* Empuja el botón hacia la parte inferior */
  border: none;
  background: none;
}

#pos{
  color: #8576FF;
}

.content {
  position: absolute; /* Posiciona la imagen de fondo de forma absoluta dentro del contenedor de fondo */
  top: 0;
  left: 0;
  width: 100%; /* Ocupa todo el ancho del contenedor de fondo */
  height: 300px; /* Ocupa toda la altura del contenedor de fondo */
  background-image: url('../../public/static/img/panoramica.jpg'); /* Ruta de tu imagen de fondo */
  background-size: cover;
  background-position: center top;
  z-index: -1;
  }
/* Modal */
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  min-width: 312px;
  max-width: 450px;
  width: 100%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

button {
  cursor: pointer;
}
</style>