# 🔧 Configuración de Supabase para Producción

## URLs de la aplicación desplegada:
- **URL Principal**: https://nail-art-studio-phi.vercel.app
- **URL de Producción**: https://nail-art-studio-hbrsj3m9c.vercel.app

## Configuración requerida en Supabase:

### 1. Ve a tu proyecto Supabase → Settings → Authentication

### 2. Actualiza "Site URL":
```
https://nail-art-studio-phi.vercel.app
```

### 3. Actualiza "Redirect URLs" (añade estas líneas):
```
https://nail-art-studio-phi.vercel.app/admin/login?verified=true
https://nail-art-studio-phi.vercel.app/admin/login
https://nail-art-studio-phi.vercel.app/
http://localhost:8080/admin/login?verified=true
http://localhost:8080/admin/login
http://localhost:8080/
```

### 4. Verifica que esté habilitado:
- ✅ Enable email confirmations: SÍ
- ❌ Enable email OTP: NO

## ¡LISTO! 

Tu aplicación Bella Nails ya está completamente desplegada y funcionando en:
**https://nail-art-studio-phi.vercel.app**

### Próximos pasos:
1. Actualiza las URLs en Supabase (arriba)
2. Prueba el registro y login en producción
3. Configura el primer usuario administrador
4. Personaliza la aplicación desde el panel admin