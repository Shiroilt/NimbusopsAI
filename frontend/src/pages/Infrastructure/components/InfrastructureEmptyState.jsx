import React from 'react';
import EmptyState from '../../../components/ui/EmptyState/EmptyState';
import { Cloud, Server, Cpu, Database } from 'lucide-react';
import { motion } from 'framer-motion';

export default React.memo(function InfrastructureEmptyState() {
  
  // Custom SVG composition reusing lucide icons and our theme colors
  const PremiumIllustration = () => (
    <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
      {/* Background glowing orbs */}
      <div className="absolute inset-0 bg-[#FF9D00]/20 blur-[60px] rounded-full" />
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#2563EB]/20 blur-[40px] rounded-full" />
      
      {/* Central Platform Graphic */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-24 h-24 bg-[#111111] border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
      >
        <Cloud className="w-12 h-12 text-[#FF9D00]" />
        
        {/* Floating nodes */}
        <motion.div 
          className="absolute -top-6 -left-6 p-3 bg-[#1a1a1a] border border-white/10 rounded-xl"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
        >
          <Server className="w-5 h-5 text-white/60" />
        </motion.div>

        <motion.div 
          className="absolute top-1/2 -right-8 p-3 bg-[#1a1a1a] border border-white/10 rounded-xl"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
        >
          <Cpu className="w-5 h-5 text-[#2563EB]" />
        </motion.div>

        <motion.div 
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 p-3 bg-[#1a1a1a] border border-white/10 rounded-xl"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
        >
          <Database className="w-5 h-5 text-emerald-500" />
        </motion.div>
      </motion.div>
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto py-12">
      <PremiumIllustration />
      <EmptyState 
        className="border-none bg-transparent p-0"
        title="No Infrastructure Connected"
        description="Connect your first cloud infrastructure to begin monitoring, AI prediction, and deployment management."
        primaryAction={{
          label: 'Connect Infrastructure',
          onClick: () => {}
        }}
        secondaryAction={{
          label: 'Documentation',
          onClick: () => {}
        }}
      />
    </div>
  );
});
