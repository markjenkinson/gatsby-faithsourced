# Faith Sourced Website

The Faith Sourced website is built with React, compiled with Gatsby, and can be deployed on any webserver (although we recommend [Netlify](https://netlify.com) for its performance and continuous deployment features including GitHub triggers).

To run a local copy of our site, for your own hacking pleasure, you’ll need some familiarity with the command line, install the requirements, and follow these terminal commands.

## Requirements

* [Node](https://nodejs.org/en/download/) Minimum version: 18.14.2 (LTS)
  * It installs `npm` with it
  * If you want to use different versions of Node you can use [nvm](https://github.com/nvm-sh/nvm) to switch between them
  * If you are running on macOS, you may want to manage Node using homebrew, which can be installed with the following command : 
      ```zh
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
      ```
    * To see your current node version :
        ```zh
        node --version
        ```
    * To see available node versions :
        ```zh
        brew search node
        ```
    * To unlink from current node version (ie. version 10) :
        ```zh
        brew unlink node@10
        ```
    * To uninstall any version of node (ie. version 10) :
        ```zh
        brew uninstall node@10
        ```
    * To install any version of node (ie. version 18) :
        ```zh
        brew install node@18
        ```
    * To link newly installed node version (ie. version 18) :
        ```zh
       brew link node@18
        ```
* [Git](https://git-scm.com/)

## Installation
From your command line terminal, first clone the repository :
```zh
git clone https://github.com/markjenkinson/gatsby-faithsourced.git
```
Then enter the root level of the newly cloned repository, and install the npm modules :
```zh
cd gatsby-faithsourced
npm install
```
The last step before you can begin development, is to create two environmental variable files (.env) one named `.env.development` and the other `.env.production`. 

These must be stored at the root level of the repository, and contain the following environment variables, customized with the correct API endpoint and other variables :
```zh
GATSBY_API_URL=https://api.faithsourced.com/conveyor/modules
GATSBY_PLUGIN_MANIFEST_NAME='Faith Sourced Software Foundation'
GATSBY_PLUGIN_MANIFEST_SHORTNAME='Faith Sourced'
GATSBY_PLUGIN_MANIFEST_BGCOLOR='#2c393f'
GATSBY_PLUGIN_MANIFEST_THEMECOLOR='#2c393f'
```

## Gatsby Development
To run Gatsby in develop mode, it is always advised to run `gatsby clean` before `gatsby develop` to clear any caches or compiled assets that may conflict :
```zh
gatsby clean && gatsby develop
```
With Gatsby running in develop mode, you will then be able to see your code changes live at [http://localhost:8000](http://localhost:8000)

## Gatsby Static Build
To generate a static build of the site directly on your development machine, run the following command :
```zh
gatsby clean && gatsby build
```
Once the build has fully compiled, you can test the build on your development machine by running the following command :
```zh
gatsby serve
```
Which can be previewed in your browser at [http://localhost:9000](http://localhost:9000)

## Netlify Deployment
1. Create a Netlify account
1. On the `Sites` tab, click "Add new site" and select "Import an existing project" from the drop down
1. Connect the site to the [Faith Sourced Website GitHub repo](https://github.com/markjenkinson/gatsby-faithsourced.git) for continuous deployment
1. On the `Site settings` tab, click "Build & deploy", and then click "Environment" and add the following environment variables and values :
    * GATSBY_API_URL `https://api.faithsourced.com/conveyor/modules`
    * GATSBY_PLUGIN_MANIFEST_NAME `Faith Sourced Software Foundation`
    * GATSBY_PLUGIN_MANIFEST_SHORTNAME `Faith Sourced`
    * GATSBY_PLUGIN_MANIFEST_BGCOLOR `#2c393f`
    * GATSBY_PLUGIN_MANIFEST_THEMECOLOR `#2c393f`
    * NODE_VERSION `18.14.2`
        * This ensures development and deployment environments are in sync
    * SHARP_IGNORE_GLOBAL_LIBVIPS `true`
        * This forces the correct version of LIBVIPS to be used on the Netlify container

## Updating
As changes are made to the codebase, you can pull those changes from the GitHup repo by issuing the following command :
```zh
cd gatsby-faithsourced
git pull
```
After pulling any updates from the GitHub repo you will want to ensure that any new dependencies are installed :
```zh
cd gatsby-faithsourced
npm update
```