``` bash 
npm install --save-dev jest

git init 
echo "node_modules" > .gitignore
git add .
git commit -m "Blank project with Jest dependency and readme.md"

git push --set-upstream origin starting-point-soda
```

## describe
执行一段测试之前的描述
## 测试目标dom中包含指定的字符串子串
``` JavaScript
expect(<target-dom>).toMatch(<target-str>);
// 例如
expect(document.body.textContent).toMatch('Ashley');
```

## principle
always implement the simplest thing that will possibly work.That includes hard-coding,when it's possible.
In order to get to the real implementation, we need to add more tests. This process is called triangulation.

## Writing great tests
A good test has threee distinct sections
    > Arrange: Sets up test dependencies
    > Act: Executes production code under test
    > Assert: Checks expectations are met
A great test is not just good but is also the following:
    > Short // 简短
    > Descriptive // 有具体的描述
    > Independent of other tests // 独立于其他的测试
    > Has no side-effects // 无副作用

## Red,green,refactor
1.写一个结果为失败的测试用例：
> 写一个能满足需求的简短测试,执行并使其失败,如果该测试没有失败,那么其不足以测试需求,重写构建测试用例
2.使测试通过
> 使测试结果变绿(通过).做最简单的事情使其通过.不要紧张代码的混乱,你可以在下一步去整理
3.重构代码
> 停下来，慢慢的并且要抵抗住进行下一个功能的冲动。努力使你的代码 产品代码和测试代码尽可能的简洁