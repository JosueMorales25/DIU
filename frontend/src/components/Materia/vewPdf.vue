<template>
    <div class="archivos-container">
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
  export default {
    data() {
      return {
        archivos: [
          {
            id: 1,
            nombre: 'Intro01',
            ruta_pdf: '/static/pdfs/01Intro.pdf',
            ruta_imagen: '/static/img/01Intro.jpg',
          },
          {
            id: 1,
            nombre: 'Intro01',
            ruta_pdf: '/static/pdfs/01Intro.pdf',
            ruta_imagen: '/static/img/01Intro.jpg',
          },
          {
            id: 1,
            nombre: 'Intro01',
            ruta_pdf: '/static/pdfs/01Intro.pdf',
            ruta_imagen: '/static/img/01Intro.jpg',
          },
          {
            id: 1,
            nombre: 'Intro01',
            ruta_pdf: '/static/pdfs/01Intro.pdf',
            ruta_imagen: '/static/img/01Intro.jpg',
          },
          {
            id: 1,
            nombre: 'Intro01',
            ruta_pdf: '/static/pdfs/01Intro.pdf',
            ruta_imagen: '/static/img/01Intro.jpg',
          },
          
          // Agrega más objetos de archivos aquí
        ],
      };
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
  </style>