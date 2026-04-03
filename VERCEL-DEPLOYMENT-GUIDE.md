# 🚀 Guía de Despliegue en Vercel - Bella Nails

## Opción 1: Despliegue con GitHub (RECOMENDADO)

### 1. Subir código a GitHub
```bash
# Si no tienes repositorio, créalo:
git init
git add .
git commit -m "Initial commit - Bella Nails ready for deployment"

# Crear repositorio en GitHub y conectar:
git remote add origin https://github.com/tu-usuario/bella-nails.git
git push -u origin main
```

### 2. Desplegar en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Click "New Project"
4. Selecciona tu repositorio "bella-nails"
5. Configura las variables de entorno:
   - `VITE_SUPABASE_URL`: `https://wsegcutozgqbudidxyzz.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzZWdjdXRvemdxYnVkaWR4eXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NzY5OTcsImV4cCI6MjA5MDQ1Mjk5N30.DqzXxxnpVU-JZWreT_RqRrntvBQuxQzMBguBg6007D8`
6. Click "Deploy"

## Opción 2: Despliegue directo con Vercel CLI

### 1. Instalar Vercel CLI
```bash
npm install -g vercel
```

### 2. Login y desplegar
```bash
vercel login
vercel --prod
```

### 3. Configurar variables de entorno
```bash
vercel env add VITE_SUPABASE_URL
# Pegar: https://wsegcutozgqbudidxyzz.supabase.co

vercel env add VITE_SUPABASE_PUBLISHABLE_KEY
# Pegar: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzZWdjdXRvemdxYnVkaWR4eXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NzY5OTcsImV4cCI6MjA5MDQ1Mjk5N30.DqzXxxnpVU-JZWreT_RqRrntvBQuxQzMBguBg6007D8
```

### 4. Redesplegar con variables
```bash
vercel --prod
```

## Paso 3: Configurar Supabase para producción

Una vez desplegado, actualiza las URLs en Supabase:

1. Ve a tu proyecto Supabase → Settings → Authentication
2. Actualiza "Site URL": `https://tu-app.vercel.app`
3. Actualiza "Redirect URLs": `https://tu-app.vercel.app/admin/login?verified=true`

## Resultado esperado

- ✅ Aplicación desplegada en: `https://tu-proyecto.vercel.app`
- ✅ SSL automático habilitado
- ✅ CDN global de Vercel
- ✅ Despliegues automáticos en cada push (si usas GitHub)

## Dominio personalizado (Opcional)

1. En Vercel Dashboard → Settings → Domains
2. Añade tu dominio personalizado
3. Configura DNS según las instrucciones
4. Actualiza URLs en Supabase con tu dominio

## Monitoreo

- **Analytics**: Vercel Analytics automático
- **Logs**: Vercel Dashboard → Functions
- **Performance**: Vercel Speed Insights

¡Tu aplicación Bella Nails estará online en minutos!