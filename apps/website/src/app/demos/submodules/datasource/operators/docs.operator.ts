import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

export function docs<T>() {
  return map((result: DocumentChangeAction<T>[]) =>
    result
      .filter((row) => row.payload.doc.exists)
      .map((row) => ({
        id: row.payload.doc.id,
        ...row.payload.doc.data(),
      }))
  );
}
