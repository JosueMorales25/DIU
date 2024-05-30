<template>
  <div class="accordion-item">
    <h2 class="accordion-header" :id="`heading${semestreId}`">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${semestreId}`" aria-expanded="false" :aria-controls="`collapse${semestreId}`">
        <h5>{{ title.replace(/([A-Z])/g, ' $1').trim() }}</h5>
      </button>
    </h2>
    <div :id="`collapse${semestreId}`" class="accordion-collapse collapse" :aria-labelledby="`heading${semestreId}`" data-bs-parent="#accordionSemestres">
      <div class="accordion-body">
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item"
            v-for="materia in materias"
            :key="materia.materia_id"
          >
            <router-link class="no-link-style" :to="{ path: `/about/${materia.materia_id}`, query: { nombre: materia.materia_nombre } }">
              {{ materia.materia_nombre }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


  <script>
  export default {
    props: {
      title: String,
      materias: Array,
      semestreId: Number
    },
    methods: {
      navigateToMateria(id) {
        // Suponiendo que tengas un router configurado y una ruta para las materias
        //this.$router.push({ name: 'Materia', params: { id: id } });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para tu tarjeta */
  .card {
    cursor: pointer;
    transition: transform 0.3s;
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
  
  .list-group-item:hover {
    background-color: #f8f9fa;
  }
  .no-link-style {
  text-decoration: none !important;
  color: inherit !important;
  cursor: pointer;

}
  </style>
  