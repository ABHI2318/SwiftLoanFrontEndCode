import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false, // Set to false for dynamic updates
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      // Check if any attribute in the item matches the search text
      return Object.entries(item).some(([key, value]) => {
        if (key === 'isClosed') {
          // Convert boolean to 'Closed' or 'Not Closed' for searching
          const statusText = value ? 'closed' : 'not closed';
          return statusText.includes(searchText);
        }
        if (value != null) {
          return value.toString().toLowerCase().includes(searchText);
        }
        return false;
      });
    });
  }
}