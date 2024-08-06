import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeNode } from '../../models/TreeNode/TreeNodeInterface';

@Component({
  selector: 'num-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  @Input()
  treeData: TreeNode;

  @Output()
  selectedCheckbox: EventEmitter<TreeNode> = new EventEmitter();

  expandedNodes: Set<any> = new Set();

  constructor() {}

  ngOnInit() {
    console.log(this.treeData);
  }

  toggleExpand(node: any) {
    if (this.expandedNodes.has(node)) {
      this.expandedNodes.delete(node);
    } else {
      this.expandedNodes.add(node);
    }
  }

  isExpanded(node: any): boolean {
    return this.expandedNodes.has(node);
  }

  calcMarginLeft(level: number): string {
    return `calc(${level} * -20px)`;
  }

  calcMarginLeftDisplay(level: number): string {
    return `calc(${level} * 30px)`;
  }

  checkboxSelected(node: TreeNode): void {
    this.selectedCheckbox.emit(node);
  }
}
