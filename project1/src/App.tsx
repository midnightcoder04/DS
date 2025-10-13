import React, { useState } from 'react';
import Header from './components/Header';
import GraphVisualization from './components/GraphVisualization';
import ControlPanel from './components/ControlPanel';
import ConceptsSection from './components/ConceptsSection';
import { sampleNetwork, NetworkData } from './data/sampleNetwork';

function App() {
  const [activeSection, setActiveSection] = useState('demo');
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [currentNetwork, setCurrentNetwork] = useState<NetworkData>(sampleNetwork);

  const handleReset = () => {
    setSelectedPath([]);
    setSelectedNode(null);
  };

  const handleNodeClick = (userId: string) => {
    setSelectedNode(userId);
  };

  const handleNetworkChange = (network: NetworkData) => {
    setCurrentNetwork(network);
    setSelectedPath([]);
    setSelectedNode(null);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'demo':
        return (
          <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Interactive Network Graph Visualization
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Explore different types of networks and see how graph algorithms work in practice. 
                  Switch between network types to understand various graph structures and their properties.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                  <h3 className="text-white font-semibold text-lg">
                    {currentNetwork.name}
                  </h3>
                  <p className="text-indigo-100 text-sm">
                    {currentNetwork.description}
                  </p>
                </div>
                
                <div className="flex flex-col lg:flex-row">
                  {/* Graph Visualization */}
                  <div className="flex-1 h-[600px] p-4">
                    <GraphVisualization
                      data={currentNetwork}
                      selectedPath={selectedPath}
                      onNodeClick={handleNodeClick}
                    />
                  </div>

                  {/* Control Panel */}
                  <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-200 p-6">
                    <ControlPanel
                      data={currentNetwork}
                      onPathChange={setSelectedPath}
                      onReset={handleReset}
                      onNetworkChange={handleNetworkChange}
                    />
                  </div>
                </div>
              </div>

              {/* Path Information */}
              {selectedPath.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Shortest Path Found
                  </h4>
                  <div className="flex flex-wrap gap-2 items-center">
                    {selectedPath.map((nodeId, index) => {
                      const user = currentNetwork.users.find(u => u.id === nodeId);
                      return (
                        <React.Fragment key={nodeId}>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {user?.name || nodeId}
                          </span>
                          {index < selectedPath.length - 1 && (
                            <span className="text-gray-400">→</span>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Path length: {selectedPath.length - 1} steps
                  </p>
                </div>
              )}
            </div>
          </section>
        );
      case 'concepts':
        return <ConceptsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      {renderContent()}
    </div>
  );
}

export default App;