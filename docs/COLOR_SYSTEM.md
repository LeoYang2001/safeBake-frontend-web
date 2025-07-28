# SafeBake Color System Documentation

## 🎨 Dark Theme Color Map

Our application uses a comprehensive dark theme color system designed for optimal readability and modern aesthetics.

### Primary Colors

| Color Variable           | Value     | Usage                             |
| ------------------------ | --------- | --------------------------------- |
| `--color-background`     | `#1b1b1d` | Main app background               |
| `--color-text-primary`   | `#f9f9f9` | Primary text content              |
| `--color-text-secondary` | `#b3b3b3` | Secondary text, labels            |
| `--color-text-muted`     | `#888888` | Placeholder text, disabled states |

### Surface Colors

| Color Variable              | Value     | Usage                            |
| --------------------------- | --------- | -------------------------------- |
| `--color-surface-primary`   | `#2a2a2d` | Cards, modals, elevated surfaces |
| `--color-surface-secondary` | `#3a3a3d` | Footer, secondary surfaces       |
| `--color-surface-elevated`  | `#4a4a4d` | Hover states, dropdowns          |

### Brand Colors

| Color Variable            | Value     | Usage                           |
| ------------------------- | --------- | ------------------------------- |
| `--color-brand-primary`   | `#3b82f6` | Primary buttons, links, accents |
| `--color-brand-secondary` | `#1e40af` | Secondary brand elements        |
| `--color-brand-accent`    | `#60a5fa` | Lighter brand accents           |

### Status Colors

| Color Variable    | Value     | Usage                               |
| ----------------- | --------- | ----------------------------------- |
| `--color-success` | `#10b981` | Success messages, positive actions  |
| `--color-warning` | `#f59e0b` | Warning messages, caution           |
| `--color-error`   | `#ef4444` | Error messages, destructive actions |
| `--color-info`    | `#06b6d4` | Information messages, help text     |

### Border Colors

| Color Variable             | Value     | Usage                     |
| -------------------------- | --------- | ------------------------- |
| `--color-border-primary`   | `#404040` | Default borders, dividers |
| `--color-border-secondary` | `#525252` | Secondary borders         |
| `--color-border-accent`    | `#737373` | Highlighted borders       |

### Component Colors

| Color Variable                   | Value     | Usage                       |
| -------------------------------- | --------- | --------------------------- |
| `--color-button-primary`         | `#3b82f6` | Primary button background   |
| `--color-button-primary-hover`   | `#2563eb` | Primary button hover        |
| `--color-button-secondary`       | `#374151` | Secondary button background |
| `--color-button-secondary-hover` | `#4b5563` | Secondary button hover      |
| `--color-input-bg`               | `#2a2a2d` | Input field backgrounds     |
| `--color-input-border`           | `#404040` | Input field borders         |
| `--color-input-border-focus`     | `#3b82f6` | Input field focus borders   |

## 🛠️ Implementation

### CSS Variables

All colors are defined as CSS custom properties in `src/style.css` and can be used throughout the application:

```css
background-color: var(--color-surface-primary);
color: var(--color-text-primary);
border-color: var(--color-border-primary);
```

### Tailwind CSS Classes

Custom Tailwind classes are configured in `tailwind.config.js` to use our color variables:

```html
<div class="bg-surface text-primary border-primary">
  Content with dark theme colors
</div>
```

### Component Usage

Components automatically inherit the dark theme styling:

```tsx
// Button component with dark theme variants
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>

// Alert component with dark theme colors
<Alert type="success">Success message with dark theme</Alert>
<Alert type="error">Error message with dark theme</Alert>
```

## 🌈 Color Accessibility

Our color system maintains WCAG AA contrast ratios:

- Primary text (#f9f9f9) on background (#1b1b1d): 16.1:1
- Secondary text (#b3b3b3) on background (#1b1b1d): 7.4:1
- Brand primary (#3b82f6) on background (#1b1b1d): 4.8:1

## 🔄 Consistency

All components use the standardized color system:

- **Header**: Dark surface with brand accents
- **Footer**: Secondary surface with muted text
- **Navigation**: Brand colors for active states
- **Buttons**: Consistent variants across the app
- **Forms**: Dark inputs with blue focus states
- **Cards**: Primary surface with proper contrast

This ensures a cohesive visual experience throughout the SafeBake application.
