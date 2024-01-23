// All topic buttons
let topicButtons = document.querySelectorAll('.topic-button');

// Separate topic buttons (by id)
let allTopicsBtn = document.getElementById('allTopic');
let interviewTopicBtn = document.getElementById('interviewTopic');
let cvTopicBtn = document.getElementById('cvTopic');
let softSkillsTopicBtn = document.getElementById('softSkillsTopic');
let confidenceTopicBtn = document.getElementById('confidenceTopic');
let patienceTopicBtn = document.getElementById('patienceTopic');
let applyingTopicBtn = document.getElementById('applyingTopic');
let newsTopicBtn = document.getElementById('newsTopic');

// Articles' classes
let interviewArticles = document.querySelectorAll('.interview-article');
let cvArticles = document.querySelectorAll('.cv-article');
let softSkillsArticles = document.querySelectorAll('.soft-skills-article');
let confidenceArticles = document.querySelectorAll('.confidence-article');
let patienceArticles = document.querySelectorAll('.patience-article');
let applyingArticles = document.querySelectorAll('.applying-article');
let newsArticles = document.querySelectorAll('.news-article');

topicButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    topicButtons.forEach(otherBtn => {
      otherBtn.classList.remove('topic-active-btn');
    }); 

    btn.classList.add('topic-active-btn');
  });
});


