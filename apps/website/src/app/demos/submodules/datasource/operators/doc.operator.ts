import { Action, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

export function doc<T>() {
  return map(
    (action: Action<DocumentSnapshot<T>>) =>
      ({ id: action.payload.id, ...action.payload.data() } as T)
  );
}
