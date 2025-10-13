import React from 'react';
import { Network, TrendingUp, Users, Route, Zap, Search, TreePine, GitBranch } from 'lucide-react';

const ConceptsSection: React.FC = () => {
  const concepts = [
    {
      icon: Network,
      title: 'Nodes & Edges',
      description: 'In a social network, every user is a "node" (a point) and their friendship or connection is an "edge" (a line). This simple structure allows us to map out complex social landscapes and analyze relationships.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Route,
      title: 'Shortest Path Algorithms',
      description: 'Dijkstra\'s algorithm finds the shortest path between any two nodes in a network. This powers features like "degrees of separation" and connection suggestions in social media platforms.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: TrendingUp,
      title: 'Centrality & Influence',
      description: 'By counting the number of connections a user has (their "degree centrality"), we can identify key influencers and hubs within the network. These are the people who can spread information most effectively.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Community Detection',
      description: 'Graph algorithms can automatically detect "communities"—groups of users who are more densely connected to each other than to the rest of the network. This is crucial for understanding social circles and group dynamics.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Search,
      title: 'Graph Traversal (BFS/DFS)',
      description: 'Breadth-First Search (BFS) and Depth-First Search (DFS) are fundamental algorithms for exploring networks. BFS finds the shortest path in unweighted graphs, while DFS explores deep connections.',
      color: 'from-orange-500 to-amber-500'
    },
    {
      icon: TreePine,
      title: 'Spanning Trees & MST',
      description: 'Minimum Spanning Trees connect all nodes with the minimum total edge weight. In social networks, this helps identify the most efficient communication structures within communities.',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      icon: Zap,
      title: 'PageRank Algorithm',
      description: 'Originally developed for Google\'s search engine, PageRank measures the importance of nodes based on the quality and quantity of links. It\'s now used to rank social media posts and identify influential users.',
      color: 'from-violet-500 to-purple-600'
    },
    {
      icon: GitBranch,
      title: 'Network Topology',
      description: 'Understanding network structures like scale-free networks, small-world networks, and clustering coefficients helps predict how information spreads and how robust the network is to node failures.',
      color: 'from-rose-500 to-pink-600'
    }
  ];

  const applications = [
    {
      title: 'Social Media Platforms',
      examples: [
        'Friend recommendations using mutual connections',
        'News feed ranking with PageRank-like algorithms',
        'Community detection for targeted advertising',
        'Influencer identification for marketing campaigns'
      ]
    },
    {
      title: 'Professional Networks',
      examples: [
        'LinkedIn connection suggestions and "People You May Know"',
        'Career path recommendations based on network analysis',
        'Industry clustering and professional community detection',
        'Expertise propagation through professional connections'
      ]
    },
    {
      title: 'E-commerce & Recommendations',
      examples: [
        'Product recommendation systems using user-item bipartite graphs',
        'Collaborative filtering based on user similarity networks',
        'Fraud detection through transaction network analysis',
        'Supply chain optimization using network algorithms'
      ]
    },
    {
      title: 'Urban Planning & Transportation',
      examples: [
        'Traffic flow optimization using shortest path algorithms',
        'Public transportation route planning and scheduling',
        'Emergency response routing and resource allocation',
        'Smart city infrastructure planning using network models'
      ]
    },
    {
      title: 'Cybersecurity & Network Security',
      examples: [
        'Botnet detection through communication pattern analysis',
        'Vulnerability assessment in computer networks',
        'Intrusion detection using network flow analysis',
        'Social engineering attack prevention through trust networks'
      ]
    },
    {
      title: 'Biological & Scientific Research',
      examples: [
        'Protein interaction networks in bioinformatics',
        'Disease spread modeling using contact networks',
        'Gene regulatory network analysis',
        'Ecological food web analysis and conservation planning'
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Data Structures & Algorithms in Network Analysis
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Graph theory and network algorithms provide the mathematical foundation that powers modern digital platforms. 
            Here are the key concepts that drive everything from social media to urban planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {concepts.map((concept, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${concept.color} rounded-xl flex items-center justify-center mb-4`}>
                <concept.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {concept.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-sm">
                {concept.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Real-World Applications Across Industries
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These graph theory concepts aren't just academic—they power critical systems across every industry, 
              affecting billions of people daily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {app.title}
                </h4>
                <ul className="space-y-2">
                  {app.examples.map((example, exIndex) => (
                    <li key={exIndex} className="text-sm text-gray-600 flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-100">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Network className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                The Future of Network Analysis
              </h4>
              <p className="text-gray-600 leading-relaxed">
                As our world becomes increasingly connected through IoT devices, social platforms, and digital infrastructure, 
                understanding network algorithms becomes crucial for software engineers, data scientists, and technology leaders. 
                These algorithms will continue to evolve to handle massive scale, real-time processing, and privacy-preserving 
                analysis in our interconnected digital ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConceptsSection;