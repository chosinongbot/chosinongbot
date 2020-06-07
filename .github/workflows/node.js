# This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions
 
name: Node.js CI
 
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
 
jobs:
  build:
 
    runs-on: ubuntu-latest
 
    strategy:
      matrix:
        node-version: [14.x]
 
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: npm install
    - run: npm run build
    - name: push
      uses: github-actions-x/commit@v2.6
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        push-branch: 'master'
        commit-message: 'build commit'
        force-add: 'true'
        files: 'dist'
        name: 'Github Actions'
        email: 'youn@tree-some.dev'
    - name: hook
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm run hook
 
