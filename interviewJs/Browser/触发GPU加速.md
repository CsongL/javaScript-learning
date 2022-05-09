## GPU加速
GPU: Graphics Processing Unit(GPU) 图像处理器

如何开启GPU硬件加速渲染？ -想要开启GPU加速其实就是要如何创建独立的图层，从而触发GPU去复合多个层来处理
1. 可以通过设置一些css属性例如： transform, filter, 对opacity属性做动画
2. 拥有 3D (WebGL) 上下文或加速的 2D 上下文的 canvas 元素
3. 使用加速视频解码的video元素

