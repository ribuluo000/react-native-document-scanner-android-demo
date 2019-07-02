
# demo for react-native-document-scanner android.

本demo使用以下依赖
```
    "react-native-document-scanner": "git+ssh://git@github.com:Michaelvilleneuve/react-native-document-scanner.git#android",
    "react-native-perspective-image-cropper": "^0.4.3",
    "react-native-svg": "6.5.3"
```

在运行前需要处理以下问题：
- react-native-document-scanner 和 react-native-perspective-image-cropper 目录下的 implementation 改为 compile, 并添加以下代码
```
    compileSdkVersion 26
    buildToolsVersion "26.0.1"
```

