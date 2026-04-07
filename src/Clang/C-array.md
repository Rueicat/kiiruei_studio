

## reverse sort
```C
#include <stdio.h>
#define N 10       // for array index
int main(void){

    int str[N];

    printf("Enter 10 numbers: ");

    for( int i = 0; i < N; i++ ){
    scanf("%d", &str[i]);
    }

    //main logic
    for (int i = N - 1; i >= 0; i--){
        printf("%d ", str[i]);
    }
    return 0;
}

```
[[Clang]]