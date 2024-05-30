
<template>
  <div class="GWZ7yf AJFihd LBlAUc">
    <div class="Dy8Cxc QRiHXd">
      <span class="VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-INsAgc FL3Khc">
        Tus apuntes
      </span>
    </div>
    <div class="IPGLSb">
      <div class="QRiHXd J2Cevf" guidedhelpid="submissionManager">
        <div>
          <div  class="VfPpkd-xl07Ob-XxIAqe-OWXEXe-oYxtQd" >
            
              <div class=" d-grid VfPpkd-dgl2Hf-ppHlrf-sM5MNb" data-is-touch-wrapper="true">
                <button class="VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-INsAgc VfPpkd-LgbsSe-OWXEXe-Bz112c-M1Soyc VfPpkd-LgbsSe-OWXEXe-dgl2Hf Rj2Mlf OLiIxf  FL3Khc" >
                  <svg focusable="false" width="24" height="24" viewBox="0 0 24 24" class="a7AG0 NMm5M">
                    <path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z">
                    </path>
                  </svg>
                  <span >Añadir archivo</span>
                </button>
              </div>
            
            <div > 
              <div class="VfPpkd-xl07Ob-XxIAqe VfPpkd-xl07Ob q6oraf P77izf"  data-is-hoisted="true" data-should-flip-corner-horizontally="false" data-stay-in-viewport="false" data-menu-uid="ucc-151">
              </div>
            </div>
          </div>
        </div>
      </div><div >
        <div class=" d-grid VfPpkd-dgl2Hf-ppHlrf-sM5MNb" data-is-touch-wrapper="true">
          <button class="VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-k8QpJ VfPpkd-LgbsSe-OWXEXe-dgl2Hf nCP5yc AjY5Oe DuMIQc   upBbve bDxw8b" >
            <div class="VfPpkd-RLmnJb"></div>
            <span>Subir</span>
          </button>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker?url';

// Crear una URL válida a partir del objeto pdfjsWorker
const workerSrcUrl = new URL(pdfjsWorker, import.meta.url).toString();
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrcUrl;

export default {
  data() {
    return {
      archivoPDF: null,
      directorioVirtual: null,
    };
  },
  methods: {
    handleFileUpload() {
      this.archivoPDF = this.$refs.fileInput.files[0];
    },
    async guardarArchivos() {
      if (!this.archivoPDF) {
        console.error('No se ha seleccionado ningún archivo PDF');
        return;
      }

      const reader = new FileReader();
      reader.onload = async () => {
        const pdfData = new Uint8Array(reader.result);
        const pdfDoc = await pdfjsLib.getDocument(pdfData).promise;
        const page = await pdfDoc.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
          canvasContext: context,
          viewport,
        };
        await page.render(renderContext);

        const coverImage = canvas.toDataURL('image/jpeg');
        const pdfName = this.archivoPDF.name;

        try {
          const directoryHandle = await window.showDirectoryPicker();
          const fileHandle = await directoryHandle.getFileHandle('/static/pdf/' + pdfName, { create: true });
          const writable = await fileHandle.createWritable();
          await writable.write(this.archivoPDF);
          writable.close();

          const imgBlob = this.dataURItoBlob(coverImage);
          const imgFileHandle = await directoryHandle.getFileHandle('/static/img/' + `${pdfName.split('.')[0]}.jpg`, { create: true });
          const imgWritable = await imgFileHandle.createWritable();
          await imgWritable.write(imgBlob);
          imgWritable.close();

          console.log('Archivos guardados correctamente');
        } catch (error) {
          console.error('Error al guardar los archivos:', error);
        }
      };

      reader.readAsArrayBuffer(this.archivoPDF);
    },
    dataURItoBlob(dataURI) {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    },
  },
};
</script>
<style>
.GWZ7yf {
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .3), 0 2px 6px 2px rgba(60, 64, 67, .15);
  border-radius: .5rem;
  overflow: hidden;
  max-width: 600px; /* Establece el ancho máximo deseado */
  width: 600x;
  padding: 16px;
  

}

.AJFihd {
    padding: 1.5rem;
}


.LBlAUc {
    margin-bottom: 1.5rem;

}
* {
    -webkit-tap-highlight-color: transparent;
}
user agent stylesheet
div {
    display: block;
    unicode-bidi: isolate;
}

@media (max-width: 40em) {
    body {
        font-size: .875rem;
    }
}
.VfPpkd-LgbsSe-OWXEXe-INsAgc .VfPpkd-RLmnJb {
    left: -1px;
    width: calc(100% + 2px);
}

.VfPpkd-LgbsSe .VfPpkd-RLmnJb {
    position: absolute;
    top: 50%;
    height: 48px;
    left: 0;
    right: 0;
    transform: translateY(-50%);
}
* {
    -webkit-tap-highlight-color: transparent;
}
user agent stylesheet
div {
    display: block;
    unicode-bidi: isolate;
}
.UvHKof .FL3Khc:not(:disabled) {
    color: rgb(32, 33, 36);
}
.Rj2Mlf:not(:disabled) {
    color: rgb(26, 115, 232);
    color: var(--gm-hairlinebutton-ink-color, rgb(26, 115, 232));
    
}
.VfPpkd-LgbsSe-OWXEXe-INsAgc:not(:disabled) {
    color: #6200ee;
}
.VfPpkd-LgbsSe:not(:disabled) {
    color: #6200ee;
}
.Rj2Mlf {
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: .875rem;
    letter-spacing: .0107142857em;
    font-weight: 500;
    text-transform: none;
    transition: border .28s cubic-bezier(.4,0,.2,1), box-shadow .28s cubic-bezier(.4,0,.2,1);
    box-shadow: none;
}
.VfPpkd-LgbsSe-OWXEXe-INsAgc {
    font-family: Roboto, sans-serif;
    font-size: .875rem;
    letter-spacing: .0892857143em;
    font-weight: 500;
    text-transform: uppercase;
    height: 36px;
    border-radius: 4px;
    padding: 0 15px 0 15px;
    border-width: 1px;
}
.VfPpkd-LgbsSe {
    font-family: Roboto, sans-serif;
    font-size: .875rem;
    letter-spacing: .0892857143em;
    font-weight: 500;
    text-transform: uppercase;
    height: 36px;
    border-radius: 4px;
}
.VfPpkd-LgbsSe {
    --mdc-ripple-fg-size: 0;
    --mdc-ripple-left: 0;
    --mdc-ripple-top: 0;
    --mdc-ripple-fg-scale: 1;
    --mdc-ripple-fg-translate-end: 0;
    --mdc-ripple-fg-translate-start: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    will-change: transform, opacity;
}
.VfPpkd-LgbsSe {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-decoration: none;
}
.VfPpkd-LgbsSe {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: 64px;
    border: none;
    outline: none;
    line-height: inherit;
    user-select: none;
    -webkit-appearance: none;
    overflow: visible;
    vertical-align: middle;
    background: transparent;
}


button {
    
    text-rendering: auto;
    color: buttontext;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    text-align: center;
    cursor: default;
}

@media (max-width: 40em) {
    body {
        font-size: .875rem;
    }
}
body {
    color: rgba(0, 0, 0, .87);
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    font-size: .8125rem;
    font-weight: 400;
    line-height: 1.25rem;
    margin: 0;
    min-width: 18.75rem;
}
body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: rgba(0, 0, 0, .87);
    font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
    margin: 0;
    text-size-adjust: 100%;
}
.VfPpkd-LgbsSe .VfPpkd-RLmnJb {
    position: absolute;
    top: 50%;
    height: 48px;
    left: 0;
    right: 0;
    transform: translateY(-50%);
}

.IPGLSb {
  border-color: #333;
}
</style>