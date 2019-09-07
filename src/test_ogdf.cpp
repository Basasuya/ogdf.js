
#include <ogdf/basic/GraphAttributes.h>
#include <ogdf/energybased/FMMMLayout.h>
using namespace ogdf;

#ifndef EM_PORT_API
#	if defined(__EMSCRIPTEN__)
#		include <emscripten.h>
#		if defined(__cplusplus)
#			define EM_PORT_API(rettype) extern "C" rettype EMSCRIPTEN_KEEPALIVE
#		else
#			define EM_PORT_API(rettype) rettype EMSCRIPTEN_KEEPALIVE
#		endif
#	else
#		if defined(__cplusplus)
#			define EM_PORT_API(rettype) extern "C" rettype
#		else
#			define EM_PORT_API(rettype) rettype
#		endif
#	endif
#endif

EM_PORT_API(float*) DRlayout(int node_num, int link_num, int* source, int* target) {
	node* nodes;
	Graph G;
	GraphAttributes GA(G,
		GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics);

		
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
	FMMMLayout *model = new FMMMLayout();

	// switch (choose)
	// {
	// 	case 1:
	// 		model = new SpringEmbedderFRExact();
	// 		cout << "use FR algorithm" << std::endl;
	// 		break;
	// 	case 2:
	// 		model = new SpringEmbedderKK();
	// 		cout << "use KK algorithm" << std::endl;
	// 		break;
	// 	case 3:
	// 		model = new StressMinimization();
	// 		cout << "use Majorization algorithm" << std::endl;
	// 		break;
	// 	case 4:
	// 		model = new FMMMLayout();
	// 		cout << "use FM3 algorithm" << std::endl;
	// 		break;
	// 	case 5:
	// 		model = new PivotMDS();
	// 		cout << "use PivotMDS algorithm" << std::endl;
	// 		break;
	// 	default:
	// 		cerr << "you should choose the layout type" << endl;
	// 		exit(0);
	// 		break;
	// }

    model->call(GA);

	float* re = (float*)malloc(node_num * 2 * 4);
    for(int i = 0; i < node_num; ++i) {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}

EM_PORT_API(void) free_buf(void* buf) {
    free(buf);
}

