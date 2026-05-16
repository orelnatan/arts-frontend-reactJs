
export interface ListItem<T = unknown> {
  // --- Identification & Core Data ---
  /** Unique identifier for React keys and data fetching */
  id: string | number;
  /** The primary display text or raw name data */
  name?: string | React.ReactNode;
  /** The user-facing text label (often interchangeable with name) */
  label?: string | React.ReactNode;
  /** The underlying value sent to APIs or forms when selected */
  value?: string; 

  // --- Subtext & Metadata ---
  /** Secondary text displayed below or next to the label */
  caption?: string | React.ReactNode;
  /** A short description providing more context */
  description?: string | React.ReactNode;
  /** Supporting metadata or sub-labels (e.g., ["Admin", "Active"]) */
  tags?: string[] | React.ReactNode;

  // --- Ordering & Hierarchies ---
  /** Position of the item in the list rendering */
  index?: number;
  /** For nested structures (trees, multi-level menus) */
  children?: ListItem[];
  /** Reference to a parent item ID if working with flat hierarchical data */
  parentId?: string | number;

  // --- Navigation & Routing ---
  /** Internal application routing path (e.g., for React Router or Next.js) */
  path?: string;
  /** External URL link */
  url?: string;
  /** Target attribute for links (e.g., '_blank', '_self') */
  target?: '_blank' | '_self' | '_parent' | '_top';

  // --- Visuals & Media ---
  /** Icon name (string for icon fonts/libraries) or a renderable React node */
  icon?: string | React.ReactNode;
  /** Trailing icon or element (e.g., an arrow indicating a submenu) */
  trailingIcon?: string | React.ReactNode;
  /** URL for an image or user avatar associated with the item */
  avatarUrl?: string;
  /** Hex code, CSS variable, or theme color name for custom item branding */
  color?: string;

  // --- States & Flags ---
  /** Prevents user interaction and visually grays out the item */
  disabled?: boolean;
  /** Visually highlights the item as currently active/chosen */
  selected?: boolean;
  /** Visually mark this item as currently checked */
  checked?: boolean;
  /** Controls visibility without removing it from the data array */
  hidden?: boolean;
  /** Indicates the item is currently loading something (e.g., lazy loading children) */
  loading?: boolean;
  /** For expandable list items */
  isExpanded?: boolean;

  // --- Escape Hatch for Custom Data ---
  /** Holds any custom, domain-specific data required by your app */
  meta?: Record<string, T>;
}