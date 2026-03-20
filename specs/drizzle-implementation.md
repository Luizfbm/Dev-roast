# Spec: Drizzle ORM, PostgreSQL & AI SDK

## 1. Visão Geral
Esta especificação detalha a arquitetura de persistência e inteligência artificial do DevRoast. O sistema permite submissões anônimas de código, geração de "roasts" via AI SDK (agnóstico) e um leaderboard público opt-in.

## 2. Infraestrutura (Docker & Env)

### `docker-compose.yml`
```yaml
services:
  database:
    image: postgres:16-alpine
    container_name: dev-roast-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: dev_roast
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

### Variáveis de Ambiente (`.env`)
```bash
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/dev_roast"

# AI SDK (Agnóstico)
# Exemplo para OpenAI ou Anthropic conforme o provider escolhido
OPENAI_API_KEY="sk-..." 
# ou
ANTHROPIC_API_KEY="sk-ant-..."
```

## 3. Schema Drizzle (`src/db/schema.ts`)

### Enums
- **`language_enum`**: `javascript`, `typescript`, `python`, `go`, `rust`, `ruby`, `java`, `c`, `cpp`, `php`, `sql`, `html`, `css`, `json`, `bash`

### Tabelas

#### `roasts` (Submissões Anônimas)
- `id`: uuid (primary key)
- `code_content`: text (NOT NULL)
- `language`: language_enum (NOT NULL)
- `roast_score`: integer (NOT NULL, check 0-10)
- `roast_feedback`: text (NOT NULL)
- `is_public`: boolean (DEFAULT false) - **Opt-in para Leaderboard**
- `created_at`: timestamp (DEFAULT now)

## 4. AI SDK Integration (Agnóstico)
Utilizaremos o **Vercel AI SDK** (`ai`) para garantir que o provider (OpenAI, Anthropic, Google) possa ser trocado facilmente.

- **Lib:** `src/lib/ai.ts` (Configuração do objeto `model`).
- **Prompt:** Armazenado em `src/lib/prompts/roast-prompt.ts`.
- **Function:** `generateText` para obter o feedback e o score estruturado.

## 5. Scripts ORM (`package.json`)
```json
"scripts": {
  "db:generate": "drizzle-kit generate",
  "db:migrate": "drizzle-kit migrate",
  "db:push": "drizzle-kit push",
  "db:studio": "drizzle-kit studio"
}
```

## 6. Fluxo de Implementação (To-Dos)

- [ ] **Configuração Geral**
  - [ ] Criar `docker-compose.yml` e `.env`.
  - [ ] Instalar `drizzle-orm`, `postgres`, `drizzle-kit`, `ai`, e o provider de preferência.
- [ ] **Persistência**
  - [ ] Definir schema em `src/db/schema.ts`.
  - [ ] Configurar cliente em `src/db/index.ts`.
- [ ] **Camada de IA**
  - [ ] Criar prompt sistêmico para o "Roaster".
  - [ ] Implementar Server Action `generateRoastAction` que chama a AI e salva no DB.
- [ ] **Frontend**
  - [ ] Atualizar componente `CodeEditor` para chamar a action e lidar com o loading.
  - [ ] Refatorar Homepage para listar dados da tabela `roasts` onde `is_public = true`.
