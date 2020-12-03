@gv/gv-unit-testing
===============================================
GV Testing examples project

Component Authors, provide some documentation for your users here!

now-cli login --host https://dev76457.service-now.com --method basic --username admin --password
now-cli project --name @gv/gv-unit-testing --description 'Testing examples project'


## Config Jest

        "jest": {
            "setupTestFrameworkScriptFile": "./src/setupTests.js",
            "moduleNameMapper": {
                "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/@gv/gv-testing-utils/__mocks__/fileMock.js",
                "\\.(css|scss|sass|less)$": "<rootDir>/src/@gv/gv-testing-utils/__mocks__/styleMock.js"
            }
        },