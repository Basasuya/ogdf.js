// #include <ogdf/planarity/PlanarizationLayout.h>
// #include <ogdf/planarity/SubgraphPlanarizer.h>
// #include <ogdf/planarity/MMSubgraphPlanarizer.h>
// #include "../main.h"

// EM_PORT_API(float*) PL(int node_num, int link_num, int* source, int* target, int crossMin, ) {
// 	node* nodes;
// 	Graph G;
// 	GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics);
	

// 	nodes = new node[node_num];
// 	for (int i = 0; i < node_num; i++){
// 		nodes[i] = G.newNode();
// 	}

// 	edge e;

// 	for (int i = 0; i < link_num; i++) {
// 		e = G.newEdge(nodes[source[i]], nodes[target[i]]);
// 		GA.bends(e);
// 	}

// 	CrossingMinimizationModule *crossingMinimization;
// 	switch (crossMin)
// 	{
// 	case 0:
// 		{
// 			MMSubgraphPlanarizer* mmSubgraphPlanarizer = new MMSubgraphPlanarizer();
// 			mmSubgraphPlanarizer->permutations();
// 			mmSubgraphPlanarizer->setInserter();
// 			mmSubgraphPlanarizer->setSubgraph();
// 		}
// 	case 1:

// 	default:
// 		break;
// 	}


// 	//LayoutModule
// 	PlanarizationLayout *model = new PlanarizationLayout();

// 	model->minCliqueSize();
// 	model->pageRatio();
// 	model->setCrossMin();
// 	model->setEmbedder();
// 	model->setPacker();
// 	model->setPlanarLayouter();

// 	model->call(GA);
	
// 	float* re = (float*)malloc(node_num * 2 * 4);
//     for(int i = 0; i < node_num; ++i) {
//         re[i * 2] = GA.x(nodes[i]);
//         re[i * 2 + 1] = GA.y(nodes[i]);
//     }

//     return re;
// }