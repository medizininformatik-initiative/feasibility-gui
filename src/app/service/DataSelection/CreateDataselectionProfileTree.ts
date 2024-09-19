import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';
import { DataSelectionProfileTree } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTree';
import { DataSelectionProfileTreeNode } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeNode';
import { DataSelectionProfileTreeRoot } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeRoot';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionProfileTreeService {
  constructor(private backendservice: BackendService) {}

  public createProfileTree(profileTreeData?: any): Observable<DataSelectionProfileTree> {
    return this.backendservice.getDataSelectionProfileTree().pipe(
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
            child.display,
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
}
