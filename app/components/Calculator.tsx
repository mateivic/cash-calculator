'use client';
import './../globals.css';
import { useState } from 'react';
import ReportModal from './ReportModal';
import { BarChart3, Download } from 'lucide-react';

type OperationMode = 'add' | 'subtract';

// Euro banknote denominations
const DENOMINATIONS = [5, 10, 20, 50, 100, 200, 500];

// Track denomination usage for reports
type DenominationUsage = {
  [key: number]: number; // net count for each denomination
};

export default function Calculator() {
  const [total, setTotal] = useState<number>(0);
  const [mode, setMode] = useState<OperationMode>('add');
  const [denominationUsage, setDenominationUsage] = useState<DenominationUsage>({});
  const [showReport, setShowReport] = useState(false);

  // Handle denomination button click - one-click operation
  const handleDenominationClick = (value: number) => {
    if (mode === 'add') {
      setTotal(prev => prev + value);
      updateDenominationUsage(value, 1);
    } else {
      setTotal(prev => prev - value);
      updateDenominationUsage(value, -1);
    }
  };

  // Update denomination usage tracking (net count)
  const updateDenominationUsage = (denomination: number, change: number) => {
    setDenominationUsage(prev => ({
      ...prev,
      [denomination]: (prev[denomination] || 0) + change
    }));
  };

  // Reset calculator to initial state
  const handleReset = () => {
    setTotal(0);
    setMode('add');
    setDenominationUsage({});
  };

  // Toggle between addition and subtraction modes
  const handleModeToggle = (newMode: OperationMode) => {
    setMode(newMode);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black overflow-hidden flex flex-col gap-2">
        {/* Header */}
        <div className="bg-black text-white text-center flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-light mb-6">Euro Kalkulator</h1>

          {/* Mode Indicator */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-md text-gray-400 font-light">Način rada</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleModeToggle('add')}
                className={`size-16 rounded-full text-white flex items-center justify-center text-3xl font-light transition-all border-2 duration-200 ${mode === 'add'
                  ? 'bg-orange border-orange'
                  : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700'
                  }`}
              >
                +
              </button>
              <button
                onClick={() => handleModeToggle('subtract')}
                className={`size-16 rounded-full text-white flex items-center justify-center text-2xl font-light transition-all border-2 duration-200 ${mode === 'subtract'
                  ? 'bg-orange border-orange'
                  : 'bg-gray-800 text-gray-400  border-gray-700 hover:bg-gray-700'
                  }`}
              >
                −
              </button>
            </div>
          </div>
        </div>

        {/* Total Display */}
        <div className="bg-black px-6 pb-8">
          <div className="text-right">
            <div className={`text-6xl font-light ${total < 0 ? 'text-red-400' : 'text-white'} mb-2`}>
              €{total.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Denomination Buttons Grid */}
        <div className="bg-black px-4 flex flex-col items-stretch justify-center">
          <div className="grid grid-cols-3 gap-x-1 gap-y-3 mb-6 justify-items-center">
            {DENOMINATIONS.map((value) => (
              <button
                key={value}
                onClick={() => handleDenominationClick(value)}
                className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white border-2 border-gray-700 font-light size-20 rounded-full transition-all duration-150 text-2xl"
              >
                {value}
              </button>
            ))}
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-3 gap-x-1 justify-items-center">
            <button
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-400 active:bg-gray-300 text-white border-2 border-gray-400 font-light size-20 rounded-full transition-all duration-150 text-xl"
            >
              AC
            </button>
            <button
              onClick={() => setShowReport(true)}
              disabled={total <= 0}
              className={`bg-gray-500 font-light size-20 rounded-full transition-all duration-150 flex items-center justify-center border-2 border-gray-400 ${total <= 0
                ? 'cursor-not-allowed'
                : 'text-white hover:bg-gray-400 active:bg-gray-300'
                }`}
            >
              <BarChart3 className={`w-6 h-6 ${total <= 0 ? 'text-gray-200' : 'text-white'}`} color={total <= 0 ? 'gray' : 'white'} />
            </button>
            <button
              onClick={() => {
                if ('serviceWorker' in navigator) {
                  const deferredPrompt = (window as any).deferredPrompt;
                  if (deferredPrompt) {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then((choiceResult: any) => {
                      if (choiceResult.outcome === 'accepted') {
                        console.log('Korisnik je prihvatio instalaciju');
                      }
                      (window as any).deferredPrompt = null;
                    });
                  } else {
                    // Fallback za iOS Safari
                    alert('Za dodavanje na početni ekran: dodirnite ikonu "Otvori u aplikaciji" u gornjem desnom kutu browsera');
                  }
                }
              }}
              className="bg-gray-500 hover:bg-gray-400 active:bg-gray-300 text-white border-2 border-gray-400 font-light size-20 rounded-full transition-all duration-150 flex items-center justify-center"
            >
              <Download className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>

      {/* Report Modal */}
      {showReport && (
        <ReportModal
          denominationUsage={denominationUsage}
          total={total}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
}