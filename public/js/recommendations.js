document.addEventListener("DOMContentLoaded", function () {
  // All topic buttons
  let topicButtons = document.querySelectorAll(".topic-button");

  // Articles' classes
  let allArticles = document.querySelectorAll(".all-articles");
  let interviewArticles = document.querySelectorAll(".interview-article");
  let cvArticles = document.querySelectorAll(".cv-article");
  let softSkillsArticles = document.querySelectorAll(".soft-skills-article");
  let confidenceArticles = document.querySelectorAll(".confidence-article");
  let patienceArticles = document.querySelectorAll(".patience-article");
  let applyingArticles = document.querySelectorAll(".applying-article");
  let newsArticles = document.querySelectorAll(".news-article");

  // Search article functionality
  let searchInput = document.getElementById("topicSearch");

  searchInput.addEventListener("input", function () {
    let searchTerm = searchInput.value.toLowerCase();

    // Reset display for all articles
    hideAllArticles();

    document
      .querySelectorAll(".recom-separate-text span")
      .forEach(function (element) {
        let articleTitle = element.innerText.toLowerCase();

        // Check if the article title contains the search term
        if (articleTitle.includes(searchTerm)) {
          // Show the parent article container
          element.closest(".all-articles").style.display = "block";
        }
      });
  });

  function hideAllArticles() {
    // Reset display for all articles
    [
      allArticles,
      interviewArticles,
      cvArticles,
      softSkillsArticles,
      confidenceArticles,
      patienceArticles,
      applyingArticles,
      newsArticles,
    ].forEach((articles) => {
      articles.forEach((article) => {
        article.style.display = "none";
      });
    });
  }

  function showArticles(articles) {
    articles.forEach((article) => {
      article.style.display = "block";
    });
  }

  // Event listeners for each topic button
  topicButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Hide all articles first
      hideAllArticles();

      // Determine which articles to show based on the clicked button
      switch (button.id) {
        case "allTopic":
          showArticles(allArticles);
          break;
        case "interviewTopic":
          showArticles(interviewArticles);
          break;
        case "cvTopic":
          showArticles(cvArticles);
          break;
        case "softSkillsTopic":
          showArticles(softSkillsArticles);
          break;
        case "confidenceTopic":
          showArticles(confidenceArticles);
          break;
        case "patienceTopic":
          showArticles(patienceArticles);
          break;
        case "applyingTopic":
          showArticles(applyingArticles);
          break;
        case "newsTopic":
          showArticles(newsArticles);
          break;
      }
    });
  });

  // Active button declaration
  topicButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      topicButtons.forEach((otherBtn) => {
        otherBtn.classList.remove("topic-active-btn");
      });

      btn.classList.add("topic-active-btn");
    });
  });
});

// Search article functionality
let searchInput = document.getElementById("topicSearch");

document
  .querySelectorAll(".recom-separate-text span")
  .forEach(function (element) {
    let articleTitle = element.innerText;

    if (searchInput.value.includes(articleTitle)) {
      allArticles.style.display = "none";
    }
  });
