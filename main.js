document.addEventListener('DOMContentLoaded', function() {
    const postContainer = document.getElementById('post-container');
    let likeStatus = [];

    Promise.all([
        fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()),
        fetch('https://jsonplaceholder.typicode.com/photos').then(response => response.json())
    ]).then(([posts, photos]) => {
        const top100Photos = photos.slice(0, 100);

        posts.slice(0, 100).forEach((post, index) => {
            likeStatus[index] = false; // Initialize all like statuses to false
            const photo = top100Photos[index];
            const postCard = document.createElement('div');
            postCard.classList.add('col-md-4', 'mb-4');
            postCard.innerHTML = `
                <div class="card">
                    <div class="card-body p-0">
                        <div class="card-image-wrapper">
                            <button class="like-button" data-index="${index}"><i class="fas fa-thumbs-up"></i></button>
                            <img src="${photo.url}" class="card-img-top" alt="${post.title}">
                        </div>
                        <div class="p-3">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-subtitle">${photo.title}</p>
                            <p class="card-text">${post.body}</p>
                            <a href="post.html?id=${post.id}" class="btn btn-primary">Comment</a>
                        </div>
                    </div>
                </div>
            `;
            postContainer.appendChild(postCard);
        });

        document.querySelectorAll('.like-button').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                likeStatus[index] = !likeStatus[index]; // Toggle like status
                this.classList.toggle('red', likeStatus[index]); // Toggle 'red' class based on like status
            });
        });
    });
});

// Check if we are on the post detail page
if (window.location.pathname.includes('post.html')) {
    const postId = new URLSearchParams(window.location.search).get('id');
    const postDetail = document.getElementById('post-detail');
    const commentsContainer = document.getElementById('comments-container');

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            fetch(`https://jsonplaceholder.typicode.com/photos/${post.id}`)
                .then(response => response.json())
                .then(photo => {
                    postDetail.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h2>${post.title}</h2>
                                <img src="${photo.url}" class="card-img-top mb-3" alt="${post.title}">
                                <p>${post.body}</p>
                            </div>
                        </div>
                    `;
                });
        });

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
            comments.forEach(comment => {
                const commentCard = document.createElement('div');
                commentCard.classList.add('card', 'mb-3');
                commentCard.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${comment.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${comment.email}</h6>
                        <p class="card-text">${comment.body}</p>
                    </div>
                `;
                commentsContainer.appendChild(commentCard);
            });
        });
}
