import { User, NetworkData } from '../data/sampleNetwork';

export interface GraphNode extends User {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphLink {
  source: GraphNode | string;
  target: GraphNode | string;
  index?: number;
  weight?: number;
}

export interface PathNode {
  id: string;
  name: string;
  distance: number;
  previous: PathNode | null;
}

// Dijkstra's algorithm for shortest path
export function findShortestPath(
  networkData: NetworkData,
  sourceId: string,
  targetId: string
): string[] {
  const { users, connections } = networkData;
  const graph = new Map<string, string[]>();
  
  // Build adjacency list
  users.forEach(user => graph.set(user.id, []));
  connections.forEach(conn => {
    graph.get(conn.source)?.push(conn.target);
    graph.get(conn.target)?.push(conn.source);
  });

  const distances = new Map<string, number>();
  const previous = new Map<string, string | null>();
  const unvisited = new Set<string>();

  // Initialize distances
  users.forEach(user => {
    distances.set(user.id, user.id === sourceId ? 0 : Infinity);
    previous.set(user.id, null);
    unvisited.add(user.id);
  });

  while (unvisited.size > 0) {
    // Find unvisited node with minimum distance
    let current: string | null = null;
    let minDistance = Infinity;
    
    for (const node of unvisited) {
      const distance = distances.get(node) || Infinity;
      if (distance < minDistance) {
        minDistance = distance;
        current = node;
      }
    }

    if (!current || minDistance === Infinity) break;
    if (current === targetId) break;

    unvisited.delete(current);
    const currentDistance = distances.get(current) || 0;

    // Check neighbors
    const neighbors = graph.get(current) || [];
    for (const neighbor of neighbors) {
      if (!unvisited.has(neighbor)) continue;
      
      const newDistance = currentDistance + 1;
      const neighborDistance = distances.get(neighbor) || Infinity;
      
      if (newDistance < neighborDistance) {
        distances.set(neighbor, newDistance);
        previous.set(neighbor, current);
      }
    }
  }

  // Reconstruct path
  const path: string[] = [];
  let current: string | null = targetId;
  
  // Check if target is reachable (distance is not infinity)
  if (distances.get(targetId) === Infinity) {
    return []; // No path exists
  }
  
  while (current !== null) {
    path.unshift(current);
    current = previous.get(current) || null;
  }

  // Return path only if we have at least source and target
  return path.length > 1 && path[0] === sourceId ? path : [];
}

// Calculate degree centrality (normalized)
export function calculateCentrality(networkData: NetworkData): Map<string, number> {
  const centrality = new Map<string, number>();
  const maxConnections = Math.max(...networkData.users.map(u => u.connections));
  
  networkData.users.forEach(user => {
    centrality.set(user.id, user.connections / maxConnections);
  });
  
  return centrality;
}

// Simple community detection using connected components and modularity
export function detectCommunities(networkData: NetworkData): Map<string, number> {
  const { users, connections } = networkData;
  const graph = new Map<string, Set<string>>();
  const communities = new Map<string, number>();
  
  // Build adjacency list
  users.forEach(user => graph.set(user.id, new Set()));
  connections.forEach(conn => {
    graph.get(conn.source)?.add(conn.target);
    graph.get(conn.target)?.add(conn.source);
  });

  const visited = new Set<string>();
  let communityId = 0;

  // Find connected components
  function dfs(nodeId: string, currentCommunity: number) {
    if (visited.has(nodeId)) return;
    
    visited.add(nodeId);
    communities.set(nodeId, currentCommunity);
    
    const neighbors = graph.get(nodeId) || new Set();
    for (const neighbor of neighbors) {
      dfs(neighbor, currentCommunity);
    }
  }

  // Group nodes into communities
  for (const user of users) {
    if (!visited.has(user.id)) {
      dfs(user.id, communityId++);
    }
  }

  // If all nodes are in one component, create artificial communities based on clustering
  if (communityId === 1) {
    const nodesByConnections = [...users].sort((a, b) => b.connections - a.connections);
    const numCommunities = Math.min(4, Math.ceil(users.length / 5));
    
    nodesByConnections.forEach((user, index) => {
      communities.set(user.id, index % numCommunities);
    });
  }

  return communities;
}