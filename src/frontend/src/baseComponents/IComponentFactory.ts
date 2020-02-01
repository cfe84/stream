import { Component } from "../html"
import { FilterFunction, SortFunction } from "./GenericController";

export interface IComponentFactory<T> {
  createListFilterComponent?(onFilterChange: (filter: FilterFunction<T>) => void, filterComponentOptions?: any): Component;
  createListViewControlComponent?(onViewControlChanged: (options: any) => void): Component;
  createListSortComponent?(onSortChange: (sort: SortFunction<T>) => void): Component;
  createListItemComponent?(element: T): Component;
  createEditComponent(element: T, onCancel: () => void, onValidate: (entity: T) => void, onDelete: (entity: T) => void): Component;
  createReadComponent(element: T, onBack: () => void, onEdit: (entity: T) => void, onDelete: (entity: T) => void): Component;
  createCreateComponent(element: T, onCancel: () => void, onValidate: (entity: T) => void): Component;
}