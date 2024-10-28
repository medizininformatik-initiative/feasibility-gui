import { trigger, transition, style, query, animate, group } from '@angular/animations';

export const slideInFromTop = trigger('routeAnimations', [
  transition('Search <=> Editor', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          width: '100%',
          top: 0,
        }),
      ],
      { optional: true }
    ),

    group([
      query(
        ':leave',
        [animate('300ms ease-out', style({ transform: 'translateY(100%)', opacity: 0 }))],
        { optional: true }
      ),

      query(
        ':enter',
        [
          style({ transform: 'translateY(-100%)', opacity: 0 }),
          animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);

export const slideInFromBottom = trigger('routeAnimations', [
  transition('Editor <=> Search', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          width: '100%',
          top: 0,
        }),
      ],
      { optional: true }
    ),
    group([
      query(
        ':leave',
        [animate('300ms ease-out', style({ transform: 'translateY(-100%)', opacity: 0 }))],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({ transform: 'translateY(100%)', opacity: 0 }),
          animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
