const forumLatest =
  "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://cdn.freecodecamp.org/curriculum/forum-latest";

const allCategories = {
  299: { category: "Career Advice", className: "career" },
  409: { category: "Project Feedback", className: "feedback" },
  417: { category: "freeCodeCamp Support", className: "support" },
  421: { category: "JavaScript", className: "javascript" },
  423: { category: "HTML - CSS", className: "html-css" },
  424: { category: "Python", className: "python" },
  432: { category: "You Can Do This!", className: "motivation" },
  560: { category: "Backend Development", className: "backend" },
};

const postsContainer = document.getElementById("posts-container");

const timeAgo = (time) => {
  const past = new Date(time);
  const now = new Date();
  const timeDifference = now - past;
  const minutesAgo = timeDifference / 1000 / 60;
  const hoursAgo = minutesAgo / 60;
  const daysAgo = hoursAgo / 24;

  if (minutesAgo < 60) {
    return `${Math.floor(minutesAgo)}m ago`;
  } else if (hoursAgo < 24) {
    return `${Math.floor(hoursAgo)}h ago`;
  } else {
    return `${Math.floor(daysAgo)}d ago`;
  }
};

const viewCount = (views) => {
  if (views >= 1000) {
    return `${Math.floor(views / 1000)}k`;
  } else {
    return views;
  }
};

const forumCategory = (id) => {
  if (allCategories.hasOwnProperty(id)) {
    return `
    <a class="category ${allCategories[id].className}" href="${forumCategoryUrl}${allCategories[id].className}/${id}">${allCategories[id].category}</a>
    `;
  } else {
    return `
    <a class="category general" href="${forumCategoryUrl}general/${id}">General</a>
    `;
  }
};

const avatars = (postersArr, usersArr) => {
  let imgStr = "";
  for (let i = 0; i < postersArr.length; i++) {
    const matchingUser = usersArr.find((el) => el.id === postersArr[i].user_id);
    const matchingUserURL = matchingUser.avatar_template.replace(
      "{size}",
      "30"
    );
    imgStr += `
    <img src="${avatarUrl}${matchingUserURL}" alt="${matchingUser.name}">
    `;
  }
  return imgStr;
};

const showLatestPosts = (data) => {
  const users = data.users;
  const topicList = data.topic_list;
  for (let i = 0; i < topicList.topics.length; i++) {
    postsContainer.innerHTML += `
    <tr>
    <td><a class="post-title" href="${forumTopicUrl}${
      topicList.topics[i].slug
    }/${topicList.topics[i].id}">${
      topicList.topics[i].title
    }</a>${forumCategory(topicList.topics[i].category_id)}</td>
    <td><div class="avatar-container">${avatars(
      topicList.topics[i].posters,
      users
    )}</div></td>
    <td>${topicList.topics[i].posts_count - 1}</td>
    <td>${viewCount(topicList.topics[i].views)}</td>
    <td>${timeAgo(topicList.topics[i].bumped_at)}</td>
    </tr>
    `;
  }
};

async function fetchData() {
  try {
    let response = await fetch(forumLatest);
    let data = await response.json();
    showLatestPosts(data);
  } catch (error) {
    console.log(error);
  }
}

fetchData();