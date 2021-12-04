import { DocumentChangeAction } from '@angular/fire/compat/firestore';

export function docsMapper<T>(result: DocumentChangeAction<T>[]): T[] {
  return result
    .filter((row) => row.payload.doc.exists)
    .map((row) => ({
      id: row.payload.doc.id,
      ...row.payload.doc.data(),
    }));
}
