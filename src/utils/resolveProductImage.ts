// Eagerly import all product images so we can resolve DB paths like
// "/src/assets/products/tulipia/file.png" into bundled URLs at runtime.

const imageModules = import.meta.glob<{ default: string }>(
  '/src/assets/products/**/*.{png,jpg,jpeg,webp}',
  { eager: true }
);

/**
 * Resolves a product image path stored in the database to a usable URL.
 * - If the path starts with "http" it's already a valid URL.
 * - If it matches a local asset path (e.g. "/src/assets/products/..."), 
 *   returns the Vite-bundled URL.
 * - Otherwise returns the path as-is (fallback).
 */
export function resolveProductImage(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  
  // Already a full URL
  if (path.startsWith('http')) return path;
  
  // Normalize: ensure it starts with /src/assets/
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  const mod = imageModules[normalizedPath];
  if (mod) return mod.default;
  
  // Try without leading slash
  const withoutSlash = normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath;
  const mod2 = imageModules[`/${withoutSlash}`];
  if (mod2) return mod2.default;
  
  // Fallback — return as-is (might be a public/ path or external)
  return path;
}

/**
 * Resolves an array of image paths.
 */
export function resolveProductImages(paths: string[] | null | undefined): string[] {
  if (!paths) return [];
  return paths.map(p => resolveProductImage(p)).filter(Boolean) as string[];
}
