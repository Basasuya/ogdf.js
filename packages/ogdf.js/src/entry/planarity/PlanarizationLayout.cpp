#include <ogdf/planarity/PlanarizationLayout.h>
#include "../main.h"

EM_PORT_API(PlanarizationLayout *)
LayoutModule_PlanarizationLayout(int minCliqueSize, double pageRatio, CrossingMinimizationModule *crossMin, CCLayoutPackModule *packer, EmbedderModule *embedder, LayoutPlanRepModule *planarLayouter)
{
	//LayoutModule
	PlanarizationLayout *model = new PlanarizationLayout();

	model->minCliqueSize(minCliqueSize);
	model->pageRatio(pageRatio);

	model->setCrossMin(crossMin);
	model->setPacker(packer);
	model->setEmbedder(embedder);
	model->setPlanarLayouter(planarLayouter);

	return model;
}
