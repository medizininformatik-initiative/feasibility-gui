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

  ngOnInit() {}

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

  calcMarginLeftCheckbox(level: number): string {
    if (level === 0) {
      return '10px';
    } else {
      return `calc(${level} * 40px)`;
    }
  }
  calcMarginLeftTreeNode(level: number, isCheckbox: boolean): string {
    if (isCheckbox) {
      return '10px';
    } else {
      return `calc(${level} * 40px)`;
    }
  }
  checkboxSelected(node: TreeNode): void {
    node.data.isCheckboxSelected = !node.data.isCheckboxSelected;
    this.selectedCheckbox.emit(node);
  }
}
