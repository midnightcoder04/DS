import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { NetworkData } from '../data/sampleNetwork';
import { GraphNode, GraphLink } from '../utils/graphAlgorithms';

interface GraphVisualizationProps {
  data: NetworkData;
  selectedPath: string[];
  onNodeClick: (userId: string) => void;
}

const GraphVisualization: React.FC<GraphVisualizationProps> = ({
  data,
  selectedPath,
  onNodeClick
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const container = svgRef.current.parentElement;
        if (container) {
          setDimensions({
            width: container.clientWidth,
            height: container.clientHeight
          });
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !data) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
      });

    svg.call(zoom);

    const container = svg.append('g');

    // Prepare data
    const nodes: GraphNode[] = data.users.map(user => ({ ...user }));
    const links: GraphLink[] = data.connections.map(conn => ({ ...conn }));

    // Create simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(25));

    simulationRef.current = simulation;

    // Create links
    const link = container.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 2)
      .attr('opacity', (d) => {
        if (selectedPath.length === 0) return 0.6;
        const source = typeof d.source === 'object' ? d.source.id : d.source;
        const target = typeof d.target === 'object' ? d.target.id : d.target;
        
        // Check if this edge is part of the selected path
        for (let i = 0; i < selectedPath.length - 1; i++) {
          if ((source === selectedPath[i] && target === selectedPath[i + 1]) ||
              (source === selectedPath[i + 1] && target === selectedPath[i])) {
            return 1;
          }
        }
        return 0.2;
      })
      .attr('stroke', (d) => {
        if (selectedPath.length === 0) return '#94a3b8';
        const source = typeof d.source === 'object' ? d.source.id : d.source;
        const target = typeof d.target === 'object' ? d.target.id : d.target;
        
        // Check if this edge is part of the selected path
        for (let i = 0; i < selectedPath.length - 1; i++) {
          if ((source === selectedPath[i] && target === selectedPath[i + 1]) ||
              (source === selectedPath[i + 1] && target === selectedPath[i])) {
            return '#f59e0b';
          }
        }
        return '#94a3b8';
      })
      .attr('stroke-width', (d) => {
        if (selectedPath.length === 0) return 2;
        const source = typeof d.source === 'object' ? d.source.id : d.source;
        const target = typeof d.target === 'object' ? d.target.id : d.target;
        
        // Check if this edge is part of the selected path
        for (let i = 0; i < selectedPath.length - 1; i++) {
          if ((source === selectedPath[i] && target === selectedPath[i + 1]) ||
              (source === selectedPath[i + 1] && target === selectedPath[i])) {
            return 4;
          }
        }
        return 2;
      });

    // Create nodes
    const node = container.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', 'node-group')
      .style('cursor', 'pointer');

    // Add drag behavior
    const dragBehavior = d3.drag<any, GraphNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(dragBehavior as any);

    // Add circles to nodes
    const circles = node.append('circle')
      .attr('r', (d) => {
        // Different sizing based on network type
        if (data.name === "Star Network Topology") {
          return d.id === "hub" ? 20 : 10;
        } else if (data.name === "Corporate Hierarchy") {
          // CEO larger, then management, then staff
          if (d.id === "ceo") return 18;
          if (["cto", "cfo", "hr", "pm"].includes(d.id)) return 14;
          return 10;
        } else {
          return 12 + d.connections * 0.5;
        }
      })
      .attr('fill', (d) => {
        if (selectedPath.includes(d.id)) return '#f59e0b';
        
        // Different coloring schemes based on network type
        if (data.name === "Star Network Topology") {
          return d.id === "hub" ? '#dc2626' : '#3b82f6';
        } else if (data.name === "Corporate Hierarchy") {
          if (d.id === "ceo") return '#dc2626';
          if (["cto", "cfo", "hr"].includes(d.id)) return '#f59e0b';
          if (["pm", "dev1", "qa1", "support"].includes(d.id)) return '#10b981';
          return '#6366f1';
        } else {
          // Color by connection count for social network
          const maxConnections = Math.max(...data.users.map(u => u.connections));
          const normalizedConnections = d.connections / maxConnections;
          if (normalizedConnections > 0.7) return '#dc2626'; // High influence - red
          if (normalizedConnections > 0.4) return '#f59e0b'; // Medium influence - amber
          return '#3b82f6'; // Lower influence - blue
        }
      })
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    // Add labels to nodes
    node.append('text')
      .text(d => d.name.split(' ')[0])
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'middle')
      .attr('dy', 4)
      .attr('fill', '#ffffff')
      .style('pointer-events', 'none');

    // Node interactions
    node
      .on('click', (_, d) => {
        setSelectedNode(d.id);
        onNodeClick(d.id);
      })
      .on('mouseover', (_, d) => {
        // Highlight connected nodes
        const connectedNodes = new Set([d.id]);
        links.forEach(l => {
          const source = typeof l.source === 'object' ? l.source.id : l.source;
          const target = typeof l.target === 'object' ? l.target.id : l.target;
          if (source === d.id) connectedNodes.add(target);
          if (target === d.id) connectedNodes.add(source);
        });

        circles.attr('opacity', (node) => 
          connectedNodes.has(node.id) ? 1 : 0.3
        );
        
        link.attr('opacity', (l) => {
          const source = typeof l.source === 'object' ? l.source.id : l.source;
          const target = typeof l.target === 'object' ? l.target.id : l.target;
          return (source === d.id || target === d.id) ? 1 : 0.1;
        });
      })
      .on('mouseout', () => {
        circles.attr('opacity', 1);
        link.attr('opacity', 0.6);
      });

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    // Cleanup
    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, [data, dimensions, selectedPath, onNodeClick]);

  return (
    <div className="h-full w-full relative">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="border border-gray-200 rounded-lg bg-white shadow-inner"
      />
      
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <div className="space-y-2 text-sm">
          <h4 className="font-semibold text-gray-800 mb-2">Legend</h4>
          {data.name === "Star Network Topology" ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span>Central Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Peripheral Nodes</span>
              </div>
            </>
          ) : data.name === "Corporate Hierarchy" ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span>CEO</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span>C-Level</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Managers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span>Staff</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span>High Influence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span>Medium Influence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Lower Influence</span>
              </div>
            </>
          )}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span>Path Nodes</span>
          </div>
        </div>
      </div>

      {selectedNode && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          <h4 className="font-semibold text-gray-800">Node Details</h4>
          <p className="text-sm text-gray-600">
            Selected: {data.users.find(u => u.id === selectedNode)?.name}
          </p>
          <p className="text-sm text-gray-600">
            Connections: {data.users.find(u => u.id === selectedNode)?.connections}
          </p>
        </div>
      )}
    </div>
  );
};

export default GraphVisualization;