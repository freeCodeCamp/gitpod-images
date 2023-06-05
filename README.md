# freeCodeCamp/gitpod-images

## Release

On pushes to `main`, a GitHub Action will build and push the images to Docker Hub. The image tags will be the same as the Git tag associated with the commit.

### Create a Commit with Git Tag

```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```
