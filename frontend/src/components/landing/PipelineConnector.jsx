export default function PipelineConnector() {
    return (
        <div className="flex items-center justify-center lg:flex-1 h-12 lg:h-auto lg:px-2">
            {/* Desktop Horizontal Line */}
            <div className="hidden lg:block w-full h-[1px] bg-white/10 relative overflow-hidden">
                <div className="pipeline-line absolute top-0 left-0 bottom-0 w-full bg-gradient-to-r from-transparent via-[#FF9D00]/60 to-transparent transform -translate-x-full" />
            </div>
            
            {/* Mobile Vertical Line */}
            <div className="lg:hidden w-[1px] h-full bg-white/10 relative overflow-hidden">
                <div className="pipeline-line-mobile absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-transparent via-[#FF9D00]/60 to-transparent transform -translate-y-full" />
            </div>
        </div>
    );
}
