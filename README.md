# 🌳📓 Diario con Árboles (JavaScript ES6) — Árbol General y Árbol Binario

Este proyecto es una página web (un solo archivo HTML) que simula las **entradas de un diario** usando **árboles** como estructura de datos, con el objetivo de que el estudiante aprenda a modelar información jerárquica y a recorrerla.

Incluye dos enfoques, pensados para comparación didáctica:

- **Árbol General (N-ario)** → un nodo puede tener **N hijos** (ideal para hilos, jerarquías, menús, categorías, comentarios).
- **Árbol Binario** → un nodo tiene **máximo 2 hijos** (izquierda/derecha). En el ejemplo se usa como **Árbol Binario de Búsqueda (BST)**, ordenado por una *key* numérica.

El proyecto está diseñado para estudiantes de **Creatividad Digital** que necesitan comprender estructuras de datos **con una metáfora visual y narrativa**: un diario con entradas y respuestas, y un diario ordenado por claves.

---

## ✅ Objetivos de aprendizaje

### Objetivo general
Desarrollar la capacidad del estudiante para **representar, organizar y recorrer información** mediante **árboles generales y árboles binarios**, relacionando conceptos abstractos de programación con una interfaz visual interactiva (diario digital).

### Objetivos específicos
Al finalizar la actividad, el estudiante será capaz de:

1. **Definir** qué es un árbol y sus componentes: nodo, raíz, padre, hijo, hoja, nivel/profundidad, subárbol.
2. **Distinguir** entre:
   - Árbol general (N-ario) y su uso para jerarquías con múltiples hijos.
   - Árbol binario y sus restricciones (máximo 2 hijos).
3. **Modelar** un caso narrativo (diario) como:
   - Árbol general tipo “hilos” (respuestas a entradas).
   - Árbol binario basado en una regla (key) para ordenar entradas.
4. **Aplicar inserciones** correctas:
   - En árbol general: agregar hijos a un padre dado.
   - En árbol binario (BST): insertar respetando menor→izquierda y mayor→derecha.
5. **Ejecutar y comparar recorridos**:
   - DFS (preorden) en árbol general.
   - In-order, Pre-order y Post-order en árbol binario.
6. **Interpretar** cómo los recorridos afectan la “lectura” del diario (orden cronológico simulado vs orden estructural).
7. **Argumentar** ventajas y limitaciones de cada estructura para distintos productos creativos digitales (feeds, comentarios, menús, escenas, misiones, etc.).

---

## 🧠 Explicación teórica: ¿Qué es un árbol?

Un **árbol** es una estructura de datos **no lineal** que organiza información de forma **jerárquica**.  
A diferencia de arreglos o listas (que son secuenciales), los árboles permiten representar relaciones del tipo:

- “Esto depende de…”
- “Esto pertenece a…”
- “Esto responde a…”
- “Esto está dentro de…”

### Componentes fundamentales
- **Nodo (Node):** unidad que guarda datos (ej. una entrada del diario).
- **Raíz (Root):** nodo principal del árbol (inicio).
- **Padre (Parent):** nodo que tiene hijos.
- **Hijo (Child):** nodo conectado debajo de un padre.
- **Hoja (Leaf):** nodo sin hijos.
- **Arista/Enlace:** conexión entre nodos (referencia).
- **Profundidad (Depth/Nivel):** cuántos “saltos” hay desde la raíz a un nodo.
- **Subárbol:** cualquier nodo con todos sus descendientes forma un árbol dentro del árbol.

---

## 🌿 Árbol General (N-ario)

### ¿Qué es?
Un **árbol general** (también llamado **N-ario**) es un árbol donde **cada nodo puede tener 0, 1 o muchos hijos**.

Esto lo hace ideal para representar:

- Comentarios con respuestas ilimitadas
- Jerarquías de categorías
- Árboles de decisiones con múltiples opciones
- Estructuras de escenas o misiones en narrativa interactiva
- Menús de navegación

### ¿Cómo se implementa?
Un nodo general suele almacenar:

- `data` → la información (entrada del diario)
- `children[]` → un arreglo/lista de nodos hijos

En este proyecto, el nodo se llama:

- **`GeneralNode`** (obligatorio por consigna)

#### Inserción típica en árbol general
Para insertar un nodo hijo:
1. Si no existe raíz, el primer nodo se convierte en la raíz.
2. Si se indica un `parentId`, se busca el nodo padre.
3. Se agrega el nuevo nodo a `parent.children`.

> Nota pedagógica clave:  
> Si no se mantiene un índice (hash map), buscar un padre normalmente cuesta **O(n)** porque hay que recorrer el árbol.

### Recorridos en árbol general
El recorrido más natural aquí es **DFS (Depth-First Search)**, por ejemplo **preorden**:

1. Visitas el nodo actual
2. Luego visitas recursivamente (o con pila) a cada hijo

Esto produce una lectura tipo:
- Entrada principal
- Respuestas
- Respuestas a respuestas
- etc.

En UI se ve como **indentación** (mayor profundidad → más desplazamiento).

---

## 🌳 Árbol Binario

### ¿Qué es?
Un **árbol binario** es un árbol donde cada nodo puede tener **máximo 2 hijos**:

- `left` (izquierda)
- `right` (derecha)

Esto permite modelar estructuras con decisiones binarias o particiones:

- Árboles de decisión (sí/no)
- Expresiones matemáticas (operadores)
- Navegación de historias con bifurcaciones simples
- Estructuras de búsqueda/ordenamiento (BST)

En este proyecto, el nodo se llama:

- **`BinaryNode`** (obligatorio por consigna)

### Árbol Binario de Búsqueda (BST) usado en el proyecto
En el ejemplo, el árbol binario sigue una regla de **ordenamiento por `key`**:

- Si `key` es menor que el nodo actual → va a la izquierda
- Si `key` es mayor → va a la derecha
- (En este proyecto, si la key se repite, se rechaza para evitar ambigüedad didáctica)

Esto convierte el árbol en un **BST**, útil porque **permite ordenar y buscar** con buena eficiencia cuando está balanceado.

#### Complejidad (idea importante)
- Promedio (si está balanceado): `O(log n)` para insertar/buscar
- Peor caso (si queda “en línea” como lista): `O(n)`

> Pista didáctica para clase:  
> si insertas keys ya ordenadas (10, 20, 30, 40...) el BST se desbalancea y se parece a una lista.

---

## 🔁 Recorridos en Árbol Binario (y por qué importan)

Los recorridos definen “en qué orden lees” el árbol.  
Esto es crucial en creatividad digital: cambia el orden de presentación del contenido.

### In-order (izquierda → nodo → derecha)
- En un BST, produce las keys **ordenadas de menor a mayor**.
- Sirve para “listar” el diario en orden por key.

### Pre-order (nodo → izquierda → derecha)
- Útil para “copiar” o serializar el árbol (primero decides, luego profundizas).
- Suele reflejar la estructura de decisiones.

### Post-order (izquierda → derecha → nodo)
- Útil para eliminar/liberar nodos o evaluar expresiones (primero resuelves hijos, luego el padre).

En la UI del proyecto, se imprime la lista de keys resultante para comparar recorridos.

---

## 🧩 Estructura del proyecto

```
/
├── index.html     # HTML + Tailwind + Flowbite + JS ES6 (todo en uno)
├── README.md      # Este documento
```

✅ No requiere instalación  
✅ Funciona abriendo `index.html` en el navegador

---

## 🧪 Cómo usar la demo

### Árbol General
1. Crea una entrada y presiona **“Agregar al Árbol General”**.
2. Copia el **ID** mostrado en la tarjeta.
3. Pega el ID como **ID del padre** y agrega otra entrada.
4. Observa cómo crece el hilo y cómo cambia la **profundidad (depth)**.

### Árbol Binario (BST)
1. Asigna una **key numérica** (ej. 50).
2. Inserta varias con diferentes keys (25, 75, 10, 60…).
3. Ejecuta:
   - **Render árbol**
   - **In-order / Pre-order / Post-order**
4. Observa cómo el orden cambia según el recorrido.

---

## 🎨 Enfoque pedagógico (Creatividad Digital)

Este recurso está pensado como puente entre:
- **Pensamiento computacional** (estructuras, reglas, recorridos)
- **Pensamiento visual y narrativo** (hilos, jerarquías, orden de lectura)

### ¿Por qué un “diario”?
Porque ayuda a concretar:
- Árbol general → “comentarios y respuestas” (narrativa ramificada)
- Árbol binario → “orden por clave” (organización y búsqueda)

La interfaz refuerza la comprensión al mostrar:
- IDs y profundidad (estructura)
- Indentación (representación visual de jerarquía)
- Recorridos (formas de lectura)

---

## 📌 Actividades sugeridas (rápidas, para clase)

1. **Construye un hilo** de 3 niveles en árbol general:
   - Raíz → Respuesta → Respuesta a respuesta
2. **Prueba desbalance** en BST:
   - Inserta keys ascendentes y observa el árbol.
3. **Compara recorridos**:
   - Inserta 5 keys y registra el resultado de in/pre/post-order.
4. **Reflexión (producto creativo)**:
   - ¿Qué estructura usarías para: comentarios, quests, menús, timeline?

---

## 🛡️ Licencia y uso

Uso libre con fines educativos.  
Puedes modificarlo, reutilizarlo y adaptarlo citando la fuente del repositorio.

---

## 🌱 Extensiones recomendadas (para siguientes prácticas)

- Árbol general con índice `Map<id, node>` para búsqueda O(1)
- BST auto-balanceado (AVL o Red-Black) para garantizar O(log n)
- Búsqueda por título (DFS en general, búsqueda por key en BST)
- Persistencia en `localStorage` para guardar el diario
- Visualización tipo diagrama (SVG/Canvas) en lugar de indentación

---

✨ *Cuando un estudiante puede “ver” el árbol, deja de memorizarlo y empieza a entenderlo.*
