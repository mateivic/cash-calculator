'use client';

type DenominationUsage = {
  [key: number]: number;
};

type ReportModalProps = {
  denominationUsage: DenominationUsage;
  total: number;
  onClose: () => void;
};

export default function ReportModal({ denominationUsage, total, onClose }: ReportModalProps) {
  // Get sorted denominations that have positive net usage (count > 0)
  const usedDenominations = Object.entries(denominationUsage)
    .filter(([, count]) => count > 0) // Only positive net counts
    .sort(([a], [b]) => Number(b) - Number(a)); // Sort descending

  const hasUsage = usedDenominations.length > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 animate-fadeIn overflow-y-auto">
      <div className="bg-gray-900 rounded-3xl max-w-sm w-full overflow-auto">
        {/* Header */}
        <div className="bg-gray-900 text-white p-6 border-b border-gray-700">
          <div className="flex items-center justify-end">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              aria-label="Zatvori"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-gray-900">
          {/* Total */}
          <div className="text-center mb-8">
            <div className={`text-4xl font-light ${total < 0 ? 'text-red-500' : 'text-white'} mb-2`}>
              Ukupno: €{total.toFixed(2)}
            </div>
          </div>

          {/* Denomination Breakdown */}
          {hasUsage ? (
            <div className="space-y-3">
              {usedDenominations.map(([denomination, count]) => {
                const value = Number(denomination);
                return (
                  <div
                    key={denomination}
                    className="flex items-center justify-between bg-gray-800 rounded-2xl p-4"
                  >
                    <div className="text-white font-light text-lg">
                      €{value}
                    </div>
                    <div className="text-gray-300 font-light text-lg">
                      {Math.abs(count)}×
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">📝</div>
              <p className="font-light">Nema novčanica koje čine ovaj zbroj</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-900 px-6 py-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-light py-4 px-6 rounded-2xl transition-all duration-150"
          >
            Zatvori
          </button>
        </div>
      </div>
    </div>
  );
}