#include <ogdf/energybased/StressMinimization.h>
#include "../main.h"

EM_PORT_API(StressMinimization *)
LayoutModule_StressMinimization(int terminationCriterion, bool fixXCoords, bool fixYCoords, bool fixZCoords, bool hasInitialLayout, bool layoutComponentsSeparately, double edgeCosts, int numberOfIterations, bool useEdgeCostsAttribute)
{
    //LayoutModule
	StressMinimization *model = new StressMinimization();

	model->convergenceCriterion(static_cast<StressMinimization::TerminationCriterion>(terminationCriterion));
	model->fixXCoordinates(fixXCoords);
	model->fixYCoordinates(fixYCoords);
	model->fixZCoordinates(fixZCoords);
	model->hasInitialLayout(hasInitialLayout);
	model->layoutComponentsSeparately(layoutComponentsSeparately);
	model->setEdgeCosts(edgeCosts);
	model->setIterations(numberOfIterations);
	model->useEdgeCostsAttribute(useEdgeCostsAttribute);

    return model;
}