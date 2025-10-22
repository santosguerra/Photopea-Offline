# Fast PNG Minifier

Una herramienta web para optimizar archivos PNG y convertir JPGs a PNG optimizados.

## 📝 Descripción

**Fast PNG Minifier** es una aplicación web que permite comprimir y optimizar imágenes PNG, así como convertir archivos JPG a PNG optimizados. Todo el procesamiento se realiza en tu navegador, garantizando la privacidad de tus archivos.

## ✨ Características

- ✅ **Optimización de PNG**: Reduce el tamaño de archivos PNG mediante cuantización de colores
- ✅ **Conversión JPG a PNG**: Convierte archivos JPEG a PNG optimizados
- ✅ **Ajuste de calidad**: Control deslizante para ajustar el balance entre tamaño y calidad (2-256 colores)
- ✅ **Procesamiento por lotes**: Arrastra y suelta múltiples archivos simultáneamente
- ✅ **Vista previa en tiempo real**: Visualiza la imagen comprimida antes de guardar
- ✅ **Comparación de tamaños**: Muestra el tamaño original vs comprimido y el porcentaje de reducción
- ✅ **Exportación flexible**: Guarda archivos individuales o todos en un archivo ZIP
- ✅ **Procesamiento en el navegador**: Tus archivos nunca salen de tu computadora
- ✅ **Soporte para transparencia**: Mantiene el canal alpha en imágenes PNG

## 🚀 Cómo usar

1. Descarga o clona este repositorio
2. Abre el archivo `index.html` en tu navegador
   - Puedes abrirlo directamente haciendo doble clic
   - O ejecutar un servidor HTTP local:
     ```bash
     python -m http.server 8000
     ```
     Y visitar `http://localhost:8000/`

### Uso de la herramienta

1. **Arrastra y suelta** tus archivos PNG o JPG en la zona indicada, o haz clic para seleccionarlos
2. Ajusta el slider **Size ↔ Quality** según tus necesidades:
   - Más hacia "Size": Menor tamaño, menor calidad (menos colores)
   - Más hacia "Quality": Mayor calidad, mayor tamaño (más colores)
3. Visualiza la comparación de tamaños en la lista de archivos
4. Haz clic en **"Save"** para guardar un archivo individual
5. Haz clic en **"Save all (ZIP)"** para descargar todos los archivos optimizados en un ZIP

## 📦 Formatos Soportados

### Entrada
- **PNG**: Todos los tipos (con/sin transparencia, animados APNG)
- **JPG/JPEG**: Se convierten automáticamente a PNG optimizado

### Salida
- **PNG**: Único formato de salida
- **ZIP**: Para descarga por lotes

## 🛠️ Tecnologías

Este proyecto utiliza las siguientes librerías:

- **UPNG.js** (34 KB) - Codificación/decodificación PNG
- **pako.js** (46 KB) - Librería de compresión
- **UZIP.js** (5.2 KB) - Creación de archivos ZIP
- **ext.js** (811 KB) - Incluye PDFJS para soporte JPG

## 📄 Licencia y Atribución

Este proyecto es una **obra derivada** de [UPNG.js](https://github.com/photopea/UPNG.js) por [Photopea](https://www.photopea.com/).

### Licencia MIT

Copyright (c) 2017 Photopea

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia de este software y archivos de documentación asociados (el "Software"), para utilizar el Software sin restricciones, incluyendo sin limitación los derechos de uso, copia, modificación, fusión, publicación, distribución, sublicencia y/o venta de copias del Software, y para permitir a las personas a quienes se les proporcione el Software hacer lo mismo, sujeto a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias o porciones sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A LAS GARANTÍAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DEL COPYRIGHT SERÁN RESPONSABLES DE CUALQUIER RECLAMO, DAÑO U OTRA RESPONSABILIDAD, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O DE OTRO MODO, QUE SURJA DE, FUERA DE O EN CONEXIÓN CON EL SOFTWARE O EL USO U OTROS TRATOS EN EL SOFTWARE.

### Créditos

- **Proyecto original**: [UPNG.js](https://github.com/photopea/UPNG.js)
- **Creador original**: [Photopea](https://www.photopea.com/)
- **Interfaz web**: Basada en [upng.photopea.com](https://upng.photopea.com/)

## 🔧 Estructura del Proyecto

```
upng.photopea.com/
├── index.html              # Aplicación principal
├── style.css               # Estilos de la interfaz
├── README.md               # Este archivo
├── CHANGELOG.md            # Registro de cambios
├── js/
│   ├── pako.js            # Librería de compresión
│   ├── UPNG.js            # Codificador/decodificador PNG
│   ├── UZIP.js            # Creador de archivos ZIP
│   └── ext.js             # PDFJS y utilidades adicionales
├── bunny.png              # Imagen de ejemplo
├── grass.png              # Recurso gráfico
└── grid.png               # Patrón de fondo
```

## ⚙️ Requisitos

- Navegador web moderno con soporte para:
  - JavaScript ES6+
  - FileReader API
  - Canvas API
  - Blob/URL APIs

## 🐛 Problemas conocidos

- La conversión de JPG a PNG puede resultar en archivos más grandes que el original JPG
- El formato de salida es exclusivamente PNG (no guarda como JPG)

## 🤝 Contribuciones

Este es un proyecto derivado con fines educativos y de uso personal. Si deseas contribuir al proyecto original, visita [UPNG.js en GitHub](https://github.com/photopea/UPNG.js).

## 📚 Referencias

- [UPNG.js - GitHub](https://github.com/photopea/UPNG.js)
- [Photopea - Editor de imágenes online](https://www.photopea.com/)
- [Blog de Photopea - PNG Minifier](https://blog.photopea.com/png-minifier-inside-photopea.html)

---

**Nota**: Esta herramienta procesa todos los archivos en tu navegador. Ningún archivo se sube a servidores externos, garantizando la privacidad completa de tus datos.
