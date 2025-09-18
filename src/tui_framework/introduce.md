# Terminal User Interface框架

使用rust的ratatui + crossterm(底層事件處理)

## crossterm::event::

1. self : 處理終端事件, 螢幕大小變化, 滑鼠鍵盤, 或是event::read()等待事件, 讀取事件
2. Event : 事件enum
3. KeyCode : 案件代碼
```rust
pub enum KeyCode{
    Backspace,
    Enter,
    Left, Right, Up, Down,
    Tab, BackTab,
    Delete, Insert,
    F(u8)            //F1-F12
    Char(char),      //一般字元 ,asdferwer
    Null,
    Esc,
}
```
4. KeyEvent : 單次鍵盤事件
```rust
Pub struct KeyEvent {
    pub code: KeyCode,
    pub modifiers: keyModifiers,     //有沒有Ctrl, Alt, Shift
    pub kind : KeyEventKind,         //press,release,repeat
    pub state : KeyEventState,       //numLock, CapsLock 等狀態
}
```

5. KeyEventKind : 按鍵種類(上述第4點)
6. KeyModifiers : 修飾鍵,組合鍵(第4點)

## ratatui

- DefaultTerminal :         //init視窗必備
- Frame :                   //畫框必備
- text::Line                //文字
- style::Stylize            //粗體字等變化調整
- widgets::{
    Block,                  //大框框
    Paragraph,              //可以寫多行文章
}

## 最基本的框架元素

```rust
use color_eyre::Result;
use crossterm::{event::{self,Event, KeyCode, KeyEvent, KeyEventKind, KeyModifiers}};
use ratatui::{
    DefaultTerminal, Frame,
    style::Stylize,
    text::Line,
    widgets::{Block, Paragraph},  
};

fn main() -> color_eyre::Result<()> {               //可接受任何類型的Error
    color_eyre::install()?;                         //啟動彩色錯誤處理
    let terminal = ratatui::init();
    let result = App::new().run(terminal);
    ratatui::restore();
    result
}

#[derive(Debug,Default)]
pub struct App {                    //程式進入和結束的邏輯 1,0
    running: bool,
}

impl App {
    pub fn new() -> Self {          //初始化
        Self::default()
    }

    pub fn run(mut self, mut terminal: DefaultTerminal) -> Result<()> {                 //loop邏輯
        self.running = true;
        while self.running {                                //如果初始化失敗, 回傳問題
            terminal.draw(|frame| self.render(frame))?;
            self.handle_crossterm_events()?;
        }
        Ok(())
    }
    

    fn render(&mut self, frame: &mut Frame) {                  //不用pub, 畫布變化
        let title = Line::from("我的第一個tui程式")
            .bold()
            .blue()
            .centered();
        let text = "第一行文字測試\n\n\
                    換兩行到第三行\n\
                    然後跟你說Esc, Ctrl-c, q 都可以關閉程式\
                    ";
        frame.render_widget(
            Paragraph::new(text)
                .block(Block::bordered().title(title))
                .centered(), 
            frame.area(),
        )
    }

    fn handle_crossterm_events(&mut self) -> Result<()> {     //key事件處理
        match event::read()? {
            Event::Key(key) if key.kind == KeyEventKind::Press => self.on_key_event(key),
            Event::Mouse(_) => {}
            Event::Resize(_,_) => {}
            _ => {}
        }
        Ok(())
    }

    fn on_key_event(&mut self, key: KeyEvent) {                //key事件接收
        match (key.modifiers, key.code) {
            (_, KeyCode::Esc | KeyCode::Char('q'))
            | (KeyModifiers::CONTROL, KeyCode::Char('c') | KeyCode::Char('C')) => self.quit(),

            _ => {}
        }
    }

    fn quit(&mut self) {
        self.running = false;
    }                        //離開的邏輯
}
```
