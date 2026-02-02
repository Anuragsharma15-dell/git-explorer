"use client";

import React from "react";
import { ObjectRenderer } from "./ObjectRenderer";

interface GridLayoutProps {
  items: unknown[];
  columns?: 1 | 2 | 3 | 4;
  onSelect?: (item: unknown) => void;
  selectedIndex?: number;
}

/**
 * Grid layout component that displays multiple items in a responsive grid.
 * Replaces the deleted CardGroup component with proper grid functionality.
 */
export function GridLayout({ 
  items, 
  columns = 2, 
  onSelect, 
  selectedIndex 
}: GridLayoutProps) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No items to display</p>
      </div>
    );
  }

  // Filter out null/undefined items
  const validItems = items.filter(item => item != null);

  if (validItems.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No valid items to display</p>
      </div>
    );
  }

  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  };

  return (
    <div className={`grid gap-4 ${gridClasses[columns]}`}>
      {validItems.map((item, index) => {
        // Use item's id if available, otherwise fall back to index
        const itemObj = item as Record<string, unknown>;
        const key = (itemObj?.id as string | number) || (itemObj?.number as string | number) || index;
        return (
          <ObjectRenderer
            key={key}
            data={item}
            index={index}
            onSelect={onSelect}
            isSelected={selectedIndex === index}
          />
        );
      })}
    </div>
  );
}