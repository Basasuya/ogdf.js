#include <ogdf/misclayout/CircularLayout.h>
#include "../main.h"

EM_PORT_API(float *)
CIRCULAR(int node_num, int link_num, int *source, int *target, double minDistCC, double minDistCircle, double minDistLevel, double minDistSibling, double pageRatio)
{
    node *nodes;
    Graph G;
    GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics);

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
    CircularLayout *model = new CircularLayout();

    model->minDistCC(minDistCC);
    model->minDistCircle(minDistCircle);
    model->minDistLevel(minDistLevel);
    model->minDistSibling(minDistSibling);
    model->pageRatio(pageRatio);

    model->call(GA);

    float *re = (float *)malloc(node_num * 2 * 4);
    for (int i = 0; i < node_num; ++i)
    {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}