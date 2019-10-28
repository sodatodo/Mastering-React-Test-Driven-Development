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