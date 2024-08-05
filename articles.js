// articles.js

// Sample article data (replace with your actual data or fetch from an API)
const articles = [
  {
    id: "YiBDWGVhRxhAuB3",
    title: "Masa Depan AI di Indonesia: Tantangan atau peluang?",
    preview:
      "Dalam beberapa tahun terakhir, AI (Artificial Intelligence atau kecerdasan buatan) telah menjadi salah satu teknologi paling berpengaruh di dunia, termasuk di Indonesia. Dengan semakin banyaknya perusahaan yang mengadopsi AI, penting bagi bisnis untuk memahami bagaimana teknologi ini dapat membantu untuk tetap kompetitif di tengah persaingan bisnis yang cukup ketat saat ini.",
    fullContent: `
Dalam beberapa tahun terakhir, AI (Artificial Intelligence atau kecerdasan buatan) telah menjadi salah satu teknologi paling berpengaruh di dunia, termasuk di Indonesia. Dengan semakin banyaknya perusahaan yang mengadopsi AI, penting bagi bisnis untuk memahami bagaimana teknologi ini dapat membantu untuk tetap kompetitif di tengah persaingan bisnis yang cukup ketat saat ini. 

Di Indonesia, tren penggunaan AI semakin meningkat seiring dengan perkembangan teknologi. Banyak perusahaan dan organisasi di Indonesia telah mengadopsi AI dalam operasionalnya untuk meningkatkan efisiensi, produktivitas, dan kualitas layanan.
Contoh penerapan AI di Indonesia antara lain penggunaan chatbot dalam layanan pelanggan, analisis data untuk pengambilan keputusan bisnis yang lebih cerdas, dan penggunaan teknologi pengenalan suara dan gambar untuk meningkatkan keamanan. Dalam beberapa tahun terakhir, sejumlah startup AI juga bermunculan di Indonesia, membawa inovasi baru dan meningkatkan ekosistem AI di tanah air.

<br/><br/>
<b>Masa Depan AI di Indonesia</b>

<br/><br/>
Perkembangan AI di Indonesia menunjukkan masa depan yang menjanjikan. Dengan dukungan pemerintah, kolaborasi dengan industri, dan peningkatan pendidikan, AI berpotensi mengubah berbagai aspek kehidupan di Indonesia. Mulai dari layanan kesehatan hingga bisnis, teknologi AI akan memainkan peran penting dalam mengatasi tantangan abad ke-21.
Sebagai negara yang kaya akan sumber daya alam dan potensi manusia, Indonesia mempunyai peluang besar untuk mengambil peran kepemimpinan dalam pengembangan teknologi AI di Asia Tenggara. Dengan upaya bersama dari berbagai pihak, visi tersebut dapat kita wujudkan dan membawa Indonesia menuju era teknologi maju yang lebih baik.
<br/><br/>
<b>Tantangan atau peluang ?</b>

<br/><br/>
Meskipun perkembangan AI di Indonesia menunjukkan kemajuan positif, namun masih terdapat beberapa tantangan yang perlu diatasi. Salah satunya adalah kurangnya sumber daya yang terampil untuk AI. Upaya lebih lanjut perlu dilakukan untuk melatih lebih banyak pakar AI dan insinyur AI yang berkualifikasi.
Selain itu, peraturan yang tepat diperlukan untuk mengatasi masalah perlindungan dan keamanan data dalam konteks AI. Hal ini penting untuk memastikan pengembangan AI di Indonesia dilakukan secara etis dan aman.
Namun tantangan ini juga membawa peluang besar. Perkembangan AI di Indonesia dapat membantu meningkatkan efisiensi di berbagai sektor, meningkatkan pelayanan publik dan menciptakan lapangan kerja baru. Hal ini juga bisa menjadi landasan bagi perusahaan Indonesia untuk bersaing di pasar teknologi global.
Dengan tren perkembangan AI yang terus berlanjut, dengan dukungan tenaga ahli yang berpengalaman dan profesional, Semicolon Tech siap untuk membantu bisnis anda untuk layanan integrasi AI untuk mendukung kesuksesan bisnis anda. 

<br/><br/>
Untuk informasi lebih lanjut tentang layanan Semicolon Tech, silahkan menghubungi kami di inquiries.semicolon@gmail.com atau live consultation disini
`,
    date: "Jakarta, 06 August 2024; by Semicolon Tech",
  },
  // Add more articles here
];

// Function to render article previews
function renderArticlePreviews() {
  const articlesWrapper = document.querySelector(".articles-wrapper");
  articlesWrapper.innerHTML = "";

  articles.forEach((article) => {
    const articlePreview = document.createElement("div");
    articlePreview.className = "article-preview";
    articlePreview.innerHTML = `
      <h2 class="article-title-preview">${article.title}</h2>
      <p class="article-body-preview">${article.preview}</p>
      <div class="article-read-more-wrapper-preview">
        <a href="?article=${article.id}" class="article-read-more">Read more</a>
      </div>
    `;
    articlesWrapper.appendChild(articlePreview);
  });
}

// Function to render a full article
function renderFullArticle(articleId) {
  const article = articles.find((a) => a.id === articleId);
  if (!article) return;

  const articlesWrapper = document.querySelector(".articles-wrapper");
  articlesWrapper.className = "articles-wrapper opened";
  articlesWrapper.innerHTML = `
    <div class="full-article">
      <h1 class="article-title">${article.title}</h1>
      <p>${article.date}</p>
      <div class="article-image">
        <img src="./assets/ai-sct.jpg"/>
      </div>
      <div class="article-content">${article.fullContent}</div>
      <a href="?articles" class="back-to-articles">Back to Articles</a>
    </div>
  `;
}

// Function to handle URL parameters and render appropriate content
function handleURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("article");

  if (articleId) {
    renderFullArticle(articleId);
  } else {
    renderArticlePreviews();
  }
}

// Event listener for page load
window.addEventListener("load", handleURLParams);

// Event listener for popstate (browser back/forward buttons)
window.addEventListener("popstate", handleURLParams);

// Prevent default link behavior and update URL
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("article-read-more") ||
    e.target.classList.contains("back-to-articles")
  ) {
    e.preventDefault();
    const url = e.target.getAttribute("href");
    window.history.pushState({}, "", url);
    handleURLParams();
  }
});
