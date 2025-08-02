# Docker Setup para Solaria App Frontend

## Comandos Docker Básicos

### 1. Construir la imagen para producción
```bash
docker build -t solaria-frontend .
```

### 2. Ejecutar el contenedor para producción
```bash
docker run -d -p 8080:80 --name solaria-app solaria-frontend
```

### 3. Usar Docker Compose para producción
```bash
docker-compose up -d
```

### 4. Usar Docker Compose para desarrollo
```bash
docker-compose --profile dev up
```

## URLs de Acceso

- **Producción**: http://localhost:8080
- **Desarrollo**: http://localhost:4200

## Comandos Útiles

### Ver logs del contenedor
```bash
docker logs solaria-app
```

### Detener el contenedor
```bash
docker stop solaria-app
```

### Eliminar el contenedor
```bash
docker rm solaria-app
```

### Eliminar la imagen
```bash
docker rmi solaria-frontend
```

### Acceder al contenedor
```bash
docker exec -it solaria-app sh
```

## Desarrollo con Docker

Para desarrollo con hot reload, puedes usar:
```bash
docker-compose --profile dev up
```

Esto montará tu código local en el contenedor y cualquier cambio se reflejará automáticamente.

## Notas

- La aplicación de producción se sirve con nginx en el puerto 80 del contenedor
- La aplicación de desarrollo se sirve con ng serve en el puerto 4200 del contenedor
- Los archivos estáticos tienen configuración de caché optimizada
- El routing de Angular está configurado correctamente para funcionar con nginx
