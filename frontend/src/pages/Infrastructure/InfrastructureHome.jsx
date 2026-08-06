import React from 'react';
import PageHeader from '../../components/ui/PageHeader/PageHeader';
import Button from '../../components/ui/Button/Button';
import Skeleton from '../../components/ui/Skeleton/Skeleton';
import { Plus } from 'lucide-react';
import InfrastructureToolbar from './components/InfrastructureToolbar';
import InfrastructureEmptyState from './components/InfrastructureEmptyState';

// IMPORTANT: Mock state as requested. Change to true to view the Grid State.
const hasInfrastructure = false;

export default React.memo(function InfrastructureHome() {
  
  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-[#111111] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="w-12 h-12" variant="circle" />
            <Skeleton className="w-20 h-6" variant="rect" />
          </div>
          <Skeleton className="w-3/4 h-5 mb-3" variant="text" />
          <Skeleton className="w-1/2 h-4 mb-8 opacity-50" variant="text" />
          <div className="flex gap-2">
            <Skeleton className="w-16 h-6 rounded-full" variant="rect" />
            <Skeleton className="w-16 h-6 rounded-full" variant="rect" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <PageHeader 
        title="My Infrastructure"
        description="Manage and monitor all your connected cloud environments."
        action={
          <Button leftIcon={<Plus size={18} />}>
            Connect Infrastructure
          </Button>
        }
      />
      
      <InfrastructureToolbar />

      {hasInfrastructure ? <SkeletonGrid /> : <InfrastructureEmptyState />}
    </>
  );
});
