const { argv } = require("node:process");

const username = argv[2];

let userData = [];

async function fetchData() {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/events`);
    userData = await res.json();
  } catch (e) {
    console.log(e);
  }
}

fetchData().then(() => {
  userData.map((data, _) => {
    if (data.type === "PushEvent") {
      let commits = data.payload.commits.length;
      let repo = data.repo.name;
      console.log(` - Pushed ${commits} to ${repo}`);
    }
    if (data.type === "CreateEvent") {
      let repo = data.repo.name;
      console.log(` - Created ${repo}`);
    }
    if (data.type === "DeleteEvent") {
      let repo = data.repo.name;
      console.log(` - Deleted ${repo}`);
    }
    if (data.type === "ForkEvent") {
      let repo = data.repo.name;
      console.log(` - Forked ${repo}`);
    }
    if (data.type === "WatchEvent") {
      let repo = data.repo.name;
      console.log(` - Started watching ${repo}`);
    }
    if (data.type === "CommitCommentEvent") {
      let repo = data.repo.name;
      let comment = data.comment.body;
      console.log(` - Committed ${comment} to ${repo}`);
    }
  });
});

// Events to be added -
// GollumEvent
// IssueCommentEvent
// IssuesEvent
// MemberEvent
// PublicEvent
// PullRequestEvent
// PullRequestReviewEvent
// PullRequestReviewCommentEvent
// PullRequestReviewThreadEvent
// ReleaseEvent
// SponsorshipEvent
