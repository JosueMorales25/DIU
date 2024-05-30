<template>
  <div>
    <!--Encabezado-->
    <div id="encabezado" class="bg-dark text-white text-center py-4">
      <h1>Ciencias de la Computación</h1>
      <p class="lead">Sitio web para que los estudiantes colaboren con material para estudiar las materias de la carrera.</p>
    </div>
    <br><br><br>
    <div class="container">
      <div class="accordion" id="accordionSemestres">
       <!-- <SemestresCard
          v-for="(semestre, index) in arraySemestres[0]"
          :key="semestre.semestreId"
          :title="semestre.semestre_nombre"
          :materias="semestre.materias"
          :semestreId="semestre.semestreId"
        />
        -->
        <SemestresCard
      v-for="(semestre, index) in semestres"
      :key="index"
      :semestreId="semestre.semestre_id"
      :title="semestre.semestre_nombre"
      :materias="semestre.materias"
    />
      </div>
    </div>

  </div>
</template>


<script>
import axios from 'axios';
import { utils } from "@/utils/constantes";
import { ref, reactive, onMounted } from 'vue';
import SemestresCard from "../components/Home/semestresCard.vue";

export default {
  components: {
    SemestresCard
  },
    //setup() {
    //  const arraySemestres = ref([]);
    //
    //  async function consumirApi() {
    //    console.log('Consumiendo API');
    //    try {
    //      const response = await fetch('/static/semes.json');
    //      const semestres = await response.json();
    //      
    //      arraySemestres.value = semestres;
    //      console.log(arraySemestres)
    //    } catch (error) {
    //      console.log(error);
    //    }
    //  }
    //
    //  onMounted(consumirApi);
    //
    //  return { arraySemestres};
    //}
    data() {
    return {
      semestres: []
    };
  },
  methods: {
    
    async llamarDatos() {
      try {
        const response = await axios.get(utils.SERVER + "/api/prueba/reporte");
        this.semestres = response.data;
        console.log("Datos recibidos:", this.semestres);
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    try {
      //const response = await fetch('/static/semes.json');
      //const response = await this.llamarDatos();
      //const data = await response.json();
      await this.llamarDatos();
      console.log("Datos recibidos en SemestresCard:", this.semestres);
      // Agrupar materias por semestre
      const semestres = {};
      this.semestres.forEach((materia) => {
        if (!semestres[materia.semestre_id]) {
          semestres[materia.semestre_id] = {
            semestre_id: materia.semestre_id,
            semestre_nombre: materia.semestre_nombre,
            materias: []
          };
        }
        semestres[materia.semestre_id].materias.push({
          materia_id: materia.materia_id,
          materia_nombre: materia.materia_nombre
        });
      });

      // Convertir objeto a array
      this.semestres = Object.values(semestres);
    } catch (error) {
      console.error(error);
    }
  }
}
</script>


<style>
#encabezado{
  padding: 10px;
}
</style>
