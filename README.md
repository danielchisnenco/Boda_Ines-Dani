# Boda Ines & Daniel — 04.09.2027

Web de invitacion de boda. Pagina estatica (HTML/CSS/JS puro) con formulario de confirmacion de asistencia (RSVP) conectado a Google Sheets.

## Estructura del proyecto

```
Boda/
├── index.html          # Pagina principal de la invitacion
├── formulario.html     # Formulario de confirmacion (RSVP)
├── css/
│   └── styles.css      # Estilos globales (pagina principal + formulario)
├── js/
│   ├── main.js         # Countdown y animaciones de scroll
│   ├── form.js         # Logica del formulario (acompanantes, envio a Google Sheets)
│   └── i18n.js         # Internacionalizacion (ES / EU / RO)
└── img/
    ├── hero-photo.png  # Foto principal
    └── icons/          # Iconos de cada seccion (masia, copas, bus, etc.)
```

## Secciones de la pagina principal

| Seccion       | Descripcion                                              |
|---------------|----------------------------------------------------------|
| Hero          | Foto con nombres superpuestos                            |
| Info          | "Nos casamos" + fecha y hora                             |
| Countdown     | Cuenta atras en tiempo real hasta el 4 de septiembre     |
| Venue         | Restaurante Akebaso, Atxondo (enlace a Google Maps)      |
| Timeline      | Itinerario del dia (12:30h - 23:30h)                     |
| Transporte    | Informacion del autobus ida/vuelta                       |
| Regalo        | IBAN oculto tras boton                                   |
| RSVP          | Enlace al formulario de confirmacion                     |
| Album         | Boton para subir fotos (pendiente de enlace)             |

## Formulario RSVP

- Nombre, apellidos y confirmacion de asistencia
- Alergias y dietas especiales
- Acompanantes dinamicos (anadir/eliminar)
- Transporte (ida, vuelta, parada de bajada)
- Comentarios y sugerencia de cancion
- Los datos se envian a un Google Apps Script que los registra en una hoja de calculo

Si el invitado marca "no asisto", se ocultan las secciones de alergias, acompanantes y transporte.

## Idiomas

La web soporta tres idiomas, seleccionables desde el boton superior derecho:

- **ES** — Espanol
- **EU** — Euskera
- **RO** — Rumano

La seleccion se guarda en `localStorage` y se mantiene entre visitas.

## Ejecutar en local

1. Abre una terminal y navega a la carpeta del proyecto:

   ```bash
   cd /Users/chisndan/Documents/aa-/Boda
   ```

2. Levanta un servidor local con Python:

   ```bash
   python3 -m http.server 8080
   ```

3. Abre en el navegador:

   ```
   http://localhost:8080
   ```

> Se necesita un servidor local (no abrir el archivo directamente) para que funcionen correctamente las peticiones al Google Apps Script y la carga de fuentes de Google Fonts.

## Tecnologias

- HTML5 / CSS3 / JavaScript vanilla
- Google Fonts (Playfair Display + Lato)
- Google Apps Script (backend del formulario)
- IntersectionObserver (animaciones de scroll)
