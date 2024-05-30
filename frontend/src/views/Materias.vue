<template>
  <div class="page-container">
    <br>
    <h1>{{ materiaNombre }}</h1>
    <div class="main-and-sidebar">
      <main class="main-content">
        <!-- Contenido principal aquí, como el título de la materia -->
        <Archivos
        :materiaId = "Number(materiaId)"/>
      

      <!-- Mostrar el sidebar en dispositivos de escritorio -->
      <aside v-if="isMobile" class="sidebar">
        <uploadFile/>
        <BusquedaYAgregar 
        @buscar="filtrarPreguntas" 
        :materiaId="Number(materiaId)"
        :actualizarPreguntas="actualizarPreguntas"
        />
        <Preguntas
          :preguntas="preguntasFiltradas"
          :toggleReplies="toggleReplies"
          :actualizarPreguntas="actualizarPreguntas"
          :preguntaAbierta="preguntaAbierta"
        />
      </aside>
    </main>
    

    <!-- Mostrar el sidebar debajo del contenido principal en dispositivos móviles -->
    <div v-if="!isMobile" class="mobile-sidebar">
      <uploadFile/>
      <BusquedaYAgregar 
        @buscar="filtrarPreguntas" 
        :materiaId="Number(materiaId)"
        :actualizarPreguntas="actualizarPreguntas"
        />
      <Preguntas
        :preguntas="preguntasFiltradas"
        :toggleReplies="toggleReplies"
        :actualizarPreguntas="actualizarPreguntas"
        :preguntaAbierta="preguntaAbierta"
      />
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import { utils } from "@/utils/constantes";
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import Preguntas from '../components/Materia/preguntas.vue'
import BusquedaYAgregar from '@/components/Materia/BusquedaYAgregar.vue';
import uploadFile from '@/components/Materia/UploadFile.vue'
import vewpdf from '@/components/Materia/vewPdf.vue'
import Archivos from '@/components/Materia/Arcvhios.vue'


export default {
  data() {
    return {
      showModal: false,
      searchQuery: '',
      preguntaAbierta: null,
    }
  },
  components: {
    Preguntas,
    BusquedaYAgregar,
    uploadFile,
    vewpdf,
    Archivos,
  },
  setup() {
    const route = useRoute();
    const preguntas = ref([]);
    const materiaId = route.params.materia_id;
    const materiaNombre = route.query.nombre;
    const preguntasFiltradas = ref([]);
    const preguntaAbierta = ref(null)
    const toggleReplies = (preguntaId) => {
              if (preguntaAbierta.value === preguntaId) {
                preguntaAbierta.value = null;
              } else {
                preguntaAbierta.value = preguntaId;
              }
            };


    const isMobile = ref(false);  
    function handleResize() {
      isMobile.value = window.innerWidth <= 840; // Ajusta el valor de 768 según tus necesidades
    }  
    // Agregar un event listener para detectar cambios en el tamaño de la ventana
    onMounted(() => {
      handleResize(); // Verificar el tamaño inicial de la ventana
      window.addEventListener('resize', handleResize);
    });

    async function cargarPreguntasYRespuestas() {
      try {
        const response = await axios.get(`${utils.SERVER}/api/prueba/materia/${materiaId}/preguntas-respuestas`);
        preguntas.value = response.data;
        preguntasFiltradas.value = response.data; 
        console.log("Datos recibidos:", preguntas.value);
      } catch (error) {
        console.log(error);
      }
    }

    function filtrarPreguntas(consulta) {
      if (consulta.trim() === '') {
        preguntasFiltradas.value = preguntas.value; // Mostrar todas las preguntas si no hay consulta
      } else {
        preguntasFiltradas.value = preguntas.value.filter(pregunta =>
          pregunta.pregunta.toLowerCase().includes(consulta.toLowerCase())
        );
      }
    }

    onMounted(cargarPreguntasYRespuestas);

    const actualizarPreguntas = computed(() => cargarPreguntasYRespuestas);
   

    return {
      preguntas,
      materiaNombre,
      materiaId,
      toggleReplies,
      actualizarPreguntas,
      isMobile,
      preguntasFiltradas,
      filtrarPreguntas,
      preguntaAbierta,
      isMobile,
      
    };
  }
};
</script>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Asegura que el contenedor de la página tome toda la altura de la ventana */
}

.pregunta {
    padding: 5px;
}


.main-and-sidebar {
  display: flex;
  flex-grow: 1; /* Asegura que tome el espacio restante después del header y el footer */
}

.main-content {
  flex-grow: 1;
  margin-top: 50px; /* Ocupa el espacio disponible, ajustando el sidebar */
  /* Más estilos según tus necesidades */
}

.sidebar {
  width: 100px; /* Ajusta el ancho del sidebar */
  background-color: #ffffff; /* El color de fondo */
  padding: 15px;
  height: 100vh; /* Establece la altura del aside al 100% del viewport height */
  overflow-y: auto; /* Permite el scroll vertical si el contenido excede la altura del aside */

}


/* styles.css */

.comment {
  background-color: rgb(240, 247, 252);
  margin-bottom: 20px;
  padding: 10px;
  
  
  
  
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.comment-header img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-header h3 {
  margin: 0;
}

.comment-header p {
  margin: 0;
  font-size: 12px;
  color: #999;
}

.comment-body p {
  margin: 0;
  
}

.comment-footer {
  display: flex;
  align-items: center;
}

.toggle-replies {
  background-color: #4267B2;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.toggle-replies:hover {
  background-color: #3b5998;
}

.replies {
  display: block;
  width: 100%;
}

.reply {
  border-top: 1px solid #ccc;
  padding-top: 10px;
  margin-top: 10px;
}

.reply img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.reply h4 {
  margin: 0;
}

.reply p {
  margin: 0;
  font-size: 12px;
  color: #999;
}

.sidebar {
  width: 350px; /* Ajusta el ancho del sidebar */
  background-color: #ffffff; /* El color de fondo */
  padding: 15px;
  
  height: 100vh; /* Establece la altura del aside al 100% del viewport height */
  overflow-y: auto; /* Permite el scroll vertical si el contenido excede la altura del aside */
  margin-top: 35px;

}
/**COpiado de classroom */
.GWZ7yf {
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .3), 0 2px 6px 2px rgba(60, 64, 67, .15);
    border-radius: .5rem;
    overflow: hidden;
}
.LBlAUc {
    margin-bottom: 1.5rem;
}
.xSP5ic:not([disabled]), .xSP5ic:not([disabled]).yHy1rc {
    color: #5f6368;
    fill: #5f6368;
}
.NMm5M {
    fill: currentColor;
    flex-shrink: 0;
}

.QxGMXc {
    margin: 1rem 1.5rem 0 1.5rem;
}
.asQXV {
    letter-spacing: .01785714em;
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: .875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: #3c4043;
}
.QRiHXd {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
}
</style>
