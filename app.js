"use strict";

    // ============================================================
    // 1) MODELOS: Árbol General (N-ario) y Árbol Binario
    // ============================================================

    /**
     * GeneralNode: Nodo para Árbol General (N-ario).
     * - Un nodo puede tener N hijos.
     * - Útil para modelar jerarquías y hilos (comentarios/respuestas).
     */
    class GeneralNode {
      /**
       * @param {Object} data - Entrada del diario (objeto)
       */
      constructor(data) {
        this.data = data;
        /** @type {GeneralNode[]} */
        this.children = [];
      }

      /**
       * Agrega un hijo a este nodo.
       * Complejidad: O(1) amortizada
       * @param {GeneralNode} childNode
       */
      addChild(childNode) {
        this.children.push(childNode);
      }
    }

    /**
     * Árbol general simple con referencia a la raíz.
     * Incluye búsqueda por id (DFS) y recorrido DFS.
     */
    class GeneralTree {
      constructor() {
        /** @type {GeneralNode|null} */
        this.root = null;
        this.size = 0;
      }

      /**
       * Inserta:
       * - Si no hay root: el nuevo nodo se vuelve root.
       * - Si hay parentId: busca el padre y agrega como hijo.
       * - Si no hay parentId: agrega como hijo de root.
       *
       * Nota didáctica: buscar padre en árbol general suele ser O(n) si no hay índices.
       * @param {Object} entry
       * @param {string|null} parentId
       * @returns {GeneralNode}
       */
      insert(entry, parentId = null) {
        const node = new GeneralNode(entry);

        if (!this.root) {
          this.root = node;
          this.size++;
          return node;
        }

        if (parentId) {
          const parent = this.findById(parentId);
          if (!parent) throw new Error("No se encontró el padre con ese ID en el árbol general.");
          parent.addChild(node);
          this.size++;
          return node;
        }

        // Si no se especifica padre, se cuelga del root (modo simple)
        this.root.addChild(node);
        this.size++;
        return node;
      }

      /**
       * Busca un nodo por id usando DFS.
       * Complejidad: O(n)
       * @param {string} id
       * @returns {GeneralNode|null}
       */
      findById(id) {
        if (!this.root) return null;

        const stack = [this.root];
        while (stack.length) {
          const current = stack.pop();
          if (current.data.id === id) return current;
          // apilar hijos
          for (let i = current.children.length - 1; i >= 0; i--) {
            stack.push(current.children[i]);
          }
        }
        return null;
      }

      /**
       * Recorrido DFS (preorder): nodo → hijos
       * Complejidad: O(n)
       * @returns {GeneralNode[]}
       */
      dfs() {
        if (!this.root) return [];
        const result = [];
        const stack = [{ node: this.root, depth: 0 }];

        while (stack.length) {
          const { node, depth } = stack.pop();
          result.push({ node, depth });

          // push en reversa para mantener orden visual estable
          for (let i = node.children.length - 1; i >= 0; i--) {
            stack.push({ node: node.children[i], depth: depth + 1 });
          }
        }
        return result;
      }
    }

    /**
     * BinaryNode: Nodo para Árbol Binario.
     * - Máximo dos hijos: left y right
     * - Para este ejemplo funciona como BST (Binary Search Tree) por key
     */
    class BinaryNode {
      /**
       * @param {number} key - clave de ordenamiento
       * @param {Object} data - entrada del diario
       */
      constructor(key, data) {
        this.key = key;
        this.data = data;
        /** @type {BinaryNode|null} */
        this.left = null;
        /** @type {BinaryNode|null} */
        this.right = null;
      }
    }

    /**
     * Árbol Binario de Búsqueda (BST) simple.
     * Inserta por key y ofrece recorridos.
     */
    class BinarySearchTree {
      constructor() {
        /** @type {BinaryNode|null} */
        this.root = null;
        this.size = 0;
      }

      /**
       * Inserta un nodo por key.
       * - Menor va a la izquierda, mayor a la derecha.
       * - Si key repetida: se rechaza para evitar ambigüedad didáctica.
       * Complejidad: promedio O(log n), peor caso O(n) si queda desbalanceado.
       *
       * @param {number} key
       * @param {Object} entry
       * @returns {BinaryNode}
       */
      insert(key, entry) {
        if (!Number.isFinite(key)) throw new Error("La key debe ser un número válido.");

        const newNode = new BinaryNode(key, entry);

        if (!this.root) {
          this.root = newNode;
          this.size++;
          return newNode;
        }

        let current = this.root;
        while (true) {
          if (key === current.key) {
            throw new Error("Key duplicada: usa una key única para el BST.");
          } else if (key < current.key) {
            if (!current.left) {
              current.left = newNode;
              this.size++;
              return newNode;
            }
            current = current.left;
          } else {
            if (!current.right) {
              current.right = newNode;
              this.size++;
              return newNode;
            }
            current = current.right;
          }
        }
      }

      /**
       * Recorrido in-order: left → node → right
       * En BST: devuelve keys ordenadas.
       * @returns {BinaryNode[]}
       */
      inOrder() {
        const result = [];
        const stack = [];
        let current = this.root;

        while (current || stack.length) {
          while (current) {
            stack.push(current);
            current = current.left;
          }
          current = stack.pop();
          result.push(current);
          current = current.right;
        }
        return result;
      }

      /**
       * Pre-order: node → left → right
       * @returns {BinaryNode[]}
       */
      preOrder() {
        if (!this.root) return [];
        const result = [];
        const stack = [this.root];

        while (stack.length) {
          const node = stack.pop();
          result.push(node);
          if (node.right) stack.push(node.right);
          if (node.left) stack.push(node.left);
        }
        return result;
      }

      /**
       * Post-order: left → right → node
       * @returns {BinaryNode[]}
       */
      postOrder() {
        if (!this.root) return [];
        const result = [];
        const stack = [{ node: this.root, visited: false }];

        while (stack.length) {
          const item = stack.pop();
          if (!item.node) continue;

          if (item.visited) {
            result.push(item.node);
            continue;
          }

          stack.push({ node: item.node, visited: true });
          if (item.node.right) stack.push({ node: item.node.right, visited: false });
          if (item.node.left) stack.push({ node: item.node.left, visited: false });
        }

        return result;
      }

      /**
       * Render helper: devuelve nodos con profundidad en un recorrido visual (pre-order).
       * @returns {{node: BinaryNode, depth: number, side: string}[]}
       */
      asIndented() {
        if (!this.root) return [];
        const result = [];
        const stack = [{ node: this.root, depth: 0, side: "root" }];

        while (stack.length) {
          const { node, depth, side } = stack.pop();
          result.push({ node, depth, side });
          if (node.right) stack.push({ node: node.right, depth: depth + 1, side: "R" });
          if (node.left) stack.push({ node: node.left, depth: depth + 1, side: "L" });
        }
        return result;
      }
    }

    // ============================================================
    // 2) UTILIDADES + UI
    // ============================================================

    const generalTree = new GeneralTree();
    const binaryTree = new BinarySearchTree();

    const $ = (id) => document.getElementById(id);

    const $title = $("title");
    const $mood = $("mood");
    const $content = $("content");
    const $charCount = $("charCount");
    const $generalParentId = $("generalParentId");
    const $binaryKey = $("binaryKey");

    const $generalContainer = $("generalContainer");
    const $generalEmpty = $("generalEmpty");

    const $binaryContainer = $("binaryContainer");
    const $binaryEmpty = $("binaryEmpty");
    const $binaryTraversalOutput = $("binaryTraversalOutput");

    const $badgeGeneral = $("badgeGeneral");
    const $badgeBinary = $("badgeBinary");

    const $opsLog = $("opsLog");

    const $toast = $("toast");
    const $toastMsg = $("toastMsg");
    const $toastIcon = $("toastIcon");

    const uid = (prefix) => (crypto?.randomUUID ? `${prefix}_${crypto.randomUUID()}` : `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`);

    const nowStamp = () => new Date().toLocaleString("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });

    const escapeHtml = (str) =>
      String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    function logOp(message) {
      const line = document.createElement("div");
      line.className = "flex items-start justify-between gap-3 rounded-lg border bg-white p-3";
      line.innerHTML = `
        <div class="min-w-0">
          <p class="font-semibold text-gray-900">${escapeHtml(message)}</p>
          <p class="mt-1 text-xs text-gray-500">${escapeHtml(nowStamp())}</p>
        </div>
        <span class="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">log</span>
      `;
      $opsLog.prepend(line);
    }

    function showToast(type, message) {
      const icons = {
        success: `
          <svg class="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>`,
        warn: `
          <svg class="h-4 w-4 text-amber-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.516 11.59c.75 1.334-.213 2.99-1.742 2.99H3.483c-1.53 0-2.492-1.656-1.742-2.99l6.516-11.59zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V8a1 1 0 112 0v3a1 1 0 01-1 1z" clip-rule="evenodd"/>
          </svg>`,
        error: `
          <svg class="h-4 w-4 text-rose-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm2.707-10.707a1 1 0 00-1.414-1.414L10 7.586 8.707 6.293a1 1 0 00-1.414 1.414L8.586 9l-1.293 1.293a1 1 0 101.414 1.414L10 10.414l1.293 1.293a1 1 0 001.414-1.414L11.414 9l1.293-1.293z" clip-rule="evenodd"/>
          </svg>`
      };

      $toastIcon.innerHTML = icons[type] ?? icons.success;
      $toastMsg.textContent = message;
      $toast.classList.remove("hidden");

      window.clearTimeout(showToast._t);
      showToast._t = window.setTimeout(() => $toast.classList.add("hidden"), 2300);
    }

    function updateBadges() {
      $badgeGeneral.textContent = `General: ${generalTree.size} nodos`;
      $badgeBinary.textContent = `Binario: ${binaryTree.size} nodos`;
    }

    function buildEntry(prefix) {
      const title = $title.value.trim();
      const mood = $mood.value.trim();
      const content = $content.value.trim();

      if (!title) throw new Error("El título es obligatorio.");
      if (!content) throw new Error("El contenido es obligatorio.");

      return {
        id: uid(prefix),
        title,
        mood,
        content,
        createdAt: nowStamp()
      };
    }

    function resetForm(keepKey = true) {
      $title.value = "";
      $content.value = "";
      $charCount.textContent = "0/600";
      if (!keepKey) $binaryKey.value = "";
      $title.focus();
    }

    // ============================================================
    // 3) RENDER: Árbol General (DFS) y Árbol Binario
    // ============================================================

    function renderGeneral() {
      const nodes = generalTree.dfs();

      $generalEmpty.classList.toggle("hidden", nodes.length > 0);
      $generalContainer.innerHTML = "";

      nodes.forEach(({ node, depth }) => {
        const e = node.data;
        const pad = Math.min(depth, 8) * 16; // límite visual

        const card = document.createElement("div");
        card.className = "rounded-2xl border bg-white p-4 shadow-sm";
        card.style.marginLeft = `${pad}px`;

        card.innerHTML = `
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="text-sm font-bold text-gray-900 truncate">${escapeHtml(e.title)}</p>
              <p class="mt-1 text-xs text-gray-500">${escapeHtml(e.createdAt)} · <span class="font-semibold">${escapeHtml(e.mood)}</span></p>
            </div>
            <div class="shrink-0 text-right">
              <p class="text-[10px] text-gray-500">ID</p>
              <p class="mt-1 rounded bg-gray-100 px-2 py-1 font-mono text-[10px] text-gray-700">${escapeHtml(e.id)}</p>
            </div>
          </div>

          <p class="mt-3 whitespace-pre-wrap text-sm text-gray-700">${escapeHtml(e.content)}</p>

          <div class="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
            <span class="rounded bg-blue-50 px-2 py-1 font-semibold text-blue-700">depth: ${depth}</span>
            <span class="rounded bg-gray-50 px-2 py-1">children: ${node.children.length}</span>
          </div>
        `;

        $generalContainer.appendChild(card);
      });

      updateBadges();
    }

    function renderBinaryTree() {
      const items = binaryTree.asIndented();
      $binaryEmpty.classList.toggle("hidden", items.length > 0);
      $binaryContainer.innerHTML = "";

      items.forEach(({ node, depth, side }) => {
        const pad = Math.min(depth, 10) * 16;

        const card = document.createElement("div");
        card.className = "rounded-2xl border bg-white p-4 shadow-sm";
        card.style.marginLeft = `${pad}px`;

        card.innerHTML = `
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="text-sm font-bold text-gray-900 truncate">${escapeHtml(node.data.title)}</p>
              <p class="mt-1 text-xs text-gray-500">${escapeHtml(node.data.createdAt)} · <span class="font-semibold">${escapeHtml(node.data.mood)}</span></p>
            </div>

            <div class="shrink-0 text-right">
              <span class="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                key: ${node.key}
              </span>
              <div class="mt-2 flex items-center justify-end gap-2">
                <span class="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-700">${side}</span>
                <span class="rounded bg-gray-50 px-2 py-0.5 text-[10px] text-gray-600">depth ${depth}</span>
              </div>
            </div>
          </div>

          <p class="mt-3 whitespace-pre-wrap text-sm text-gray-700">${escapeHtml(node.data.content)}</p>

          <div class="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
            <span class="rounded bg-gray-50 px-2 py-1">left: ${node.left ? node.left.key : "null"}</span>
            <span class="rounded bg-gray-50 px-2 py-1">right: ${node.right ? node.right.key : "null"}</span>
          </div>
        `;
        $binaryContainer.appendChild(card);
      });

      updateBadges();
    }

    function printTraversal(label, nodes) {
      const keys = nodes.map(n => n.key);
      $binaryTraversalOutput.textContent = `${label}\nkeys: [${keys.join(", ")}]\ncount: ${keys.length}`;
    }

    // ============================================================
    // 4) EVENTOS
    // ============================================================

    $("content").addEventListener("input", () => {
      $charCount.textContent = `${$content.value.length}/600`;
    });

    $("btnAddGeneral").addEventListener("click", () => {
      try {
        const entry = buildEntry("g");
        const parentId = $generalParentId.value.trim() || null;
        const node = generalTree.insert(entry, parentId);

        logOp(`GeneralTree.insert(): agregado "${entry.title}" (id=${entry.id}) ${parentId ? `como hijo de ${parentId}` : "en root/hijo de root"}.`);
        showToast("success", "Insertado en Árbol General.");
        renderGeneral();
        resetForm(true);
      } catch (err) {
        showToast("error", err.message);
      }
    });

    $("btnAddBinary").addEventListener("click", () => {
      try {
        const entry = buildEntry("b");
        const key = Number($binaryKey.value);

        const node = binaryTree.insert(key, entry);
        logOp(`BST.insert(): agregado "${entry.title}" con key=${key}.`);
        showToast("success", "Insertado en Árbol Binario.");
        renderBinaryTree();
        resetForm(true);
      } catch (err) {
        showToast("error", err.message);
      }
    });

    $("btnRenderGeneral").addEventListener("click", () => {
      logOp("GeneralTree.dfs(): se recorrió el árbol general (DFS) y se renderizó.");
      showToast("success", "DFS renderizado.");
      renderGeneral();
    });

    $("btnRenderBinary").addEventListener("click", () => {
      logOp("BST.asIndented(): se renderizó el árbol binario (vista indentada).");
      showToast("success", "Árbol renderizado.");
      renderBinaryTree();
    });

    $("btnInOrder").addEventListener("click", () => {
      const nodes = binaryTree.inOrder();
      logOp(`BST.inOrder(): recorrido in-order. (Ordena keys si es BST)`);
      showToast("success", "In-order listo.");
      printTraversal("IN-ORDER (left, node, right)", nodes);
    });

    $("btnPreOrder").addEventListener("click", () => {
      const nodes = binaryTree.preOrder();
      logOp("BST.preOrder(): recorrido pre-order.");
      showToast("success", "Pre-order listo.");
      printTraversal("PRE-ORDER (node, left, right)", nodes);
    });

    $("btnPostOrder").addEventListener("click", () => {
      const nodes = binaryTree.postOrder();
      logOp("BST.postOrder(): recorrido post-order.");
      showToast("success", "Post-order listo.");
      printTraversal("POST-ORDER (left, right, node)", nodes);
    });

    $("btnSeed").addEventListener("click", () => {
      try {
        // General tree: root + children + nested child
        const r = generalTree.insert({ id: uid("g"), title: "Raíz: Comienza el diario", mood: "Calma", content: "Hoy inicio mi diario como un árbol general.", createdAt: nowStamp() }, null);
        const c1 = generalTree.insert({ id: uid("g"), title: "Respuesta 1", mood: "Curiosidad", content: "¿Y si cada entrada tiene respuestas?", createdAt: nowStamp() }, r.data.id);
        generalTree.insert({ id: uid("g"), title: "Respuesta a Respuesta 1", mood: "Inspiración", content: "¡Eso es un hijo de un hijo!", createdAt: nowStamp() }, c1.data.id);
        generalTree.insert({ id: uid("g"), title: "Respuesta 2", mood: "Alegría", content: "Otro hilo paralelo como otro hijo del root.", createdAt: nowStamp() }, r.data.id);

        // Binary tree: keys
        binaryTree.insert(50, { id: uid("b"), title: "Key 50", mood: "Calma", content: "Nodo raíz del BST.", createdAt: nowStamp() });
        binaryTree.insert(25, { id: uid("b"), title: "Key 25", mood: "Curiosidad", content: "Va a la izquierda de 50.", createdAt: nowStamp() });
        binaryTree.insert(75, { id: uid("b"), title: "Key 75", mood: "Alegría", content: "Va a la derecha de 50.", createdAt: nowStamp() });
        binaryTree.insert(10, { id: uid("b"), title: "Key 10", mood: "Cansancio", content: "Profundiza por la izquierda.", createdAt: nowStamp() });
        binaryTree.insert(60, { id: uid("b"), title: "Key 60", mood: "Inspiración", content: "Izquierda de 75 (porque 60 < 75).", createdAt: nowStamp() });

        logOp("Seed: se cargaron ejemplos en Árbol General y Árbol Binario.");
        showToast("success", "Ejemplo cargado.");
        renderGeneral();
        renderBinaryTree();
      } catch (err) {
        showToast("error", err.message);
      }
    });

    $("btnReset").addEventListener("click", () => window.location.reload());

    // Inicial
    updateBadges();