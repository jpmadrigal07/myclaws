# 🤖 Agent Instructions

## 📑 Table of Contents

- [📝 Documentation Maintenance](#-documentation-maintenance)
- [🌐 Project Overview](#-project-overview)
- [🛠️ Technical Overview](#️-technical-overview)
- [🏗️ Project Stack](#️-project-stack)
- [📂 Project Structure](#-project-structure)
- [📂 Folder Structure Guidelines](#-folder-structure-guidelines)
- [🗄️ Convex Database](#️-convex-database)
- [🎨 Styling System](#-styling-system)
- [✅ Best Practices and Coding Style](#-best-practices-and-coding-style)

---

## 📝 Documentation Maintenance

> ⚠️ **CRITICAL**: Keep AGENTS.md files synchronized with code changes at all times.

### Documentation Update Requirements

**When to Update AGENTS.md Files**:

- ✅ **ALWAYS** update the relevant `AGENTS.md` file when you:
  - Change folder structure or organization patterns
  - Add, remove, or modify code patterns or conventions
  - Update architectural decisions or approaches
  - Change file naming conventions or organization standards
  - Modify shared utilities, services, or common code patterns
  - Update state management patterns or data fetching approaches
  - Change styling approaches or component organization
  - Add new features that affect code organization

**Which AGENTS.md to Update**:

- **Root `AGENTS.md`**: Update for changes affecting the entire project, general principles, or project-wide conventions
- **Feature-specific documentation**: Update for changes specific to that feature or module

**Update Process**:

1. **Before or during code changes**: Identify which `AGENTS.md` files are affected
2. **Make code changes**: Implement your structural or pattern changes
3. **Update documentation**: Immediately update the relevant `AGENTS.md` file(s) to reflect the new structure/patterns
4. **Review**: Ensure documentation accurately describes the current state of the codebase
5. **Commit together**: Commit documentation updates alongside code changes in the same PR/commit when possible

**What to Document**:

- Folder structures and organization patterns
- File naming conventions
- Code patterns and best practices
- Architecture decisions and rationale
- Usage examples and guidelines
- Critical rules and conventions

> 💡 **Remember**: Outdated documentation is worse than no documentation. If the code structure changes but `AGENTS.md` doesn't, it creates confusion and inconsistency.

---

## 🌐 Project Overview

<!-- Update this section with your project-specific information -->

This is a modern **Next.js web application** built with the App Router pattern and **Convex** as the backend database. Update this section to describe:

- What the application does
- Who the target users are
- Key features and functionality

### ⭐ Core Features

<!-- List your project's core features here -->

1. **Feature 1**: Description of feature
2. **Feature 2**: Description of feature
3. **Feature 3**: Description of feature

---

## 🛠️ Technical Overview

This project is a **Next.js application** built with modern React patterns:

- **Next.js** with App Router for file-based routing
- **React** for UI components
- **TypeScript** for type safety
- **Convex** for backend database and real-time data sync
- **Tailwind CSS** for styling
- **React Hook Form** for form handling
- **Bun** as the package manager (Node.js 18+ also supported)

---

## 🏗️ Project Stack

### Core Framework & Language

- **Framework**: Next.js (App Router)
- **UI Library**: React
- **Language**: TypeScript
- **Package Manager**: Bun (recommended) or Node.js 18+

### Backend & Database

- **Database**: Convex (real-time backend-as-a-service)
- **Data Fetching**: Convex React hooks (`useQuery`, `useMutation`)
- **Real-time Sync**: Built-in with Convex

### Styling & UI

- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **Icons**: Lucide React (primary), Heroicons (secondary)

### State Management & Data Fetching

- **Server State**: Convex hooks for all database operations
- **Form Management**: React Hook Form
- **Toast Notifications**: React Hot Toast

### Additional Libraries

- **Utilities**:
  - clsx
  - tailwind-merge
  - class-variance-authority

### Build & Quality Tools

- **Linting**: ESLint with eslint-config-next
- **Type Checking**: TypeScript
- **Formatting**: Prettier (if configured)

---

## 📂 Project Structure

```text
project-root/
├── app/                      # Next.js App Router pages
│   ├── _components/          # Page-specific components
│   ├── [route]/              # Route folders
│   │   ├── _components/      # Route-specific components
│   │   ├── hooks/            # Route-specific hooks
│   │   └── page.tsx          # Route page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
│
├── convex/                   # Convex backend
│   ├── _generated/           # Auto-generated Convex files (do not edit)
│   ├── schema.ts             # Database schema definition
│   └── [feature].ts          # Queries and mutations per feature
│
├── components/               # Shared components
│   ├── ui/                   # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── modals/               # Modal components
│   ├── header.tsx
│   ├── footer.tsx
│   └── convex-provider.tsx   # Convex client provider
│
├── constants/                # App constants
│   └── index.ts
│
├── lib/                      # Utility functions
│   └── cn.ts                 # className utility (clsx + tailwind-merge)
│
├── types/                    # Shared TypeScript types
│   └── index.ts
│
├── public/                   # Static assets
│   └── images/
│
├── AGENTS.md                 # This file (AI agent context)
├── components.json           # shadcn/ui configuration
├── convex.json               # Convex configuration
├── eslint.config.mjs         # ESLint configuration
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies and scripts
├── postcss.config.mjs        # PostCSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project README
```

---

## 📂 Folder Structure Guidelines

### General Organization Principles

**Route-Based Organization (App Router)**:

- **`app/`**: Next.js App Router routes (file-based routing)
  - Each route folder contains a `page.tsx` file
  - Route-specific components go in `_components/` subfolder
  - Route-specific hooks go in `hooks/` subfolder

**Convex Backend**:

- **`convex/`**: All Convex backend code
  - **`convex/schema.ts`**: Database schema definitions
  - **`convex/[feature].ts`**: Queries and mutations organized by feature/table
  - **`convex/_generated/`**: Auto-generated files (never edit manually)

**Shared Components**:

- **`components/`**: Root-level shared components used across multiple routes
  - **`components/ui/`**: shadcn/ui base components (Button, Input, etc.)
  - **`components/modals/`**: Reusable modal components
  - Layout components (Header, Footer, Container)

**Feature-Specific Code**:

- Code specific to a route/page should be organized within that route's folder
- Use `_components/` for route-specific components
- Use `hooks/` for route-specific custom hooks
- Keep features self-contained for easier maintenance

**When to Use Which**:

- ✅ Use **root `components/`** if the component is reused in 2+ routes or is truly global
- ✅ Use **route-specific `_components/`** if the component is specific to that route only
- ✅ Start with **route-specific**, move to **root `components/`** when you need to share it
- ✅ Use **`_components/`** naming convention for route-specific component folders (Next.js convention to exclude from routing)

### Component Organization Standard

> 🚨 **CRITICAL RULE**: Root `/components/` is **ONLY** for shared components used across 2+ routes. Route-specific components **MUST** be in their route's `_components/` folder.

- ✅ **Root `/components/`**: Only for truly shared components (e.g., `Button`, `Input`, `Header`, `Footer` - used across multiple routes)
- ✅ **Route `_components/`**: All route-specific components go in their route's `_components/` folder
- ✅ **Types**: Route-specific types should be colocated with their components or in route-level type files
- ❌ **NEVER** put route-specific components in root `/components/`
- ❌ **NEVER** mix route-specific and shared components

### File Naming Conventions

- **USE** `kebab-case` for all file and folder names:
  - Component files: `user-profile.tsx`, `contact-form.tsx`
  - Hook files: `use-auth.tsx`, `use-fetch-data.tsx`
  - Utility files: `cn.ts`, `api-helpers.ts`
  - Folder names: `user-settings/`, `_components/`
  - Convex files: `tasks.ts`, `users.ts` (by feature/table name)
- **USE** `PascalCase` for component names in code:
  - Export: `export default function UserProfile() { ... }`
  - Import/Usage: `<UserProfile />`, `<ContactForm />`
- **USE** `camelCase` for function, variable, and hook names:
  - Functions: `handleSubmit()`, `fetchData()`
  - Hooks: `useAuth()`, `useFetchData()`
  - Variables: `firstName`, `isLoading`
  - Convex functions: `get`, `create`, `update`, `remove`
- **ALWAYS** use absolute imports with `@/` alias (configured in `tsconfig.json`)
  - ✅ `import { Button } from '@/components/ui/button'`
  - ❌ `import { Button } from '../../components/ui/button'`

---

## 🗄️ Convex Database

This project uses **Convex** as the backend database, providing real-time data synchronization and type-safe queries/mutations.

### Convex Architecture

```text
convex/
├── _generated/          # Auto-generated (DO NOT EDIT)
│   ├── api.d.ts         # Type definitions for API
│   ├── dataModel.d.ts   # Type definitions for data model
│   └── server.d.ts      # Server utilities
├── schema.ts            # Database schema definition
└── [feature].ts         # Queries and mutations (e.g., tasks.ts, users.ts)
```

### Schema Definition

Define your database schema in `convex/schema.ts`:

```ts
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
  users: defineTable({
    name: v.string(),
    email: v.string(),
  }).index('by_email', ['email']),
});
```

### Queries and Mutations

Organize queries and mutations by feature in separate files (e.g., `convex/tasks.ts`):

```ts
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// ✅ Query: Read data
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('tasks').collect();
  },
});

// ✅ Mutation: Create data
export const create = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert('tasks', {
      text: args.text,
      isCompleted: false,
    });
  },
});

// ✅ Mutation: Update data
export const toggle = mutation({
  args: { id: v.id('tasks') },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    if (!task) throw new Error('Task not found');
    await ctx.db.patch(args.id, { isCompleted: !task.isCompleted });
  },
});

// ✅ Mutation: Delete data
export const remove = mutation({
  args: { id: v.id('tasks') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
```

### Using Convex in React Components

> 🔒 **CRITICAL RULE**: Use Convex hooks (`useQuery`, `useMutation`) for ALL database operations

```tsx
'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export function TaskList() {
  // ✅ Query data (real-time, auto-updates)
  const tasks = useQuery(api.tasks.get);

  // ✅ Mutations
  const createTask = useMutation(api.tasks.create);
  const toggleTask = useMutation(api.tasks.toggle);
  const removeTask = useMutation(api.tasks.remove);

  // Handle loading state
  if (tasks === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <span onClick={() => toggleTask({ id: task._id })}>
            {task.isCompleted ? '✓' : '○'} {task.text}
          </span>
          <button onClick={() => removeTask({ id: task._id })}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

### Convex Best Practices

1. **Schema Design**:
   - ✅ Define all tables in `convex/schema.ts`
   - ✅ Use appropriate validators (`v.string()`, `v.boolean()`, `v.number()`, etc.)
   - ✅ Add indexes for frequently queried fields
   - ✅ Use `v.optional()` for nullable fields

2. **Queries**:
   - ✅ Keep queries focused and minimal
   - ✅ Use `.filter()` and `.order()` for efficient queries
   - ✅ Return only needed fields when possible
   - ❌ Don't perform heavy computation in queries

3. **Mutations**:
   - ✅ Validate input arguments with `v` validators
   - ✅ Handle errors gracefully
   - ✅ Keep mutations atomic and focused
   - ❌ Don't call external APIs directly in mutations (use actions instead)

4. **React Integration**:
   - ✅ Use `useQuery` for reading data (returns `undefined` while loading)
   - ✅ Use `useMutation` for creating/updating/deleting data
   - ✅ Handle the `undefined` loading state properly
   - ❌ Don't use `useState` to cache Convex data (it's already reactive)

5. **File Organization**:
   - ✅ One file per feature/table (e.g., `tasks.ts`, `users.ts`)
   - ✅ Export multiple queries/mutations from each file
   - ✅ Use consistent naming: `get`, `getById`, `create`, `update`, `remove`

---

## 🎨 Styling System

This project uses **Tailwind CSS** for styling with a custom theme configuration.

### Styling Approach

1. **Tailwind CSS** is configured via CSS in `app/globals.css`
2. **Global styles** are defined in `app/globals.css` using `@theme` directive
3. **Tailwind classes** work on React components via the `className` prop
4. **Radix UI** components are styled with Tailwind classes

### Configuration Files

- **Tailwind CSS configuration**: Defined in `app/globals.css` using `@theme` directive
- **PostCSS configuration**: `postcss.config.mjs`
- **Global styles**: `app/globals.css`

### Usage in Components

Use standard Tailwind CSS classes on React components:

```tsx
<div className="flex items-center justify-center bg-white p-4">
  <h1 className="text-lg font-bold text-gray-900">Hello World</h1>
</div>
```

Use the `cn()` utility function (from `lib/cn.ts`) for conditional classes:

```tsx
import { cn } from '@/lib/cn';

<div className={cn('base-classes', condition && 'conditional-classes')} />;
```

### Icon System

> 🎨 **ICON LIBRARY**: Use **Lucide React** as the primary icon library, **Heroicons** as secondary
> 🚫 **NO EMOJIS**: NEVER use emojis in the UI - ALWAYS use icons instead

**How to Use Lucide Icons**:

```tsx
// Import specific icons
import { User, Mail, Lock, Search } from 'lucide-react';

// Basic usage
<User size={24} className="text-gray-600" />

// In components
<Button>
  <Plus size={20} />
  Add Item
</Button>
```

**Icon Usage Guidelines**:

- ✅ **ALWAYS** use Lucide icons (primary) or Heroicons (secondary) for UI elements
- ✅ Import only the specific icons you need (tree-shaking)
- ✅ Use consistent sizing: 16px (sm), 20px (md), 24px (lg), 28px (xl)
- ✅ Match icon colors to design system
- ❌ **NEVER** use emoji as icons in production code
- ❌ **AVOID** custom SVG icons unless absolutely necessary

---

## ✅ Best Practices and Coding Style

### State Management & Data Fetching Patterns

> 🔒 **CRITICAL RULE: Use Convex hooks for ALL database operations**
>
> 🚫 **NEVER use useState or useEffect for Convex data**

1. **🚨 STRICT: Convex Hooks for ALL Database Operations**:

   - ✅ **ALWAYS use** Convex hooks for database data:
     - ✅ `useQuery` for reading/fetching data
     - ✅ `useMutation` for creating/updating/deleting data
   - ❌ **NEVER use** `useState` to cache Convex query results
   - ❌ **NEVER use** `useEffect` to fetch Convex data
   - 💡 **Why**: Convex provides automatic real-time updates and caching

2. **State Management Hierarchy** (use in this order):

   - **Convex hooks**: For ALL database state (`useQuery`, `useMutation`)
   - **useState**: For local UI state only (form inputs, toggles, modals, local flags)
   - ❌ **NEVER overlap**: Don't use useState to store Convex data
   - 🔒 **Golden Rule**: If data comes from the database, use Convex hooks. If it's UI state, use useState.

3. **Convex Query Patterns**:

   ```tsx
   'use client';

   import { useQuery, useMutation } from 'convex/react';
   import { api } from '@/convex/_generated/api';

   // ✅ CORRECT: Use Convex hooks
   const tasks = useQuery(api.tasks.get);
   const createTask = useMutation(api.tasks.create);

   // ✅ CORRECT: Handle loading state
   if (tasks === undefined) {
     return <LoadingSkeleton />;
   }

   // ❌ WRONG: Never cache Convex data in useState
   const [tasks, setTasks] = useState([]); // ❌ Don't do this
   useEffect(() => {
     // ❌ Don't fetch Convex data in useEffect
   }, []);
   ```

4. **AVOID unnecessary `useEffect`** - only use when you need to synchronize with external systems:
   - ✅ **Valid uses**: setting up event listeners, syncing with browser APIs, third-party libraries
   - ❌ **Avoid**: fetching Convex data, transforming data (use `useMemo`), handling events (use event handlers)
   - 💡 **Tip**: If you can calculate something during render, you don't need `useEffect`

### Forms & Validation

1. **USE React Hook Form** for form management
2. **VALIDATE** form inputs before submission
3. **PROVIDE** clear error messages to users
4. **USE** Convex mutations for form submissions

### Component & File Conventions

1. **USE** `.tsx` extension for components (TypeScript + JSX)
2. **PREFER** functional components with React hooks
3. **USE** `export default` for page components in Next.js App Router
4. **USE** `kebab-case` for all file and folder names (enforced by ESLint)
5. **USE** `PascalCase` for component names in code
6. **USE** `camelCase` for function, variable, and hook names
7. **ALWAYS** use absolute imports with `@/` alias (configured in `tsconfig.json`)
   - ✅ `import { Button } from '@/components/ui/button'`
   - ❌ `import { Button } from '../../components/ui/button'`

### Props & TypeScript

1. **ALWAYS** define prop types using TypeScript interfaces or types
2. **PREFER** destructuring props in function parameters
3. **USE** explicit return types for functions when helpful

```tsx
interface UserFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function UserForm({ onSubmit, isLoading = false }: UserFormProps) {
  // component logic
}
```

### UI & Styling

1. **USE Tailwind CSS** for styling via the `className` prop
2. **USE Radix UI** primitives (via shadcn/ui) for accessible components
3. **USE Lucide React** for all icons (see Icon System section above)
4. **PREFER** Tailwind utility classes over inline styles
5. **USE** `cn()` utility function for conditional classes
6. **⭐ ALWAYS PREFER skeleton loading** over circle/spinner loading for better UX:
   - ✅ Skeleton loading provides visual context and reduces perceived wait time
   - ❌ Avoid circle/spinner loading unless it's for very brief operations (<500ms)

### Code Quality

1. **FOLLOW** ESLint rules (configured in `eslint.config.mjs`)
2. **USE** Prettier for code formatting (if configured)
3. **USE** single quotes for strings (ESLint enforced)
4. **PREFER** meaningful variable and function names
5. **SPLIT** large components (>300 lines) into smaller components
6. **USE** TypeScript strict mode
7. **AVOID** `any` type - use proper types or `unknown`
8. **ENFORCE** kebab-case file names (ESLint rule)
9. **REMOVE** unused imports (ESLint enforced)
10. **NO** multiple empty lines (max 1 consecutive empty line, ESLint enforced)
11. **UPDATE** `AGENTS.md` whenever code structure, patterns, or conventions change (see [Documentation Maintenance](#-documentation-maintenance))

### Routing (Next.js App Router)

1. **USE Next.js App Router** file-based routing in `/app/` directory
2. **USE** dynamic routes with `[param]` syntax: `[id]/page.tsx` (if needed)
3. **USE** `layout.tsx` for shared layouts
4. **USE** `page.tsx` for route pages
5. **USE** `_components/` folder naming for route-specific components (Next.js convention)
6. **IMPORT** from `next/navigation` for navigation:
   - `useRouter()` for programmatic navigation
   - `useSearchParams()` for query parameters
   - `Link` component for declarative navigation

### Environment & Configuration

1. **USE** environment variables in `.env.local` file
2. **NEVER** commit `.env.local` with sensitive keys (use secure secrets management)
3. **CONVEX** environment variables:
   - `CONVEX_DEPLOYMENT` - Convex deployment identifier
   - `NEXT_PUBLIC_CONVEX_URL` - Public Convex URL for client
4. **REFERENCE** `next.config.ts` for Next.js-specific configuration

### Error Handling

1. **ALWAYS** handle errors gracefully
2. **PROVIDE** user-friendly error messages
3. **HANDLE** Convex query loading states (`undefined` means loading)
4. **DISPLAY** error states in UI (toast notifications, error boundaries)

### Performance

1. **USE** Next.js Image component for images
2. **IMPLEMENT** code splitting with dynamic imports when needed
3. **OPTIMIZE** bundle size (check with `bun run build`)
4. **USE** React.memo for expensive components (when needed)
5. **USE** useMemo and useCallback appropriately (avoid premature optimization)
6. **LEVERAGE** Convex's built-in caching and real-time updates

---

## 📚 Additional Resources

- **Next.js Documentation**: <https://nextjs.org/docs>
- **Convex Documentation**: <https://docs.convex.dev>
- **Convex React Hooks**: <https://docs.convex.dev/client/react>
- **Tailwind CSS**: <https://tailwindcss.com/docs>
- **Radix UI**: <https://www.radix-ui.com/>
- **Lucide Icons**: <https://lucide.dev/icons>
- **shadcn/ui**: <https://ui.shadcn.com/>
- **React Hook Form**: <https://react-hook-form.com/>
- **Framer Motion**: <https://www.framer.com/motion/>

---

## 🎯 Quick Reference

### Common Commands

```bash
# Install dependencies
bun install

# Start development server (runs Next.js + Convex)
bun run dev

# Start Convex dev server separately
npx convex dev

# Build for production
bun run build

# Start production server
bun run start

# Run ESLint
bun run lint

# Push Convex schema changes
npx convex deploy
```

### Ports

- **Web**: <http://localhost:3000>
- **Convex Dashboard**: <https://dashboard.convex.dev>

### Key Directories

- `app/` - Next.js App Router pages and routes
- `convex/` - Convex backend (schema, queries, mutations)
- `components/` - Shared components
- `constants/` - App constants
- `lib/` - Utility functions
- `types/` - Shared TypeScript types
- `public/` - Static assets

---

> 🧠 This document provides context and high-level principles for the project. For specific implementation details, refer to:
>
> - Route-specific component documentation
> - Convex documentation for backend patterns
> - README.md for general project information
> - Individual component files for implementation details
