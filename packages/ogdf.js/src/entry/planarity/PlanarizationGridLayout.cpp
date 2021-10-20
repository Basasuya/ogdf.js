#include <ogdf/planarity/PlanarizationGridLayout.h>
#include "../main.h"

EM_PORT_API(PlanarizationGridLayout *)
LayoutModule_PlanarizationGridLayout(double pageRatio, double separation, CrossingMinimizationModule *crossMin, CCLayoutPackModule *packer, GridLayoutPlanRepModule *planarLayouter)
{
	//LayoutModule
	PlanarizationGridLayout *model = new PlanarizationGridLayout();

	model->pageRatio(pageRatio);
	model->separation(separation);

	model->setCrossMin(crossMin);
	model->setPacker(packer);
	model->setPlanarLayouter(planarLayouter);

	return model;
}