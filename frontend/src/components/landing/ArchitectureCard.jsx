export default function ArchitectureCard({ icon: Icon, title, description, index }) {
    return (
        <div className={`architecture-card flex-1 min-w-[200px] flex flex-col items-center text-center p-6 bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-2xl relative`}>
            {/* Index Number */}
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-[11px] font-bold text-white/50 z-10">
                0{index}
            </div>
            
            {/* Glow Effect behind Icon */}
            <div className="absolute top-8 w-16 h-16 bg-[#FF9D00]/20 blur-xl rounded-full pointer-events-none icon-glow" />
            
            <div className="icon-container w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 relative z-10 transition-colors duration-300">
                <Icon className="w-5 h-5 text-white/80 transition-colors duration-300 icon-svg" />
            </div>
            
            <h3 className="text-white font-semibold text-[17px] mb-3">{title}</h3>
            <p className="text-white/50 text-[14px] leading-[1.5] max-w-[240px]">
                {description}
            </p>
        </div>
    );
}
