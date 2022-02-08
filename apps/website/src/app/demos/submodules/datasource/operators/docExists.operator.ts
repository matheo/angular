import { Action, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { of, throwError } from 'rxjs';
import { concatMap } from 'rxjs/operators';

export function docExists<T>() {
  return concatMap((action: Action<DocumentSnapshot<T>>) =>
    action.payload.exists ? of(action) : throwError(null)
  );
}
