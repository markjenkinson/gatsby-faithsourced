# Netlify Docker Container for Gatsby Development - Instructions

The following instructions will replicate the exact build environment Netlify uses to build this Gatsby project. Using Docker containers eliminates the need to modify or install any development tools on your host, and everything runs within the sandbox of the Docker container.



## STEP 1 - Download & Install Docker

[Download Docker](https://www.docker.com/products/docker-desktop/)



## STEP 2 - Download Docker Netlify Build Image

```zh
docker pull netlify/build:focal
```



## STEP 3 - Download Netlify Build Image Scripts

[Download from GitHub](https://github.com/netlify/build-image/archive/refs/heads/focal.zip)



## STEP 4 - Update /build-image-focal/test-tools/test-build.sh with correct docker run command

The following changes are required to successfully run the Gatsby development environment from within a Docker container replicating the image used in a Netlify build. Most importantly take note of the Node version, Python version, and the `SHARP_IGNORE_GLOBAL-LIBVIPS` environment variables, which are specifically set to accommodate various legacy compatibility issues. To correctly bridge the Docker container to your development host both port 8000 must be opened using the --expose flag, and the Docker container port 8000 must be mapped to port 8000 on your development host using the -p flag.

```zh
docker run --rm --name NetlifyBuild \
		-e=NODE_VERSION="10.24.1" \
		-e=RUBY_VERSION="2.6.2" \
		-e=YARN_VERSION="1.13.0" \
		-e=PNPM_VERSION="7.13.4" \
		-e=NPM_VERSION="6.14.12" \
		-e=HUGO_VERSION \
		-e=PHP_VERSION="8.0" \
		-e=NETLIFY_VERBOSE \
		-e=GO_VERSION="1.12" \
		-e=GO_IMPORT_PATH \
		-e=SWIFT_VERSION \
		-e=PYTHON_VERSION="2.7" \
		-e=NETLIFY_PACKAGE_DIR="$NETLIFY_PACKAGE_DIR" \
		-e=GATSBY_API_URL="https://api.yourwebsite.com/api/root/" \
		-e=GATSBY_PLUGIN_MANIFEST_NAME="Page Title and Website Manifest Name" \
		-e=GATSBY_PLUGIN_MANIFEST_SHORTNAME="Mobile App Short Name" \
		-e=GATSBY_PLUGIN_MANIFEST_BGCOLOR="#2c393f" \
		-e=GATSBY_PLUGIN_MANIFEST_THEMECOLOR="#2c393f" \
		-e=SHARP_IGNORE_GLOBAL_LIBVIPS=true \
		-v "${REPO_PATH}:/opt/buildhome/repo" \
		-v "${BASE_PATH}/run-build.sh:/opt/build-bin/build" \
		-v "${BASE_PATH}/tests/get-build-info.mjs:/opt/buildhome/get-build-info.mjs" \
		-v "${BASE_PATH}/package.json:/opt/buildhome/package.json" \
		-v "${BASE_PATH}/package-lock.json:/opt/buildhome/package-lock.json" \
		-v "${BASE_PATH}/run-build-functions.sh:/opt/build-bin/run-build-functions.sh" \
		-v $PWD/$T/cache:/opt/buildhome/cache \
		-w /opt/build \
		-it \
		--expose 8000 \
		-p 8000:8000 \
		$NETLIFY_IMAGE $SCRIPT
```

### Customize these Netlify environment variables specific to your site

* GATSBY_API_URL="https://api.yourwebsite.com/api/root/" (ie: "https://api.faithsourced.com/conveyor/modules")
* GATSBY_PLUGIN_MANIFEST_NAME="Page Title and Website Manifest Name" (ie: "Faith Sourced Software Foundation")
* GATSBY_PLUGIN_MANIFEST_SHORTNAME="Mobile App Short Name" (ie: "Faith Sourced")
* GATSBY_PLUGIN_MANIFEST_BGCOLOR="#2c393f"
* GATSBY_PLUGIN_MANIFEST_THEMECOLOR="#2c393f"



## STEP 5 - Clone the gatsby-faithsourced repository

```zh
git@github.com:markjenkinson/gatsby-faithsourced.git
```



## STEP 6 - Start the Docker Container in develop mode

To correctly bridge the Docker container to your development host you must also ensure that the `-H 0.0.0.0` parameter (yes, with zeros) is included in the `gatsby develop` command. Otherwise, [localhost:8000](http://localhost:8000) will not work on your development host. The -H parameter simply binds Gastby to your Docker container correctly. Without it, Gatsby will only be bound to the local container and  the bridge to your development host will not be made, resulting in `server unexpectedly dropped the connection` errors in your browser when you try to access Gatsby via [localhost:8000](http://localhost:8000).

Additionally, if you wish to run Gatsby on a different port you will need to also specify the -p flag followed by the port number of your choosing. If you do this, you will also need to update the port mapping from Step 4 with the same port number.

```zh
cd /path/to/netlify/docker/scripts/build-image-focal
./test-tools/test-build.sh /path/to/repository/gatsby-faithsourced 'gatsby clean && gatsby -H 0.0.0.0 develop'
```

## DONE

Gatsby should now be running in develop mode in the Docker container, and any changes to the `gatsby-faithsourced` repository on your development host should be immediately reflected on in your browser via [localhost:8000](http://localhost:8000).