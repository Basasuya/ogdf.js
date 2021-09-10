#include "../main.h"

#include <ogdf/planarity/FixedEmbeddingInserter.h>
#include <ogdf/planarity/MultiEdgeApproxInserter.h>
#include <ogdf/planarity/VariableEmbeddingInserter.h>

EM_PORT_API(FixedEmbeddingInserter *)
EdgeInsertionModule_FixedEmbeddingInserter(bool keepEmbedding, double percentMostCrossed, int removeReinsert, double timeLimit)
{
    FixedEmbeddingInserter *fixed = new FixedEmbeddingInserter();
    fixed->keepEmbedding(keepEmbedding);
    fixed->percentMostCrossed(percentMostCrossed);
    fixed->removeReinsert(static_cast<RemoveReinsertType>(removeReinsert));
    fixed->timeLimit(timeLimit);
    return fixed;
}

EM_PORT_API(MultiEdgeApproxInserter *)
EdgeInsertionModule_MultiEdgeApproxInserter(double percentMostCrossedFix, double percentMostCrossedVar, int removeReinsertFix, int removeReinsertVar, bool statistics, double timeLimit)
{
    MultiEdgeApproxInserter *multi = new MultiEdgeApproxInserter();
    multi->percentMostCrossedFix(percentMostCrossedFix);
    multi->percentMostCrossedVar(percentMostCrossedVar);
    multi->removeReinsertFix(static_cast<RemoveReinsertType>(removeReinsertFix));
    multi->removeReinsertVar(static_cast<RemoveReinsertType>(removeReinsertVar));
    multi->statistics(statistics);
    multi->timeLimit(timeLimit);
    return multi;
}

EM_PORT_API(VariableEmbeddingInserter *)
EdgeInsertionModule_VariableEmbeddingInserter(double percentMostCrossed, int removeReinsert, double timeLimit)
{
    VariableEmbeddingInserter *var = new VariableEmbeddingInserter();
    var->percentMostCrossed(percentMostCrossed);
    var->removeReinsert(static_cast<RemoveReinsertType>(removeReinsert));
    var->timeLimit(timeLimit);
    return var;
}
