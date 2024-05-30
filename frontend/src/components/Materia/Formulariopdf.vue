<template>
    <div>
      <h1>Formulario para Imagenes</h1>
      <form @submit.prevent="subirImagen" enctype="multipart/form-data">
        <input @change="clickImagen($event)" type="file" accept="image/*" />
        <input type="submit" value="Subir Imagen" />
      </form>
      <button @click="cargarImagenes">CARGAR IMAGENES</button>
      <div v-if="imagendesc" l="false">
        <div v-for="img in imagenes" v-bind:key="img">
          <img height="100" width="100" :src="img" alt="" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { storage } from "../firebaseconf";
  const ref = storage.ref();
  
  export default {
    data() {
      return {
        imagenes: [],
        imagen: null,
        imagendesc: false,
      };
    },
    methods: {
      clickImagen(e) {
        this.imagen = e.target.files[0];
        console.log(this.imagen);
      },
      subirImagen() {
        // Crear referencia de donde se guarda la imagen
        const refImg = ref.child(`imagenes/${this.imagen.name}`);
        const metadata = { contentType: "img/jpeg" };
        refImg.put(this.imagen, metadata).then((e) => console.log(e));
      },
      cargarImagenes() {
        ref.child("/imagenes")
          .listAll()
          .then((res) => {
            res.items.map((item) =>
              ref.child(item.location.path)
                .getDownloadURL()
                .then((url) => {
                  // Agregar la URL a imagendesc:true
                  this.imagendesc = true
                  this.imagenes.push(url)
                  console.log(this.imagenes)
                })
            )
          })
      }
    }
  };
  </script>