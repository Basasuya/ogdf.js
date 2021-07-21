#include <ogdf/cluster/ClusterOrthoLayout.h>
#include <ogdf/cluster/ClusterGraph.h>
#include <exception>
#include "../main.h"

EM_PORT_API(float*) CO(int node_num, int link_num, int group_num, int* source, int* target, int* nodeGroups, bool align, int costAssoc, int costGen, double cOverhang, double margin, int optionProfile, int preferedDir, bool scaling, double separation, int optionField){
	
    node* nodes;
    SList<node>* groups;

    Graph G;

    cluster* clusters;
    ClusterGraph CG(G);
    ClusterGraphAttributes CGA;
	ClusterPlanRep PG(CGA,CG);

	nodes = new node[node_num];
    groups = new SList<node>[group_num];

	for (int i = 0; i < node_num; i++){
		nodes[i] = G.newNode();
        groups[nodeGroups[i]].pushBack(nodes[i]);
	}

	List<edge> edges;

	for (int i = 0; i < link_num; i++) {
        edge e = G.newEdge(nodes[source[i]], nodes[target[i]]);
		edges.pushBack(e);
        CGA.bends(e);
	}

    clusters = new cluster[group_num];
    for(int i = 0; i < group_num; i++){
        clusters[i] = CG.createCluster(groups[i]);
    }

    adjEntry entry;
    
    Layout layout;

	//LayoutModule
	ClusterOrthoLayout *model = new ClusterOrthoLayout();

    model->align(align);
    model->costAssoc(costAssoc);
    model->costGen(costGen);
    model->cOverhang(cOverhang);
    model->margin(margin);
    model->optionProfile(optionProfile);
    model->preferedDir(static_cast<OrthoDir>(preferedDir));
    model->scaling(scaling);
    model->separation(separation);
    model->setOptions(optionField);
    std::cout<<"now OK"<<std::endl;
    model->call(PG, entry, layout, edges, G);

	float* re = (float*)malloc(node_num * 2 * 4);
    for(int i = 0; i < node_num; ++i) {
        re[i * 2] = layout.x(nodes[i]);
        re[i * 2 + 1] = layout.y(nodes[i]);
    }

    return re;
}
