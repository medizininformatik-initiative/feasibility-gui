import { trigger, transition, style, query, animate, group } from '@angular/animations';

export const slideInFromBottom = trigger('routeAnimations', [
  transition('Search => Editor, Cohort => DataSelection', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          width: '100%',
          height: '100%',
        }),
      ],
      { optional: true }
    ),

    group([
      query(':leave', [animate('600ms ease-in-out', style({ transform: 'translateY(-100%)' }))], {
        optional: true,
      }),

      query(
        ':enter',
        [
          style({ transform: 'translateY(100%)' }),
          animate('600ms ease-in-out', style({ transform: 'translateY(0)' })),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);

export const slideInFromTop = trigger('routeAnimations', [
  transition('Editor => Search, DataSelection => Cohort', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          width: '100%',
          height: '100%',
        }),
      ],
      { optional: true }
    ),

    group([
      query(':leave', [animate('600ms ease-in-out', style({ transform: 'translateY(100%)' }))], {
        optional: true,
      }),

      query(
        ':enter',
        [
          style({ transform: 'translateY(-100%)' }),
          animate('600ms ease-in-out', style({ transform: 'translateY(0)' })),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
