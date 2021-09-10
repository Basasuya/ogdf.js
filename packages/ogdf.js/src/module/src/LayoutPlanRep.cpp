#include "../main.h"

#include <ogdf/orthogonal/OrthoLayout.h>

EM_PORT_API(OrthoLayout *)
LayoutPlanRepModule_OrthoLayout(int bendBound, double cOverhang, double margin, bool progressive, bool scaling, double separation)
{
    OrthoLayout *ortho = new OrthoLayout();
    ortho->bendBound(bendBound);
    ortho->cOverhang(cOverhang);
    ortho->margin(margin);
    ortho->progressive(progressive);
    ortho->scaling(scaling);
    ortho->separation(separation);
    return ortho;
}
