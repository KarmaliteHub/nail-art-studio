# Guía de Despliegue - Bella Nails

## Preparación para Producción

### 1. Variables de Entorno
Asegúrate de configurar las siguientes variables de entorno en tu plataforma de despliegue:

```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=tu_supabase_anon_key
```

### 2. Configuración de Supabase

#### Base de Datos
- Ejecuta las migraciones en `supabase/migrations/`
- Configura las políticas RLS (Row Level Security)
- Crea el bucket de storage para imágenes

#### Autenticación
- Habilita la autenticación por email
- Configura el proveedor de email (SMTP)
- Establece las URLs de redirección

### 3. Comandos de Build

```bash
# Instalar dependencias
npm install

# Build para producción
npm run build

# Preview del build
npm run preview
```

### 4. Plataformas de Despliegue Recomendadas

#### Vercel
1. Conecta tu repositorio
2. Configura las variables de entorno
3. Deploy automático

#### Netlify
1. Conecta tu repositorio
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Configura las variables de entorno

#### Railway/Render
1. Conecta tu repositorio
2. Configura las variables de entorno
3. Deploy automático

### 5. Configuración Post-Despliegue

#### Primer Usuario Administrador
1. Registra el primer usuario desde `/admin/login`
2. Verifica el email
3. Configura los ajustes básicos desde el panel

#### Personalización
- Sube el logo de la empresa
- Configura los colores de marca
- Actualiza la información de contacto
- Añade las primeras imágenes a la galería

### 6. Mantenimiento

#### Backups
- Configura backups automáticos de Supabase
- Respalda las imágenes del storage

#### Monitoreo
- Configura alertas de Supabase
- Monitorea el uso de storage
- Revisa logs de errores

### 7. Seguridad

#### Configuración de Dominio
- Configura HTTPS
- Actualiza las URLs permitidas en Supabase
- Configura CORS si es necesario

#### Políticas de Seguridad
- Revisa las políticas RLS
- Configura rate limiting
- Habilita 2FA para administradores

## Notas Importantes

- La aplicación está completamente desvinculada de Lovable
- Todos los sistemas son independientes y personalizables
- El código es 100% propiedad del cliente
- No hay dependencias externas a servicios de Lovable

## Soporte

Para soporte técnico, contacta al equipo de desarrollo con los detalles específicos de tu despliegue.