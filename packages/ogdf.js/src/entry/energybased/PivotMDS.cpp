#include <ogdf/energybased/PivotMDS.h>
#include "../main.h"

EM_PORT_API(PivotMDS *)
LayoutModule_PivotMDS(double edgeCosts, int numberOfPivots, bool useEdgeCostsAttribute)
{
	//LayoutModule
	PivotMDS *model = new PivotMDS();

	model->setEdgeCosts(edgeCosts);
	model->setNumberOfPivots(numberOfPivots);
	model->useEdgeCostsAttribute(useEdgeCostsAttribute);

	return model;
}