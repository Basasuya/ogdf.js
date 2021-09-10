#include <ogdf/energybased/FastMultipoleEmbedder.h>
#include "../main.h"

EM_PORT_API(FastMultipoleMultilevelEmbedder *)
LayoutModule_FastMultipoleMultilevelEmbedder(int maxNumThreads, int multilevelUntilNumNodesAreLess)
{
    //LayoutModule
    FastMultipoleMultilevelEmbedder *model = new FastMultipoleMultilevelEmbedder();

    model->maxNumThreads(maxNumThreads);
    model->multilevelUntilNumNodesAreLess(multilevelUntilNumNodesAreLess);

    return model;
}

EM_PORT_API(float *)
FMME(int node_num, int link_num, int *source, int *target, int maxNumThreads, int multilevelUntilNumNodesAreLess)
{
    node *nodes;
    Graph G;
    GraphAttributes GA(G,
                       GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics);

    nodes = new node[node_num];
    for (int i = 0; i < node_num; i++)
    {
        nodes[i] = G.newNode();
    }

    edge e;

    for (int i = 0; i < link_num; i++)
    {
        e = G.newEdge(nodes[source[i]], nodes[target[i]]);
        GA.bends(e);
    }
    //LayoutModule
    FastMultipoleMultilevelEmbedder *model = new FastMultipoleMultilevelEmbedder();

    model->maxNumThreads(maxNumThreads);
    model->multilevelUntilNumNodesAreLess(multilevelUntilNumNodesAreLess);

    model->call(GA);

    float *re = (float *)malloc(node_num * 2 * 4);
    for (int i = 0; i < node_num; ++i)
    {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}