# UI Component Patterns

Siga estes padrões ao criar novos componentes na pasta `src/components/ui`.

## 1. Gerenciamento de Variantes

Utilize a biblioteca `tailwind-variants` (`tv`) para definir estilos base e variantes.

```tsx
import { tv } from 'tailwind-variants'

const button = tv({
  base: '...',
  variants: {
    variant: {
      primary: '...',
    }
  }
})
```

## 2. Mesclagem de Classes (Merging)

**Não utilize `tailwind-merge` ou `cn()` manualmente** dentro de componentes que usam `tailwind-variants`. O `tailwind-variants` já lida com a mesclagem de classes eficientemente.

Passe a propriedade `className` diretamente para a função gerada pelo `tv`:

```tsx
const Button = ({ className, variant, ...props }: ButtonProps) => {
  return (
    <button
      className={button({ variant, className })}
      {...props}
    />
  )
}
```

## 3. Tipagem e Propriedades Nativas

Sempre estenda as propriedades nativas do elemento HTML correspondente utilizando `ComponentProps` do React.

```tsx
import type { ComponentProps } from 'react'
import { type VariantProps } from 'tailwind-variants'

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof button> {}
```

## 4. Exports

Utilize **Named Exports**. Nunca utilize `default exports`.

```tsx
export { Button, button }
```

## 5. Estilização

- Utilize apenas classes utilitárias do Tailwind CSS.
- Utilize as variáveis de design configuradas em `tailwind.config.js` (ex: `bg-accent-green`, `rounded-none`).
- **Fontes**: Use `font-sans` para texto padrão (sistema) e `font-mono` para código/texto técnico (JetBrains Mono).

## 6. Componentes Complexos (Slots)

Para componentes com múltiplas partes (ex: `Toggle` com track e thumb), utilize a funcionalidade de `slots` do `tailwind-variants`:

```tsx
const toggle = tv({
  slots: {
    root: '...',
    track: '...',
    thumb: '...',
  }
})

const { root, track, thumb } = toggle()
```

## 7. Comportamento e Acessibilidade

Para componentes que exigem estado ou comportamento complexo (toggles, dialogs, dropdowns), utilize os primitivos do **`@base-ui/react`**.

## 8. Server Components e Sintaxe (Shiki)

Componentes de visualização de código (`CodeBlock`) devem ser **Server Components** e utilizar a biblioteca **`shiki`** com o tema `vesper` para garantir performance e realce de sintaxe de alta qualidade sem sobrecarregar o cliente.
## 9. Qualidade de Código (Biome)

Utilizamos o **Biome** para linting e formatação. Sempre mantenha o código limpo:

- **Formatação**: Execute `pnpm format` antes de commitar.
- **Linting**: Execute `pnpm lint` para garantir que não existam avisos ou erros.
- **JSX Comments**: Nunca use `//` diretamente dentro de tags JSX; envolva-os com `{/* ... */}` ou use tags semânticas se for para exibição.
