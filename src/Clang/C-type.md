ASCII
typdef
sizeof
<ctype.h>
## 用ASCII轉換大小寫字母
```C
/*Capital and lowercase traslate(use ASCII)*/

#include <stdio.h>

int main(void){

    char ch;
    int i;

    printf("Enter a lowercase: ");
    scanf("%c", &ch);

    if ('a' <= ch && ch <= 'z')     // ASCII 97~122
        ch = ch - 'a' + 'A';         //offset
    else
     printf("Error: Plase enter a-z lowercase.");

    printf("Capital is:%c ", ch);
                    
    


    return 0;
}

```

## 讀字串長度
```C
#include <stdio.h>

int main(void){
    char ch;
    int len = 0;

    printf("Enter a message: ");
    scanf("%c", &ch);
    while ( ch != '\n' ){
        len++;
        printf("%c\n", ch);
        ch = getchar();
    }  
    printf("Your message was %d character(s) long\n", len);

    return 0;
}
```

## 運算平方, 可暫停
```C
#include <stdio.h>

int main(void){
    
    int i, n;
    char c = '\n';
    
    printf("This program prints a table of squares.\n");
    printf("Enter number of entries in table: ");    
    scanf("%d", &n);

    while ( getchar() != '\n' ) ;         //clear the  buffer

    for ( i = 1; i <= n; i++ ){
        while ( i % 24 == 0 ) {
            printf("Press Enter to continue...");
            scanf("%c", &c);
            break;
        }
        printf("%10d%10d\n", i, i * i);
    }

    return 0;
}

```

## 電腦號碼字母轉換
```C
#include <ctype.h>
#include <stdio.h>

int main(void){

    int ch;

    printf("Enter phone number:");

    //main logic
    while ((ch = getchar()) != '\n') {
        ch = toupper(ch);

        if ('A' <= ch && ch <= 'C') putchar('2');
        else if ('D' <= ch && ch <= 'F') putchar('3');
        else if ('G' <= ch && ch <= 'I') putchar('4');
        else if ('J' <= ch && ch <= 'L') putchar('5');
        else if ('M' <= ch && ch <= 'O') putchar('6');
        else if ('P' <= ch && ch <= 'S') putchar('7');
        else if ('T' <= ch && ch <= 'V') putchar('8');
        else if ('W' <= ch && ch <= 'Z') putchar('9');
        else putchar(ch);
    }
    putchar('\n');
    

    return 0;
}
```

## 電腦號碼字母轉換-不用putchar, getchar
```C
#include <ctype.h>
#include <stdio.h>

int main(void){
    char str[10];

    printf("Enter phone number: ");
    scanf("%11s", str);

    //main logic
    for ( int i = 0; str[i] != '\0'; i++ ){
        char c = toupper(str[i]);
        if ( 'A' <= c && c <= 'C' ) str[i] = '2';
        else if ( 'D' <= c && c <= 'F' ) str[i] = '3';
        else if ( 'G' <= c && c <= 'I' ) str[i] = '4';
        else if ( 'J' <= c && c <= 'L' ) str[i] = '5';
        else if ( 'M' <= c && c <= 'O' ) str[i] = '6';
        else if ( 'P' <= c && c <= 'S' ) str[i] = '7';
        else if ( 'T' <= c && c <= 'V' ) str[i] = '8';
        else if ( 'W' <= c && c <= 'Z' ) str[i] = '9';
        // default, keep original ch
    }  
    printf("%s\n", str);

    return 0;
}

```

## 字母加權分數計算
```C

#include <ctype.h>
#include <stdio.h>

int main(void){

    int value[26] = {
        1, 3, 3, 2, 1, 4, 2,        //A-G
        4, 1, 8, 5, 1, 3, 1,        //H-N
        1, 3, 10, 1, 1, 1, 1,       //O-U
        4, 4, 8, 4, 10
    };

    char str[26];
    int sum = 0;

    printf("Enter a word: ");
    scanf("%25s", str);
    
    for ( int i = 0; str[i] != '\0'; i++ ){
        char c = toupper(str[i]);

        if (c >= 'A' && c <= 'Z'){
            sum += value[ c - 'A' ];
        }
    }
    printf("Scrabble value: %d", sum);
    

    return 0;
}

```

## 各個各式的佔用大小(最小占用大小)
```C
#include <stdio.h>

int main (void){

    printf("int: %zu\n", sizeof(int));
    printf("short: %zu\n", sizeof(short));
    printf("long: %zu\n", sizeof(long));
    printf("float: %zu\n", sizeof(float));
    printf("double: %zu\n", sizeof(double));
    printf("long double: %zu\n", sizeof(long double));

    return 0;
}

```
[[Clang]]