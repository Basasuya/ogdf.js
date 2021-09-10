#include "../main.h"

#include <ogdf/module/LayoutModule.h>

EM_PORT_API(float *)
Graph_BaseGraph(LayoutModule *model, int node_num, int link_num, int *source, int *target)
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

    model->call(GA);

    float *re = (float *)malloc(node_num * 2 * 4);
    for (int i = 0; i < node_num; ++i)
    {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}

EM_PORT_API(float *)
Graph_NodeLinkGraph(LayoutModule *model, int node_num, int link_num, int *source, int *target, double *nodesX, double *nodesY)
{
    node *nodes;
    Graph G;
    GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics);

    nodes = new node[node_num];
    for (int i = 0; i < node_num; i++)
    {
        nodes[i] = G.newNode();
        GA.x(nodes[i]) = nodesX[i];
        GA.y(nodes[i]) = nodesY[i];
    }

    edge e;

    for (int i = 0; i < link_num; i++)
    {
        e = G.newEdge(nodes[source[i]], nodes[target[i]]);
        GA.bends(e);
    }

    model->call(GA);

    float *re = (float *)malloc(node_num * 2 * 4);
    for (int i = 0; i < node_num; ++i)
    {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}

EM_PORT_API(float *)
Graph_LinkWeightGraph(LayoutModule *model, int node_num, int link_num, int *source, int *target, double *edgesWeight)
{
    node *nodes;
    Graph G;
    GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics | GraphAttributes::edgeDoubleWeight);

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
        GA.doubleWeight(e) = edgesWeight[i];
    }

    model->call(GA);

    float *re = (float *)malloc(node_num * 2 * 4);
    for (int i = 0; i < node_num; ++i)
    {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}

EM_PORT_API(float *)
Graph_NodeLinkWeightGraph(LayoutModule *model, int node_num, int link_num, int *source, int *target, double *nodesX, double *nodesY, double *edgesWeight)
{
    node *nodes;
    Graph G;
    GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics | GraphAttributes::edgeDoubleWeight);

    nodes = new node[node_num];
    for (int i = 0; i < node_num; i++)
    {
        nodes[i] = G.newNode();
        GA.x(nodes[i]) = nodesX[i];
        GA.y(nodes[i]) = nodesY[i];
    }

    edge e;

    for (int i = 0; i < link_num; i++)
    {
        e = G.newEdge(nodes[source[i]], nodes[target[i]]);
        GA.bends(e);
        GA.doubleWeight(e) = edgesWeight[i];
    }

    model->call(GA);

    float *re = (float *)malloc(node_num * 2 * 4);
    for (int i = 0; i < node_num; ++i)
    {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}

EM_PORT_API(float *)
Graph_NodeSizeLinkGraph(LayoutModule *model, int node_num, int link_num, int *source, int *target, double *nodesX, double *nodesY, double *nodesWidth, double *nodesHeight)
{
    node *nodes;
    Graph G;
    GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics);

    nodes = new node[node_num];
    for (int i = 0; i < node_num; i++)
    {
        nodes[i] = G.newNode();
        GA.x(nodes[i]) = nodesX[i];
        GA.y(nodes[i]) = nodesY[i];
        GA.width(nodes[i]) = nodesWidth[i];
        GA.height(nodes[i]) = nodesHeight[i];
    }

    edge e;

    for (int i = 0; i < link_num; i++)
    {
        e = G.newEdge(nodes[source[i]], nodes[target[i]]);
        GA.bends(e);
    }

    model->call(GA);

    float *re = (float *)malloc(node_num * 2 * 4);
    for (int i = 0; i < node_num; ++i)
    {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}