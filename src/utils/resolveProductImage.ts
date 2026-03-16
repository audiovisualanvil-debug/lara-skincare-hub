/**
 * Resolves a product image path stored in the database to a usable URL.
 * All product images are now hosted on CDN, so this is a simple passthrough.
 */
export function resolveProductImage(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  return path;
}

/**
 * Resolves an array of image paths.
 */
export function resolveProductImages(paths: string[] | null | undefined): string[] {
  if (!paths) return [];
  return paths.map(p => resolveProductImage(p)).filter(Boolean) as string[];
}
