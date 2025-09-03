# 演算法(algorithms)研究
performance is design  

演算法個人認為, 是一種學習如何"設計最有效率決策"的技術, 可以在使用AI做出大部分架構與解決方案後, 再次做優化與改善. 是綜合能力, 也是思維底層核心重要的價值之一.

準備一個自己比較熟悉的程式語言, 開始探討演算法...

為了練習思考邏輯, 會使用三種不同類型的程式語言當作練習...

- powershell: 物件導向的shell + 腳本語言 for .NET生態
- bash: 文字導向的shell + 腳本語言 for unix生態
- rust: 系統級別語言

下面嘗試練習幾個範例看自己受不受的了...

## 插入排序

**輸入** -> n個數字

**輸出** -> 重新排序$a_1 \leq a_2 \leq a_3 \leq ... \leq a_n$

使用bubble sort

物件導向語言練習(powershell)

```powershell
cls

$a = (2,6,8,12,77,99)

#Setting bubble sort loop
for ($i = 0; $i -lt $a.length; $i++) {
    for ($j = 0; $j -lt $a.length - 1 - $i; $j++) {
        #比大小
        if ($a[$j] -gt $a[$j + 1]) {
            $temp = $a[$j]
            $a[$j] = $a[$j + 1]
            $a[$j + 1] = $temp
        }
    }
}
Write-Host ($a -join "->")
```

文字導向的語言練習(bash)

```bash
#!/bin/bash

arr=(2 6 88 98 333 999)
len=${#arr[@]}

# outer loop and inner loop
for ((i=0; i<len; i++)); do 
    for ((j=0; j<len-1-i; j++ )); do
        if ((arr[j] > arr[j+1])); then
            temp=${arr[j]}
            arr[j]=${arr[j+1]}
            arr[j+1]=$temp
        fi
    done
done

echo "${arr[@]}"
```

現代語言練習(Rust)

```rust
use std::io;

fn bubble_sort (arr: &mut Vec<u16>) {
    let n = arr.len();
    if n < 2 {return;}        //1個不用排序
    
    for i in 0..n {
        let mut sw = false;     //檢查是否不用交換
        for j in 0..(n -1 -i) {
            if arr[j] > arr[j + 1] {
                arr.swap(j, j + 1);
                sw = true;
            }
        }
        if !sw {break;}
    }
}

fn main () {
    let mut a = vec![1, 2, 55, 77, 123, 999, 5];
    bubble_sort(&mut a);
    println!("排序結果:{:?}", a);
    // 把結果放在terminal
    println!("按Enter退出...");
    let mut enter = String::new();
    io::stdin().read_line(&mut enter).unwrap();
}
```

## 加總

**輸入** -> 給一個數字陣列

**輸出** -> 加總

powershell練習(含命令列操作)

```Powershell
cls
$arr = (2, 4, 6, 8)
$arr2 = (2, 3, 6, 11, 55)
$result = 0
$result2 = 0

for ($i=0; $i -lt $arr.Length; $i++) {
    $result += $arr[$i]
}

Write-Host $result

# 用命令列工具
$arr2 | ForEach-Object {$result2 += $_}

Write-Host ""
Write-Host "命令列的方法: $result2"
```

Bash練習(同樣一般script和命令列兩種方法)

```bash
#!/bin/bash

arr=(2 2 3 4 5)
result=0
len=${#arr[@]}

for ((i=0; i<len; i++)); do
        ((result+=arr[i]))
done

echo "$result"

echo "使用命令列的方式"

echo "${arr[@]}" | tr " " "+" | bc
```

使用Rust

```rust
fn main () {
    let arr = vec![1, 2, 4, 88];   //vec<T> 在heap上, 可變大小
    let mut result = 0;

    for i in 0..arr.len() {
        result += arr[i];
    }

    println!("Sum is: {}", result);

    //iterator方法
    let aa = [1, 2, 4, 88];       //一般陣列, 在stack上, 不可變大小
    let result2: u8 = aa.iter().sum();
    println!("iterator method result: {}", result2);
}
```

## 線性搜尋test

**輸入** -> 陣列有n個數字(a_1, a_2, a_3, ..., a_n), 跟一個值x

**輸出** -> 顯示x在陣列中為第i個位置, 如果陣列中沒有x, i 顯示為nil

這邊使用powershell的Pester測試module, 做兩組測試

```powershell
function find_index {
    param (
        $array,
        $string
    )
    
    $index = $null

    for ($i=0; $i -lt $array.length; $i++) {
        if ($array[$i] -eq $string) {
            $index = $i
            break
        }
    }



    if ($index -eq $null) {
        return "nil"
    } else {
        return $index + 1
    }
}

Describe "測試" {
    It "test1" {
        $a = (1,2,3,4,5,6,"x",3,4,5,6)
        $word = "x"
        $result = find_index -array $a -string $word
        $result | should Be "7"
    }

    It "test2" {
        $a = (1,2,3,4,5,6,"x",3,4,5,6)
        $word = "Z"
        $result = find_index -array $a -string $word
        $result | should Be "nil"
    }
}
```

文字導向的bash, 寫起來有點痛苦, 因為邏輯不一樣.

主要函數
```bash
#!/bin/bash

find_index () {
        local target="$1"
        shift
        local arr=("$@")
        local index=-1   # index有找到的話, 輸出都要+1
        local i=0

        for value in "${arr[@]}"; do
                if [[ "$value" == "$target" ]]; then
                        index=$i
                        break
                fi
                ((i++))
        done

        if [[ $index -eq -1 ]]; then
                echo "nil"
        else
                echo $((index+1))
        fi

}
```

測試函數
```bash
#!/bin/bash

source ./search.sh

# 測試陣列
arr=(1 2 3 4 5 x 5 6 7 44)

#測試有x
result=$(find_index "x" "${arr[@]}")
if [[ "$result" == "6" ]]; then
        echo "test1 passed: $result should be 6"
else
        echo "test1 failed: $result should be 6"
fi

#測試無x
result=$(find_index "z" "${arr[@]}")
if [[ "$result" == "nil" ]]; then
        echo "test2 passed: $result should be nil"
else
        echo "test2 failed: $result should be nil"
fi
```


rust和測試工具一起練習
```rust
fn find_index<T: PartialEq> (array: &[T], x: &T) -> Option<String> {
    for (i, val) in array.iter().enumerate() {   //enum -> (index: usize, value: &T)
        if val == x {
            return Some((i+1).to_string());
        }
    }
    None
}


fn main() {
/*  直接用函數處理  
   
    let a = vec!["1","2","6","7","8","4","3","x","2222","333","666"];
    let word = "Y";
    let result = find_index(&a, &word);

    println!("{:?}", result.unwrap_or(("nil").to_string()))
*/
}

//用測試的方式
#[cfg(test)]

mod tests {
    use super::*;

    const A: [&str; 11] = ["1","2","6","7","8","4","3","x","2222","333","666"];

    #[test]
    fn returns_index() {
       let word = "x";
       let result = find_index(&A, &word).unwrap_or(("nil").to_string());
       assert_eq!(result, "8");
    }

    #[test]
    fn returns_nil() {
       let word = "Z";
       let result = find_index(&A, &word).unwrap_or(("nil").to_string());
       assert_eq!(result, "nil");
    }
}

```
