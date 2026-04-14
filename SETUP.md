# Oxygen.tech — Setup Completo del Proyecto

Guía paso a paso para dejar el sitio web funcionando en producción.
Marca cada paso con ✅ cuando lo completes.

---

## Estado actual
- [x] Sitio web desarrollado en Next.js (localhost:3000)
- [x] Código commiteado localmente en Git
- [x] Documentación de componentes en COMPONENTS.md
- [ ] Subido a GitHub
- [ ] Desplegado en AWS Amplify
- [ ] Dominio oxygen.tech conectado
- [ ] Sanity CMS configurado
- [ ] Equipo con acceso

---

## FASE 1 — GitHub

### 1.1 Crear el repositorio
- [ ] Ir a github.com e iniciar sesión con la cuenta de la empresa
- [ ] Clic en "New repository" (botón verde arriba a la derecha)
- [ ] Configurar así:
  ```
  Repository name: oxygen-website
  Visibility: Private ✓
  ❌ NO marcar "Add a README file"
  ❌ NO marcar "Add .gitignore"
  ❌ NO marcar "Choose a license"
  ```
- [ ] Clic en "Create repository"
- [ ] Copiar la URL del repo (ejemplo: https://github.com/oxygen-tech/oxygen-website.git)

### 1.2 Subir el código
- [ ] Abrir terminal en la carpeta del proyecto:
  ```
  C:/Users/arman/Desktop/Code/oxygen-local
  ```
- [ ] Ejecutar estos comandos (reemplazar URL con la del paso anterior):
  ```bash
  git remote add origin https://github.com/TU-ORG/oxygen-website.git
  git push -u origin master
  ```
- [ ] Verificar en GitHub que aparecen todos los archivos ✓

**Anota aquí la URL de tu repo:** ___________________________________

---

## FASE 2 — AWS Amplify (Hosting)

### 2.1 Crear la app en Amplify
- [ ] Entrar a la consola de AWS
- [ ] Buscar "Amplify" en el buscador de servicios
- [ ] Clic en "Create new app"
- [ ] Seleccionar "GitHub" como fuente
- [ ] Clic en "Connect to GitHub" y autorizar el acceso
- [ ] Seleccionar el repositorio "oxygen-website"
- [ ] Seleccionar el branch "master"

### 2.2 Configurar el build
- [ ] Verificar que Amplify detecta Next.js automáticamente
- [ ] Confirmar que la configuración dice:
  ```
  Build command:  npm run build
  Output dir:     .next
  ```
- [ ] Clic en "Save and deploy"
- [ ] Esperar 3-5 minutos a que termine el primer build

### 2.3 Verificar que funciona
- [ ] Abrir la URL temporal que da Amplify (ej: https://main.d1abc123.amplifyapp.com)
- [ ] Verificar que el sitio se ve igual que en localhost ✓

**Anota aquí la URL de Amplify:** ___________________________________

---

## FASE 3 — Dominio oxygen.tech

### 3.1 Conectar el dominio
- [ ] En Amplify, ir a "Domain management" → "Add domain"
- [ ] Escribir: oxygen.tech
- [ ] Clic en "Configure domain"

### 3.2 Configurar DNS
Amplify te muestra registros DNS. Depende de dónde está registrado el dominio:

**Si el dominio está en Route 53 (AWS):**
- [ ] Amplify lo configura automáticamente → solo confirmar

**Si el dominio está en otro proveedor (GoDaddy, Cloudflare, Namecheap, etc.):**
- [ ] Copiar los registros CNAME que muestra Amplify
- [ ] Entrar al panel del proveedor del dominio
- [ ] Agregar los registros CNAME copiados
- [ ] Guardar cambios

**Anota aquí dónde está registrado el dominio:** ___________________________________

### 3.3 Verificar
- [ ] Esperar 10-30 minutos para que propaguen los DNS
- [ ] Abrir https://oxygen.tech → debe cargar el sitio ✓
- [ ] Verificar que el SSL (candado) aparece en el browser ✓

---

## FASE 4 — Sanity CMS

### 4.1 Crear cuenta y proyecto
- [ ] Ir a sanity.io
- [ ] Clic en "Start for free"
- [ ] Crear cuenta con el email de la empresa
- [ ] Crear nuevo proyecto con esta configuración:
  ```
  Project name: Oxygen Website
  Dataset:      production
  Plan:         Free
  ```
- [ ] Copiar el Project ID (código de 8 caracteres en el dashboard)

**Anota aquí el Project ID:** ___________________________________

### 4.2 Instalar Sanity en el proyecto
- [ ] Abrir terminal en la carpeta del proyecto:
  ```
  C:/Users/arman/Desktop/Code/oxygen-local
  ```
- [ ] Ejecutar (reemplazar TU-PROJECT-ID):
  ```bash
  npm create sanity@latest -- --project-id TU-PROJECT-ID --dataset production
  ```
- [ ] Cuando pregunte el output path, escribir: ./studio
- [ ] Esperar que termine la instalación

### 4.3 Verificar el panel localmente
- [ ] Ejecutar:
  ```bash
  cd studio
  npm run dev
  ```
- [ ] Abrir http://localhost:3333
- [ ] Debe aparecer el panel de Sanity ✓

### 4.4 Conectar Sanity al sitio Next.js
- [ ] Escribirle a Claude Code para conectar Sanity al proyecto
- [ ] Definir qué contenido será editable:
  - [ ] Textos del hero
  - [ ] Equipo (/nosotros)
  - [ ] Testimonios
  - [ ] Contenido por industria (/soluciones/*)
  - [ ] Blog / recursos

### 4.5 Deploy del studio en Sanity
- [ ] Ejecutar para publicar el panel online:
  ```bash
  cd studio
  npx sanity deploy
  ```
- [ ] Elegir un nombre para el studio (ej: oxygen-studio)
- [ ] El panel quedará en: https://oxygen-studio.sanity.studio ✓

### 4.6 Dar acceso al equipo
- [ ] En sanity.io/manage → tu proyecto → "Members"
- [ ] Invitar por email a cada persona que necesite editar contenido
- [ ] Roles recomendados:
  - Marketing/contenido → "Editor"
  - Dev → "Administrator"

---

## FASE 5 — Accesos y equipo

### 5.1 GitHub
- [ ] Ir a github.com → repositorio → "Settings" → "Collaborators"
- [ ] Invitar a los devs que necesiten acceso al código
- [ ] Roles:
  - Dev principal → "Admin"
  - Devs colaboradores → "Write"

### 5.2 AWS Amplify
- [ ] Dar acceso de AWS IAM a los devs que necesiten ver logs y deploys
- [ ] O compartir acceso de solo lectura a la consola de Amplify

### 5.3 Sanity
- [ ] Ya cubierto en Fase 4.6

---

## FASE 6 — Verificación final

- [ ] https://oxygen.tech carga correctamente
- [ ] SSL activo (candado verde en el browser)
- [ ] Todas las páginas funcionan:
  - [ ] / (home)
  - [ ] /nosotros
  - [ ] /oxypulse
  - [ ] /oxyplanner
  - [ ] /consultoria
  - [ ] /soluciones/metalmecanico
  - [ ] /soluciones/mineria
  - [ ] /soluciones/alimentos
  - [ ] /soluciones/logistica
  - [ ] /soluciones/papel
  - [ ] /soluciones/pharma
- [ ] Animaciones de scroll funcionando
- [ ] Navbar funciona en mobile
- [ ] Formulario de contacto en /nosotros funciona
- [ ] Panel de Sanity accesible en https://oxygen-studio.sanity.studio
- [ ] Equipo tiene acceso a GitHub, Sanity y Amplify

---

## Flujo de trabajo post-setup

### Para cambiar contenido (marketing)
```
Entrar a oxygen-studio.sanity.studio
→ Editar el contenido
→ Publicar
→ El sitio se actualiza automáticamente
```

### Para cambiar diseño o código (dev)
```
Editar código en Cursor o con Claude Code
→ git add . && git commit -m "descripción del cambio"
→ git push
→ Amplify detecta el push automáticamente
→ Build y deploy en ~2-3 minutos
→ oxygen.tech actualizado
```

### Si algo falla en producción
```
Ir a AWS Amplify → ver logs del build
→ Si el error es de código: corregir y volver a pushear
→ Si necesitas volver a la versión anterior:
  Amplify → "Deployments" → versión anterior → "Redeploy"
```

---

## Contactos y recursos

| Recurso | URL | Credenciales |
|---|---|---|
| GitHub repo | https://github.com/TU-ORG/oxygen-website | cuenta empresa |
| AWS Amplify | https://console.aws.amazon.com/amplify | cuenta AWS |
| Sanity Studio | https://oxygen-studio.sanity.studio | cuenta empresa |
| Sitio en producción | https://oxygen.tech | público |
| Sitio local dev | http://localhost:3000 | solo local |

---

## Notas importantes

- **Nunca edites código directamente en AWS** — siempre edita localmente y pushea a GitHub
- **El diseño y animaciones** solo se cambian via código (Cursor / Claude Code), no desde Sanity
- **Sanity es solo para contenido** — textos, imágenes, datos del equipo
- **Cada git push a master** dispara un deploy automático — asegúrate de que el código funciona en local antes de pushear
- **Para probar cambios sin publicarlos** — usa un branch distinto a master (Amplify generará una URL de preview)

---

*Documento generado el 2026-04-02*
*Sitio desarrollado con Claude Code + Next.js 15 + Tailwind CSS*
