import React, { useState } from 'react';
import { Search, RotateCcw, Network, GitBranch } from 'lucide-react';
import { NetworkData, sampleNetworks } from '../data/sampleNetwork';
import { findShortestPath } from '../utils/graphAlgorithms';

interface ControlPanelProps {
  data: NetworkData;
  onPathChange: (path: string[]) => void;
  onReset: () => void;
  onNetworkChange: (network: NetworkData) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  data,
  onPathChange,
  onReset,
  onNetworkChange
}) => {
  const [sourceUser, setSourceUser] = useState('');
  const [targetUser, setTargetUser] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleFindPath = () => {
    if (sourceUser && targetUser && sourceUser !== targetUser) {
      const path = findShortestPath(data, sourceUser, targetUser);
      onPathChange(path);
    }
  };

  const handleNetworkChange = (networkIndex: number) => {
    const newNetwork = sampleNetworks[networkIndex];
    onNetworkChange(newNetwork);
    setSourceUser('');
    setTargetUser('');
    onPathChange([]);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Network className="w-5 h-5" />
            Graph Analysis Tools
          </h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden text-white hover:text-gray-200 transition-colors"
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>
      </div>

      <div className={`p-6 space-y-6 ${isExpanded ? 'block' : 'hidden'} lg:block`}>
        {/* Network Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-800">
            <GitBranch className="w-5 h-5 text-purple-600" />
            <h4 className="font-medium">Select Network Type</h4>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {sampleNetworks.map((network, index) => (
              <button
                key={index}
                onClick={() => handleNetworkChange(index)}
                className={`p-3 text-left rounded-lg border-2 transition-all ${
                  data.name === network.name
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 bg-gray-50 hover:border-purple-300 text-gray-700'
                }`}
              >
                <div className="font-medium text-sm">{network.name}</div>
                <div className="text-xs text-gray-500 mt-1">{network.description}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {network.users.length} nodes, {network.connections.length} edges
                </div>
              </button>
            ))}
          </div>
        </div>

        <hr className="border-gray-200" />


        {/* Network Statistics */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-medium text-gray-800 mb-2">Network Statistics</h5>
          <div className="space-y-1 text-sm text-gray-600">
            <div>Nodes: {data.users.length}</div>
            <div>Edges: {data.connections.length}</div>
            <div>Density: {((2 * data.connections.length) / (data.users.length * (data.users.length - 1))).toFixed(3)}</div>
            <div>Avg Connections: {(data.connections.length * 2 / data.users.length).toFixed(1)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;