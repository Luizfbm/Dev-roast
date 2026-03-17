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
- Utilize as variáveis de design configuradas em `tailwind.config.js` (ex: `bg-accent-green`, `rounded-m`).
