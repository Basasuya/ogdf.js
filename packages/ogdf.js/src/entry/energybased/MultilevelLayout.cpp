#include <ogdf/energybased/MultilevelLayout.h>
#include "../main.h"

EM_PORT_API(MultilevelLayout *)
LayoutModule_MultilevelLayout(LayoutModule *layout, MultilevelBuilder *builder, InitialPlacer *placer)
{
    //LayoutModule
    MultilevelLayout *model = new MultilevelLayout();

    model->setLayout(layout);
    model->setMultilevelBuilder(builder);
    model->setPlacer(placer);

    return model;
}