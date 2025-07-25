# 📚 Documentación de Desarrollo - Frontend E-commerce

## 📋 Índice

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
4. [Estructura de Carpetas](#estructura-de-carpetas)
5. [Funcionalidades Principales](#funcionalidades-principales)
6. [Configuración del Proyecto](#configuración-del-proyecto)
7. [Scripts Disponibles](#scripts-disponibles)
8. [Gestión de Estado](#gestión-de-estado)
9. [Enrutamiento](#enrutamiento)
10. [Guía de Desarrollo](#guía-de-desarrollo)
11. [Convenciones de Código](#convenciones-de-código)
12. [Testing](#testing)
13. [Despliegue](#despliegue)

---

## 🎯 Descripción del Proyecto

Este es el frontend de una aplicación de e-commerce desarrollada con React y TypeScript. La aplicación permite a los usuarios navegar productos, gestionar un carrito de compras, realizar pedidos y administrar el inventario (para administradores).

### Características Principales:
- **Tienda Online**: Catálogo de productos con categorías
- **Gestión de Usuarios**: Registro, login y perfiles de usuario
- **Carrito de Compras**: Agregar, eliminar y modificar productos
- **Panel de Administración**: Gestión completa de productos, categorías y usuarios
- **Historial de Pedidos**: Seguimiento de compras realizadas
- **Reportes**: Análisis de ventas y estadísticas

---

## 🛠️ Tecnologías Utilizadas

### Framework y Librerías Core
- **React 19.1.0**: Librería principal para la interfaz de usuario
- **TypeScript 5.8.3**: Superset tipado de JavaScript
- **Vite 6.3.5**: Herramienta de build y desarrollo rápido

### Gestión de Estado
- **Zustand 5.0.5**: Gestión de estado global ligera
- **TanStack Query 5.83.0**: Gestión de estado del servidor y cache

### Enrutamiento y Navegación
- **React Router DOM 7.6.2**: Enrutamiento del lado del cliente

### Estilos y UI
- **Tailwind CSS 4.1.10**: Framework CSS utilitario
- **Heroicons React 2.2.0**: Iconos SVG optimizados

### Comunicación con Backend
- **Axios 1.10.0**: Cliente HTTP para peticiones a la API

### Notificaciones
- **React Hot Toast 2.5.2**: Notificaciones tipo toast

### Herramientas de Desarrollo
- **ESLint 9.25.0**: Linter para código JavaScript/TypeScript
- **Prettier 3.5.3**: Formateador de código
- **Vite Plugin React SWC**: Compilador rápido para React

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una **arquitectura basada en características (Feature-Based Architecture)** que organiza el código por funcionalidades de negocio rather than por tipos técnicos.

### Principios Arquitectónicos:

1. **Separación de Responsabilidades**: Cada feature maneja su propia lógica
2. **Reutilización**: Componentes y utilidades compartidas
3. **Escalabilidad**: Fácil agregar nuevas características
4. **Mantenibilidad**: Código organizado y predecible

### Flujo de Datos:

```
UI Components → Hooks → Services → API → Backend
     ↓           ↓        ↓
   Zustand ← TanStack Query ← Axios
```

---

## 📁 Estructura de Carpetas

```
frontend/
├── public/                          # Archivos estáticos
│   └── logo.svg                     # Logo de la aplicación
│
├── src/                             # Código fuente principal
│   ├── App.tsx                      # Componente raíz de la aplicación
│   ├── main.tsx                     # Punto de entrada de React
│   ├── index.css                    # Estilos globales
│   ├── App.css                      # Estilos del componente App
│   └── vite-env.d.ts               # Tipos de Vite
│
│   ├── assets/                      # Recursos estáticos
│   │   └── react.svg               # Logo de React
│
│   ├── features/                    # Características de la aplicación
│   │   ├── auth/                    # 🔐 Autenticación y autorización
│   │   │   ├── components/          # Componentes de UI
│   │   │   │   ├── Login.tsx        # Formulario de login
│   │   │   │   └── Register.tsx     # Formulario de registro
│   │   │   ├── context/             # Contexto de React
│   │   │   │   └── AuthContext.tsx  # Proveedor de autenticación
│   │   │   ├── hooks/               # Hooks personalizados
│   │   │   │   └── useAuth.ts       # Hook para autenticación
│   │   │   └── services/            # Servicios de API
│   │   │       └── authService.ts   # Servicio de autenticación
│   │   │
│   │   ├── cart/                    # 🛒 Carrito de compras
│   │   │   ├── components/          
│   │   │   │   ├── Cart.tsx         # Componente del carrito
│   │   │   │   └── CartDetail.tsx   # Detalle del carrito
│   │   │   └── store/               
│   │   │       └── cartStore.ts     # Store Zustand del carrito
│   │   │
│   │   ├── categories/              # 📂 Gestión de categorías
│   │   │   ├── components/          
│   │   │   │   ├── CategoriesSection.tsx    # Sección de categorías
│   │   │   │   ├── CategoryForm.tsx         # Formulario de categoría
│   │   │   │   └── CategorySection.tsx      # Categoría individual
│   │   │   ├── hooks/               
│   │   │   │   └── useCategories.ts # Hook para categorías
│   │   │   └── store/               
│   │   │       └── categoryStore.ts # Store de categorías
│   │   │
│   │   ├── dashboard/               # 📊 Panel de administración
│   │   │   └── components/          
│   │   │       ├── AdminDashboard.tsx # Dashboard principal
│   │   │       └── DashboardPanel.tsx # Panel de control
│   │   │
│   │   ├── orders/                  # 📦 Gestión de pedidos
│   │   │   ├── components/          
│   │   │   │   ├── OrderHistory.tsx # Historial de pedidos
│   │   │   │   └── OrdersSection.tsx # Sección de pedidos
│   │   │   ├── hooks/               
│   │   │   │   └── useOrders.ts     # Hook para pedidos
│   │   │   └── services/            
│   │   │       └── orderService.ts  # Servicio de pedidos
│   │   │
│   │   ├── products/                # 🏷️ Gestión de productos
│   │   │   ├── components/          
│   │   │   │   ├── ProductCard.tsx      # Tarjeta de producto
│   │   │   │   ├── ProductForm.tsx      # Formulario de producto
│   │   │   │   ├── ProductGrid.tsx      # Grilla de productos
│   │   │   │   └── ProductsSection.tsx  # Sección de productos
│   │   │   ├── hooks/               
│   │   │   │   └── useProducts.ts   # Hook para productos
│   │   │   ├── interfaces/          
│   │   │   │   └── product.ts       # Tipos TypeScript
│   │   │   ├── services/            
│   │   │   │   └── productService.ts # Servicio de productos
│   │   │   └── store/               
│   │   │       └── productStore.ts  # Store de productos
│   │   │
│   │   ├── reports/                 # 📈 Reportes y análisis
│   │   │   └── components/          
│   │   │       └── ReportsSection.tsx # Sección de reportes
│   │   │
│   │   ├── summary/                 # 📋 Resúmenes
│   │   │   └── components/          
│   │   │       └── SummarySection.tsx # Sección de resumen
│   │   │
│   │   └── users/                   # 👥 Gestión de usuarios
│   │       ├── index.ts             # Exportaciones del módulo
│   │       ├── components/          
│   │       │   ├── UserForm.tsx     # Formulario de usuario
│   │       │   ├── UserProfile.tsx  # Perfil de usuario
│   │       │   └── UsersSection.tsx # Sección de usuarios
│   │       ├── hooks/               
│   │       │   └── useUsers.ts      # Hook para usuarios
│   │       └── services/            
│   │           └── userService.ts   # Servicio de usuarios
│   │
│   └── shared/                      # 🔄 Recursos compartidos
│       ├── components/              # Componentes reutilizables
│       │   ├── Header.tsx           # Encabezado de la aplicación
│       │   ├── HeroSection.tsx      # Sección hero
│       │   ├── Logo.tsx             # Componente del logo
│       │   └── ProtectedRoute.tsx   # Rutas protegidas
│       ├── services/                # Servicios compartidos
│       │   └── api.ts               # Configuración de Axios
│       └── utils/                   # Utilidades
│           └── formatCOP.ts         # Formatear moneda colombiana
│
├── eslint.config.js                 # Configuración de ESLint
├── index.html                       # Archivo HTML principal
├── package.json                     # Dependencias y scripts
├── pnpm-lock.yaml                   # Lock file de pnpm
├── README.md                        # Documentación básica
├── tsconfig.app.json                # Config TypeScript para app
├── tsconfig.json                    # Config TypeScript principal
├── tsconfig.node.json               # Config TypeScript para Node
└── vite.config.ts                   # Configuración de Vite
```

---

## ⚡ Funcionalidades Principales

### 👤 Autenticación y Autorización
- **Registro de usuarios**: Creación de cuentas nuevas
- **Inicio de sesión**: Autenticación con JWT
- **Perfiles de usuario**: Gestión de información personal
- **Roles**: Diferenciación entre usuarios y administradores
- **Rutas protegidas**: Acceso controlado según permisos

### 🛍️ Tienda Online
- **Catálogo de productos**: Visualización de inventario
- **Búsqueda y filtros**: Encontrar productos específicos
- **Categorías**: Organización de productos
- **Detalles de producto**: Información completa de cada item

### 🛒 Carrito de Compras
- **Agregar productos**: Añadir items al carrito
- **Gestión de cantidad**: Modificar cantidades
- **Eliminar productos**: Remover items del carrito
- **Persistencia**: Carrito guardado en localStorage
- **Cálculo de totales**: Suma automática de precios

### 📦 Gestión de Pedidos
- **Realizar pedidos**: Proceso de checkout
- **Historial**: Ver pedidos anteriores
- **Estados de pedido**: Seguimiento de estado
- **Detalles**: Información completa de cada pedido

### 🔧 Panel de Administración
- **Dashboard**: Vista general del sistema
- **Gestión de productos**: CRUD completo
- **Gestión de categorías**: Administrar clasificaciones
- **Gestión de usuarios**: Administrar cuentas
- **Reportes**: Análisis de ventas y métricas

---

## ⚙️ Configuración del Proyecto

### Requisitos Previos
- **Node.js**: Versión 18 o superior
- **pnpm**: Gestor de paquetes (recomendado)
- **Git**: Control de versiones

### Instalación
```bash
# Clonar el repositorio
git clone [URL-del-repositorio]
cd simple-ecommerce/frontend

# Instalar dependencias
pnpm install

# Copiar variables de entorno
cp .env.example .env.local

# Iniciar el servidor de desarrollo
pnpm dev
```

### Variables de Entorno
```env
# URL del backend API
VITE_API_URL=http://localhost:8080/api

# Entorno de desarrollo
VITE_ENV=development
```

### Configuración de Alias
En `vite.config.ts`:
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
    '@features': path.resolve(__dirname, './src/features'),
    '@shared': path.resolve(__dirname, './src/shared')
  }
}
```

---

## 🚀 Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Inicia servidor de desarrollo en http://localhost:5173

# Construcción
pnpm build        # Construye la aplicación para producción

# Linting
pnpm lint         # Ejecuta ESLint para revisar código

# Vista previa
pnpm preview      # Previsualiza la build de producción
```

---

## 🗄️ Gestión de Estado

### Zustand (Estado Cliente)
Utilizado para estado global del carrito y preferencias:

```typescript
// Ejemplo: cartStore.ts
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) => set((state) => ({ /* lógica */ })),
      // ... más acciones
    }),
    { name: 'cart-storage' }
  )
);
```

### TanStack Query (Estado Servidor)
Gestiona cache y sincronización con el backend:

```typescript
// Ejemplo: useProducts.ts
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
```

### React Context
Para autenticación y estado compartido:

```typescript
// AuthContext.tsx
export function AuthProvider({ children }) {
  const { user, isAuthenticated } = useAuthStatus();
  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

## 🛣️ Enrutamiento

### Estructura de Rutas

```typescript
// App.tsx
<Routes>
  {/* Rutas públicas */}
  <Route path="/" element={<HeroSection />} />
  <Route path="/products" element={<ProductGrid />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  
  {/* Rutas protegidas */}
  <Route path="/cart" element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  } />
  
  {/* Rutas de administrador */}
  <Route path="/admin/*" element={
    <ProtectedRoute adminOnly>
      <AdminDashboard />
    </ProtectedRoute>
  } />
</Routes>
```

### Protección de Rutas
```typescript
// ProtectedRoute.tsx
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;
  
  return children;
}
```

---

## 👨‍💻 Guía de Desarrollo

### Creando una Nueva Feature

1. **Crear la estructura de carpetas**:
```bash
src/features/nueva-feature/
├── components/
├── hooks/
├── services/
├── store/ (si es necesario)
└── interfaces/ (si es necesario)
```

2. **Implementar el servicio**:
```typescript
// services/nuevaFeatureService.ts
export const nuevaFeatureService = {
  getAll: () => api.get('/nueva-feature'),
  create: (data) => api.post('/nueva-feature', data),
  // ... más métodos
};
```

3. **Crear el hook personalizado**:
```typescript
// hooks/useNuevaFeature.ts
export const useNuevaFeature = () => {
  return useQuery({
    queryKey: ['nueva-feature'],
    queryFn: () => nuevaFeatureService.getAll(),
  });
};
```

4. **Desarrollar los componentes**:
```typescript
// components/NuevaFeature.tsx
export default function NuevaFeature() {
  const { data, isLoading } = useNuevaFeature();
  
  if (isLoading) return <div>Cargando...</div>;
  
  return (
    <div>
      {/* JSX del componente */}
    </div>
  );
}
```

### Agregando Nuevas Rutas

1. **Importar el componente en App.tsx**
2. **Agregar la ruta correspondiente**
3. **Configurar protección si es necesaria**

### Trabajando con Estado Global

1. **Para estado del cliente (Zustand)**:
```typescript
// Crear store en feature/store/
export const useNuevoStore = create((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));
```

2. **Para estado del servidor (TanStack Query)**:
```typescript
// Usar en hooks personalizados
export const useServerData = () => {
  return useQuery({
    queryKey: ['server-data'],
    queryFn: fetchServerData,
  });
};
```

---

## 📝 Convenciones de Código

### Nomenclatura
- **Componentes**: PascalCase (`ProductCard.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useProducts.ts`)
- **Servicios**: camelCase con sufijo `Service` (`productService.ts`)
- **Interfaces**: PascalCase (`Product.ts`)
- **Variables**: camelCase (`productList`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Estructura de Archivos
```typescript
// 1. Imports externos
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Imports internos
import { productService } from '../services/productService';
import type { Product } from '../interfaces/product';

// 3. Tipos/Interfaces locales
interface Props {
  productId: string;
}

// 4. Componente principal
export default function ProductDetail({ productId }: Props) {
  // Hook calls
  const { data, isLoading } = useQuery(...);
  
  // Event handlers
  const handleClick = () => { /* ... */ };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Estilos con Tailwind
```typescript
// Usar clases descriptivas y organizadas
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <h2 className="text-xl font-semibold text-gray-800">
    Título del Producto
  </h2>
  <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
    Agregar al Carrito
  </button>
</div>
```

### Manejo de Errores
```typescript
// En servicios
try {
  const response = await api.get('/products');
  return response.data;
} catch (error) {
  console.error('Error fetching products:', error);
  throw new Error('No se pudieron cargar los productos');
}

// En componentes
const { data, error, isLoading } = useQuery({
  queryKey: ['products'],
  queryFn: productService.getAll,
  retry: 3,
  retryDelay: 1000,
});

if (error) {
  return <div>Error: {error.message}</div>;
}
```

---

## 🧪 Testing

### Configuración de Testing
```bash
# Instalar dependencias de testing
pnpm add -D @testing-library/react @testing-library/jest-dom vitest
```

### Ejemplo de Test
```typescript
// components/__tests__/ProductCard.test.tsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Producto Test',
    price: 100,
    image: 'test.jpg'
  };

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Producto Test')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });
});
```

### Ejecutar Tests
```bash
pnpm test          # Ejecutar tests una vez
pnpm test:watch    # Ejecutar tests en modo watch
pnpm test:coverage # Ejecutar con coverage
```

---

## 🚀 Despliegue

### Build de Producción
```bash
# Generar build optimizada
pnpm build

# Los archivos se generan en dist/
```

### Variables de Entorno de Producción
```env
VITE_API_URL=https://api.tudominio.com
VITE_ENV=production
```

### Despliegue en Vercel
1. Conectar repositorio con Vercel
2. Configurar variables de entorno
3. Deploy automático en cada push a main

### Despliegue en Netlify
1. Build command: `pnpm build`
2. Publish directory: `dist`
3. Configurar redirects para SPA

---

## 📚 Recursos Adicionales

### Documentación de Tecnologías
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TanStack Query](https://tanstack.com/query)
- [Zustand](https://docs.pmnd.rs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

### Herramientas de Desarrollo
- [VS Code](https://code.visualstudio.com/)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [TanStack Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)

---

## 🤝 Contribución

### Flujo de Trabajo
1. **Fork** del repositorio
2. **Crear rama** para la feature: `git checkout -b feature/nueva-funcionalidad`
3. **Commits** descriptivos: `git commit -m "feat: agregar carrito de compras"`
4. **Push** a la rama: `git push origin feature/nueva-funcionalidad`
5. **Pull Request** con descripción detallada

### Convenciones de Commits
```
feat: nueva funcionalidad
fix: corrección de bug
docs: actualización de documentación
style: cambios de formato
refactor: refactorización de código
test: agregar o modificar tests
chore: tareas de mantenimiento
```

---

## 🐛 Solución de Problemas

### Problemas Comunes

**Error de CORS**:
- Verificar configuración del backend
- Comprobar URL de la API

**Problemas de Build**:
- Limpiar cache: `pnpm cache clean`
- Reinstalar dependencias: `rm -rf node_modules && pnpm install`

**Errores de TypeScript**:
- Verificar tipos en interfaces
- Comprobar imports y exports

### Logs y Debugging
```typescript
// Habilitar logs en desarrollo
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}

// React Query DevTools (solo en desarrollo)
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      {/* App components */}
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </>
  );
}
```

---

## 📞 Contacto y Soporte

Para preguntas o soporte técnico:
- **Repositorio**: [GitHub Repository](https://github.com/E-commerce-tech-store/Frontend)
- **Issues**: Reportar bugs en GitHub Issues
- **Documentación**: Este archivo de documentación

---

*Última actualización: Julio 2025*

---

> **Nota**: Esta documentación es un documento vivo que debe actualizarse conforme evolucione el proyecto. Todos los desarrolladores son responsables de mantener esta documentación actualizada.
