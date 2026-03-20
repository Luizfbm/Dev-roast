# Spec: Code Editor com Syntax Highlight

## 1. Pesquisa & Referências

### Como o ray.so faz

O editor do [ray.so](https://github.com/raycast/ray-so) usa uma abordagem muito elegante que vale seguir como inspiração:

- **Não usa Monaco nem CodeMirror.** O núcleo é uma `<textarea>` padrão do HTML — simples, leve e sem dependências de editor.
- **Syntax highlight é visual, não estrutural:** Shiki gera o HTML colorido. A textarea fica sobreposta (transparente) ao output do Shiki, enganando o olho do usuário.
- **Language detection:** `highlight.js` (`hljs.highlightAuto`) detecta a linguagem automaticamente ao colar o código.
- **Foco:** O projeto não precisa de IntelliSense, autocompletion ou nenhum recurso de IDE. O objetivo é **paste → roast**, não escrever código.

### Opções Consideradas

| Biblioteca | Bundle | Auto-detect | Highlight Quality | Veredito |
|---|---|---|---|---|
| **Monaco Editor** | 5–10MB | ❌ Não nativo | ⭐⭐⭐⭐⭐ | ❌ Pesado demais para o caso de uso |
| **CodeMirror 6** | ~300KB+ | ❌ Não tem | ⭐⭐⭐⭐ | ⚠️ Muito poderoso, mas complexidade desnecessária |
| **Textarea + Shiki** (ray.so) | ~0KB extra | via hljs | ⭐⭐⭐⭐⭐ | ✅ Ideal para o nosso caso |
| **highlight.js puro** | ~1MB (full) / ~50KB (subset) | ✅ highlightAuto | ⭐⭐⭐ | ⚠️ Highlight inferior ao Shiki |

### Decisão

Seguir o padrão ray.so: **`<textarea>` transparente + Shiki para renderização + highlight.js para auto-detect.**

Razões:
1. **Já temos Shiki** instalado e em uso no projeto — nenhuma nova dependência de highlighting.
2. **Bundle size zero** no editor em si.
3. **Consistência visual total** — o código no editor usa exatamente o mesmo tema Vesper do `CodeBlock` de exibição.
4. **highlight.js é confiável para detecção** desde que usemos um subset de linguagens (mais precisão com menos opções).

---

## 2. Limitações do Auto-Detect

O `highlightAuto` do highlight.js tem limitações conhecidas:

- **Trechos curtos (<10 linhas):** detecção imprecisa.
- **Linguagens com sintaxe parecida** (JS/TS, C/C++): pode confundir.
- **A detecção é "best effort"**, não 100% garantida.

**Estratégia de mitigação:**
- Restringir o subset de linguagens para as mais comuns (JS, TS, Python, Go, Rust, Ruby, Java, C, C++, PHP, SQL, CSS, HTML, JSON, Bash, etc.).
- Disparar a detecção apenas quando o usuário **para de digitar por ≥500ms** (debounce) ou ao **colar** (`paste` event).
- Sempre permitir que o usuário **sobrescreva manualmente** a linguagem.

---

## 3. Arquitetura Proposta

### Estrutura de Componentes

```
src/app/components/
├── code-editor.tsx          → Client Component raiz (orquestra estado)
└── editor/
    ├── editor-header.tsx    → Window dots + language badge/selector
    ├── editor-body.tsx      → Container com textarea sobreposta ao highlight
    └── editor-footer.tsx    → Toggle roast mode + botão submit
```

### Fluxo de Dados

```
código digitado/colado
    │
    ▼
[debounce 500ms] ──→ [highlight.js highlightAuto(subset)] ──→ detectedLang
    │
    ▼
[Shiki codeToHtml(code, { lang: detectedLang, theme: 'vesper' })]
    │
    ▼
[div#highlight-layer] ← transparente, não clicável
[textarea#input-layer] ← sobreposta, captura input
```

### Camada Visual (layered approach)

```
┌──────────────────────────────┐
│  [textarea layer]            │  ← `position: relative`, opacity "invisível"
│  cursor visível, input real  │     caret é visível, text é transparent
├──────────────────────────────┤
│  [highlight layer]           │  ← `position: absolute`, pointer-events: none
│  HTML colorido pelo Shiki    │     renderizado por baixo da textarea
└──────────────────────────────┘
```

> **Detalhe técnico:** A `textarea` precisa ter `color: transparent` (apenas o caret é visível) e `caret-color: white`. O scroll das duas camadas deve ser sincronizado via `onScroll`.

### Language Selector (Homepage)

Um `<select>` simples (ou um dropdown customizado com os componentes do projeto) posicionado no header do editor. Opções: `auto`, `javascript`, `typescript`, `python`, `go`, `rust`, `ruby`, `java`, `c`, `cpp`, `php`, `sql`, `html`, `css`, `json`, `bash`.

---

## 4. Shiki no Client Side

Atualmente o Shiki é usado como **Server Component** puro no `CodeBlock`.  
No editor, precisaremos de **highlight em tempo real no cliente**. Isso exige uma abordagem diferente:

**Opção A (Recomendada): Shiki no Browser com Web Worker**
```ts
import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';

// Inicializado uma vez e reutilizado
const highlighter = await createHighlighterCore({ ... });
```
Bundle adicional estimado: ~300KB (core + theme vesper + languages bundle).

**Opção B: Server Action / Route Handler**
Fazer um POST para `/api/highlight` enviando o código e recebendo o HTML. Sem bundle adicional no cliente, mas adiciona latência de rede.

**Opção C: highlight.js para o editor, Shiki para o resultado**
O editor usa highlight.js (já carregado para detecção) para colorir em tempo real. Quando o usuário submete, o resultado usa Shiki no servidor. Duas "fidelidades" diferentes de highlight.

**Decisão a tomar:** Opção A ou C — depende de tolerância ao bundle size vs. consistência visual.

---

## 5. To-Dos de Implementação

### Fase 1: Setup
- [ ] Instalar `highlight.js` (subset) para language detection
- [ ] Decidir estratégia de Shiki client-side (Opção A, B ou C)
- [ ] Configurar o subset de linguagens suportadas (≈15 linguagens)

### Fase 2: Hook de Detecção
- [ ] Criar `useLanguageDetection(code: string)` — retorna `{ lang, confidence }`
- [ ] Implementar debounce de 500ms
- [ ] Detectar também no evento `paste`
- [ ] Expor estado `detectedLang` e `manualLang` (manual override por prioridade)

### Fase 3: Hook de Highlight
- [ ] Criar `useShikiHighlight(code: string, lang: string)` — retorna `highlightedHtml`
- [ ] Inicializar o highlighter (Shiki core) uma única vez (singleton)
- [ ] Tratar loading state (antes do highlight estar pronto)

### Fase 4: Componentes
- [ ] `EditorBody` — implementar o layered approach (textarea + div sincronizados)
- [ ] `EditorHeader` — dots + `LanguageSelector` (badge clicável ou select)
- [ ] `EditorFooter` — extrair do `code-editor.tsx` atual
- [ ] Sincronizar scroll entre textarea e div de highlight
- [ ] Lidar com Tab key (inserir 2 espaços, não mudar de foco)

### Fase 5: Integração na Homepage
- [ ] Conectar o editor ao botão "roast_my_code"
- [ ] Passar `{ code, lang, roastMode }` para o handler de submit
- [ ] Exibir estado de loading após submit

### Fase 6: Refinamento
- [ ] Testar detecção com snippets reais (~20 exemplos)
- [ ] Ajustar subset se houver falsos positivos frequentes
- [ ] Garantir que `color: transparent` funciona em todos os browsers (caret-color)
- [ ] Responsividade/mobile (editor pode ser simplificado em telas pequenas)

---

## 6. Decisões Finais

| Questão | Decisão |
|---|---|
| Bundle size | **Opção A** — Shiki no browser (~300KB extra), consistência visual total |
| Frequência de highlight | **Em cada keystroke** |
| Tab behavior | **2 espaços** |
| Linguagens suportadas | **Subset de 15** (JS, TS, Python, Go, Rust, Ruby, Java, C, C++, PHP, SQL, HTML, CSS, JSON, Bash) |
| Placeholder | **Sim** — snippet ruim pré-definido no editor vazio |

---

## 7. Referências

- [ray.so source code](https://github.com/raycast/ray-so)
- [Shiki - createHighlighterCore (browser)](https://shiki.style/guide/install#fine-grained-bundle)
- [highlight.js - highlightAuto](https://highlightjs.readthedocs.io/en/latest/api.html#highlight-auto)
- [CodeMirror 6](https://codemirror.net/) ← descartado, mas documentado para referência futura
