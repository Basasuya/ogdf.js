#include "main.h"

EM_PORT_API(void) free_buf(void* buf) {
    free(buf);
}