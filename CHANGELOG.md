# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto usa [Versionado Semántico](https://semver.org/lang/es/).

## [1.1.0] - 2026-07-10

### Added

- La app ahora es una **Progressive Web App (PWA)**: se puede instalar en el
  celular o el computador y funciona como una app nativa.
- `manifest.json` con nombre, ícono, colores de tema y modo `standalone`.
- Service Worker (`sw.js`) con caché del "app shell" y estrategia
  *stale-while-revalidate* para los datos de farmacias, permitiendo abrir la
  app y ver la última información aunque no haya conexión.
- Página `offline.html` de respaldo cuando no hay red y tampoco hay caché.
- Set de íconos (incluye variantes *maskable*) y `favicon.ico`.
- Banner de instalación para iOS/Safari con instrucciones de "Compartir →
  Agregar a pantalla de inicio", y botón de instalación nativo en
  Android/Chrome (`beforeinstallprompt`).
- Aviso visual cuando el dispositivo pierde la conexión a internet.
- Botón "📍" para volver a solicitar la ubicación del usuario sin recargar
  la página.
- Distintivo de distancia (km) en las tarjetas cuando el listado está
  ordenado por cercanía.
- Este archivo `CHANGELOG.md`.

### Changed

- **Rediseño completo de la interfaz con estética iOS**: tipografía del
  sistema (San Francisco), tarjetas redondeadas, header con efecto de
  cristal esmerilado (*blur*), colores adaptados a modo claro/oscuro
  (`prefers-color-scheme`) y áreas seguras para dispositivos con notch
  (`env(safe-area-inset-*)`).
- Se reemplazó Bootstrap por CSS propio, más liviano y a medida, para
  reducir el peso de la página y mejorar el tiempo de carga.
- El mapa ahora usa una capa de mosaicos estilo Apple Maps (CARTO Positron)
  y marcadores personalizados en lugar de los íconos por defecto de Leaflet.
- Metadatos Open Graph / Twitter actualizados para usar el ícono propio de
  la app en vez de una imagen externa.

## [1.0.3] - 2026-06-22

### Fixed

- Mejoras en el flujo de geolocalización del usuario.

## [1.0.2] - 2024-10-07

### Changed

- Mejora en el tiempo de carga: las tarjetas de farmacias se insertan en el
  DOM en un solo paso en lugar de una por una.

## [1.0.1] - 2024-10-02

### Added

- Metadatos SEO, Open Graph y Twitter Cards.

## [1.0.0] - 2024-09-30

### Added

- Primera versión: listado de farmacias de turno obtenidas desde la API del
  Ministerio de Salud de Chile, selector de comuna, mapa interactivo con
  Leaflet y enlaces directos a Google Maps y Waze.
