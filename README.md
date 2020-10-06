`Web App link: https://github.com/csc301-fall-2020/assignment-1-33-fernandapalaci-shiseru-web`

# 1. A1 report
https://drive.google.com/file/d/1doWIvzuCasVopuPU_GO1wUqegK0lhN2p/view?usp=sharing

# 2. How to access and use application
1: How to access:https://drive.google.com/file/d/1SypqjD0RMZkRcHi6AIGDmGsYVmx_LnRL/view?usp=sharing

2: How to use:https://drive.google.com/file/d/1FU3ay-FcdzODFwsQ1LdOZY0gbYQWtA0K/view?usp=sharing

# 3. Link to deployed application
https://expo.io/@shiseru-fernandapalaci/checkout-price-calculator-mobile

1. click above url

2. click 'Open project in the browser' - (You may need to wait 30 seconds to run app simulator)

For more details, please check "How to access and use application" section.

you may need login ID and password to run deployed app. In that case, please use following to login expo.  

expo account: https://expo.io/dashboard/shiseru-fernandapalaci

username: shiseru-fernandapalaci

pass: wzDApA@teYj9bi9

# 4. Auto deployment instructions
We use github actions to auto deploy.
The main yml file which github actions use is at `./.github/workflows/publish_app.yml`
When code is pushed to master branch or the sub branch is pull requested to master, it runs CI/CD which runs test and deployes to expo.

To reproduce - add one empty line in README.md and push to master, then; click 'Actions' tab and you can see the CI/CD working.`Currently, due to reach of maximum github actions use limits, it is not working. Once, prof fixes the limit, CI/CD will work properly again.`

# 5. Manual Deployment
`I recommend to deply app with CI/CD at section 4. Auto deployment instructions`

To deploy app manually, you need a local setup. 

Please follow the `For teammate - (Local Development)` section 0, 1, 2 

Then run `expo publish`

You will be asked to input username and password for expo accout. Please input following.

username: shiseru-fernandapalaci

pass: wzDApA@teYj9bi9

Then it will successfully be published to https://expo.io/@shiseru-fernandapalaci/checkout-price-calculator-mobile


# For teammate - (Local Development)
## 0. Clone repo and goto repo's root path.

## 1. install expo cli for react native tools.
`npm install --global expo-cli`

## 2.  run expo install to install add dependencies.
`expo install`

## 3. run repo locally
`expo start`

## 4. once the window pops out, choose the emulator you would run code with (IOS, Android)
