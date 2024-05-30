<template>
    <div class="archivos-container">
      <div v-if="archivos.length === 0" class="no-archivos">
      <h2>Actualmente no se han subido archivos de esta materia.</h2>
    </div>
      <div v-for="archivo in archivos" :key="archivo.id" class="archivo Aopndd">
        <a :href="archivo.ruta_pdf" target="_blank" class="enlace-pdf">
          <div class="preview">
            <img :src="archivo.ruta_imagen" :alt="archivo.nombre" />
          </div>
          <div class="info">
            <div class="nombre">{{ archivo.nombre }}</div>
           
          </div>
        </a>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
        materiaId: {
            type: Number,
            required: true,
        },
    },
    data() {
      return {
        archivos: [],
      };
    },
    mounted() {
      // Reemplaza 'ruta/al/archivo.json' con la ruta correcta a tu archivo JSON
      axios
      .get(`/static/files/${this.materiaId}.json`)
      //axios.get('/static/files/28.json')
        .then(response => {
          this.archivos = response.data;
          console.log(this.archivos)
        })
        .catch(error => {
          console.error('Error al obtener los datos del archivo JSON:', error);
        });
    },
  };
  </script>


<style scoped>
.archivos-container {
  display: flex;
  flex-wrap: wrap;
  
  
}

  .archivo {
    display: flex;
    box-sizing: border-box;
    margin-bottom: .75rem;
    margin-right: .75rem;
    font-size: 1rem;
    
  }
  
  .enlace-pdf {
    text-decoration: none;
    color: inherit;
  }
  
  .preview {
    width: 150px;
    height: 200px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .preview img {
    max-width: 100%;
    max-height: 100%;
  }
  
  .info {
    text-align: center;
    margin-top: 10px;
  }
  
  .nombre {
    font-weight: bold;
  }
  
  .tipo {
    color: #888;
  }

  .Aopndd {
    background-color: #fff;
    border: .0625rem solid #dadce0;
    border-radius: .5rem;
    overflow: hidden;
}
.no-archivos {
  text-align: center;
  font-size: 24px;
  color: #666;
  margin-top: 50px;
}
  </style>