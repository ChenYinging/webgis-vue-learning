### **开始**

# **一、简介**

Vue 是一款用于构建用户界面的 JavaScript 框架。

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps1.jpg) 

上面的示例展示了 Vue 的两个核心功能：

**声明式渲染：**Vue 基于标准 HTML 拓展了一套模板语法，使得我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系。

**响应性：**Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM。

## 1. **单文件组件**

在大多数启用了构建工具的 Vue 项目中，我们可以使用一种类似 HTML 格式的文件来书写 Vue 组件，它被称为单文件组件 (也被称为 *.vue 文件，英文 Single-File Components，缩写为 SFC)。顾名思义，Vue 的单文件组件会将一个组件的逻辑 (JavaScript)，模板 (HTML) 和样式 (CSS) 封装在同一个文件里。下面我们将用单文件组件的格式重写上面的计数器示例：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps2.jpg) 

## 2.API 风格

Vue 的组件可以按两种不同的风格书写：选项式 API 和组合式 API。

**选项式 API (Options API)**

使用选项式 API，我们可以用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps3.jpg) 

**组合式 API (Composition API)**

通过组合式 API，我们可以使用导入的 API 函数来描述组件逻辑。在单文件组件中，组合式 API 通常会与 <script setup> 搭配使用。这个 setup attribute 是一个标识，告诉 Vue 需要在编译时进行一些处理，让我们可以更简洁地使用组合式 API。比如，<script setup> 中的导入和顶层变量/函数都能够在模板中直接使用。

下面是使用了组合式 API 与 <script setup> 改造后和上面的模板完全一样的组件：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps4.jpg) 

## 声明式渲染

能在改变时触发更新的状态被称作是响应式的。我们可以使用 Vue 的 reactive() API 来声明响应式状态。

reactive() 只适用于对象 (包括数组和内置类型，如 Map 和 Set)。而另一个 API ref() 则可以接受任何值类型。ref 会返回一个包裹对象，并在 .value 属性下暴露内部值。

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps5.jpg) 

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps6.jpg) 

在组件的 <script setup> 块中声明的响应式状态，可以直接在模板中使用。下面展示了如何使用双花括号语法，根据 counter 对象和 message ref 的值渲染动态文本：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps7.jpg) 

我们在模板中访问的 message ref 时不需要使用 .value：它会被自动解包，让使用更简单。

## Attribute 绑定

在 Vue 中，mustache 语法 (即双大括号) 只能用于文本插值。为了给 attribute 绑定一个动态值，需要使用 v-bind 指令：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps8.jpg) 

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps9.jpg) 

## 事件监听

我们可以使用 v-on 指令监听 DOM 事件：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps10.jpg) 

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps11.jpg) 

## 表单绑定

我们可以同时使用 v-bind 和 v-on 来在表单的输入元素上创建双向绑定：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps12.jpg) 

为了简化双向绑定，Vue 提供了一个 v-model 指令，它实际上是上述操作的语法糖：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps13.jpg) 

v-model 会将被绑定的值与 <input> 的值自动同步，这样我们就不必再使用事件处理函数了。

## 条件渲染

我们可以使用 v-if 指令来有条件地渲染元素：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps14.jpg) 

我们也可以使用 v-else 和 v-else-if 来表示其他的条件分支：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps15.jpg) 

## 列表渲染

我们可以使用 v-for 指令来渲染一个基于源数组的列表：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps16.jpg) 

这里的 todo 是一个局部变量，表示当前正在迭代的数组元素。它只能在 v-for 所绑定的元素上或是其内部访问，就像函数的作用域一样。

我们还给每个 todo 对象设置了唯一的 id，并且将它作为特殊的 key attribute 绑定到每个 <li>。key 使得 Vue 能够精确地移动每个 <li>，以匹配对应的对象在数组中的位置。

 

更新列表有两种方式：

1. 在源数组上调用[变更方法](https://stackoverflow.com/questions/9009879/which-javascript-array-functions-are-mutating)：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps17.jpg) 

2. 使用新的数组替代原数组：
![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps18.jpg)

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml20444\wps19.jpg) 

## 计算属性

computed ()可以让我们创建一个计算属性 ref，这个 ref 会动态地根据其他响应式数据源来计算其 .value。

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml3000\wps11.jpg) 

## 生命周期和模板引用

模板引用——也就是指向模板中一个 DOM 元素的 ref。我们需要通过这个特殊的 ref attribute 来实现模板引用：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml3000\wps12.jpg) 

要访问该引用，我们需要声明一个同名的 ref：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml3000\wps13.jpg) 

注意这个 ref 使用 null 值来初始化。这是因为当 <script setup> 执行时，DOM 元素还不存在。模板引用 ref 只能在组件挂载后访问。

要在挂载之后执行代码，我们可以使用 onMounted() 函数：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml3000\wps14.jpg) 

这被称为生命周期钩子——它允许我们注册一个在组件的特定生命周期调用的回调函数。还有一些其他的钩子如 onUpdated 和 onUnmounted。

## 侦听器

有时我们需要响应性地执行一些“副作用”——例如，当一个数字改变时将其输出到控制台。我们可以通过侦听器来实现它：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml3000\wps15.jpg) 

watch() 可以直接侦听一个 ref，并且只要 count 的值改变就会触发回调。watch() 也可以侦听其他类型的数据源。

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml3000\wps16.jpg) 

 

## 组件

父组件可以在模板中渲染另一个组件作为子组件。要使用子组件，我们需要先导入它：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml3000\wps17.jpg) 

然后我们就可以在模板中使用组件，就像这样：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml3000\wps18.jpg) 

## Props

子组件可以通过 props 从父组件接受动态数据。首先，需要声明它所接受的 props：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml14480\wps1.jpg) 

注意 defineProps() 是一个编译时宏，并不需要导入。一旦声明，msg prop 就可以在子组件的模板中使用。它也可以通过 defineProps() 所返回的对象在 JavaScript 中访问。

父组件可以像声明 HTML attributes 一样传递 props。若要传递动态值，也可以使用 v-bind 语法：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml14480\wps2.jpg) 

## Emits

除了接收 props，子组件还可以向父组件触发事件：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml14480\wps3.jpg) 

emit() 的第一个参数是事件的名称。其他所有参数都将传递给事件监听器。

父组件可以使用 v-on 监听子组件触发的事件——这里的处理函数接收了子组件触发事件时的额外参数并将它赋值给了本地状态：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml14480\wps4.jpg) 

## 插槽

除了通过 props 传递数据外，父组件还可以通过插槽 (slots) 将模板片段传递给子组件：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml14480\wps5.jpg)、

在子组件中，可以使用 <slot> 元素作为插槽出口 (slot outlet) 渲染父组件中的插槽内容 (slot content)：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml14480\wps6.jpg) 

<slot> 插口中的内容将被当作“默认”内容：它会在父组件没有传递任何插槽内容时显示：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml14480\wps7.jpg)  

# **二、模板语法**

## **文本插值**

最基本的数据绑定形式是文本插值，它使用的是“Mustache”语法 (即双大括号)：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps3.jpg) 

## **Attribute 绑定**

双大括号不能在 HTML attributes 中使用。想要响应式地绑定一个 attribute，应该使用 v-bind 指令：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps4.jpg) 

v-bind 指令指示 Vue 将元素的 id attribute 与组件的 dynamicId 属性保持一致。如果绑定的值是 null 或者 undefined，那么该 attribute 将会从渲染的元素上移除。

### **简写**

因为 v-bind 非常常用，提供了特定的简写语法：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps5.jpg) 

### **同名简写**

如果 attribute 的名称与绑定的 JavaScript 变量的名称相同，那么可以进一步简化语法，省略 attribute 值：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps6.jpg) 

### **布尔型 Attribute**

[布尔型 attribute](#%E5%B8%83%E5%B0%94%E5%80%BC%E5%B1%9E%E6%80%A7) 依据 true / false 值来决定 attribute 是否应该存在于该元素上。[disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled) 就是最常见的例子之一。

v-bind 在这种场景下的行为略有不同：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps7.jpg) 

当 isButtonDisabled 为[真值](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)或一个空字符串 (即 <button disabled="">) 时，元素会包含这个 disabled attribute。而当其为其他[假值](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)时 attribute 将被忽略。

### **动态绑定多个值**

如果你有像这样的一个包含多个 attribute 的 JavaScript 对象：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps8.jpg) 

通过不带参数的 v-bind，你可以将它们绑定到单个元素上：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps9.jpg) 

## **使用 JavaScript 表达式**

Vue 实际上在所有的数据绑定中都支持完整的 JavaScript 表达式：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps10.jpg) 

这些表达式都会被作为 JavaScript ，以当前组件实例为作用域解析执行。

在 Vue 模板内，JavaScript 表达式可以被使用在如下场景上：

1·在文本插值中 (双大括号)

2·在任何 Vue 指令 (以 v- 开头的特殊 attribute) attribute 的值中

### **调用函数**

可以在绑定的表达式中使用一个组件暴露的方法：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps11.jpg) 

### **受限的全局访问**

模板中的表达式将被沙盒化，仅能够访问到有限的全局对象列表。该列表中会暴露常用的内置全局对象，比如 Math 和 Date。

## **指令 Directives**

指令 attribute 的期望值为一个 JavaScript 表达式。一个指令的任务是在其表达式的值变化时响应式地更新 DOM。

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps12.jpg) 

这里，v-if 指令会基于表达式 seen 的值的真假来移除/插入该 <p> 元素。

### **参数 Arguments**

某些指令会需要一个“参数”，在指令名后通过一个冒号隔开做标识。例如用 v-bind 指令来响应式地更新一个 HTML attribute：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps13.jpg) 

这里 href 就是一个参数，它告诉 v-bind 指令将表达式 url 的值绑定到元素的 href attribute 上。在简写中，参数前的一切 (例如 v-bind:) 都会被缩略为一个 : 字符。

另一个例子是 v-on 指令，它将监听 DOM 事件：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps14.jpg) 

### **动态参数**

同样在指令参数上也可以使用一个 JavaScript 表达式，需要包含在一对方括号内：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps15.jpg) 

这里的 attributeName 会作为一个 JavaScript 表达式被动态执行，计算得到的值会被用作最终的参数。

 

相似地，你还可以将一个函数绑定到动态的事件名称上：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps16.jpg) 

#### **动态参数值的限制**

动态参数中表达式的值应当是一个字符串，或者是 null。特殊值 null 意为显式移除该绑定。其他非字符串的值会触发警告。

#### **动态参数语法的限制**

动态参数表达式因为某些字符的缘故有一些语法限制，比如空格和引号，在 HTML attribute 名称中都是不合法的。

当使用 DOM 内嵌模板 (直接写在 HTML 文件里的模板) 时，我们需要避免在名称中使用大写字母，因为浏览器会强制将其转换为小写：

### **修饰符 Modifiers**

修饰符是以点开头的特殊后缀，表明指令需要以一些特殊的方式被绑定。例如 .prevent 修饰符会告知 v-on 指令对触发的事件调用 event.preventDefault()：

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps17.jpg) 

# **八、事件处理**

事件处理器 (handler) 的值可以是：

**内联事件处理器：**事件被触发时执行的内联 JavaScript 语句 (与 onclick 类似)。

**方法事件处理器：**一个指向组件上定义的方法的属性名或是路径。

 

## **内联事件处理器**

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps18.jpg) 

## **方法事件处理器**

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps19.jpg) 

方法事件处理器会自动接收原生 DOM 事件并触发执行。在上面的例子中，我们能够通过被触发事件的 event.target 访问到该 DOM 元素。

### **方法与内联事件判断**

模板编译器会通过检查 v-on 的值是否是合法的 JavaScript 标识符或属性访问路径来断定是何种形式的事件处理器。举例来说，foo、foo.bar 和 foo['bar'] 会被视为方法事件处理器，而 foo() 和 count++ 会被视为内联事件处理器。

## **在内联处理器中调用方法**

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps20.jpg) 

## **在内联事件处理器中访问事件参数**

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps21.jpg) 

## **事件修饰符**

在处理事件时调用 event.preventDefault() 或 event.stopPropagation() 是很常见的。尽管我们可以直接在方法内调用，但如果方法能更专注于数据逻辑而不用去处理 DOM 事件的细节会更好。

为解决这一问题，Vue 为 v-on 提供了事件修饰符。修饰符是用 . 表示的指令后缀，包含以下这些：

· .stop

· .prevent

· .self

· .capture

· .once

· .passive

![img](file:///C:\Users\syrjb\AppData\Local\Temp\ksohtml22460\wps22.jpg)