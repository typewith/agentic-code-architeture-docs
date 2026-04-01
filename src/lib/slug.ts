export function stripNumericPrefix(folderName: string): string {
  return folderName.replace(/^\d+-/, '')
}
