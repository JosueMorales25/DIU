<template>
    <div class="search-and-add">
        <div class="input-group">
            <input
                    type="text"
                    class="form-control fixed-width"
                    placeholder="Buscar preguntas"
                    v-model="consulta"
                    @input="buscar"
            />
            <span class="input-group-text" id="basic-addon1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                </svg>
            </span>
        </div>
        <form @submit.prevent="agregarPregunta(materiaId)" class="d-flex init-group">
            <div class="input-group">
              <textarea class="form-control mr-2" rows="1" placeholder="Preguntar" v-model.trim="Npregunta.pregunta"></textarea>
              <button class="btn btn-dark flex-shrink-0" type="submit" :disabled="bloquear">
              <i class="bi bi-send"></i>
              </button>
            </div>
        </form>
    </div>
  </template>
  
<script>
import axios from 'axios';
import { utils } from "@/utils/constantes";
  export default {
    props: {
        materiaId: {
            type: Number,
            required: true,
        },
        actualizarPreguntas: {
            type: Function,
            required: true,
        },
    },
    data() {
      return {
        consulta: '',
        Npregunta: {
          pregunta: '',
        },
      };
    },
    methods: {
        agregarPregunta(materiaId) {
        
            if (this.Npregunta.pregunta.trim() === '') {
                console.log('Campo vacío');
                return;
            }
            
            axios
            .post(`${utils.SERVER}/api/prueba/preguntas/`+materiaId+`/`+ this.Npregunta.pregunta)
            .then((response) => {
                console.log(response.data.message);
                this.Npregunta.pregunta = ''; //Limpiar el campo de respuesta después de enviar
                this.consulta = '';
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
        buscar() {
            this.$emit('buscar', this.consulta);
        },
    },
    computed: {
      bloquear() {
        return this.Npregunta.pregunta.trim() === '' ? true : false;
      },
    },
  };
  </script>

  <style>
.search-and-add{
    margin-bottom: 10px;
    margin-top: 10px;
}
.input-group {
    position: relative;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
    margin-bottom: 10px;
    line-height: 1.25rem;
}
.fixed-width {
    width: 200px; /* Puedes ajustar este valor según tus necesidades */
}
</style>