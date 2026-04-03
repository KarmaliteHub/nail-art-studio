# Guía de Configuración Gmail SMTP para Bella Nails

## Paso 1: Preparar tu cuenta de Gmail

### Opción A: Usar tu Gmail personal
1. Ve a tu cuenta de Gmail
2. Click en tu foto de perfil → "Gestionar tu cuenta de Google"
3. Ve a "Seguridad" en el menú lateral

### Opción B: Crear Gmail específico para la aplicación (Recomendado)
1. Crea una nueva cuenta: `bellanails.sistema@gmail.com` (o similar)
2. Usa esta cuenta exclusivamente para el sistema

## Paso 2: Habilitar verificación en 2 pasos

1. En "Seguridad" → "Verificación en 2 pasos"
2. Click "Empezar" y sigue los pasos
3. Usa tu teléfono para recibir códigos
4. **Esto es obligatorio para generar contraseñas de aplicación**

## Paso 3: Generar contraseña de aplicación

1. En "Seguridad" → "Contraseñas de aplicaciones"
2. Selecciona "Correo" y "Otro (nombre personalizado)"
3. Escribe: "Bella Nails Supabase"
4. Click "Generar"
5. **COPIA LA CONTRASEÑA DE 16 CARACTERES** (ej: `abcd efgh ijkl mnop`)

## Paso 4: Configurar SMTP en Supabase

1. Ve a tu proyecto Supabase → Settings → Authentication
2. Scroll hasta "SMTP Settings"
3. Configura:
   - **Enable custom SMTP**: ✅ Activado
   - **SMTP Host**: `smtp.gmail.com`
   - **SMTP Port**: `587`
   - **SMTP User**: `tu-email@gmail.com`
   - **SMTP Pass**: `[Contraseña de aplicación de 16 caracteres]`
   - **SMTP Admin Email**: `tu-email@gmail.com`

## Paso 5: Personalizar plantillas de email

1. En Supabase → Authentication → Email Templates
2. Usa las plantillas del archivo `email-templates.html`

### Plantilla simple de Confirmación:
```
Asunto: Confirma tu cuenta - Bella Nails

¡Bienvenido a Bella Nails!
Tus uñas, nuestra pasión.

Para completar tu registro, haz click aquí:
{{ .ConfirmationURL }}

Si no solicitaste esta cuenta, ignora este email.

Saludos,
Equipo Bella Nails
```

### Plantilla simple de Recuperación:
```
Asunto: Recuperar contraseña - Bella Nails

Hola,

Recibimos una solicitud para restablecer tu contraseña.

Haz click aquí para crear una nueva contraseña:
{{ .ConfirmationURL }}

Este enlace expira en 1 hora.

Si no solicitaste este cambio, ignora este email.

Saludos,
Equipo Bella Nails
```

## Paso 6: Configurar URLs de redirección

1. En Supabase → Authentication → URL Configuration
2. Configura:
   - **Site URL**: `http://localhost:8080` (por ahora)
   - **Redirect URLs**: 
     - `http://localhost:8080/admin/login`
     - `http://localhost:8080/admin/dashboard`

## Paso 7: Probar configuración

1. Ve a tu aplicación: `http://localhost:8080/admin/login`
2. Click en "¿No tienes cuenta? Regístrate"
3. Registra un nuevo usuario
4. Verifica que llegue el email de confirmación
5. Click en el enlace del email
6. Confirma que puedes acceder al dashboard

## Configuración rápida (Resumen):

```
SMTP Host: smtp.gmail.com
SMTP Port: 587
SMTP User: tu-email@gmail.com
SMTP Pass: [contraseña de aplicación de 16 caracteres]
SMTP Admin Email: tu-email@gmail.com
```

## Troubleshooting:

### Error "Username and Password not accepted"
- Verifica que tienes 2FA habilitado
- Usa contraseña de aplicación, NO tu contraseña normal
- Verifica que el email sea correcto

### Emails no llegan
- Revisa carpeta de spam
- Verifica que la configuración SMTP esté guardada
- Prueba con otro email para descartar problemas del destinatario

### Error de conexión
- Verifica que el puerto sea 587
- Asegúrate que el host sea `smtp.gmail.com`

## Límites de Gmail:
- **Gratuito**: 500 emails/día
- **Google Workspace**: 2000 emails/día
- Suficiente para la mayoría de aplicaciones

¿Listo para configurar? ¡Es mucho más rápido que SendGrid!