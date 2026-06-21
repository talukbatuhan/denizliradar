export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function toRssPubDate(isoDate: string): string {
  return new Date(isoDate).toUTCString();
}

export function toNewsPublicationDate(isoDate: string): string {
  return new Date(isoDate).toISOString();
}
