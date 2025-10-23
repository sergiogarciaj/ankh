#!/bin/bash

echo "🔍 Buscando procesos en puerto 3000..."

# Try to find and kill processes using port 3000
PID=$(ss -tlnp | grep :3000 | grep -o 'pid=[0-9]*' | cut -d= -f2 | head -1)

if [ ! -z "$PID" ]; then
    echo "📋 Encontrado proceso en puerto 3000: PID $PID"
    
    # Try to kill the process nicely first
    echo "🛑 Intentando terminar proceso $PID amablemente..."
    kill $PID 2>/dev/null
    sleep 2
    
    # Check if it's still running
    if kill -0 $PID 2>/dev/null; then
        echo "⚡ Forzando terminación del proceso $PID..."
        kill -9 $PID 2>/dev/null || echo "❌ No se pudo terminar (puede requerir privilegios de root)"
    else
        echo "✅ Proceso terminado exitosamente"
    fi
    
    sleep 1
else
    echo "🔍 No se encontró proceso específico en puerto 3000"
fi

# Clean up any remaining next processes
echo "🧹 Limpiando procesos Next.js..."
pkill -f "next dev" 2>/dev/null || echo "No hay procesos next dev para limpiar"
pkill -f "next-server" 2>/dev/null || echo "No hay procesos next-server para limpiar"

# Wait a moment
sleep 2

echo "🚀 Iniciando servidor en puerto 3000..."

# Set environment variables and start Next.js
export PORT=3000
export NEXT_PRIVATE_SKIP_CHECK=1

# Start Next.js development server
npm run dev