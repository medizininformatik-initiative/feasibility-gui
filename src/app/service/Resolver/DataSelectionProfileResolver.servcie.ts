import { DataSelectionProfileTree } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTree';
import { DataSelectionProfileTreeService } from '../DataSelection/CreateDataselectionProfileTree';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionProfileResolverService {
  constructor(private dataSelectionProfileTreeService: DataSelectionProfileTreeService) {}

  public resolve(): Observable<DataSelectionProfileTree> {
    return this.dataSelectionProfileTreeService.fetchProfileTree();
  }
}
