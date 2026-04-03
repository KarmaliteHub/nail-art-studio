# Debug Email OTP - Bella Nails

## Pasos para solucionar el error 403

### 1. Verificar configuración en Supabase

Ve a tu proyecto Supabase → **Settings** → **Authentication**:

#### Sección "Email":
```
✅ Enable signup: SÍ
❌ Enable email confirmations: NO
✅ Enable email OTP: SÍ
```

#### Sección "Email OTP":
```
✅ Enable email OTP: SÍ
OTP expiry: 600 (10 minutos)
OTP length: 6
```

### 2. Verificar plantilla de email

Ve a **Authentication** → **Email Templates** → **"Magic Link"**:

**Asunto:**
```
Código de verificación - Bella Nails
```

**Cuerpo:**
```html
<h2>Código de verificación - Bella Nails</h2>
<p>Tu código de verificación es:</p>
<h1 style="font-size: 32px; font-weight: bold; text-align: center; background: #f0f0f0; padding: 20px; border-radius: 10px; letter-spacing: 5px;">{{ .Token }}</h1>
<p>Este código expira en 10 minutos.</p>
```

### 3. Probar flujo paso a paso

1. **Registro nuevo usuario:**
   - Ve a `/admin/login`
   - Click "Regístrate"
   - Ingresa email/contraseña NUEVOS
   - Click "Crear Cuenta"

2. **Verificar email recibido:**
   - Revisa bandeja de entrada
   - Debe llegar código de 6 dígitos
   - NO debe ser un enlace

3. **Verificar código:**
   - Ingresa código INMEDIATAMENTE (no esperes)
   - Click "Verificar Email"

### 4. Si sigue fallando

#### Opción A: Usar confirmación por enlace (MÁS CONFIABLE)
```
✅ Enable email confirmations: SÍ
❌ Enable email OTP: NO
```

#### Opción B: Verificar logs de Supabase
1. Ve a tu proyecto Supabase
2. Logs → Auth logs
3. Busca errores relacionados con OTP

### 5. Configuración alternativa (Híbrida)

Si Email OTP sigue fallando, podemos usar un enfoque híbrido:
1. Registro normal con confirmación por enlace
2. Login normal con email/contraseña
3. Sin códigos OTP

¿Prefieres que implementemos la configuración alternativa más confiable?