import { useState, useMemo } from 'react';
import { StaticImageData } from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  servings: string;
  image: StaticImageData | string;
}

export function useSort(items: Product[]) {
  const [sortOption, setSortOption] = useState('featured');

  const sortedItems = useMemo(() => {
    const itemsCopy = [...items];
    
    switch (sortOption) {
      case 'name':
        return itemsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case 'price-asc':
        return itemsCopy.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return itemsCopy.sort((a, b) => b.price - a.price);
      default:
        return itemsCopy;
    }
  }, [items, sortOption]);

  return { sortedItems, sortOption, setSortOption };
} 