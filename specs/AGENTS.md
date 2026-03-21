# Como Escrever Specs

Antes de implementar novas features, crie um arquivo markdown (`[nome-da-feature].md`) nesta pasta (`specs/`) seguindo o template abaixo. O objetivo é pensar antes de codar.

## Template de Spec

```markdown
# [Nome da Feature]

## 1. Objetivo
Uma ou duas frases explicando o que será feito e o valor para o usuário.

## 2. Requisitos (O que fazer)
- [ ] Requisito funcional 1
- [ ] Requisito funcional 2
- Regra de negócio importante

## 3. UI/UX (Pencil)
- Referência à tela no design.pen (Ex: `Screen 3 - Detail`).
- Lista de componentes reutilizáveis necessários.

## 4. Arquitetura & Dados
- Mudanças no Schema do banco (Drizzle).
- Server Actions / Endpoints necessários.
- Bibliotecas adicionais (se houver).

## 5. Plano de Implementação (Passo a Passo)
1. Passo técnico 1 (Ex: Atualizar `schema.ts`).
2. Passo técnico 2 (Ex: Criar Server Action).
3. Passo técnico 3 (Ex: Implementar UI estática).
4. Passo técnico 4 (Ex: Integrar UI com Lógica).
```

**Regras:**
- Mantenha simples e direto.
- Foque na resolução técnica antes de escrever o código.
- Após aprovado o spec, atualize o `task.md` e o plano geral de implementação.
