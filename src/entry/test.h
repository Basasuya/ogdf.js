
#include <signal.h>
#include <stdio.h>

void initSignalListener(sighandler_t OnSIGSEGV){
    signal(SIGSEGV,OnSIGSEGV);
}