# 資料結構

單純先研究基礎的資料結構, 要先了解以下定義:

1. array: 有分一維或二維陣列, 資料庫sql或excel很類似這種想法, 資料有分row and column, 可以做搜尋或查找

2. stack: 疊書放在桌上的概念, 後近先出

> 有反轉順序的特性, insert() 和 pop() 順序相反, 例如回前一個步驟的邏輯實現

3. queue: 線性資料, 有head and tail, 雙邊可取資料

既然是結構, 就有空值或上限的問題, 會有取了空值-undefined, 或超出容器大小的問題-overflow

rust對於stack的常用操作:

- new()
- push(item)
- pop()
    - delete
- peek()
    - 返回上面的資料
- is_empty() -> bool
    - 測試是否為空的
- size() -> usize
    - 數據的數量

**迭代**

- iter() -> &T
    - 產生一個新的迭代, 但只是參考原本的數據
- iter_mut() -> &mut T
- into_iter() -> T


實際製作這些功能(其實也不是很懂, 而且沒有嚴謹, 只是自己練習做紀錄)

```rust
#[derive(Debug)]
struct Stack<T> {
    size: usize,
    data: Vec<T>,
}

//做功能
impl<T> Stack<T> {

    fn new() -> Self {   //Self = struct Stack 自己
        Self {
            size: 0,
            data: Vec::new(),
        }
    }

    fn push(&mut self, val: T) {
        self.data.push(val);
        self.size += 1;
    }

    fn pop(&mut self) -> Option<T> {
        if 0 == self.size { return None; }
        self.size -= 1;
        self.data.pop()
        
    }

    fn peek(&self) -> Option<&T> {
        if 0 == self.size { return None; }
        self.data.get(self.size - 1)
    }

    fn is_empty(&self) -> bool {  //&self呼叫者本身, 不是保留字
        0 == self.size
    }

    fn len(&self) -> usize {
        self.size
    }

    fn clear(&mut self) {
        self.data.clear();
        self.size = 0;
    }

    // 把下面的迭代功能塞到Stack中

    fn into_iter(self) -> IntoIter<T> {
        IntoIter(self)
    }
    
    fn iter<'a>(&'a self) -> Iter<'a, T> {
        let mut iterator = Iter { stack: Vec::new() };
        for item in self.data.iter() {
            iterator.stack.push(item);
        }
        iterator
    }

    fn iter_mut<'a>(&'a mut self) -> IterMut<'a, T> {
        let mut iterator = IterMut { stack: Vec::new() };
        for item in self.data.iter_mut() {
                iterator.stack.push(item);
        }
        iterator
    }
}



//三種迭代功能, 多包一層struct, 才不會影響原本的stack資料和所有權
// 1.
struct IntoIter<T> (Stack<T>);    //直接拿value
impl<T: Clone> Iterator for IntoIter<T> {
    type Item = T;
    fn next(&mut self) -> Option<Self::Item> {
        if  !self.0.is_empty() {
            self.0.size -= 1;        //self.0 = Stack<T>
            self.0.data.pop()
        } else{
            None
        }
    }
}


// 2.
struct Iter<'a, T: 'a> {stack: Vec<&'a T>, }    //只有借用    
impl<'a, T> Iterator for Iter<'a, T> {
    type Item = &'a T;
    fn next(&mut self) -> Option<Self::Item> {
        self.stack.pop()
    }
}

// 3.
struct IterMut<'a, T: 'a> { stack: Vec<&'a mut T>,}
impl<'a, T> Iterator for IterMut<'a, T> {
    type Item = &'a mut T;
    fn next(&mut self) -> Option<Self::Item> {
        self.stack.pop()
    }
}



fn main() {
    basic();
    peek();
    iter();

    fn basic() {
        let mut a = Stack::new();
        a.push(1); a.push(2); a.push(3);

        println!("大小: {}, 結構: {:?}",a.len(), a);
    }

    fn peek() {
        let mut a = Stack::new();
        a.push(1); a.push(2); a.push(3);
        
        println!("{:?}", a);
    }

    fn iter() {
        let mut a = Stack::new();
        a.push(1); a.push(2); a.push(3);
        
        let sum1 = a.iter().sum::<i32>();
        
        println!("{}", sum1);
    }
}

```

## 字串反轉

rust寫起來很快, 因為函式的處理方式, 有現成工具

```rust
fn main() {
    let s = "我是貓咪";
    let test:String = s.chars().rev().collect::<String>();
    
    println!("{}", test);    
}
```

powershell_5.1 沒有原生轉換BOM UTF8, 中文字會變亂碼, powershell 7 可以直接處理

```powershell
Add-Type -AssemblyName System.Windows.Forms

$box = [System.Windows.Forms.OpenFileDialog]::new()

#config setting the box

$box.Title = "選一個要反轉文字的檔案(限txt)"
$box.Filter = "純文字檔(*.txt)|*.txt"
$box.InitialDirectory = $PSScriptRoot
$box.Multiselect = $false

if ($box.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
    $path = $box.FileName
} else {
    [System.Windows.Forms.MessageBox]::Show(
        "沒有選擇檔案",
        "訊息",
        [System.Windows.Forms.MessageBoxButtons]::OK,
        [System.Windows.Forms.MessageBoxIcon]::Warning
    )
    exit
}

# 處理後的資料路徑

$dir = [System.IO.Path]::GetDirectoryName($path)
$old_name = [System.IO.Path]::GetFileNameWithoutExtension($path)
$newfile_path = Join-Path -Path $dir ($old_name + "_reverse.txt")

# 匯出反轉資料

Get-Content -Path $path | % { -join ($_.ToCharArray()[-1..-($_.Length)]) } | Set-Content -path $newfile_path -Encoding Default

# 處理好的訊息

[System.Windows.Forms.MessageBox]::Show(
    "處理完成, 檔案存在: `n$newfile_path",
    "完成",
    [System.Windows.Forms.MessageBoxButtons]::OK,
    [System.Windows.Forms.MessageBoxIcon]::Information
)
```

bash 單純用bash的shell, 不使用awk(不然等於又要再學一個語法...)

```bash
#!/bin/bash

s='我是貓咪'

r=''

for ((i=${#s}-1; i>=0; i--)); do
        r+="${s:i:1}"      # ${data:第幾個:範圍}
done

printf '%s \n' "$r"       # %s format specifier 格式化後面的輸出
```

## 括號配對

利用stack的特性, 有左邊的就丟進去, 遇到右邊的就拿出來配對

rust

```rust
fn par_check (s: &str) -> bool {
    let mut b: Vec<char> = Vec::new();
    for g in s.chars() {
       match g {
            '(' => b.push('('),
            ')' => if b.pop().is_none() { return false; },
            _ => {}
       } 
    } 
    b.is_empty()
}

fn main() {
    let cases = [
        "()",
        "((())))))",
        "((()))",
        "()()()()"
    ];

    for i in cases {
        println!("{i} => {}", par_check(i));
    }
}
```


powershell 解法, 用count

```powershell
function check {
    param([string]$s)

    $count = 0

    foreach($i in $s.ToCharArray()) {
        switch ($i) {
            '(' {$count++}
            ')' {
                if ($count -eq 0) { return $false }
                $count--
            }
        
        }    
    }
    return ($count -eq 0)
}


#test data

$cases = @("()",")(","(())","(((()))))")
$cases | % { "$_ => $(check $_)" }
```

用bash來解

```bash
#!/bin/bash

check () {
        local str=$1    # local 這個變數只有在fn裡面有效
        local -i depth=0

        for ((i=0; i<${#str}; i++)); do
                ch=${str:i:1}

                if [[ $ch == "(" ]]; then
                        ((depth++))
                elif [[ $ch == ")" ]]; then
                        ((depth==0)) && return 1
                        ((depth--))
                fi
        done

        ((depth==0))
}

#test

cases=("()" ")(" "(())" "((())" "()()()")

for y in "${cases[@]}"; do
        if check "$y"; then
                echo "$y => true"
        else
                echo "$y => false"
        fi
done
```


