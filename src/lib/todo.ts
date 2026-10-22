/** Wrap [bracketed placeholder] text in a highlighted <mark> so unfinished copy is obvious. */
export function markTodos(html: string): string {
  return html.replace(/\[([^\]]+)\]/g, '<mark class="todo">[$1]</mark>');
}

/** Strip placeholder text and tags for plain-text uses like structured data. */
export function plainText(html: string): string {
  return html
    .replace(/\[[^\]]+\]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
