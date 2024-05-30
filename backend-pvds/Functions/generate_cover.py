import os
from pdf2image import convert_from_path

def guardar_pdf_y_portada(pdf_path, output_dir):
    # Obtener el nombre del archivo PDF
    pdf_name = os.path.basename(pdf_path)

    # Generar la imagen de portada del PDF
    images = convert_from_path(pdf_path, first_page=1, last_page=1)
    cover_image = images[0]

    # Guardar la imagen de portada
    cover_image_path = os.path.join(output_dir, f"{pdf_name.split('.')[0]}.jpg")
    cover_image.save(cover_image_path, 'JPEG')

    return pdf_name, cover_image_path

if __name__ == "__main__":
    import sys
    pdf_path = sys.argv[1]
    output_dir = sys.argv[2]

    pdf_name, cover_image_path = guardar_pdf_y_portada(pdf_path, output_dir)
    print(f"PDF guardado en: {pdf_path}")
    print(f"Imagen de portada guardada en: {cover_image_path}")
    print(f"Nombre del PDF: {pdf_name}")