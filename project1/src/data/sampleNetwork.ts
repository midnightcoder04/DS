export interface User {
  id: string;
  name: string;
  connections: number;
  community?: number;
}

export interface Connection {
  source: string;
  target: string;
  weight?: number;
}

export interface NetworkData {
  users: User[];
  connections: Connection[];
  name: string;
  description: string;
}

export const socialNetwork: NetworkData = {
  name: "Social Media Network",
  description: "A complex social network with multiple communities and influencer hubs",
  users: [
    { id: "alice", name: "Alice Johnson", connections: 0 },
    { id: "bob", name: "Bob Smith", connections: 0 },
    { id: "charlie", name: "Charlie Brown", connections: 0 },
    { id: "diana", name: "Diana Prince", connections: 0 },
    { id: "eve", name: "Eve Wilson", connections: 0 },
    { id: "frank", name: "Frank Miller", connections: 0 },
    { id: "grace", name: "Grace Lee", connections: 0 },
    { id: "henry", name: "Henry Davis", connections: 0 },
    { id: "iris", name: "Iris Chen", connections: 0 },
    { id: "jack", name: "Jack Taylor", connections: 0 },
    { id: "kate", name: "Kate Williams", connections: 0 },
    { id: "liam", name: "Liam Anderson", connections: 0 },
    { id: "mia", name: "Mia Garcia", connections: 0 },
    { id: "noah", name: "Noah Martinez", connections: 0 },
    { id: "olivia", name: "Olivia Rodriguez", connections: 0 },
    { id: "paul", name: "Paul Thompson", connections: 0 },
    { id: "quinn", name: "Quinn White", connections: 0 },
    { id: "ruby", name: "Ruby Harris", connections: 0 },
    { id: "sam", name: "Sam Clark", connections: 0 },
    { id: "tina", name: "Tina Lewis", connections: 0 }
  ],
  connections: [
    // Core network - central hub around Alice, Bob, Charlie, Diana
    { source: "alice", target: "bob" },
    { source: "alice", target: "charlie" },
    { source: "alice", target: "diana" },
    { source: "alice", target: "eve" },
    { source: "alice", target: "frank" },
    { source: "bob", target: "charlie" },
    { source: "bob", target: "grace" },
    { source: "bob", target: "henry" },
    { source: "bob", target: "paul" },
    { source: "charlie", target: "diana" },
    { source: "charlie", target: "iris" },
    { source: "charlie", target: "jack" },
    { source: "charlie", target: "quinn" },
    { source: "diana", target: "kate" },
    { source: "diana", target: "liam" },
    { source: "diana", target: "ruby" },
    
    // Secondary community around Eve, Frank, Grace
    { source: "eve", target: "frank" },
    { source: "eve", target: "grace" },
    { source: "eve", target: "mia" },
    { source: "eve", target: "sam" },
    { source: "frank", target: "grace" },
    { source: "frank", target: "noah" },
    { source: "frank", target: "tina" },
    { source: "grace", target: "henry" },
    { source: "grace", target: "mia" },
    { source: "grace", target: "olivia" },
    
    // Peripheral connections forming smaller clusters
    { source: "henry", target: "iris" },
    { source: "henry", target: "noah" },
    { source: "iris", target: "jack" },
    { source: "iris", target: "olivia" },
    { source: "jack", target: "kate" },
    { source: "jack", target: "paul" },
    { source: "kate", target: "liam" },
    { source: "kate", target: "quinn" },
    { source: "liam", target: "mia" },
    { source: "liam", target: "ruby" },
    { source: "mia", target: "noah" },
    { source: "mia", target: "sam" },
    { source: "noah", target: "olivia" },
    { source: "noah", target: "tina" },
    { source: "olivia", target: "paul" },
    { source: "paul", target: "quinn" },
    { source: "quinn", target: "ruby" },
    { source: "ruby", target: "sam" },
    { source: "sam", target: "tina" },
    
    // Bridge connections to ensure graph connectivity
    { source: "olivia", target: "quinn" },
    { source: "tina", target: "alice" },
    { source: "jack", target: "frank" },
    { source: "henry", target: "kate" },
    { source: "iris", target: "mia" },
    { source: "paul", target: "ruby" }
  ]
};

export const organizationNetwork: NetworkData = {
  name: "Corporate Hierarchy",
  description: "A hierarchical organization network with clear management structures",
  users: [
    { id: "ceo", name: "CEO Sarah", connections: 0 },
    { id: "cto", name: "CTO Mike", connections: 0 },
    { id: "cfo", name: "CFO Lisa", connections: 0 },
    { id: "hr", name: "HR Director", connections: 0 },
    { id: "dev1", name: "Senior Dev", connections: 0 },
    { id: "dev2", name: "Dev Team Lead", connections: 0 },
    { id: "dev3", name: "Frontend Dev", connections: 0 },
    { id: "dev4", name: "Backend Dev", connections: 0 },
    { id: "qa1", name: "QA Manager", connections: 0 },
    { id: "qa2", name: "QA Tester", connections: 0 },
    { id: "pm", name: "Product Manager", connections: 0 },
    { id: "designer", name: "UI Designer", connections: 0 },
    { id: "analyst", name: "Data Analyst", connections: 0 },
    { id: "support", name: "Support Manager", connections: 0 }
  ],
  connections: [
    // CEO connections
    { source: "ceo", target: "cto" },
    { source: "ceo", target: "cfo" },
    { source: "ceo", target: "hr" },
    { source: "ceo", target: "pm" },
    
    // CTO's technical team
    { source: "cto", target: "dev1" },
    { source: "cto", target: "dev2" },
    { source: "cto", target: "qa1" },
    
    // Development team structure
    { source: "dev1", target: "dev2" },
    { source: "dev2", target: "dev3" },
    { source: "dev2", target: "dev4" },
    { source: "dev1", target: "qa1" },
    
    // QA team
    { source: "qa1", target: "qa2" },
    { source: "qa2", target: "dev3" },
    { source: "qa2", target: "dev4" },
    
    // Cross-functional collaboration
    { source: "pm", target: "dev1" },
    { source: "pm", target: "designer" },
    { source: "pm", target: "analyst" },
    { source: "designer", target: "dev3" },
    { source: "analyst", target: "cfo" },
    { source: "support", target: "dev2" },
    { source: "support", target: "qa1" },
    { source: "hr", target: "support" }
  ]
};

export const starNetwork: NetworkData = {
  name: "Star Network Topology",
  description: "A centralized network where one node connects to all others",
  users: [
    { id: "hub", name: "Central Hub", connections: 0 },
    { id: "node1", name: "Node 1", connections: 0 },
    { id: "node2", name: "Node 2", connections: 0 },
    { id: "node3", name: "Node 3", connections: 0 },
    { id: "node4", name: "Node 4", connections: 0 },
    { id: "node5", name: "Node 5", connections: 0 },
    { id: "node6", name: "Node 6", connections: 0 },
    { id: "node7", name: "Node 7", connections: 0 },
    { id: "node8", name: "Node 8", connections: 0 },
    { id: "node9", name: "Node 9", connections: 0 },
    { id: "node10", name: "Node 10", connections: 0 }
  ],
  connections: [
    { source: "hub", target: "node1" },
    { source: "hub", target: "node2" },
    { source: "hub", target: "node3" },
    { source: "hub", target: "node4" },
    { source: "hub", target: "node5" },
    { source: "hub", target: "node6" },
    { source: "hub", target: "node7" },
    { source: "hub", target: "node8" },
    { source: "hub", target: "node9" },
    { source: "hub", target: "node10" },
    // Add a few peripheral connections to make it more interesting
    { source: "node1", target: "node2" },
    { source: "node3", target: "node4" },
    { source: "node5", target: "node6" },
    { source: "node7", target: "node8" }
  ]
};

export const sampleNetworks = [socialNetwork, organizationNetwork, starNetwork];

// Calculate connection counts for all networks
sampleNetworks.forEach(network => {
  // Reset counts
  network.users.forEach(user => user.connections = 0);
  
  // Count connections
  network.connections.forEach(conn => {
    const sourceUser = network.users.find(u => u.id === conn.source);
    const targetUser = network.users.find(u => u.id === conn.target);
    if (sourceUser) sourceUser.connections++;
    if (targetUser) targetUser.connections++;
  });
});

// Export the first network as default for backwards compatibility
export const sampleNetwork = socialNetwork;