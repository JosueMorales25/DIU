<template>
  <aside>
    <div class="GWZ7yf">
      <div v-for="pregunta in preguntas" :key="pregunta.pregunta_id" class="pregunta">
        <div class="comment" @click="toggleReplies(pregunta.pregunta_id)">
          <div jsaction="JIbuQc:jkaCtf" class="WuChGe QRiHXd aHTZpf">
            <span class="xSP5ic ho6Zoe bxp7vf"><svg focusable="false" width="24" height="24" viewBox="0 0 24 24" class="NMm5M" aria-hidden="true">
              <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z">
              </path></svg>
            </span>
            <span class="asQXV QRiHXd">{{ pregunta.pregunta }}</span>
          </div>
          <div class="comment-header">
              <p>Pregunta hecha el: {{ new Date(pregunta.fecha_pregunta).toLocaleString() }}</p>
            </div>
        </div>
        <div  v-if="preguntaAbierta === pregunta.pregunta_id" class="replies container respuestas">
          <div v-for="respuesta in pregunta.respuestas" :key="respuesta.respuesta_id" class="respuesta">
            <span class="asQXV QRiHXd">{{ respuesta.respuesta  }}</span>
            <div class="comment-header">
                <p>Respondido el: {{ new Date(respuesta.fecha_respuesta).toLocaleString() }}</p>
              </div>
          </div>
          <div class="d-flex ">
            <form @submit.prevent="procesarFormulario(pregunta.pregunta_id)">
              <div class="input-group">
                <textarea class="form-control  mr-2" rows="1" placeholder="responder" v-model.trim="respuestaN.respuesta"></textarea>
                <button class="btn btn-dark flex-shrink-0" type="submit" :disabled="bloquear">
                <i class="bi bi-send"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
  
  <script>
import axios from 'axios';
import { utils } from "@/utils/constantes";
import { useRoute } from 'vue-router';
import 'bootstrap-icons/font/bootstrap-icons.css';


  export default {
    props: {
      preguntas: {
        type: Array,
        required: true,
      },
      toggleReplies: {
        type: Function,
        required: true,
      },
      actualizarPreguntas: {
        type: Function,
        required: true,
      },
      preguntaAbierta: {
        type: [String, Number, null],
        required: true,
      },
    },
    data() {
      return {
        respuestaN: {
          respuesta: '',
        },
      };
    },
    methods: {
      procesarFormulario(pregunta_id) {
        
        if (this.respuestaN.respuesta.trim() === '') {
          console.log('Campo vacío');
          return;
        }
        const respuestaData = {
          respuesta: this.respuestaN.respuesta.trim(),
          pregunta_id,
          
        };
        console.log(respuestaData);
        axios
          .post(`${utils.SERVER}/api/prueba/respuestas/`+pregunta_id+`/`+ this.respuestaN.respuesta)
          .then((response) => {
            console.log(response.data.message);
            this.respuestaN.respuesta = ''; //Limpiar el campo de respuesta después de enviar
            this.actualizarPreguntas(); //Actualiza la lista de preguntas y respuestas
          //alert(JSON.stringify(result.data));
          })
          .catch(function (err) {
            console.log(err);
          })
          .then(function () {
            console.log("ya terminó");
          });
      },
    },
    computed: {
      bloquear() {
        return this.respuestaN.respuesta.trim() === '' ? true : false;
      },
    },
  };
  </script>

<style scoped>


/* styles.css */

.comment {
  background-color: rgb(255, 255, 255);
  margin-bottom: 0px;
  padding: 10px;
  padding-bottom: 5px;
  padding-top: 5px;
  cursor: pointer;
}

.comment-header {
  display: flex;
  align-items: center;
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

.respuestas{
  background-color: rgb(255, 255, 255);
    padding-left: 10px;
    padding-right: 0%;
    max-width: 250px;
}


.replies {
  display: block;
  width: 100%;
}



.input-group {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
    
}
.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 15px;
  border-top: 1px solid #ccc;
  z-index: 1000; /* Asegura que esté por encima del resto del contenido */
}
.d-flex{
  padding: 10px;
}
.GWZ7yf {
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .3), 0 2px 6px 2px rgba(60, 64, 67, .15);
    border-radius: .5rem;
    overflow: hidden;
    max-width: 600px; /* Establece el ancho máximo deseado */
    width: 600x;

}
.QRiHXd {
    display: flex;
    flex-direction: row;
}
</style>
