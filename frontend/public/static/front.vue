<template>
    <aside class="sidebar">
      <div v-for="pregunta in preguntas" :key="pregunta.pregunta_id" class="pregunta">
        <div class="comment">
          <div class="comment-body">
            <p>{{ pregunta.pregunta }}</p>
            <div class="comment-header">
              <p>Pregunta hecha el: {{ new Date(pregunta.fecha_pregunta).toLocaleString() }}</p>
            </div>
          </div>
          <div v-if="mostrarRespuestas[pregunta.pregunta_id]" class="replies container">
            <div v-for="respuesta in pregunta.respuestas" :key="respuesta.respuesta_id" class="respuesta">
              <div class="comment-body">
                <p>{{ respuesta.respuesta }}</p>
                <div class="comment-header">
                  <p>Respondido el: {{ new Date(respuesta.fecha_respuesta).toLocaleString() }}</p>
                </div>
              </div>
            </div>
            <div>
              <form @submit.prevent="enviarRespuesta(pregunta.pregunta_id)">
                <input type="textarea" class="form-control" placeholder="responder" v-model.trim="respuestaN.respuesta" />
                <button class="btn btn-dark mt-2" type="submit" :disabled="bloquear">Enviar</button>
              </form>
            </div>
          </div>
          <div class="comment-footer">
            <button class="toggle-replies mt-2" @click="toggleReplies(pregunta.pregunta_id)">
              {{ mostrarRespuestas[pregunta.pregunta_id] ? 'Ocultar respuestas' : 'Mostrar respuestas' }}
            </button>
          </div>
        </div>
      </div>
    </aside>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      preguntas: {
        type: Array,
        required: true,
      },
      mostrarRespuestas: {
        type: Object,
        required: true,
      },
      toggleReplies: {
        type: Function,
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
      enviarRespuesta(pregunta_id) {
        if (this.respuestaN.respuesta.trim() === '') {
          console.log('Campo vacío');
          return;
        }
  
        const respuestaData = {
          respuesta: this.respuestaN.respuesta.trim(),
          pregunta_id,
        };
  
        axios
          .post('/respuestas', respuestaData)
          .then((response) => {
            console.log(response.data.message);
            this.respuestaN.respuesta = ''; // Limpiar el campo de respuesta después de enviar
          })
          .catch((error) => {
            console.error(error);
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