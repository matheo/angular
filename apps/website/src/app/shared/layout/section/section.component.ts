import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SectionItem } from '../item/item.interface';

@Component({
  selector: 'web-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {
  sections!: SectionItem[];

  constructor(router: Router) {
    const paths = router.url.split('/').filter(Boolean);

    this.sections = paths.reduce<SectionItem[]>((items, next, i) => {
      items.push({
        title: next,
        link:
          paths.length > 1 && i === 0
            ? `/${next}`
            : i < paths.length - 1
            ? items[i - 1].link.concat(`/${next}`)
            : '',
      });
      return items;
    }, []);
  }
}
