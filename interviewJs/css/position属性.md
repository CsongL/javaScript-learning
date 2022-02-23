# position属性

## position: staic

默认的属性position的值就位static

## position: relative

不改变原来的元素文档流，也就是说在原来的文档元素流中保留该元素的位置，该元素根据设置的偏移量相对于该元素在元素文档流中的位置进行偏移。

## position: fixed

元素会脱离元素文档流，不会为该元素在正常元素文档流中流出空间，并相对于视窗窗口进行偏移

## position: absolute

该元素会脱离正常的文档流，不会为该元素留出位置，该元素会相对于离他最近的非static的元素进行偏移

## position: sticky

该元素在正常的元素文档流中，在滚轮元素向下滚动使得该元素完全消失之前，该元素表现得像是position: relative的元素(即元素在文档流的位置被保存，且其偏移是相对于之前所在文档流中的位置进行偏移)， 而当滚轮滚动到一定程度时，该元素的表现得就像是position: fixed 元素，会为该元素创建一个新的层叠样式层，该元素会相对于离他最近的滚动祖先进行偏移。

就是 在滚轮还没有滚动到一定程度时，就相当于是 position: relative元素，但滚轮滚动到一定的程度时，就相当于是position: fixed元素，但也要注意 position: sticky元素是相对于离他最近的滚轮祖先偏移，而position: fiexed 是相对于整个窗口