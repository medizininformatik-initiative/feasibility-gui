import { trigger, transition, style, query, animate, group } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition(
    'Feasibility_Search => Feasibility_Editor, Data_Selection_Search => Data_Selection_Editor, Cohort => DataSelection',
    [
      query(
        ':enter, :leave',
        [
          style({
            position: 'absolute',
            width: '90%',
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
    ]
  ),

  transition(
    'Feasibility_Editor => Feasibility_Search, Data_Selection_Editor => Data_Selection_Search, DataSelection => Cohort',
    [
      query(
        ':enter, :leave',
        [
          style({
            position: 'absolute',
            width: '90%',
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
    ]
  ),
]);
