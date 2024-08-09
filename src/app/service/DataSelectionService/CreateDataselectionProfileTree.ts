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
  constructor(private backend: BackendService) {}

  public createProfileTree(profileTreeData?: any): Observable<DataSelectionProfileTree> {
    return this.backend.getDataSelectionProfileTree().pipe(
      map((response) => {
        const rootNode = this.createNode(response);
        const treeRoot = this.createTreeRoot(profileTreeData, rootNode);
        return new DataSelectionProfileTree(treeRoot, [rootNode]);
      })
    );
  }

  private createTreeRoot(
    data: any,
    rootNode: DataSelectionProfileTreeNode
  ): DataSelectionProfileTreeRoot {
    return new DataSelectionProfileTreeRoot(data?.name, data?.module, data?.url, [rootNode]);
  }

  private createNode(data: any): DataSelectionProfileTreeNode {
    const childrenNodes = this.convertChildrenToNodes(data.children);
    return new DataSelectionProfileTreeNode(
      data.id,
      data.name,
      data.display,
      data.module,
      data.url,
      data.leaf,
      data.selectable,
      childrenNodes
    );
  }

  private convertChildrenToNodes(children: any[]): DataSelectionProfileTreeNode[] {
    return children?.map((child) => this.createNode(child));
  }
}
