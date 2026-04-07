## C可以用的工具
while
do .. while
for (流程的過程)
break (跳出此loop) / continue (下一個iterate. 重新檢查條件, 跳過本次iterate)
goto (少用了)

## 判斷是否為質數-O(n)
```C
// 質數判斷
/*輸入一個數字
 * 另一個數字從2起跳跑到輸入的數字-1
 * 分別%, 只要有除盡(非質數), 就break
 * */

#include <stdio.h>

int main(void){
    
    int user_input;
    printf("Please enter a non_negative integer:\n");
    scanf("%d",&user_input);
    for (int i = 2; i < user_input; i++) {
        if ( user_input % i == 0 ){
            printf("%d is not prime integer.\n",user_input);
            break;
        }
    printf("%d is prime number.\n", user_input);
    break;
    }
}
```

## 判斷是否為質數-O($\sqrt{n}$)
```C
#include <stdio.h>

int main(void){
    
    int user_input;
    printf("Please enter a non_negative integer:\n");
    scanf("%d",&user_input);
 
    if (user_input < 2 ){
        printf("%d is not prime number", user_input);
        return 0;
    }   
    
    for (int i = 2; i * i <= user_input; i++) {
        if (user_input % i == 0){
            printf("%d is not prime number!", user_input);
            return 0;;
        }
    printf("The %d is prime number!", user_input);
    return 0;
    }
}
```

## 判斷是否為質數(狀態設定)-$\sqrt{n}$
```C
#include <stdio.h>

int main(void){
    
    int user_input;
    int is_prime = 1;    // 狀態表示
    printf("Please enter a non_negative integer:\n");
    scanf("%d",&user_input);
    
    for (int i = 2; i * i <= user_input; i++){
        if ( user_input % i == 0 ) {
            is_prime = 0;
            break;
        }
    }

    printf("The %d is %s a prime number",user_input, is_prime ? "":"NOT");
 /*   
    if (is_prime){
        printf("The %d is a prime number", user_input);
    } else {
        printf("The %d is not a prime number", user_input);
    }

 */
    return 0;
}
```

## 基本數數counting
```C
// 基本的數數counting

#include <stdio.h>

int main(void) {
    int number = 0;
    int user_input;
    printf("Please Enter a number:");
    scanf("%d",&user_input);

    for ( ;number <= user_input;number ++ ) {
        printf("%d | ",number);
    }
    return 0;
}
```

## 退出loop
```C
// 退出邏輯, 輸入指定char才退出
// 我記得gui介面都這樣使用(保持介面, 等使用者輸入邏輯才往下一步走)

#include <stdio.h>

int main(void) {
    char c;
    while (1) {
        printf("Please enter q to quit:\n");
        scanf(" %c",&c);                     //空一個忽略上一個stream的 \n
        if ( c == 'q') {
            printf("Bye bye!\n");
            break;
        }
        printf("You entered: %c\n", c);
    }
    return 0;
}
```

## 算錢
```C
/*count function*/

#include <stdio.h>

int main(void){
    int cmd;   // user_input
    float balance = 0.0f, credit, debit;

    printf("***Checkbook-balacing program***\n");
    printf("Commands: 0=clear, 1=credit, 2=debit, 3=balance, 4=exit\n\n");
    while (1){
        printf("Enter command: ");
        scanf("%d",&cmd);
        switch (cmd) {
            case 0:
                balance = 0.0f;
                break;
            case 1:
                printf("Enter amount of credit: ");
                scanf("%f",&credit);
                balance += credit;
                break;
            case 2:
                printf("Enter amount of debit: ");
                scanf("%f",&debit);
                balance -= debit;
                break;
            case 3:
                printf("Current balance: $%.2f\n",balance);
                break;
            case 4:
                return 0;
            default:
                printf("Commands: 0=clear, 1=credit, 2=debit, 3=balance, 4=exit\n\n");
                break;
        }
    }
}
```

## 基礎計算機
```C
/*calculator*/

#include <stdio.h>

int main(void){
    int cmd;
    float result = 0.00f, num;

    printf("Calculator\n");
    printf("Command: 0=clear, 1=plus, 2=minus, 3=times, 4=division, 5=exit\n\n");
    while (1){
        printf("Enter command: ");
        scanf("%d",&cmd);
        switch (cmd) {
            case 0:
                result = 0.00f;
                break;
            case 1:
                printf("Enter plus number: ");
                scanf("%f",&num);
                result += num;
                printf("sum: %.2f\n", result);
                break;
            case 2:
                printf("Enter minus number: ");
                scanf("%f",&num);
                result -= num;
                printf("sum: %.2f\n", result);
                break;
            case 3:
                printf("Enter times number: ");
                scanf("%f",&num);
                result *= num;
                printf("sum: %.2f\n", result);
                break;
            case 4:                                 //divided by zero
                printf("Enter divided number: ");
                scanf("%f",&num);
                if (num == 0.0f){
                    printf("Error: division by zero\n");
                    break;
                }
                result /= num;
                printf("sum: %.2f\n", result);
                break;
            case 5:
                printf("Bye Bye");
                return 0;
            default:
                printf("Please Enter the correct command: ");
                break;
        }
    
    }
}
```

## for and while 互換邏輯
```C
for (A; B; C) { Body}

//equivalent to

A;
while (B)
	Body;
	C;
```

## 2的7次方
```C
#include <stdio.h>

int main(){
    int i = 1, n = 0;

    while (i <=128) {
        printf("%d, power is: %d\n", i, n);
        i *= 2;
        n += 1;
    }
    return 0;
}
```

## 2的7次方(改成用for)
```C
// 改寫成for

#include <stdio.h>

int main() {
   for (int i =1, n =0; i < 128 ; i *= 2, n++) {   //要賦值
        printf("%d, power is: %d\n", i, n);
   }
   return 0;
}

```

## 最大公因數
```C
#include <stdio.h>

int main(void){
    int m, n, r;

    printf("Enter two integers: ");
    scanf("%d %d", &m, &n);

    while (n != 0) {
        r = m % n;
        m = n;
        n = r;
    }

    printf("GCD: %d\n", m);

    return 0;
}
```

## 最大公因數-求最簡分數
```C
#include <stdio.h>

int main(void){
    int m, n, r, fraction_up, fraction_down ;
    printf("Enter a fraction(ex: 10/18): ");
    scanf("%d/%d", &fraction_up, &fraction_down);

    if (fraction_down == 0){
        printf("Error: denominator cannot be zero\n");
        return 1;
    }

    m = fraction_up;
    n = fraction_down;

    while ( n != 0){
        r = m % n;
        m = n;
        n = r;
    }
    printf("In lowest terms: %d/%d\n", fraction_up / m, fraction_down / m  );

    return 0;
}
```
## program-

找出用戶輸入的最大數, 需要一個一個讓客戶輸入, 當輸入0或負數, 顯示出已經輸入的最大非負數

```C
#include <stdio.h>

int main(void){
    float user_input, max;
    
    printf("Enter a number: ");
    scanf("%f", &user_input);

    max = user_input;

    while ( user_input > 0 ){

        if ( user_input > max ){
            max = user_input;
        }

        printf("Enter a number: ");
        scanf("%f", &user_input);


    }
    printf("The largest number entered was %g\n", max);   //general 

    return 0;
}
```

## 簡單的月曆
```C
#include <stdio.h>

int main(void){
    int month, st_week;
    
    
    printf("Enter number of days in month: ");
    scanf("%d", &month);
    printf("Enter starting day of the week(1=sun, 7=Sat): ");
    scanf("%d", &st_week);
    
    // main
    printf(" Sun Mon Tue Wed Thu Fri Sat\n");
    for (int i = 1; i < st_week; i++) printf("    ");   //tab是不固定的對齊
    for ( int i = 1; i <= month; i++ ) {
        printf("%4d", i);
        if ( (i + st_week -1) % 7 == 0 ) printf("\n");   //offset
    
    }

    return 0;
}

```

## 計算e的近似值
```C
#include <stdio.h>

int main(void){
    int n;
    float sum = 1, result = 1;
    printf("Enter a integer: ");
    scanf("%d", &n);

    for ( int i = 1; i <=n; i++ ){ 
        sum *= i;
        result += 1 / sum;
    }
    printf("limited e is : %f", result);

    return 0;
}

```
---
[[Clang]]