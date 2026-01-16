import { createContext, useContext, type ReactNode } from 'react';
import { useDemoSimulator, type UseDemoSimulatorReturn } from '../hooks/useDemoSimulator';

// =============================================================================
// DEMO SIM CONTEXT - Shared simulator state across portal
// =============================================================================

const DemoSimContext = createContext<UseDemoSimulatorReturn | null>(null);

export interface DemoSimProviderProps {
    children: ReactNode;
}

/**
 * Provider component to wrap portal layout
 */
export function DemoSimProvider({ children }: DemoSimProviderProps) {
    const simulator = useDemoSimulator();

    return (
        <DemoSimContext.Provider value={simulator}>
            {children}
        </DemoSimContext.Provider>
    );
}

/**
 * Hook to consume simulator context
 */
export function useDemoSim(): UseDemoSimulatorReturn {
    const context = useContext(DemoSimContext);
    if (!context) {
        throw new Error('useDemoSim must be used within a DemoSimProvider');
    }
    return context;
}

export default DemoSimContext;
