import { Display } from '../DataSelection/Profile/Display';

export interface PossibleProfileReferenceData {
  id: string
  label: string
  display: Display
  url: string
  isSelected: boolean
}
