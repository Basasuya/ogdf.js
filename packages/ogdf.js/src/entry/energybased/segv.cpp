#include <ogdf/energybased/SpringEmbedderGridVariant.h>
#include "../main.h"

EM_PORT_API(float *) SEGV(int node_num, int link_num, int* source, int* target, double avgConvergenceFactor, int forceModel, int forceModelImprove, double idealEdgeLength, int iterations, int iterationsImprove, double maxConvergenceFactor, unsigned int maxThreads, double minDistCC, bool noise, double pageRatio, double scaleFunctionFactor, int scaling, double userBoundingBoxXmin, double userBoundingBoxYmin, double userBoundingBoxXmax, double userBoundingBoxYmax) {
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
	SpringEmbedderGridVariant *model = new SpringEmbedderGridVariant();
	
	model->avgConvergenceFactor(avgConvergenceFactor);
    model->forceModel(static_cast<SpringForceModel>(forceModel));
    model->forceModelImprove(static_cast<SpringForceModel>(forceModelImprove));
    model->idealEdgeLength(idealEdgeLength);
    model->iterations(iterations);
    model->iterationsImprove(iterationsImprove);
    model->maxConvergenceFactor(maxConvergenceFactor);
    model->maxThreads(maxThreads);
    model->minDistCC(minDistCC);
    model->noise(noise);
    model->pageRatio(pageRatio);
    model->scaleFunctionFactor(scaleFunctionFactor);
    model->scaling(static_cast<spring_embedder::SpringEmbedderBase::Scaling>(scaling));
    model->userBoundingBox(userBoundingBoxXmin,userBoundingBoxYmin,userBoundingBoxXmax,userBoundingBoxYmax);

    model->call(GA);

	float* re = (float*)malloc(node_num * 2 * 4);
    for(int i = 0; i < node_num; ++i) {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}