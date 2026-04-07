if
switch

## 佣金計算
```C
#include <stdio.h>

int main(void){
    int input;
    float commission;

    printf("Enter value of trade: ");
    scanf("%d", &input);

    if ( input < 2500 ){
        commission = 30 + input * 0.017;
    }else if ( 2500 < input && input < 6250 ) {
        commission = 56 + input * 0.0066;
    }else if ( 6250 < input && input < 20000 ) {
        commission = 76 + input * 0.0034;
    }else if ( 20000 < input && input < 50000 ) {
        commission = 100 + input * 0.0022;
    }else if ( 50000 < input && input < 5000000 ) {
        commission = 155 + input * 0.0011;
    }else if ( 5000000 < input ) {
        commission = 255 + input * 0.0009;
    }
    
    

    printf("Commission: %.2f", commission);

    return 0;
}
```

## 日期格式轉換
```C
#include <stdio.h>

int main(void){
    int m, d, y;
    char *month, *day;
    printf("Enter date (mm/dd/yy): ");
    scanf("%d/%d/%d",&m, &d, &y);

    // days
    switch (d) {
        case 1: day = "st"; break;
        case 2: day = "nd"; break;
        case 3: day = "rd"; break;
        default: day = "th"; break;
    }

    // month
    switch ( m ){
        case 1: month = "Jan"; break;
        case 2: month = "Feb"; break;
        case 3: month = "Mar"; break;
        case 4: month = "Apr"; break;
        case 5: month = "May"; break;
        case 6: month = "Jun"; break;
        case 7: month = "Jul"; break;
        case 8: month = "Aug"; break;
        case 9: month = "Sep"; break;
        case 10: month = "Oct"; break;
        case 11: month = "Nov"; break;
        case 12: month = "Dec"; break;
        default: 
             printf("Error: please enter 1-12 number."); 
             return 1;
    }

    printf("Dated this %d%s day of %s, %d\n",d , day, month, y);

    return 0;
}
```

## 比數字大小
```C
#include <stdio.h>

int main(void){
    int i;
    int j = 5;

    printf("Please Enter a integer: ");
    scanf("%d", &i);

    switch ((i > j) - (i < j)) {
        case 1: printf("+1"); break;
        case 0: printf("0"); break;
        case -1: printf("-1"); break;
        default: printf("Error");
    }

    return 0;
}
```

## 郵遞區號
```C
#include <stdio.h>

int main(void){
    int area_code;

    printf("Enter the area_code: ");
    scanf("%d", &area_code);

    switch (area_code) {
        case 229: 
            printf("Albany"); 
            break;
        case 404: case 470: case 678: case 770:
            printf("Atlanta");
            break;
        case 478:
            printf("Macon");
            break;
        case 706: case 762:
            printf("Columbus");
            break;
        case 912:
            printf("Savannah");
            break;
        default:
            printf("Not exit area_code in list");
            return 1;
    }

    return 0;
}
```

## 算數字的位數
```C
#include <stdio.h>

int main(void){
    int n;
    int digits = 0;

    printf("Enter a number: ");
    scanf("%d", &n);

    int origin = n;

    do {
        n /= 10;
        digits++;
    }while ( n != 0 );

    printf("The number %d has %d digits\n", origin, digits);

    return 0;
}
```

## 時間格式轉換
```C
#include <stdio.h>

int main(void){
    int hour, min;
    char *time = "AM";
    char *afternoon = "PM";

    printf("Enter a 24-hour time: ");
    scanf("%d:%d", &hour, &min);

    if ( hour >= 13 ){
        hour -= 12;
        printf("Equivalent 12-hour time: %d:%d %s", hour, min, afternoon);
    }else if ( hour == 12 ) {
        printf("Equivalent 12-hour time: %02d:%d %s", hour, min, afternoon);
    }else {
        printf("Equivalent 12-hour time: %02d:%d %s", hour, min, time);
    }

    return 0;
}
```

## 風速表
```C
#include <stdio.h>

int main(void){
    int speed;

    printf("Enter the speed of the wind: ");
    scanf("%d", &speed);

    if (speed < 1) {
        printf("Calm");
    } else if (1<= speed && speed <= 3) {
        printf("Light air");
    } else if (4 <= speed && speed <= 27) {
        printf("Breeze");
    } else if (28 <= speed && speed <= 47) {
        printf("Breeze");
    } else if (48 <= speed && speed <= 63) {
        printf("Storm");
    } else if ( speed > 63 ) {
        printf("Hurricane");
    }

    return 0;
}
```

## 比大小-4個數字
```C
#include <stdio.h>

int main(void){
    int a,b ,c ,d;
    int max1, min1, max2, min2, max, min;

    printf("Enter four integers: ");
    scanf("%d %d %d %d",&a ,&b ,&c ,&d);

    if (a > b) {max1 = a; min1 = b;}
    else       {max1 = b; min1 = a;}

    if (c > d) {max2 = c; min2 = d;}
    else       {max2 = d; min2 = c;}

    // 晉級比較
    if (max1 > max2) max = max1;
    else             max = max2;

    if (min1 < min2) min = min1;
    else             min = min2;
    
    printf("Max = %d\nMin = %d\n", max, min);


    return 0;
}
```

## 計算成績grade
```C
#include <stdio.h>

int main(void){
    
    int n;
    int head;

    do {
    printf("Enter numerical grade: ");
    scanf("%d",&n);

        if ( n > 100 || n < 0){
            printf("Error: Invalid Input\n");
            printf("Error: Please try again, enter 1-100 integer.\n");
            while (getchar() != '\n');
        }
    } while ( n > 100 || n < 0 );
    

    head = n  / 10;

    switch (head) {
        case 9: case 10:
            printf("Letter grade: A\n"); break;
       case 8:
            printf("Letter grade: B\n"); break;
       case 7:
            printf("Letter grade: C\n"); break;
       case 6:
            printf("Letter grade: D\n"); break;
       default:
            printf("Letter grade: F\n"); break;
    }


    return 0;
}
```
[[Clang]]