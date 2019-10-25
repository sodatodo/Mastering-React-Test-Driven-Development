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