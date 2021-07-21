#include <ogdf/planarity/PlanarizationLayout.h>
#include "../main.h"

EM_PORT_API(float*) PL(int node_num, int link_num, int* source, int* target, int minCliqueSize, double pageRatio, int crossMinType, int globalInternalLibraryLogLevel, int globalLogLevel, int globalMinimumLogLevel, bool globalStatisticMode, int localLogLevel, int localLogMode, unsigned int maxThreads, int permutations, bool timeout, double timeLimit, int inserterType, bool keepEmbedding, double percentMostCrossed, int removeReinsert, double percentMostCrossedFix, double percentMostCrossedVar, int removeReinsertFix, int removeReinsertVar, bool statistics, int runsPostprocessing, int subgraphType, int runs, double randomness, int embedderType, bool useExtendedDepthDefinition, int packerType, int planarLayouterType, int bendBound, double cOverhang, double margin, bool progressive, bool scaling, double separation) {
	node* nodes;
	Graph G;
	GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics);
	

	nodes = new node[node_num];
	for (int i = 0; i < node_num; i++){
		nodes[i] = G.newNode();
	}

	edge e;

	for (int i = 0; i < link_num; i++) {
		e = G.newEdge(nodes[source[i]], nodes[target[i]]);
		GA.bends(e);
	}

	//LayoutModule
	PlanarizationLayout *model = new PlanarizationLayout();

	model->minCliqueSize(minCliqueSize);
	model->pageRatio(pageRatio);

	CrossingMinimizationModule* crossMin = getCrossingMinimization(crossMinType, globalStatisticMode, globalLogLevel, globalMinimumLogLevel, globalStatisticMode, localLogLevel, localLogMode, maxThreads, permutations, timeout, timeLimit, inserterType, keepEmbedding, percentMostCrossed, removeReinsert, percentMostCrossedFix, percentMostCrossedVar, removeReinsertFix, removeReinsertVar, statistics, runsPostprocessing, subgraphType, runs, randomness);
	model->setCrossMin(crossMin);

	EmbedderModule* embedder = getEmbedder(embedderType, timeLimit, useExtendedDepthDefinition);
	model->setEmbedder(embedder);

	CCLayoutPackModule* packer = getCCLayoutPack(packerType);
	model->setPacker(packer);

	LayoutPlanRepModule* planarLayouter = getLayoutPlanRep(planarLayouterType, bendBound, cOverhang, margin, progressive, scaling, separation);
	model->setPlanarLayouter(planarLayouter);

	model->call(GA);
	
	float* re = (float*)malloc(node_num * 2 * 4);
    for(int i = 0; i < node_num; ++i) {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}