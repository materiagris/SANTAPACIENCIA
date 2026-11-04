# SANTAPACIENCIA · Wedding & Event Planner — web

Web estática (HTML + CSS + JS, sin dependencias ni compilación) para GitHub Pages con el dominio `santapacienciaeventos.com`.

Esta primera versión reproduce las secciones y los textos de la antigua web en Wix:

| Página | Archivo | Contenido de la web antigua |
|---|---|---|
| Santapaciencia | `index.html` | Inicio: pase de fotos y "Especialistas en bodas" |
| Prints | `prints.html` | Prints, Invitaciones y Papelería personalizada (Otras cosas importantes) |
| Nosotras | `nosotras.html` | Así somos + la entrada del blog "Nuestra historia" |
| Santas novias | `santas-novias.html` | Las 10 novias del carrusel + la entrada "Marta, nuestra maravillosa desastre" |
| Contacto | `contacto.html` | Texto y formulario (Nombre, Correo, Asunto, Mensaje) |

El aviso de protección de datos (RGPD) está en el pie de todas las páginas, como en la web antigua.

## 1. Descargar las fotos (una sola vez, antes de subir)

Las fotos se han descargado a `assets/img/` mediante las siguientes utilidades:

- **Mac / Linux**: abre una terminal en esta carpeta y ejecuta `bash descargar-imagenes.sh`
- **Windows**: clic derecho en `descargar-imagenes.ps1` → *Ejecutar con PowerShell*

La lista de fotos y sus nombres está en `imagenes.txt`. Para cambiar una foto, basta con sustituir el archivo en `assets/img/` manteniendo el nombre.

## 2. Formulario de contacto

GitHub Pages no procesa formularios. Crea un formulario gratuito en [Formspree](https://formspree.io) con `info@santapacienciaeventos.com` y sustituye `FORM_ID` en `contacto.html`. Mientras tanto, el botón *Enviar* abre el programa de correo con el mensaje ya escrito. Los botones "Solicita presupuesto" de Prints rellenan el asunto automáticamente.

## 3. Publicación en GitHub Pages

1. Se ha creado un repositorio y subido todo el contenido de esta carpeta (con las fotos ya descargadas) a la rama `main`.
2. **Settings → Pages → Build and deployment**: *Deploy from a branch*, rama `main`, carpeta `/ (root)`.
3. **Settings → Pages → Custom domain**: `santapacienciaeventos.com` (el archivo `CNAME` ya lo incluye).

## 4. Llevar el dominio a GitHub

1. Se quitó la redirección a Wix y los registros A / CNAME antiguos.
3. Registros **A** para `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. (Opcional) Registros **AAAA** para `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
5. **CNAME** para `www` → `TU-USUARIO.github.io`
6. Cuando el DNS propague, marca **Enforce HTTPS** en Settings → Pages. Así la web tendrá por fin certificado seguro.

## Estilo unificado

Variables al principio de `assets/css/styles.css`:

| Token | Valor | Uso |
|---|---|---|
| `--fondo` | `#f4f4f3` | Fondo |
| `--fondo-2` | `#e7e7e5` | Fondos secundarios |
| `--tinta` | `#1e1e1f` | Texto y pie |
| `--gris` | `#4a4a4d` | Color principal, botones, bloque destacado |
| `--plata` | `#8e8e8e` | Detalles, estrellas ✦ y la línea que tacha "SANTA" |
| Logotipo | Raleway 300/400 | `SANTA` tachado + `PACIENCIA`, como el logo original |
| Titulares | Fraunces | Con una palabra en cursiva gris |
| Texto | DM Sans | Cuerpo y botones |
