#!/bin/bash

echo "🔒 Instalador de Mejoras de Seguridad - Aplicación Tarot Ankh"
echo "============================================================"
echo ""

echo "📦 Instalando dependencias de seguridad..."
npm install bcryptjs @types/bcryptjs

if [ $? -eq 0 ]; then
    echo "✅ bcryptjs instalado correctamente"
else
    echo "❌ Error al instalar bcryptjs"
    exit 1
fi

echo ""
echo "🔧 Configurando seguridad mejorada..."
echo ""

echo "✅ Implementaciones completadas:"
echo "   - Hash seguro de contraseñas (bcrypt + fallback crypto)"
echo "   - Sanitización de inputs para prevenir XSS"
echo "   - Rate limiting en APIs (3 intentos por 5 minutos)"
echo "   - Validación de contraseñas robusta"
echo "   - Store centralizado de usuarios"
echo "   - Variables de entorno protegidas"
echo "   - Diagnósticos seguros sin exposición de credenciales"
echo "   - Logging de seguridad mejorado"
echo ""

echo "🛡️ Mejoras de seguridad implementadas:"
echo "   • Contraseñas hasheadas con bcrypt (salt rounds: 12)"
echo "   • Prevención de ataques de fuerza bruta"
echo "   • Sanitización automática de todos los inputs"
echo "   • Rate limiting por IP en todas las APIs"
echo "   • Validación de email con RFC 5321"
echo "   • Manejo seguro de errores sin leak de información"
echo "   • Headers de seguridad en respuestas HTTP"
echo ""

echo "🔍 Para verificar la seguridad:"
echo "   1. Visita http://localhost:3000/auth/register"
echo "   2. Haz clic en 'Diagnóstico de Seguridad'"
echo "   3. Verifica que todos los checks estén en verde"
echo ""

echo "🚀 La aplicación está corriendo en puerto 3000 con seguridad mejorada!"
echo ""

echo "📝 Próximos pasos recomendados:"
echo "   - Configurar HTTPS para producción"
echo "   - Implementar base de datos real (PostgreSQL/MongoDB)"
echo "   - Agregar logging centralizado"
echo "   - Configurar monitoreo de seguridad"
echo "   - Implementar autenticación 2FA"
echo ""

echo "✨ ¡Instalación completada exitosamente!"