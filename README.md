# lulu按钮

##### 项目地址: https://button.sizuku.top/

### 相关链接：
- [lulu的Bilibili直播间](https://space.bilibili.com/387636363/)

### 添加或修改音频/完善翻译

即使不懂具体操作也可以通过填写[Notion](https://www.notion.so/sizuku/e738d441aba04b2e9073b5add93d6c67?v=fe976c61b06d44db8f0d32b41aec94c2)表单来帮助丰富lulu按钮语音内容。

音频文件推荐使用**mp3**格式，请先音量标准化，然后放入`public/voices/`目录

所有的分类和音频信息都存储在`setting/translate`目录的`json`文件中，**添加或修改音频信息**、**完善翻译**，你需要修改对应文件中的内容

`locales.json`和`category.json`分别为UI界面翻译和分类信息，请不要修改文件名，语音信息可以使用除此外的任意名称，可使用多个`json`文件方便管理语音


`category.json`结构示例如下：
```
[
  {
    // 分类命名
    "name": "名言",
    "translate": {
      // 分类中文翻译
      "zh-CN": "lulu名言~",
      // 分类英文翻译
      "en-US": "lulu good words~"
    }
  }
]
```

语音文件结构示例如下：
```
[
  {
    // 语音命名
    "name": "我对女人没兴趣",
    // 语音文件名
    "path": "我对女人没兴趣.mp3",
    "translate": {
      // 语音中文翻译
      "zh-CN": "我对女人没兴趣",
      // 语音英语翻译
      "en-US": " "
    },
    // 语音所属分类(对应category的name)
    "category": "名言",
    // 以下属性为可选
    // 添加时间
    "date": "2021-03-24",
    // 语音出处
    "mark": {
      "title": "怎么办我被lulu甩了，她说她对女人没兴趣",
      "time": "02:26-02:29",
      "url": "https://www.bilibili.com/video/BV1Pi4y1K7PH"
    }
  }
]
```
添加`usePicture`字段可以添加鼠标悬浮时显示的图片(请放到`public/voices/img`目录)

### LICENSE
- 使用[voices-button-cli](https://github.com/blacktunes/voices-button-cli)创建的语音按钮
- 所用模板为[Hiiro按钮](https://github.com/blacktunes/hiiro-button)
