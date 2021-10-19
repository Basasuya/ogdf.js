#include <ogdf/misclayout/LinearLayout.h>
#include "../main.h"

EM_PORT_API(float *)
LINEAR(int node_num, int link_num, int *source, int *target, double outWidth, bool customOrder)
{
    node *nodes;
    Graph G;
    GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics);

    nodes = new node[node_num];
    ListPure<node> nodeList;

    for (int i = 0; i < node_num; i++)
    {
        nodes[i] = G.newNode();
        nodeList.pushBack(nodes[i]);
    }

    edge e;

    for (int i = 0; i < link_num; i++)
    {
        e = G.newEdge(nodes[source[i]], nodes[target[i]]);
        GA.bends(e);
    }
    //LayoutModule
    LinearLayout *model = new LinearLayout(outWidth, nodeList);

    model->setCustomOrder(customOrder);

    model->call(GA);

    float *re = (float *)malloc(node_num * 2 * 4);
    for (int i = 0; i < node_num; ++i)
    {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}