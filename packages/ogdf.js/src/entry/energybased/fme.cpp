#include <ogdf/energybased/FastMultipoleEmbedder.h>
#include "../main.h"

EM_PORT_API(float *)
FME(int node_num, int link_num, int *source, int *target, float defaultEdgeLength, float defaultNodeSize, uint32_t multipolePrec, uint32_t numberOfThreads, uint32_t numIterations, bool randomize)
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
    FastMultipoleEmbedder *model = new FastMultipoleEmbedder();

    model->setDefaultEdgeLength(defaultEdgeLength);
    model->setDefaultNodeSize(defaultNodeSize);
    model->setMultipolePrec(multipolePrec);
    model->setNumberOfThreads(numberOfThreads);
    model->setNumIterations(numIterations);
    model->setRandomize(randomize);

    model->call(GA);

    float *re = (float *)malloc(node_num * 2 * 4);
    for (int i = 0; i < node_num; ++i)
    {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}