import { useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const SignInCard = lazy(() => import("./SignInCard"));
const SignUpCard = lazy(() => import("./SignUpCard"));

export default function AuthModal() {
    const { authMode, closeAuth } = useAuth();
    const isOpen = authMode !== "closed";

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';

            const handleKeyDown = (e) => {
                if (e.key === "Escape") {
                    closeAuth();
                }
            };
            window.addEventListener("keydown", handleKeyDown);

            return () => {
                document.body.style.overflow = '';
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [isOpen, closeAuth]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div key="auth-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/60 cursor-pointer"
                        onClick={closeAuth}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
                        className="relative z-10 w-full max-w-[440px]"
                    >
                        <Suspense fallback={
                            <div className="w-full h-[400px] bg-[#0c0c0c]/90 rounded-[24px] border border-white/10 flex items-center justify-center shadow-2xl">
                                <div className="w-6 h-6 border-2 border-[#FF9D00] border-t-transparent rounded-full animate-spin" />
                            </div>
                        }>
                            {authMode === "signin" ? <SignInCard /> : <SignUpCard />}
                        </Suspense>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
