#include <ogdf/energybased/TutteLayout.h>
#include "../main.h"

EM_PORT_API(TutteLayout *)
LayoutModule_TutteLayout(double bboxLeft, double bboxTop, double bboxRight, double bboxBottom)
{
	//LayoutModule
	TutteLayout *model = new TutteLayout();

	DRect rect(bboxLeft, bboxTop, bboxRight, bboxBottom);
	model->bbox(rect);

	return model;
}