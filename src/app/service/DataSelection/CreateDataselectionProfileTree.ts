import { DataSelectionProfileTree } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTree';
import { DataSelectionProfileTreeNode } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeNode';
import { DataSelectionProfileTreeRoot } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeRoot';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';
import { DataSelectionApiService } from '../Backend/Api/DataSelectionApi.service';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionProfileTreeService {
  constructor(private dataSelectionApiService: DataSelectionApiService) {}

  public fetchProfileTree(profileTreeData?: any): Observable<DataSelectionProfileTree> {
    return this.dataSelectionApiService.getDataSelectionProfileTree().pipe(
      map((response) => {
        const rootNode = this.createNode(response.children);
        const treeRoot = this.createTreeRoot(profileTreeData, rootNode);
        return new DataSelectionProfileTree(treeRoot, rootNode);
      })
    );
  }

  private createTreeRoot(
    data: any,
    rootNode: DataSelectionProfileTreeNode[]
  ): DataSelectionProfileTreeRoot {
    return new DataSelectionProfileTreeRoot(data?.name, data?.module, data?.url, rootNode);
  }

  private createNode(data: any): DataSelectionProfileTreeNode[] {
    const result = [];
    if (data) {
      data.forEach((child) => {
        result.push(
          new DataSelectionProfileTreeNode(
            child.id,
            child.name,
            this.instantiateDisplayDataForDisplay(child.display),
            this.instantiateDisplayDataForFields(child.fields),
            child.module,
            child.url,
            child.leaf,
            child.selectable,
            this.createNode(child?.children)
          )
        );
      });
    }

    return result;
  }

  public instantiateDisplayDataForFields(displayData: any): Display {
    return new Display(
      displayData.translations.map(
        (translation) =>
          new Translation(
            translation.language,
            undefined,
            this.checkValuesForTypeString(translation.value)
          )
      ),
      undefined,
      this.checkValuesForTypeString(displayData.original)
    );
  }

  public instantiateDisplayDataForDisplay(displayData: any): Display {
    return new Display(
      displayData.translations.map(
        (translation) =>
          new Translation(
            translation.language,
            translation.value.length > 0 ? translation.value : undefined
          )
      ),
      displayData.original
    );
  }

  private checkValuesForTypeString(value: string | string[]): string[] {
    if (typeof value == 'string') {
      if (value.length > 0) {
        return [value];
      } else {
        return [];
      }
    } else {
      return value;
    }
  }
}
