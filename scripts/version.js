// Get latest version of `freecodecamp/gitpod-base` image from GitHub Container Registry
// Update the `PUBLISH_TAG_VERSION_MAJOR`, `PUBLISH_TAG_VERSION_MINOR`, and `PUBLISH_TAG_VERSION_PATCH` shell environment variables with an incremented version number
// The new version number must be incremented based on the commit message
/**
 *  * **Examples**
 *
 * ```bash
 * $ node scripts/version.js "fix: fix really bad bug
 *
 * BREAKING CHANGE: Big update"
 * 2.0.0
 * $ node scripts/version.js "feat: add new feature"
 * 1.1.0
 * $ node scripts/version.js "fix: fix bug"
 * 1.0.1
 * ```
 */
const { Octokit } = require("@octokit/core");

const COMMIT_MESSAGE = process.argv[2];

if (!COMMIT_MESSAGE) {
  throw new Error(
    "A non-empty commit message should be provided as an argument."
  );
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function main() {
  // const baseVersions = await octokit.request(
  //   "GET /orgs/freeCodeCamp/packages/container/freecodecamp/gitpod-base/versions",
  //   {
  //     package_type: "container",
  //     package_name: "freecodecamp/gitpod-base",
  //     org: "ORG",
  //     headers: {
  //       "X-GitHub-Api-Version": "2022-11-28",
  //     },
  //   }
  // );

  // const latestVersion = baseVersions.data.pop();
  const latestVersion = { name: "0.1.0" };

  const newVersion = incrementVersion(latestVersion.name);

  console.log(newVersion);
}

main();

/**
 * Increments the given version based on the commit message passed as an argument
 * @param {string} version A semver string
 * @returns {string} A semver string
 */
function incrementVersion(version) {
  const [major, minor, patch] = version.split(".");
  const versionType = getCommitMessageVersionType(COMMIT_MESSAGE);

  switch (versionType) {
    case "major":
      return `${Number(major) + 1}.0.0`;
    case "minor":
      return `${major}.${Number(minor) + 1}.0`;
    case "patch":
      return `${major}.${minor}.${Number(patch) + 1}`;
    default:
      throw new Error("Invalid commit message");
  }
}

/**
 * Returns the type of version based on the commit message
 * 
 * **Logic**
 * - Major: If the commit message includes "BREAKING CHANGE:" | "!:"
 * - Minor: If the commit message starts with "feat"
 * - Patch: If the commit message starts with "fix"
 * 
 * If message starts with `refactor`, `chore`, or `docs`, then no build is triggered.
 * 
 * **NOTE:** If the commit message contains `major`, `minor`, or `patch` then that will be used instead
 * 

 * @param {string} commitMessage 
 * @returns {"major" | "minor" | "patch"}
 */
function getCommitMessageVersionType(commitMessage) {
  if (commitMessage.includes("major")) {
    return "major";
  }

  if (commitMessage.includes("minor")) {
    return "minor";
  }

  if (commitMessage.includes("patch")) {
    return "patch";
  }

  if (
    commitMessage.includes("BREAKING CHANGE:") ||
    commitMessage.includes("!:")
  ) {
    return "major";
  }

  if (commitMessage.startsWith("feat")) {
    return "minor";
  }

  if (commitMessage.startsWith("fix")) {
    return "patch";
  }
}
