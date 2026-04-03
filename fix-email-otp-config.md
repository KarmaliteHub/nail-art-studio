# Configuración Email OTP - Bella Nails

## Problema identificado
La aplicación espera códigos de 6 dígitos pero Supabase está enviando enlaces de confirmación.

## Solución paso a paso

### 1. Configurar Email OTP en Supabase

Ve a tu proyecto Supabase → **Settings** → **Authentication**

#### En la sección "Email":
- ❌ **DESACTIVA**: "Enable email confirmations"
- ❌ **DESACTIVA**: "Secure email change" 
- ✅ **ACTIVA**: "Enable email OTP"

#### En la sección "Email OTP":
- ✅ **ACTIVA**: "Enable email OTP"
- **OTP expiry**: 600 (10 minutos)
- **OTP length**: 6 (6 dígitos)

### 2. Actualizar plantilla de email

Ve a **Authentication** → **Email Templates** → **"Confirm signup"**

**Asunto:**
```
Código de verificación - Bella Nails
```

**Cuerpo del email:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #d4849a, #c4677e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .code { font-size: 32px; font-weight: bold; text-align: center; background: #fff; padding: 20px; border-radius: 10px; letter-spacing: 5px; margin: 20px 0; border: 2px solid #d4849a; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>¡Bienvenido a Bella Nails!</h1>
            <p>Tus uñas, nuestra pasión</p>
        </div>
        <div class="content">
            <h2>Código de verificación</h2>
            <p>Para completar tu registro, ingresa este código en la aplicación:</p>
            
            <div class="code">{{ .Token }}</div>
            
            <p><strong>⚠️ Importante:</strong></p>
            <ul>
                <li>Este código expira en 10 minutos</li>
                <li>Solo puedes usarlo una vez</li>
                <li>Si no solicitaste esta cuenta, ignora este email</li>
            </ul>
            
            <p>Si tienes problemas, puedes solicitar un nuevo código desde la aplicación.</p>
        </div>
    </div>
</body>
</html>
```

### 3. Verificar configuración

Después de hacer estos cambios:

1. Ve a `http://localhost:8080/admin/login`
2. Intenta registrar un nuevo usuario
3. Verifica que ahora llegue un email con un código de 6 dígitos
4. Ingresa el código en la aplicación
5. Confirma que funcione la verificación

### 4. Si sigue sin funcionar

Si después de estos cambios sigue enviando enlaces en lugar de códigos:

1. Espera 5-10 minutos (los cambios pueden tardar en aplicarse)
2. Verifica que guardaste los cambios en Supabase
3. Prueba con un email diferente
4. Revisa la configuración de "Email OTP" esté realmente activada

## Resultado esperado

- ✅ Email con código de 6 dígitos (ej: 123456)
- ✅ Sin enlaces de confirmación
- ✅ Verificación funciona en la aplicación
- ✅ Flujo completo de registro operativo

## Notas

- Esta configuración es más segura que los enlaces
- Los códigos expiran automáticamente
- Es más fácil de usar en dispositivos móviles
- Evita problemas de redirección