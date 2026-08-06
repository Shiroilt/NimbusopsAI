import React from 'react';
import SearchBar from '../../../components/ui/SearchBar/SearchBar';
import Dropdown from '../../../components/ui/Dropdown/Dropdown';
import Button from '../../../components/ui/Button/Button';
import { Filter, ArrowUpDown } from 'lucide-react';

const filters = ['All', 'Production', 'Development', 'Staging', 'Testing'];

const sortItems = [
  { label: 'Newest' },
  { label: 'Oldest' },
  { divider: true },
  { label: 'Health' },
  { label: 'Provider' },
  { label: 'Region' },
];

export default React.memo(function InfrastructureToolbar() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-white/10 mb-8">
      
      {/* Left side: Search and Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <SearchBar placeholder="Search infrastructure..." className="w-full md:w-64" />
        
        {/* Horizontal scroll on mobile, flex wrap on desktop */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
          <div className="flex items-center gap-2 text-white/50 text-sm mr-2 shrink-0">
            <Filter size={16} />
          </div>
          {filters.map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors shrink-0 ${
                filter === 'All' 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Right side: Sort */}
      <div className="flex items-center shrink-0">
        <Dropdown 
          align="right"
          trigger={
            <Button variant="outline" size="sm" leftIcon={<ArrowUpDown size={16} />}>
              Sort: Newest
            </Button>
          }
          items={sortItems}
        />
      </div>
    </div>
  );
});
