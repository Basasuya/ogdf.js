#include <ogdf/energybased/TutteLayout.h>
#include "../main.h"

EM_PORT_API(float *) TUT(int node_num, int link_num, int* source, int* target, double bboxLeft, double bboxTop, double bboxRight, double bboxBottom) {
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
	TutteLayout *model = new TutteLayout();

    DRect rect(bboxLeft,bboxTop,bboxRight,bboxBottom);
    model->bbox(rect);

    model->call(GA);

	float* re = (float*)malloc(node_num * 2 * 4);
    for(int i = 0; i < node_num; ++i) {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}