# Guía de Configuración SendGrid para Bella Nails

## Paso 1: Crear cuenta en SendGrid

1. Ve a [SendGrid.com](https://sendgrid.com)
2. Crea una cuenta gratuita (incluye 100 emails/día gratis)
3. Verifica tu email y completa el setup inicial

## Paso 2: Verificar dominio de email (Importante)

1. En SendGrid Dashboard → Settings → Sender Authentication
2. Click "Authenticate Your Domain"
3. Ingresa tu dominio (ej: bellanails.com) o usa un subdominio (ej: mail.bellanails.com)
4. Copia los registros DNS que te proporciona SendGrid
5. Añade estos registros en tu proveedor de DNS
6. Espera la verificación (puede tomar hasta 48 horas)

**Alternativa si no tienes dominio propio:**
- Usa "Single Sender Verification"
- Verifica el email específico que usarás para enviar

## Paso 3: Crear API Key

1. En SendGrid Dashboard → Settings → API Keys
2. Click "Create API Key"
3. Nombre: "Bella Nails Supabase"
4. Permisos: "Restricted Access"
5. Selecciona permisos:
   - Mail Send: Full Access
   - Template Engine: Read Access (opcional)
6. Click "Create & View"
7. **COPIA LA API KEY INMEDIATAMENTE** (no se mostrará de nuevo)

## Paso 4: Configurar SMTP en Supabase

1. Ve a tu proyecto Supabase → Settings → Authentication
2. Scroll hasta "SMTP Settings"
3. Configura:
   - **Enable custom SMTP**: ✅ Activado
   - **SMTP Host**: `smtp.sendgrid.net`
   - **SMTP Port**: `587`
   - **SMTP User**: `apikey` (exactamente así, no cambies)
   - **SMTP Pass**: [Pega aquí tu SendGrid API Key]
   - **SMTP Admin Email**: [Tu email verificado en SendGrid]

## Paso 5: Personalizar plantillas de email

1. En Supabase → Authentication → Email Templates
2. Personaliza cada plantilla:

### Plantilla de Confirmación de Registro:
```html
<h2>¡Bienvenido a Bella Nails!</h2>
<p>Gracias por registrarte en nuestro sistema administrativo.</p>
<p>Para completar tu registro, haz click en el siguiente enlace:</p>
<p><a href="{{ .ConfirmationURL }}">Confirmar mi cuenta</a></p>
<p>Si no solicitaste esta cuenta, puedes ignorar este email.</p>
<br>
<p>Saludos,<br>Equipo Bella Nails</p>
```

### Plantilla de Recuperación de Contraseña:
```html
<h2>Recuperación de Contraseña - Bella Nails</h2>
<p>Recibimos una solicitud para restablecer tu contraseña.</p>
<p>Haz click en el siguiente enlace para crear una nueva contraseña:</p>
<p><a href="{{ .ConfirmationURL }}">Restablecer contraseña</a></p>
<p>Si no solicitaste este cambio, puedes ignorar este email.</p>
<br>
<p>Saludos,<br>Equipo Bella Nails</p>
```

## Paso 6: Configurar URLs de redirección

1. En Supabase → Authentication → URL Configuration
2. Configura:
   - **Site URL**: Tu dominio de producción (ej: https://bellanails.com)
   - **Redirect URLs**: 
     - `https://tudominio.com/admin/login`
     - `https://tudominio.com/admin/dashboard`
     - `http://localhost:8080/admin/login` (para desarrollo)

## Paso 7: Probar configuración

1. Ve a tu aplicación local
2. Intenta registrar un nuevo usuario desde `/admin/login`
3. Verifica que llegue el email de confirmación
4. Prueba también la recuperación de contraseña

## Notas importantes:

- **Límites gratuitos**: 100 emails/día
- **Para producción**: Considera plan pagado de SendGrid
- **Monitoreo**: Revisa estadísticas en SendGrid Dashboard
- **Deliverability**: La verificación de dominio mejora significativamente la entrega

## Troubleshooting común:

- **Emails no llegan**: Verifica spam/junk folder
- **Error de autenticación**: Verifica que la API Key sea correcta
- **Dominio no verificado**: Puede afectar la entrega, completa la verificación

¿Necesitas ayuda con algún paso específico?